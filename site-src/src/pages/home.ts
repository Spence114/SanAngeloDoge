import { SITE } from "../config.ts";
import { GOVERNMENTS } from "../content/nav.ts";
import { ICON } from "../render/components.ts";
import { debtJump } from "../render/guide.ts";
import { anchorLink, type Ctx, href, type Route, rich } from "../render/html.ts";
import { GI, type IconName } from "../render/icons.ts";
import { tiles } from "../render/tiles.ts";

interface Step {
  icon: IconName;
  tone: string;
  big: string;
  text: string;
  route: Route;
  label: string;
}

const STEPS: Step[] = [
  {
    icon: "debt",
    tone: "saisd",
    big: "Our local debt more than doubled in one year.",
    text: "From $338 million to $763 million, mostly new school bonds. It will take until 2055 to pay off. {{c:brb-san-angelo,brb-tgc,brb-saisd,our-analysis}}",
    route: "debt",
    label: "See the debt",
  },
  {
    icon: "taxes",
    tone: "county",
    big: "Tax rates held or went down. Tax collections still went up.",
    text: "When property values rise, a lower rate can still bring in more money. The City and County both collect more this year. {{c:city-budget-fy2027,county-budget-fy2027}}",
    route: "taxes",
    label: "See how that works",
  },
  {
    icon: "server",
    tone: "city",
    big: "Three data centers want to build here.",
    text: "One would run on its own gas power plant with 240 engines, about ten miles from town. {{c:westline-modeling-protocol}}",
    route: "data-centers",
    label: "See the three projects",
  },
  {
    icon: "camera",
    tone: "ink",
    big: "Police now use cameras that read license plates.",
    text: "Council approved them 7 to 0 in October 2025. We think the City should own the system and keep the data here. {{c:cc-minutes-2025-10-07}}",
    route: "privacy",
    label: "See the facts and our view",
  },
];

export function homePage(ctx: Ctx): string {
  const steps = STEPS.map(
    (s, i) => `<li class="step tone-${s.tone}">
      <span class="step-n mono">${i + 1}</span>
      <div class="step-b">
        <span class="step-ic">${GI[s.icon]}</span>
        <h3>${s.big}</h3>
        <p>${rich(ctx, s.text)}</p>
        <a class="btn" href="${href(ctx, s.route)}">${s.label} ${ICON.arrow}</a>
      </div>
    </li>`,
  ).join("");

  return `<section class="hero home-hero">
  <div class="wrap hero-in">
    <div class="hero-copy">
      <p class="eyebrow">Independent. Paid for by citizens. San Angelo, Texas.</p>
      <h1>Local Government Transparency</h1>
      <p class="lede">Where San Angelo's public money goes, in plain words. Every number links to its source.</p>
      <div class="hero-acts">${anchorLink(ctx, "home", "start", `Start here ${ICON.arrow}`, "btn btn-lg")}</div>
      <p class="hero-meta">Updated ${SITE.updated}. Pink marks figures not yet verified.</p>
    </div>
    <div class="hero-chart">
      <p class="tc-kick">The biggest change this year</p>
      <p class="hc-head">Our local debt more than doubled in one year.</p>
      ${debtJump(ctx)}
      <a class="key-go" href="${href(ctx, "debt")}">Why it jumped ${ICON.arrow}</a>
    </div>
  </div>
</section>

<section class="start-path" id="start" aria-labelledby="start-h">
  <div class="wrap">
    <p class="keys-label">Start here</p>
    <h2 id="start-h" class="sp-h">Four things every San Angelo resident should know</h2>
    <ol class="steps">${steps}</ol>
  </div>
</section>

<section class="sec band" aria-labelledby="govs-h"><div class="wrap sec-in">
  <div class="sec-h"><div class="sec-t"><h2 id="govs-h">Look up a local government</h2><p>One page each, with its key numbers and what is missing from its records.</p></div></div>
  ${tiles(ctx, GOVERNMENTS.items, "t5")}
</div></section>

<section class="sec" aria-label="Get involved"><div class="wrap sec-in">
  <div class="two-cta">
    <a class="cta-card2" href="${href(ctx, "alerts")}"><span class="c2-ic">${GI.alert}</span><span><b>Get zoning alerts</b><span>Know about a zoning change near you before the vote.</span></span>${ICON.arrow}</a>
    <a class="cta-card2 give" href="${href(ctx, "proposal")}"><span class="c2-ic">${GI.heart}</span><span><b>Support Transparency</b><span>Help pay to build the live dashboard. Any amount helps.</span></span>${ICON.arrow}</a>
  </div>
</div></section>`;
}
