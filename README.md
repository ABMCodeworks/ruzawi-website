# React + Vite

## Anonymous reporting

Reporting is disabled by default. Set `VITE_ANON_REPORT_ENABLED=true` to enable
both the page and submission endpoint. Any other value, including an unset
variable, disables them. Configure this variable for both builds and functions
in Netlify, then redeploy when changing it. Locally, set it in `.env` and restart
Vite. While disabled, the form and CAPTCHA are not rendered and the endpoint
returns 404 without processing or sending reports.

`/anon-report` is a separate HTML entry so the main site's analytics and session
recording scripts never load on the reporting page. There are no navigation or
sitemap links. HTML metadata and Netlify response headers tell search engines not
to index it. Crawling remains allowed so crawlers can read these directives.

The form uses `VITE_RECAPTCHA_SITE_KEY`, and its Netlify function requires
`RECAPTCHA_SECRET_KEY`, `RESEND_API_KEY`, and `RESEND_FROM`. Reports go to
`ANON_REPORT_TO_EMAIL` when set, otherwise `administrator@ruzawi.com` (the existing
general-enquiries destination). No sender identity, IP address, request headers,
or CAPTCHA token is included in the email or logged by the function. Hosting and
CAPTCHA providers may still process connection data. The report text itself can
contain identifying information supplied by the reporter.

Run `node --test scripts/anon-report.test.js` for mocked validation and delivery
checks; these tests never send real reports.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
