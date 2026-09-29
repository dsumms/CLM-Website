import {
    INQUIRY_EMAIL,
    inquiryBody,
    inquirySubject,
    validateInquiry,
    type Inquiry,
} from "./inquiry";

type InquiryEnvironment = {
    apiKey?: string;
    fromEmail?: string;
    fetchImpl?: typeof fetch;
};

const jsonHeaders = { "Cache-Control": "no-store" };

export function inquiryDeliveryConfigured(env: InquiryEnvironment): boolean {
    return Boolean(env.apiKey?.trim() && env.fromEmail?.trim());
}

export async function deliverInquiry(inquiry: Inquiry, env: InquiryEnvironment): Promise<boolean> {
    if (!inquiryDeliveryConfigured(env)) return false;

    try {
        const response = await (env.fetchImpl ?? fetch)("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${env.apiKey!.trim()}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: env.fromEmail!.trim(),
                to: [INQUIRY_EMAIL],
                reply_to: inquiry.email,
                subject: inquirySubject(inquiry),
                text: inquiryBody(inquiry),
            }),
            signal: AbortSignal.timeout(10_000),
        });
        if (!response.ok) return false;
        const result: unknown = await response.json();
        return Boolean(
            result && typeof result === "object" &&
            "id" in result && typeof result.id === "string" && result.id.length > 0,
        );
    } catch {
        return false;
    }
}

export async function handleInquiryPost(
    request: Request,
    env: InquiryEnvironment,
): Promise<Response> {
    if (request.headers.get("origin") !== new URL(request.url).origin) {
        return Response.json({ error: "Unable to submit this inquiry." }, { status: 403, headers: jsonHeaders });
    }
    if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
        return Response.json({ error: "Invalid submission." }, { status: 415, headers: jsonHeaders });
    }
    const statedLength = Number(request.headers.get("content-length") ?? "0");
    if (statedLength > 12_000) {
        return Response.json({ error: "Message is too long." }, { status: 413, headers: jsonHeaders });
    }

    let fields: unknown;
    try {
        const body = await request.text();
        if (body.length > 12_000) {
            return Response.json({ error: "Message is too long." }, { status: 413, headers: jsonHeaders });
        }
        fields = JSON.parse(body);
    } catch {
        return Response.json({ error: "Invalid submission." }, { status: 400, headers: jsonHeaders });
    }

    const validation = validateInquiry(fields);
    if (!validation.ok) {
        return Response.json({ error: validation.error }, { status: 400, headers: jsonHeaders });
    }
    if (!inquiryDeliveryConfigured(env)) {
        return Response.json({ error: "Email delivery is not configured.", mode: "draft" }, { status: 503, headers: jsonHeaders });
    }

    if (!(await deliverInquiry(validation.inquiry, env))) {
        return Response.json({ error: "We couldn't send your inquiry. Please use an email draft instead.", mode: "draft" }, { status: 502, headers: jsonHeaders });
    }
    return Response.json({ accepted: true }, { status: 200, headers: jsonHeaders });
}
