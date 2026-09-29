# Website improvement plan

## Scope and acceptance

1. **Inquiries.** Deliver to `CLM@chilelinemedia.com` through a server-side email provider once configured. Validate requests, retain form data on errors, and announce status accessibly. Until a provider is configured, offer an explicitly labeled email draft; never claim an inquiry was sent. Verify validation, disabled delivery, provider failure, and successful delivery using mocks rather than sending test mail.
2. **Original portfolio stills.** Inspect available local assets for genuine project matches. Use higher-resolution source images only where provenance and visual suitability are clear; retain YouTube image fallbacks. Do not upscale an image and describe it as an original 4K still. Record remaining source needs.
3. **Commercial case studies.** Await confirmed client, brief, CLM contribution, and deliverables. Do not convert existing marketing copy into purportedly verified credits. Moving Arts video remains deferred until a separate approved proof-of-work asset is supplied.
4. **Mobile Work page.** Provide visible project imagery without hover on narrow or touch devices. Preserve desktop hover backgrounds, keyboard access, project links, and the established design. Check at 320px, 390px, and desktop widths.
5. **Splat performance and reliability.** Preserve the calibrated scene and mouse movement. Suspend animation while offscreen or hidden and resume when visible. Handle asynchronous rendering failure with the existing still-image fallback. Evaluate progressive detail loading separately; do not replace the asset without visual and performance evidence.

## Delivery order

- Implement inquiries, portfolio, and hero changes in parallel with separate file ownership.
- Review all diffs and source asset choices before integration.
- Run focused tests, lint, and a production build.
- Verify contact states without sending mail, mobile and desktop Work views, homepage image sources, and hero pause/resume behavior in browsers.
- Publish verified changes and check the exact deployed commit and public pages.

## External inputs

- Email delivery service: none connected as of September 29, 2026. Server delivery requires a provider API key and verified sender/domain. Do not expose credentials to browser bundles.
- Unverified project facts stay pending. The user authorized local asset discovery.

## Implemented and verified

- Contact form: working email-draft mode, copyable message text, and a server-side Resend adapter ready for configuration. Capability lookup and sending have timeouts; fields lock during a send; edits clear stale draft links. No external test message was sent.
- Work page: visible 16:9 thumbnails on mobile/touch, preserved desktop background imagery and keyboard focus behavior, and shared optional original-still support with homepage cards.
- Hero: offscreen/hidden frame suspension, visibility-based resume, asynchronous update and context-loss fallback, and no repeated loading fade when returning to the scene.
- Validation: all 17 automated checks, ESLint, and the production build passed. Browser checks covered 320px/390px Work layouts, 320px contact draft generation and draft invalidation after edits, desktop Work imagery, and hero active → paused → active with the loading image remaining transparent.

## Pending work

- Configure and verify Resend delivery to the CLM mailbox; setup is in `docs/inquiries.md`.
- Supply distinct original film stills. No thumbnail was replaced with an upscaled or repeated hero image; inventory is in `docs/portfolio-assets.md`.
- Confirm commercial case-study facts and supply the separate Moving Arts asset.
- Build and benchmark a streaming LoD asset before changing the current splat; the comparison plan is in `docs/splat-performance.md`.

