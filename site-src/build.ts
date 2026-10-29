// Build script. Renders every page from the typed content and writes two outputs:
//   dist/preview/index.html  one self-contained file with hash routes, for the shareable preview
//   dist/site/               one folder per page with clean URLs, for sanangelodoge.com
// Run with: npm run build

import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { stripTypeScriptTypes } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { type BuildMode, FORMS, SITE } from "./src/config.ts";
import { aboutPage } from "./src/pages/about.ts";
import { dataCentersPage, projectPage } from "./src/pages/datacenters.ts";
import { financesPage } from "./src/pages/finances.ts";
import { alertsPage, tipsPage } from "./src/pages/forms.ts";
import { homePage } from "./src/pages/home.ts";
import { privacyPage } from "./src/pages/privacy.ts";
import { type Ctx, esc, type Route, ROUTES } from "./src/render/html.ts";
import { footer, header } from "./src/render/layout.ts";
import { proposalPage } from "./src/pages/proposal.ts";
import { reportsPage } from "./src/pages/reports.ts";
import { FAVICON_SVG, ICON, sourcesSection } from "./src/render/components.ts";
const ICON_ARROW = ICON.arrow;
import { Citations } from "./src/render/cite.ts";

const root = dirname(fileURLToPath(import.meta.url));

const PAGES: Record<Route, { title: string; desc: string; render: (ctx: Ctx) => string }> = {
  home: {
    title: "San Angelo DOGE",
    desc: "Independent, citizen-sponsored look at what the City of San Angelo, Tom Green County, and San Angelo ISD owe, spend, and plan to build.",
    render: homePage,
  },
  finances: {
    title: "Finances",
    desc: "Debt, budgets, and property tax rates for the City of San Angelo, Tom Green County, and San Angelo ISD, from their own reports.",
    render: financesPage,
  },
  "data-centers": {
    title: "Data centers",
    desc: "A guide to the three data center campuses proposed around San Angelo: what they are, when they help, who decides, and where each stands.",
    render: dataCentersPage,
  },
  skybox: { title: "Skybox / Emergent", desc: "The data center campus proposed on city-owned land in San Angelo.", render: (c) => projectPage(c, "skybox") },
  cipher: { title: "Cipher data center", desc: "The 1-gigawatt data center Cipher Digital proposes on county land near the Red Creek substation.", render: (c) => projectPage(c, "cipher") },
  beacon: { title: "Beacon data center", desc: "The Beacon data center and gas power plant proposed near Dove Creek.", render: (c) => projectPage(c, "beacon") },
  privacy: {
    title: "Flock cameras",
    desc: "What San Angelo bought from Flock in 2025, how plate cameras and police drones work, and our proposed Technology Bill of Rights.",
    render: privacyPage,
  },
  reports: {
    title: "Reports",
    desc: "Reports and analysis from San Angelo DOGE, ready to read and download.",
    render: reportsPage,
  },
  proposal: {
    title: "The dashboard proposal",
    desc: "The proposed San Angelo public finance dashboard: what it would do, how it would work, the rollout, and what it takes to build.",
    render: proposalPage,
  },
  about: { title: "About", desc: "Who runs San Angelo DOGE, what we're building, how to sponsor it, and how we work.", render: aboutPage },
  alerts: { title: "Get alerts", desc: "Sign up for the monthly bulletin and free zoning alerts within 250 feet of your address.", render: alertsPage },
  tips: { title: "Tip line", desc: "Report waste, wrongdoing, or an error in our data.", render: tipsPage },
};

/** Render a page body followed by its numbered Sources list. */
function renderWithSources(ctx: Ctx): string {
  const body = PAGES[ctx.route].render(ctx);
  return `${body}\n${sourcesSection(ctx, SITE.checked)}`;
}

const pageTitle = (r: Route) => (r === "home" ? "San Angelo DOGE" : `${PAGES[r].title} | San Angelo DOGE`);

const css = readFileSync(join(root, "src/styles.css"), "utf8");
const clientTs = readFileSync(join(root, "src/client.ts"), "utf8");
const clientJs = stripTypeScriptTypes(clientTs, { mode: "strip" }).replace(/^\s*export\s*\{\s*\};?\s*$/m, "");

const FAVICON = `<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,${encodeURIComponent(FAVICON_SVG)}">`;

const FONTS =
  '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Public+Sans:wght@400;500;600&display=swap">';

function script(mode: BuildMode): string {
  const cfg = { mode, forms: FORMS, contact: SITE.contactEmail };
  return `<script>window.SITE_CONFIG=${JSON.stringify(cfg)};</script>\n<script>${clientJs}</script>`;
}

/** Single file for the shareable preview. The artifact host supplies doctype, head, and body. */
function buildPreview(): string {
  const views = ROUTES.map((r) => {
    const ctx: Ctx = { mode: "artifact", route: r, cites: new Citations(r, "artifact") };
    return `<main class="view" data-route="${r}" data-title="${esc(pageTitle(r))}" tabindex="-1"${r === "home" ? "" : " hidden"}>\n${renderWithSources(ctx)}\n</main>`;
  }).join("\n");
  const ctx: Ctx = { mode: "artifact", route: "home", cites: new Citations("chrome", "artifact") };
  return `<title>SanAngeloDOGE.com</title>
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="description" content="${esc(PAGES.home.desc)}">
${FAVICON}
${FONTS}
<style>${css}</style>
${header(ctx)}
<div id="content">
${views}
</div>
${footer(ctx)}
${script("artifact")}
`;
}

const pagePath = (r: Route) => (r === "home" ? "/" : `/${r}/`);

function buildSitePage(r: Route): string {
  const ctx: Ctx = { mode: "site", route: r, cites: new Citations(r, "site") };
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(pageTitle(r))}</title>
<meta name="description" content="${esc(PAGES[r].desc)}">
<link rel="canonical" href="${SITE.origin}${pagePath(r)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="San Angelo DOGE">
<meta property="og:title" content="${esc(pageTitle(r))}">
<meta property="og:description" content="${esc(PAGES[r].desc)}">
<meta property="og:url" content="${SITE.origin}${pagePath(r)}">
<meta name="theme-color" content="#F1EFEB">
${FAVICON}
${FONTS}
<link rel="stylesheet" href="/assets/site.css">
</head>
<body>
${header(ctx)}
<main id="content" tabindex="-1">
${renderWithSources(ctx)}
</main>
${footer(ctx)}
<script>window.SITE_CONFIG=${JSON.stringify({ mode: "site", forms: FORMS, contact: SITE.contactEmail })};</script>
<script src="/assets/site.js" defer></script>
</body>
</html>
`;
}

function write(path: string, text: string) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, text);
}

/** House style: no em or en dashes in published copy. */
function checkCopy(label: string, html: string) {
  const text = html.replace(/<style>[\s\S]*?<\/style>/g, "").replace(/<script[\s\S]*?<\/script>/g, "");
  const bad = text.match(/[–—]/g);
  if (bad) throw new Error(`${label}: found ${bad.length} em or en dash(es) in copy`);
}

/** Not-found page for the static host. */
function build404(): string {
  const ctx: Ctx = { mode: "site", route: "home", cites: new Citations("404", "site") };
  const links = (["finances", "data-centers", "privacy", "reports", "proposal", "about"] as Route[])
    .map((r) => `<a class="srow" href="${pagePath(r)}"><span class="sk">${PAGES[r].title}</span><span class="sv">${esc(PAGES[r].desc)}</span>${ICON_ARROW}</a>`)
    .join("");
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Page not found | San Angelo DOGE</title>
<meta name="robots" content="noindex">
<meta name="theme-color" content="#F1EFEB">
${FAVICON}
${FONTS}
<link rel="stylesheet" href="/assets/site.css">
</head>
<body>
${header(ctx)}
<main id="content" tabindex="-1">
<header class="phead wrap"><p class="eyebrow">404</p><h1>That page is not here</h1><p class="lede">The page may have moved when the site was rebuilt in October 2026. Older reports are on the Reports page.</p></header>
<section class="sec"><div class="wrap sec-in"><div class="start-list">${links}</div></div></section>
</main>
${footer(ctx)}
<script>window.SITE_CONFIG=${JSON.stringify({ mode: "site", forms: FORMS, contact: SITE.contactEmail })};</script>
<script src="/assets/site.js" defer></script>
</body>
</html>
`;
}

/** Apache rules for SiteGround: index files, 404 page, moved and retired URLs. */
const HTACCESS = `# San Angelo DOGE static site (Apache on SiteGround). Generated by build.ts.
DirectoryIndex index.html
ErrorDocument 404 /404.html
Options -Indexes

<IfModule mod_rewrite.c>
RewriteEngine On
RewriteBase /

# Reports moved from the old uploads folder
RewriteRule ^wp-content/uploads/2026/08/Westline_2335_Community_Brochure\\.pdf$ /reports/beacon-air-permit-briefing.pdf [R=301,L]
RewriteRule ^wp-content/uploads/2026/08/beacon-sound-modeling\\.pdf$ /reports/beacon-noise-screening.pdf [R=301,L]
RewriteRule ^wp-content/uploads/2026/06/Due_Diligence_Data_Centers-June-16th\\.pdf$ /reports/data-center-due-diligence.pdf [R=301,L]
RewriteRule ^wp-content/uploads/2026/06/OPEN-LETTER-ON-SAN-ANGELO-SCHOOL-BOND-2025\\.pdf$ /reports/saisd-bond-open-letter.pdf [R=301,L]

# Retired pages and files
RewriteRule ^gold-currency-prereading/?$ - [G,L]
RewriteRule ^the-texas-gold-currency-master-plan/?$ - [G,L]
RewriteRule ^wp-content/uploads/2026/08/Texas_Gold_Currency_Master_Plan_Final_Draft-2\\.pdf$ - [G,L]
RewriteRule ^wp-content/uploads/2026/08/The-Great-Bank-Robbery-6-Page-Guide\\.pdf$ - [G,L]
</IfModule>
`;

const preview = buildPreview();
checkCopy("preview", preview);
write(join(root, "dist/preview/index.html"), preview);

rmSync(join(root, "dist/site"), { recursive: true, force: true });
for (const r of ROUTES) {
  const html = buildSitePage(r);
  checkCopy(r, html);
  write(join(root, "dist/site", r === "home" ? "index.html" : `${r}/index.html`), html);
}
write(join(root, "dist/site/assets/site.css"), css);
write(join(root, "dist/site/assets/site.js"), clientJs);
const notFound = build404();
checkCopy("404", notFound);
write(join(root, "dist/site/404.html"), notFound);
write(join(root, "dist/site/.htaccess"), HTACCESS);
write(join(root, "dist/site/robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${SITE.origin}/sitemap.xml\n`);
write(
  join(root, "dist/site/sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${ROUTES.map((r) => `  <url><loc>${SITE.origin}${pagePath(r)}</loc></url>`).join("\n")}\n</urlset>\n`,
);

console.log(`Built preview (${(preview.length / 1024).toFixed(0)} KB) and ${ROUTES.length} site pages.`);
