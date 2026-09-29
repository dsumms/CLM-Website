export const INQUIRY_EMAIL = "CLM@chilelinemedia.com";

export const projectTypes = [
    "Narrative Films",
    "Brand Storytelling",
    "Documentary",
    "Campaign & Digital Content",
    "Other",
] as const;

export const budgetRanges = [
    "Under $5k",
    "$5k – $15k",
    "$15k – $50k",
    "$50k – $100k",
    "$100k+",
    "Not sure yet",
] as const;

export type Inquiry = {
    name: string;
    email: string;
    projectType: (typeof projectTypes)[number];
    budget: (typeof budgetRanges)[number];
    message: string;
};

type ValidationResult =
    | { ok: true; inquiry: Inquiry }
    | { ok: false; error: string };

export function validateInquiry(input: unknown): ValidationResult {
    if (input === null || typeof input !== "object" || Array.isArray(input)) {
        return { ok: false, error: "Please complete all fields." };
    }

    const fields = input as Record<string, unknown>;
    const name = typeof fields.name === "string" ? fields.name.trim() : "";
    const email = typeof fields.email === "string" ? fields.email.trim() : "";
    const message = typeof fields.message === "string" ? fields.message.trim() : "";

    if (typeof fields.website !== "string" || fields.website.trim() !== "") {
        return { ok: false, error: "Unable to submit this inquiry." };
    }
    if (name.length < 2 || name.length > 120 || /[\r\n\x00-\x1f]/.test(name)) {
        return { ok: false, error: "Please enter your name (2–120 characters)." };
    }
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { ok: false, error: "Please enter a valid email address." };
    }
    if (!projectTypes.includes(fields.projectType as Inquiry["projectType"])) {
        return { ok: false, error: "Please choose a project type." };
    }
    if (!budgetRanges.includes(fields.budget as Inquiry["budget"])) {
        return { ok: false, error: "Please choose a budget range." };
    }
    if (message.length < 10 || message.length > 5000) {
        return { ok: false, error: "Please enter a message (10–5,000 characters)." };
    }

    return {
        ok: true,
        inquiry: {
            name,
            email,
            projectType: fields.projectType as Inquiry["projectType"],
            budget: fields.budget as Inquiry["budget"],
            message,
        },
    };
}

export function inquirySubject(inquiry: Inquiry): string {
    return `CLM inquiry: ${inquiry.projectType}`;
}

export function inquiryBody(inquiry: Inquiry): string {
    return [
        `Name: ${inquiry.name}`,
        `Email: ${inquiry.email}`,
        `Project type: ${inquiry.projectType}`,
        `Budget range: ${inquiry.budget}`,
        "",
        inquiry.message,
    ].join("\n");
}

export function inquiryDraftUrl(inquiry: Inquiry): string {
    const subject = encodeURIComponent(inquirySubject(inquiry));
    const body = encodeURIComponent(inquiryBody(inquiry).replace(/\n/g, "\r\n"));
    return `mailto:${INQUIRY_EMAIL}?subject=${subject}&body=${body}`;
}
