
# 📘 README

App Landing Template (HTML/CSS • GDPR-ready • Cloud Run)

Minimal, fast, and reusable landing page. One CSS, tiny JS, strict cookie consent (no tracking before consent), legal pages, Mailchimp signup, and an Nginx container configured for Google Cloud Run. Designed for 100/100/100/100 Lighthouse.

⸻

1) Quick Start

A) Clone & install assets
	1.	Copy this repo.
	2.	Replace placeholders in /public/assets:
	•	logo.svg (your brand mark)
	•	og-image.webp (1200×630)
	•	/assets/screenshots/screen-*.webp (1200px width, descriptive alt text)

B) Update content

Edit /public/index.html:
	•	Head <title>, <meta name="description">, canonical, OG/Twitter image
	•	Hero copy, benefit cards, bullets
	•	Mailchimp: replace action, hidden u= and id= values

Edit /public/privacy.html, /public/terms.html, /public/about.html with your company details.

C) Theme with CSS variables

Open /public/css/styles.css and adjust the :root variables:
	•	Colours, spacing, radius, container width, etc.
No ad-hoc styles—variables theme the entire site.

⸻

2) Local Preview

Option 1: Docker (recommended—matches production)

cd app
docker build -t app-landing .
docker run -it --rm -p 8080:8080 app-landing
# open http://localhost:8080

Option 2: Any static server

You can serve /public with a simple HTTP server if you’re not testing Nginx headers.

⸻

3) Cloud Run Deploy

Make sure you’re authenticated with gcloud and have a project selected.

# From repo root (where Dockerfile lives)
gcloud builds submit --tag gcr.io/PROJECT_ID/app-landing-template

gcloud run deploy app-landing-template \
  --image gcr.io/PROJECT_ID/app-landing-template \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated

After deploy:
	•	Map your custom domain in Cloud Run (and point DNS).
	•	Confirm HTTPS is active.

⸻

4) Configuration Points
	•	Mailchimp
	•	In /public/index.html, set:
	•	form action="https://<dc>.list-manage.com/subscribe/post" (replace <dc> with your data centre, e.g. us1)
	•	hidden inputs: u=YOUR_U_VALUE, id=YOUR_LIST_ID
	•	Keep the hidden iframe + status message for inline success feedback.
	•	CSP (Content-Security-Policy)
	•	Default allows only same-origin resources; form posts to *.list-manage.com.
	•	If your Mailchimp region differs, ensure form-action https://*.list-manage.com; remains valid (it covers all regions).
	•	If you add analytics later, you must extend CSP and wire consent categories first.
	•	Cookie Consent
	•	Banner uses localStorage key consent_v1.
	•	Currently only “essential” is used; analytics/marketing are off and not loaded.
	•	Sitemap/Robots
	•	Update Sitemap: URL in /public/robots.txt.
	•	Verify canonical URLs in all pages.
	•	If staging, set site to noindex:
	•	Add <meta name="robots" content="noindex,nofollow"> on all pages.
	•	In robots.txt, Disallow: /.

⸻

5) Pre-Deployment Checklist

Content & SEO
	•	Replace <title> and <meta name="description"> on all pages.
	•	Set <link rel="canonical"> to your live domain.
	•	Provide alt text for every image (screenshots + logo if not decorative).
	•	Update Open Graph / Twitter image path (1200×630).
	•	Confirm readable, meaningful link text (no “click here”).
	•	Headings in order (h1 → h2 → h3…).

Mailchimp & Forms
	•	action points to correct list-manage.com endpoint.
	•	Hidden u and id values set correctly.
	•	Double opt-in enabled in Mailchimp list (if desired).
	•	GDPR checkbox text matches your policy.

Legal & Privacy
	•	/privacy reflects your company + processing basis (consent).
	•	/terms updated for your business (jurisdiction, liability).
	•	/about lists company name, address, and contact email.
	•	Cookie banner text approved for your organisation.

Accessibility
	•	“Skip to content” link works.
	•	Focus rings visible on keyboard navigation.
	•	Colour contrast passes AA.
	•	Form fields labelled; error/success status is announced (aria-live).

Performance
	•	Images exported as WebP, sized with width/height.
	•	No render-blocking scripts; all JS defer.
	•	No webfonts (system stack) or preload/subset if you choose to add later.
	•	Critical CSS is small (already inline by loading one stylesheet early).

Security & Headers
	•	HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy present.
	•	CSP includes form-action https://*.list-manage.com;.
	•	HTML validates (W3C).
	•	HTTPS enforced.

Cloud Run
	•	Image builds cleanly.
	•	Service deployed in your region.
	•	Custom domain mapped and verified.
	•	TLS live and redirect working.

⸻

6) Post-Deployment QA
	•	Run Lighthouse (mobile + desktop) — target 100/100/100/100.
	•	Run axe DevTools or Lighthouse accessibility checks — fix any flagged issues.
	•	Test Mailchimp form end-to-end (including double opt-in email).
	•	Verify cookie banner behavior persists across page loads.
	•	Check each legal page is linked in the footer and reachable.
	•	Validate sitemap.xml in Search Console.

⸻

7) Adding Analytics Later (safely)
	1.	Add a Manage dialog to choose categories:
	•	essential (non-toggle)
	•	analytics (off by default)
	•	marketing (off by default)
	2.	Load analytics script only after consent_v1.analytics === true.
	3.	Extend CSP to allow the analytics domain(s) (e.g., script-src and img-src).
	4.	Update Privacy Policy to include the analytics provider as a processor.

(This template ships with no analytics to guarantee compliance and Lighthouse scores.)

⸻

8) Troubleshooting
	•	Form submits but no emails in audience
	•	Check u and id values.
	•	Confirm audience requires double opt-in (user must click email confirmation).
	•	CSP errors in console
	•	Make sure you didn’t add external resources without updating CSP.
	•	Lighthouse flags CLS
	•	Ensure your images keep the provided width and height attributes.
	•	Cookie banner doesn’t show
	•	Clear localStorage (consent_v1) or open in a new browser/session.

⸻

9) License & Attribution (optional)
	•	Add a LICENSE if you want to open-source or define usage rights.
	•	Keep attribution in README if you plan to distribute the template.
# app-landing-master
