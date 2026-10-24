# CMS publishing and blog URL workflow

Marketing can publish EV articles from the existing WordPress CMS. The
frontend build imports published WordPress posts, generates their article
content and metadata, adds each /blog/<slug> route to the sitemap, and
pre-renders the route for crawlers.

## Required deployment configuration

Set these variables in the Vercel project for the production environment:

~~~text
WORDPRESS_API_URL=https://cms.spiderenergy.in/wp-json/wp/v2
WORDPRESS_CMS_ENABLED=true
WORDPRESS_CMS_REQUIRED=true
~~~

WORDPRESS_CMS_REQUIRED=true prevents a CMS outage from silently publishing
an old local copy of the blog. The build also excludes posts whose title,
slug, category or tags contain the configured storage/BESS terms. Marketing
should continue publishing EV-only posts as agreed.

WORDPRESS_BLOG_CATEGORY_SLUG is optional. Leave it unset when the CMS team
already guarantees that the account is used only for EV posts. If a dedicated
WordPress category is later introduced, set this variable to its exact slug
in both the Vercel project and the CMS publishing documentation.

## Make a new post URL live automatically

Create a Vercel production Deploy Hook for the main branch:

1. In Vercel, open the project settings and create a Deploy Hook targeting
   main and the Production environment.
2. In WordPress, configure the existing webhook integration to call that hook
   when a post transitions to publish (not on autosave).
3. Publish a test EV post and confirm that the resulting deployment contains
   /blog/<slug>.

The deploy hook URL is a secret and must stay in the CMS webhook configuration;
do not commit it to this repository. After the deployment completes, the
published post is available from the generic /blog/:slug route, appears on
the blog listing, and is included in sitemap.xml.

The live /news-sitemap.xml endpoint queries WordPress on every request and
only emits posts published within the previous 48 hours. It is already
advertised from robots.txt.

## Access needed

- Marketing: WordPress Editor/Author access to create and publish EV posts.
- Engineering or site admin: Vercel project access to create the Deploy Hook
  and set production environment variables.
- SEO owner: Google Search Console access to submit
  https://spiderenergy.in/news-sitemap.xml if it is not submitted already.

No separate blog database is required: WordPress remains the content database
and this site consumes it at build time.

## Link protection

The eight URLs from the audit now have permanent redirects to relevant live EV
pages. Existing article body prose was not edited; only stale internal href
targets were replaced. Every production build runs
scripts/validate-internal-links.mjs and fails if a same-origin page link does
not resolve to a generated route.
