import { SITE } from "../config.ts";
import { DEBT } from "../content/finances.ts";
import { byId } from "../content/reports.ts";
import { ICON } from "../render/components.ts";
import { reportsFor } from "./reports.ts";
import { cite, type Ctx, href, usdM } from "../render/html.ts";

/** Screens from the dashboard prototype on an iPad. Each screen scrolls slowly, then the next
 *  fades in. Labeled as a prototype so it does not read as a finished product. */
const SHOTS = [
  { file: "i-money.webp", tab: "Money in, money out", alt: "Dashboard prototype on an iPad: where the County general fund gets its money and what it pays for." },
  { file: "i-priorities.webp", tab: "Priorities", alt: "Dashboard prototype on an iPad: local money matters ranked by size, cost per home, and deadline." },
  { file: "i-issues.webp", tab: "Issue tracker", alt: "Dashboard prototype on an iPad: public issues tracked from monitoring to follow-up." },
];

function appShots(ctx: Ctx): string {
  const base = ctx.mode === "artifact" ? `${SITE.origin}/assets/hero/` : "/assets/hero/";
  return `<figure class="ipad" data-shots>
  <div class="ipad-body">
    <div class="ipad-screen">
      ${SHOTS.map((x, i) => `<img${i === 0 ? ' class="on"' : ""} src="${base}${x.file}" alt="${x.alt}" width="1500" height="1780" decoding="async"${i === 0 ? "" : ' loading="lazy"'}>`).join("\n      ")}
    </div>
  </div>
  <div class="ipad-foot">
    <span class="st st-open">Prototype</span>
    <span class="ipad-label" data-shot-label aria-live="polite">${SHOTS[0].tab}</span>
    <span class="ipad-dots" role="tablist" aria-label="Dashboard screens">${SHOTS.map(
      (x, i) => `<button type="button" role="tab" aria-selected="${i === 0}" aria-label="${x.tab}" data-shot="${i}" data-label="${x.tab}"><i></i></button>`,
    ).join("")}</span>
  </div>
  <figcaption>Screens from the dashboard prototype, in development. Some figures are samples. <a href="${href(ctx, "proposal")}">See the proposal</a></figcaption>
</figure>`;
}

export function homePage(ctx: Ctx): string {
  return `<section class="hero">
  <div class="wrap hero-in">
    <div class="hero-copy">
      <p class="eyebrow">Independent and citizen-sponsored</p>
      <h1>Analyzing and reporting on our local government</h1>
      <p class="lede">San Angelo DOGE puts the city's critical data on screen: what the City, Tom Green County, and San Angelo ISD owe, spend, and decide. Modern AI tools let us turn the public record into quick reports that help citizens and officials with their research and move San Angelo toward its goals.</p>
      <div class="hero-acts">
        <a class="btn btn-lg" href="${href(ctx, "proposal")}">See the proposal ${ICON.arrow}</a>
        <a class="btn btn-ghost btn-lg" href="${href(ctx, "alerts")}">Get zoning alerts</a>
      </div>
      <p class="hero-meta">Updated ${SITE.updated}. Pink marks figures not yet verified.</p>
    </div>
    ${appShots(ctx)}
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
    <h2 id="signup-h">Know before they vote</h2>
    <p>Get an email when a zoning change is proposed near your home: within 250 feet, 1,000 feet, or anywhere in the city. <a href="${href(ctx, "alerts")}">Choose your distance</a></p>
    <form class="signup-form" data-form="subscribe" novalidate>
      <input type="hidden" name="distance" value="250 feet">
      <div class="hp" aria-hidden="true"><label for="home-hp">Leave this empty</label><input id="home-hp" type="text" name="_gotcha" tabindex="-1" autocomplete="off"></div>
      <label class="sr" for="home-address">Home address in San Angelo</label>
      <input id="home-address" name="address" type="text" placeholder="Home address" autocomplete="street-address">
      <label class="sr" for="home-email">Email address</label>
      <input id="home-email" name="email" type="email" placeholder="Email" autocomplete="email" required>
      <button class="btn" type="submit">Sign up</button>
    </form>
    <p class="fine">We use your address only to measure zoning cases against it. We never sell or share your information.</p>
  </div>
</section>`;
}
