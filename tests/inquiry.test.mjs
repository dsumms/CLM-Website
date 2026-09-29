import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import test from "node:test";

import {
    INQUIRY_EMAIL,
    inquiryBody,
    inquiryDraftUrl,
    validateInquiry,
} from "../src/lib/inquiry.ts";
registerHooks({
    resolve(specifier, context, nextResolve) {
        return nextResolve(specifier === "./inquiry" ? "./inquiry.ts" : specifier, context);
    },
});
const {
    deliverInquiry,
    handleInquiryPost,
    inquiryDeliveryConfigured,
} = await import("../src/lib/inquiryServer.ts");

const fields = {
    name: "Avery Client",
    email: "avery@example.com",
    projectType: "Documentary",
    budget: "$15k – $50k",
    message: "We need a short film about our work.",
    website: "",
};

function post(overrides = {}, origin = "https://www.chilelinemedia.com") {
    return new Request("https://www.chilelinemedia.com/api/inquiry", {
        method: "POST",
        headers: { origin, "content-type": "application/json" },
        body: JSON.stringify({ ...fields, ...overrides }),
    });
}

test("validation trims and checks required fields and allowed choices", () => {
    const valid = validateInquiry({ ...fields, name: "  Avery Client  " });
    assert.equal(valid.ok, true);
    assert.equal(valid.inquiry.name, "Avery Client");
    for (const bad of [
        { email: "not-an-email" },
        { name: "A\r\nB" },
        { projectType: "Anything" },
        { budget: "A million" },
        { message: "short" },
        { website: "spam" },
    ]) {
        assert.equal(validateInquiry({ ...fields, ...bad }).ok, false);
    }
});

test("email draft encodes punctuation and CRLF, preserving copyable text", () => {
    const validated = validateInquiry({ ...fields, message: "Hello & goodbye?\nSecond line." });
    assert.equal(validated.ok, true);
    const url = inquiryDraftUrl(validated.inquiry);
    assert.ok(url.startsWith(`mailto:${INQUIRY_EMAIL}?`));
    assert.ok(url.includes("%26"));
    assert.ok(url.includes("%0D%0A"));
    assert.equal(decodeURIComponent(url.split("&body=")[1]), inquiryBody(validated.inquiry).replace(/\n/g, "\r\n"));
});

test("unconfigured backend reports draft mode and never sends", async () => {
    let calls = 0;
    assert.equal(inquiryDeliveryConfigured({ apiKey: "key" }), false);
    const response = await handleInquiryPost(post(), {
        fetchImpl: async () => { calls++; throw new Error("should not run"); },
    });
    assert.equal(response.status, 503);
    assert.equal((await response.json()).mode, "draft");
    assert.equal(calls, 0);
});

test("backend rejects cross-origin and invalid fields before delivery", async () => {
    const env = {
        apiKey: "re_test",
        fromEmail: "CLM <inquiries@verified.example>",
        fetchImpl: async () => { throw new Error("should not send"); },
    };
    assert.equal((await handleInquiryPost(post({}, "https://evil.example"), env)).status, 403);
    assert.equal((await handleInquiryPost(post({ website: "bot" }), env)).status, 400);
    assert.equal((await handleInquiryPost(post({ budget: "bad" }), env)).status, 400);
});

test("configured backend sends only to CLM and accepts provider id", async () => {
    const sent = [];
    const env = {
        apiKey: "re_test",
        fromEmail: "CLM <inquiries@verified.example>",
        fetchImpl: async (url, options) => {
            sent.push({ url, options });
            return Response.json({ id: "email_123" });
        },
    };
    const response = await handleInquiryPost(post(), env);
    assert.equal(response.status, 200);
    assert.equal(sent.length, 1);
    assert.equal(sent[0].url, "https://api.resend.com/emails");
    const payload = JSON.parse(sent[0].options.body);
    assert.deepEqual(payload.to, [INQUIRY_EMAIL]);
    assert.equal(payload.reply_to, fields.email);
    assert.equal(payload.text.includes(fields.message), true);
});

test("provider rejection or missing id is never reported as success", async () => {
    const valid = validateInquiry(fields);
    assert.equal(valid.ok, true);
    for (const result of [new Response("error", { status: 422 }), Response.json({})]) {
        assert.equal(await deliverInquiry(valid.inquiry, {
            apiKey: "re_test",
            fromEmail: "inquiries@verified.example",
            fetchImpl: async () => result,
        }), false);
    }
    const response = await handleInquiryPost(post(), {
        apiKey: "re_test",
        fromEmail: "inquiries@verified.example",
        fetchImpl: async () => new Response("error", { status: 422 }),
    });
    assert.equal(response.status, 502);
    assert.equal((await response.json()).mode, "draft");
});
