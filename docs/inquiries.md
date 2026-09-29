# Contact inquiries

The contact form sends new inquiries to **CLM@chilelinemedia.com** only when Resend is configured. Without that configuration, the form prepares a `mailto:` draft and clearly asks the visitor to press Send in their email app. It also offers copyable inquiry text if an email app does not open. The site never reports an unconfirmed submission as sent.

To turn on automatic sending, verify a sender domain in Resend, then set these server-side environment variables in Vercel (and locally if testing):

- `RESEND_API_KEY`: an active Resend API key.
- `INQUIRY_FROM_EMAIL`: an address on the verified sender domain, such as `Chile Line Media <inquiries@your-verified-domain.example>`.

Redeploy after adding the variables. Do not prefix either variable with `NEXT_PUBLIC_`, and do not commit the key. The recipient is fixed in code to CLM@chilelinemedia.com. The visitor's address is used as `reply_to`; it is not used as the sender.

The server checks the request origin and JSON type, limits the body and field lengths, validates the project and budget selections, rejects a filled honeypot, and sends plain text through Resend's [Send Email API](https://resend.com/docs/api-reference/emails/send-email). A provider response with an email ID means the message was accepted for delivery; final inbox delivery is not independently verified. Provider failures return a draft path instead of a success message. No inquiry content is logged by the route.

Run `node --test tests/inquiry.test.mjs` for the validation and mocked delivery checks. Before relying on automatic delivery in production, send a controlled inquiry and confirm it arrives at the CLM mailbox. The fallback draft is usable immediately without a service account.
