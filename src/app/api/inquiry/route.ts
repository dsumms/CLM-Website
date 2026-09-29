import { handleInquiryPost, inquiryDeliveryConfigured } from "@/lib/inquiryServer";

export const runtime = "nodejs";

function deliveryEnvironment() {
    return {
        apiKey: process.env.RESEND_API_KEY,
        fromEmail: process.env.INQUIRY_FROM_EMAIL,
    };
}

export async function GET() {
    return Response.json(
        { mode: inquiryDeliveryConfigured(deliveryEnvironment()) ? "direct" : "draft" },
        { headers: { "Cache-Control": "no-store" } },
    );
}

export async function POST(request: Request) {
    return handleInquiryPost(request, deliveryEnvironment());
}
