This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contact form rate limiting

The Vercel project firewall enforces **5 POST attempts per IP address per region
per fixed 10-minute window**, returning HTTP 429 before a blocked request reaches the
inquiry function or Resend. This is a shared edge limit, not a process-local
counter. Users behind the same public IP share the allowance; fixed windows can
allow a burst across a window boundary. Vercel keeps counters per region, so
traffic routed through multiple regions can exceed five attempts overall.

The rule definition is in `config/inquiry-rate-limit.json`. It matches all POST
requests because `/api/inquiry` is the site's only POST endpoint. This also
covers alternate path encodings and deployment aliases without relying on an
exact URL match. GET requests, page navigation, and the delivery-mode check are
not counted. Revisit the rule before adding other POST endpoints.

Firewall rules are project settings: deploying this repository does not install
them automatically. On a new Vercel project, import the rule with the Vercel
Firewall CLI (`rules add --data`), inspect `firewall diff`, then publish it.
Preserve other rules and any unrelated pending firewall changes. The contact
form handles a 429 response without parsing its body, retains all entered
fields, and lets the visitor retry without switching to email-draft mode.

For a safe live verification, submit invalid JSON objects (`{}`) with a matching
Origin and JSON content type. The first five requests should return validation
errors and subsequent requests should return 429; none should send an email.
Confirm normal GET requests still work, then allow the window to expire before
another submission test. Test valid delivery against a mocked provider locally.
