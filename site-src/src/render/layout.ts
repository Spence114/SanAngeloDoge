import { SITE } from "../config.ts";
import { MENU_GROUPS, MENU_LINKS, type NavGroup, type NavItem } from "../content/nav.ts";
import { ICON, mark } from "./components.ts";
import { anchorLink, type Ctx, href } from "./html.ts";
import { GI } from "./icons.ts";

const itemHref = (ctx: Ctx, n: NavItem, cls: string, inner: string) =>
  n.anchor ? anchorLink(ctx, n.route, n.anchor, inner, cls) : `<a class="${cls}" href="${href(ctx, n.route)}" data-nav="${n.route}">${inner}</a>`;

function panel(ctx: Ctx, g: NavGroup): string {
  const items = g.items
    .map((n) => itemHref(ctx, n, `mm-i${n.tone ? ` tone-${n.tone}` : ""}`, `<span class="mm-ic">${GI[n.icon]}</span><span class="mm-t"><b>${n.label}</b><span>${n.desc}</span></span>`))
    .join("");
  const foot = g.foot ? `<a class="mm-foot" href="${href(ctx, g.foot.route)}" data-nav="${g.foot.route}">${g.foot.label} ${ICON.arrow}</a>` : "";
  return `<div class="mm" id="mm-${g.key}" hidden><div class="mm-in n${g.items.length}">${items}</div>${foot}</div>`;
}

function desktopNav(ctx: Ctx): string {
  const groups = MENU_GROUPS.map((g) => {
    const on = g.covers.includes(ctx.route);
    return `<div class="dd" data-dd>
      <button type="button" class="nl dd-b" aria-expanded="false" aria-controls="mm-${g.key}" data-group="${g.covers.join(" ")}"${on ? ' aria-current="page"' : ""}>${g.label}<svg class="dd-c" width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      ${panel(ctx, g)}
    </div>`;
  }).join("");
  const links = MENU_LINKS.map((n) => `<a class="nl" href="${href(ctx, n.route)}" data-nav="${n.route}"${ctx.route === n.route ? ' aria-current="page"' : ""}>${n.label}</a>`).join("");
  return `<nav class="nav" aria-label="Main">${groups}${links}</nav>`;
}

function mobileNav(ctx: Ctx): string {
  const groups = MENU_GROUPS.map(
    (g) => `<div class="mg"><p class="mg-h">${g.label}</p>${g.items
      .map((n) => itemHref(ctx, n, `ml${n.tone ? ` tone-${n.tone}` : ""}`, `<span class="mm-ic">${GI[n.icon]}</span><span>${n.label}</span>`))
      .join("")}${g.foot ? `<a class="ml" href="${href(ctx, g.foot.route)}" data-nav="${g.foot.route}"><span class="mm-ic">${GI[g.foot.icon]}</span><span>${g.foot.label}</span></a>` : ""}</div>`,
  ).join("");
  const links = MENU_LINKS.length ? `<div class="mg"><p class="mg-h">More</p>${MENU_LINKS.map((n) => `<a class="ml" href="${href(ctx, n.route)}" data-nav="${n.route}"><span class="mm-ic">${GI[n.icon]}</span><span>${n.label}</span></a>`).join("")}</div>` : "";
  return `<nav aria-label="Main" class="mnav">${groups}${links}</nav>`;
}

export function header(ctx: Ctx): string {
  return `<a class="skip" href="#content">Skip to content</a>
<header class="top" id="top">
  <div class="wrap top-in">
    <a class="brand" href="${href(ctx, "home")}" data-nav="home" aria-label="San Angelo DOGE home">${mark(28)}<span>San Angelo DOGE</span></a>
    ${desktopNav(ctx)}
    <div class="top-r">
      <a class="btn btn-sm btn-give" href="${href(ctx, "proposal")}" data-nav="proposal">${ICON.heart} Support Transparency</a>
      <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu" aria-label="Open menu"><span class="i-open">${ICON.menu}</span><span class="i-close">${ICON.close}</span></button>
    </div>
  </div>
  <div class="menu" id="menu" hidden>
    <div class="wrap menu-in">
      ${mobileNav(ctx)}
      <a class="btn btn-block btn-give" href="${href(ctx, "proposal")}">${ICON.heart} Support Transparency</a>
    </div>
  </div>
</header>`;
}

export function footer(ctx: Ctx): string {
  const col = (g: NavGroup) => `<div><h3>${g.label}</h3>${g.items.map((n) => itemHref(ctx, n, "", n.label)).join("")}</div>`;
  return `<footer class="foot">
  <div class="wrap foot-in">
    <div class="foot-top">
      <div class="foot-brand">
        <a class="brand" href="${href(ctx, "home")}" data-nav="home">${mark(26)}<span>San Angelo DOGE</span></a>
        <p>Local government finances and issues for San Angelo and Tom Green County, from the public record. Independent journalism, paid for by citizens.</p>
        <a class="btn btn-sm btn-give" href="${href(ctx, "proposal")}">${ICON.heart} Support Transparency</a>
      </div>
      <nav class="foot-links" aria-label="Footer">
        ${MENU_GROUPS.map(col).join("")}
      </nav>
    </div>
    <div class="disc">
      <p><strong>This is a citizen-sponsored tool.</strong> It is independent and is not affiliated with, endorsed by, or operated by the City of San Angelo, Tom Green County, San Angelo ISD, the Tom Green County Appraisal District, or any other government entity, political party, or any organization using the name DOGE at the federal or state level.</p>
      <p>Figures come from public records: adopted budgets, audits, state debt reports, agendas, permit filings, and company filings. Anything in <span class="unv">pink</span> is not yet verified against a source document. Nothing here is legal, tax, or financial advice. Contact: <span class="sel">${SITE.contactEmail}</span></p>
    </div>
  </div>
</footer>`;
}
