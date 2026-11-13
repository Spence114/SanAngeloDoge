import { SITE } from "../config.ts";
import { DEBT } from "../content/finances.ts";
import { byId } from "../content/reports.ts";
import { ICON, keyPoints } from "../render/components.ts";
import { GI } from "../render/icons.ts";
import { GOVERNMENTS } from "../content/nav.ts";
import { tiles } from "../render/tiles.ts";
import { debtTotalChart, debtTotals } from "../render/totalchart.ts";
import { reportsFor } from "./reports.ts";
import { anchorLink, cite, type Ctx, href, usdM } from "../render/html.ts";

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
  <figcaption>Screens from the dashboard prototype, in development. Some figures are samples.</figcaption>
</figure>`;
}

const TONE: Record<string, string> = { "City of San Angelo": "city", "Tom Green County": "county", "San Angelo ISD": "saisd" };

export function homePage(ctx: Ctx): string {
  const t = debtTotals();
  const last = t[t.length - 1];
  const prev = t[t.length - 2];
  const more = (r: Parameters<typeof href>[1], label: string) => `<a class="key-go" href="${href(ctx, r)}">${label} ${ICON.arrow}</a>`;

  return `<section class="hero">
  <div class="wrap hero-in">
    <div class="hero-copy">
      <p class="eyebrow">Independent. Citizen-supported. San Angelo, Texas.</p>
      <h1>Local Government Transparency</h1>
      <p class="lede">What the City, Tom Green County, and San Angelo ISD owe, spend, and decide. In plain words. Every number links to its source.</p>
      <div class="hero-acts">
        <a class="btn btn-ghost btn-lg" href="${href(ctx, "finances")}">See the money ${ICON.arrow}</a>
        <a class="btn btn-give btn-lg" href="${href(ctx, "proposal")}">${ICON.heart} Support Transparency</a>
      </div>
      <p class="hero-meta">Updated ${SITE.updated}. Pink marks figures not yet verified.</p>
    </div>
    <div class="hero-chart">${debtTotalChart(ctx, { compact: true })}</div>
  </div>
</section>


<section class="explore" aria-labelledby="explore-h">
  <div class="wrap">
    <h2 id="explore-h" class="explore-h">Find what you need</h2>
    <div class="ex-grid">
      ${[
        { r: "debt", i: "debt", k: "Debt", v: "What is owed, and when it is paid off" },
        { r: "taxes", i: "taxes", k: "Taxes", v: "Rates, and why bills rise" },
        { r: "budgets", i: "budget", k: "Budgets", v: "What they plan to spend" },
        { r: "saisd", a: "students", i: "school", k: "Schools", v: "Spending per student and bonds" },
        { r: "data-centers", i: "server", k: "Data centers", v: "Three proposals, who decides" },
        { r: "privacy", i: "camera", k: "Flock cameras", v: "Plate cameras and drones" },
        { r: "questions", i: "question", k: "Open Questions", v: "What the record leaves out" },
        { r: "alerts", i: "alert", k: "Zoning alerts", v: "Know before they vote" },
      ]
        .map((x: { r: string; a?: string; i: string; k: string; v: string }) => {
          const inner = `<span class="ex-ic">${GI[x.i as keyof typeof GI]}</span><b>${x.k}</b><span>${x.v}</span>`;
          const r = x.r as Parameters<typeof href>[1];
          return x.a ? anchorLink(ctx, r, x.a, inner, "ex") : `<a class="ex" href="${href(ctx, r)}">${inner}</a>`;
        })
        .join("")}
    </div>
  </div>
</section>

${keyPoints(
  ctx,
  [
    {
      kicker: "Debt",
      big: `$${Math.round(last.total / 1e6)}M`,
      text: `Owed by our three local governments. A year earlier it was $${Math.round(prev.total / 1e6)} million.`,
      tone: "saisd",
      cite: ["brb-san-angelo", "brb-tgc", "brb-saisd", "our-analysis"],
      link: more("debt", "How the debt grew"),
    },
    {
      kicker: "Data centers",
      big: "3 proposed",
      text: "One would run on its own gas power plant: 240 engines, 2,409 megawatts, ten miles from town.",
      tone: "county",
      cite: ["westline-modeling-protocol"],
      link: more("data-centers", "What each one means"),
    },
    {
      kicker: "Flock cameras",
      big: "$309,050",
      text: "The contract limit for license plate cameras and police drones. Council approved it 7 to 0 in October 2025.",
      tone: "city",
      cite: ["cc-agenda-2025-10-07", "cc-minutes-2025-10-07"],
      link: more("privacy", "The facts and our view"),
    },
    {
      kicker: "Zoning notice",
      big: "200 feet",
      text: "How far the City must mail notice of a zoning change. We send alerts farther.",
      tone: "ink",
      cite: ["tx-lgc-211007"],
      link: more("alerts", "Get zoning alerts"),
    },
  ],
  "Four things to know",
)}

<section class="figs" aria-label="Debt by government">
  <div class="wrap">
    <h2 class="figs-h">Who owes what</h2>
    <div class="figs-in">
    ${DEBT.map(
      (d) => `<div class="fig tone-${TONE[d.gov] ?? "ink"}">
      <span class="fig-k"><i class="dot"></i>${d.gov}</span>
      <span class="fig-v mono">${usdM(d.principal, d.principal < 1e8 ? 2 : 1)}</span>
      <span class="fig-s">Owed as of ${d.asOf}.${cite(ctx, ...d.cite)}</span>
    </div>`,
    ).join("")}
    </div>
    <a class="figs-more" href="${href(ctx, "debt")}">See how it grew and what it pays for ${ICON.arrow}</a>
    <p class="sub-h gov-others">Each government's page</p>
    ${tiles(ctx, GOVERNMENTS.items, "t5")}
  </div>
</section>

<section class="become" aria-labelledby="become-h">
  <div class="wrap become-in">
    <div class="become-copy">
      <p class="eyebrow">What this site will become</p>
      <h2 id="become-h">One screen for San Angelo's public money</h2>
      <p class="become-lede">Today the site has checked figures and reports. Next comes a live dashboard, built from the public record and updated on a schedule.</p>
      <ul class="become-list">
        <li><b>A debt clock.</b> What is owed, and what the interest costs each day.</li>
        <li><b>Budgets and votes.</b> Where the money goes and who voted for it.</li>
        <li><b>Alerts.</b> Hear about a decision before it is made.</li>
      </ul>
      <div class="hero-acts">
        <a class="btn btn-give btn-lg" href="${href(ctx, "proposal")}">${ICON.heart} Support Transparency</a>
        ${anchorLink(ctx, "proposal", "tour", "Tour the prototype", "btn btn-ghost btn-lg")}
      </div>
      <p class="fine">Paid for by citizens. Supporters have no say over coverage.</p>
    </div>
    ${appShots(ctx)}
  </div>
</section>

${reportsFor(ctx, byId("beacon-darby-letter", "goodfellow", "westline-brief"), "Latest reports")}

<section class="signup" aria-labelledby="signup-h">
  <div class="wrap signup-in">
    <h2 id="signup-h">Know before they vote</h2>
    <p>Get an email when a zoning change is proposed near your home. <a href="${href(ctx, "alerts")}">Choose your distance</a></p>
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
