import { SITE } from "../config.ts";
import { DEBT } from "../content/finances.ts";
import { byId } from "../content/reports.ts";
import { ICON } from "../render/components.ts";
import { reportsFor } from "./reports.ts";
import { cite, type Ctx, href, usdM } from "../render/html.ts";

/** A wireframe of the proposed dashboard. Drawn as a plan, with numbered callouts, so it reads as proposed, not built. */
function blueprint(ctx: Ctx): string {
  const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    .map((i) => {
      const x = 96 + i * 14 + Math.floor(i / 3) * 8;
      return `<rect class="bp-dash" x="${x}" y="88" width="11" height="20" rx="2"/>`;
    })
    .join("");
  const votes = [0, 1, 2, 3, 4, 5, 6]
    .map((i) => `<circle class="${i < 5 ? "bp-fill" : "bp-line"}" cx="${102 + i * 18}" cy="184" r="5.5"/>`)
    .join("");
  const call = (n: number, x: number, y: number) =>
    `<g class="bp-call"><circle cx="${x}" cy="${y}" r="10"/><text x="${x}" y="${y + 3.8}" text-anchor="middle">${n}</text></g>`;

  return `<a class="plan" href="${href(ctx, "proposal")}" aria-label="See the dashboard proposal">
  <div class="plan-top"><span>Proposed dashboard</span><span class="st st-open">In development</span></div>
  <svg class="plan-svg" viewBox="0 0 480 320" role="img" aria-label="Wireframe of the proposed dashboard: a debt clock, a money in and money out chart, recorded votes, and a zoning alert map.">
    <defs><pattern id="bp-grid" width="16" height="16" patternUnits="userSpaceOnUse"><path d="M16 0H0V16" fill="none" class="bp-grid"/></pattern></defs>
    <rect x="0" y="0" width="480" height="320" fill="url(#bp-grid)"/>
    <rect class="bp-line" x="16" y="16" width="448" height="288" rx="10"/>
    <path class="bp-line" d="M16 40H464M64 40V304"/>
    <circle class="bp-line" cx="30" cy="28" r="3"/><circle class="bp-line" cx="41" cy="28" r="3"/><circle class="bp-line" cx="52" cy="28" r="3"/>
    <rect class="bp-line" x="32" y="58" width="16" height="16" rx="4"/><rect class="bp-line" x="32" y="84" width="16" height="16" rx="4"/><rect class="bp-line" x="32" y="110" width="16" height="16" rx="4"/><rect class="bp-line" x="32" y="136" width="16" height="16" rx="4"/>

    <rect class="bp-mod" x="82" y="56" width="182" height="82" rx="6"/>
    ${digits}
    <path class="bp-line" d="M96 122H210"/>

    <rect class="bp-mod" x="278" y="56" width="172" height="150" rx="6"/>
    <rect class="bp-line" x="294" y="88" width="8" height="40" rx="1"/><rect class="bp-line" x="294" y="134" width="8" height="28" rx="1"/>
    <rect class="bp-line" x="426" y="86" width="8" height="24" rx="1"/><rect class="bp-line" x="426" y="116" width="8" height="30" rx="1"/><rect class="bp-line" x="426" y="152" width="8" height="24" rx="1"/>
    <path class="bp-band" d="M302 88C364 88 364 86 426 86V110C364 110 364 108 302 108Z"/>
    <path class="bp-band" d="M302 108C364 108 364 116 426 116V136C364 136 364 128 302 128Z"/>
    <path class="bp-band" d="M302 134C364 134 364 152 426 152V176C364 176 364 162 302 162Z"/>

    <rect class="bp-mod" x="82" y="152" width="182" height="54" rx="6"/>
    ${votes}

    <rect class="bp-mod" x="82" y="220" width="368" height="70" rx="6"/>
    <path class="bp-street" d="M190 246H440M190 270H440M240 230V282M320 230V282M400 230V282"/>
    <circle class="bp-ring" cx="320" cy="258" r="22"/>
    <circle class="bp-pin" cx="320" cy="258" r="4"/>
    <text class="bp-note" x="348" y="238">250 ft</text>

    ${call(1, 82, 56)}${call(2, 278, 56)}${call(3, 82, 152)}${call(4, 82, 220)}
  </svg>
  <ol class="plan-key">
    <li><b>1</b>Debt clock</li><li><b>2</b>Money in, money out</li><li><b>3</b>Votes and meetings</li><li><b>4</b>Zoning alerts</li>
  </ol>
</a>`;
}

export function homePage(ctx: Ctx): string {
  return `<section class="hero">
  <div class="wrap hero-in">
    <div class="hero-copy">
      <p class="eyebrow">Independent and citizen-sponsored</p>
      <h1>San Angelo's public finances, in one place</h1>
      <p class="lede">Debt, budgets, votes, and major projects for the City, Tom Green County, and San Angelo ISD, each tied to its public record.</p>
      <div class="hero-acts">
        <a class="btn btn-lg" href="${href(ctx, "proposal")}">See the proposal ${ICON.arrow}</a>
        <a class="btn btn-ghost btn-lg" href="${href(ctx, "alerts")}">Get free alerts</a>
      </div>
      <p class="hero-meta">Updated ${SITE.updated}. Pink marks figures not yet verified.</p>
    </div>
    ${blueprint(ctx)}
  </div>
</section>

<section class="figs" aria-label="Debt by government">
  <div class="wrap figs-in">
    ${DEBT.map(
      (d) => `<div class="fig">
      <span class="fig-k">${d.gov}</span>
      <span class="fig-v mono">${usdM(d.principal, d.principal < 1e8 ? 2 : 1)}</span>
      <span class="fig-s">Debt owed as of ${d.asOf}. ${d.source}.${cite(ctx, ...d.cite)}</span>
    </div>`,
    ).join("")}
    <a class="figs-more" href="${href(ctx, "finances")}">Debt, budgets, and tax rates ${ICON.arrow}</a>
  </div>
</section>

${reportsFor(ctx, byId("westline-brief", "beacon-noise", "due-diligence"), "Latest reports")}

<section class="start" aria-labelledby="start-h">
  <div class="wrap start-in">
    <h2 id="start-h">Start here</h2>
    <div class="start-list">
      <a class="srow" href="${href(ctx, "finances")}"><span class="sk">Finances</span><span class="sv">What the City, the County, and the school district owe, spend, and tax.</span>${ICON.arrow}</a>
      <a class="srow" href="${href(ctx, "data-centers")}"><span class="sk">Data centers</span><span class="sv">Three proposed campuses, what each would mean for us, and who decides.</span>${ICON.arrow}</a>
      <a class="srow" href="${href(ctx, "privacy")}"><span class="sk">Flock cameras</span><span class="sv">What the police bought in 2025, the constitutional questions, and our proposed Technology Bill of Rights.</span>${ICON.arrow}</a>
      <a class="srow" href="${href(ctx, "proposal")}"><span class="sk">The dashboard proposal</span><span class="sv">What we plan to build, what it takes, and how to sponsor it.</span>${ICON.arrow}</a>
    </div>
  </div>
</section>

<section class="signup" aria-labelledby="signup-h">
  <div class="wrap signup-in">
    <h2 id="signup-h">Free zoning alerts within 250 feet of your home</h2>
    <p>Plus a short monthly bulletin of what changed, with a link to each source.</p>
    <form class="signup-form" data-form="subscribe" novalidate>
      <input type="hidden" name="topics" value="Zoning near my address; Monthly bulletin">
      <div class="hp" aria-hidden="true"><label for="home-hp">Leave this empty</label><input id="home-hp" type="text" name="_gotcha" tabindex="-1" autocomplete="off"></div>
      <label class="sr" for="home-address">Home address in San Angelo</label>
      <input id="home-address" name="address" type="text" placeholder="Home address" autocomplete="street-address">
      <label class="sr" for="home-email">Email address</label>
      <input id="home-email" name="email" type="email" placeholder="Email" autocomplete="email" required>
      <button class="btn" type="submit">Sign up</button>
    </form>
    <p class="fine">We use your address only to match zoning cases near it. We never sell or share your information.</p>
  </div>
</section>`;
}
