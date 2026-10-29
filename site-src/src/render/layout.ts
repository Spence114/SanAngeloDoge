import { SITE } from "../config.ts";
import { ICON, mark } from "./components.ts";
import { anchorLink, type Ctx, href, type Route } from "./html.ts";

const NAV: Array<{ route: Route; label: string; also?: Route[] }> = [
  { route: "finances", label: "Finances" },
  { route: "data-centers", label: "Data centers", also: ["skybox", "cipher", "beacon"] },
  { route: "privacy", label: "Flock cameras" },
  { route: "reports", label: "Reports" },
  { route: "about", label: "About" },
];

function navLinks(ctx: Ctx, cls: string): string {
  return NAV.map((n) => {
    const on = ctx.route === n.route || (n.also ?? []).includes(ctx.route);
    return `<a class="${cls}" href="${href(ctx, n.route)}" data-nav="${n.route}"${on ? ' aria-current="page"' : ""}>${n.label}</a>`;
  }).join("");
}

export function header(ctx: Ctx): string {
  return `<a class="skip" href="#content">Skip to content</a>
<header class="top" id="top">
  <div class="wrap top-in">
    <a class="brand" href="${href(ctx, "home")}" data-nav="home" aria-label="San Angelo DOGE home">${mark(28)}<span>San Angelo DOGE</span></a>
    <nav class="nav" aria-label="Main">${navLinks(ctx, "nl")}</nav>
    <div class="top-r">
      <a class="alerts-link" href="${href(ctx, "alerts")}" data-nav="alerts">Get alerts</a>
      <a class="btn btn-sm" href="${href(ctx, "proposal")}" data-nav="proposal">See the proposal</a>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Open menu"><span class="i-open">${ICON.menu}</span><span class="i-close">${ICON.close}</span></button>
    </div>
  </div>
  <div class="menu" id="menu" hidden>
    <div class="wrap menu-in">
      <nav aria-label="Main">${navLinks(ctx, "ml")}<a class="ml" href="${href(ctx, "alerts")}" data-nav="alerts">Get alerts</a><a class="ml" href="${href(ctx, "tips")}" data-nav="tips">Tip line</a></nav>
      <a class="btn btn-block" href="${href(ctx, "proposal")}">See the proposal ${ICON.arrow}</a>
    </div>
  </div>
</header>`;
}

export function footer(ctx: Ctx): string {
  return `<footer class="foot">
  <div class="wrap foot-in">
    <div class="foot-top">
      <div class="foot-brand">
        <a class="brand" href="${href(ctx, "home")}" data-nav="home">${mark(26)}<span>San Angelo DOGE</span></a>
        <p>Local government finances for San Angelo and Tom Green County, from the public record.</p>
      </div>
      <nav class="foot-links" aria-label="Footer">
        <div><h3>Read</h3><a href="${href(ctx, "finances")}">Finances</a><a href="${href(ctx, "data-centers")}">Data centers</a><a href="${href(ctx, "privacy")}">Flock cameras</a><a href="${href(ctx, "reports")}">Reports</a></div>
        <div><h3>Take part</h3><a href="${href(ctx, "alerts")}">Get alerts</a><a href="${href(ctx, "tips")}">Tip line</a>${anchorLink(ctx, "tips", "tip-form", "Report a data error")}</div>
        <div><h3>About</h3><a href="${href(ctx, "about")}">Who we are</a><a href="${href(ctx, "proposal")}">The proposal</a>${anchorLink(ctx, "proposal", "sponsor", "Sponsor the build")}${anchorLink(ctx, "about", "standards", "Sources and corrections")}${anchorLink(ctx, "about", "site-privacy", "Site privacy")}</div>
      </nav>
    </div>
    <div class="disc">
      <p><strong>This is a citizen-sponsored tool.</strong> It is independent and is not affiliated with, endorsed by, or operated by the City of San Angelo, Tom Green County, San Angelo ISD, the Tom Green County Appraisal District, or any other government entity, political party, or any organization using the name DOGE at the federal or state level.</p>
      <p>Figures come from public records: adopted budgets, audits, state debt reports, agendas, permit filings, and company filings. Anything in <span class="unv">pink</span> is not yet verified against a source document. Nothing here is legal, tax, or financial advice. Contact: <span class="sel">${SITE.contactEmail}</span></p>
    </div>
  </div>
</footer>`;
}
