import { SITE } from "../config.ts";
import { CITY_DEBT_NOTE, RATES } from "../content/finances.ts";
import { GOVERNMENTS, MONEY } from "../content/nav.ts";
import { byTopic } from "../content/reports.ts";
import { debtHistory, debtPurpose } from "../render/debtcharts.ts";
import { ICON, keyPoints, pageHead, section } from "../render/components.ts";
import { anchorLink, type Ctx, href, rich } from "../render/html.ts";
import { tiles } from "../render/tiles.ts";
import { debtTotalChart } from "../render/totalchart.ts";
import { finParts } from "./finances.ts";
import { bottomLine, debtJump, moreHead, nextStep } from "../render/guide.ts";
import { reportsFor } from "./reports.ts";

const cta = (ctx: Ctx, h: string, p: string) => `<section class="cta-band">
  <div class="wrap cta-in">
    <div><h2>${h}</h2><p>${p}</p></div>
    <a class="btn btn-give btn-lg" href="${href(ctx, "proposal")}">${ICON.heart} Support Transparency</a>
  </div>
</section>`;

const moneyNav = (ctx: Ctx, here: string) =>
  `<nav class="wrap subnav" aria-label="Money pages">${[{ route: "finances" as const, label: "Overview", anchor: undefined as string | undefined }, ...MONEY.items]
    .map((n) => (n.anchor ? anchorLink(ctx, n.route, n.anchor, n.label) : `<a href="${href(ctx, n.route)}"${n.route === here ? ' aria-current="page"' : ""}>${n.label}</a>`))
    .join("")}</nav>`;

/** Money overview: the headline chart, the short version, and a way into each part. */
export function financesPage(ctx: Ctx): string {
  return `<div class="pg-wide">${pageHead({
    eyebrow: "Money",
    title: "Where the money goes",
    lede: "What the City, Tom Green County, and San Angelo ISD owe, tax, and spend.",
    meta: [`Updated ${SITE.updated}`],
  })}
${bottomLine(ctx, "Together they owe $763 million, more than twice what they owed a year earlier. Pick a topic to see why. {{c:brb-san-angelo,brb-tgc,brb-saisd,our-analysis}}")}

<section class="sec"><div class="wrap sec-in"><div class="sec-h"><div class="sec-t"><h2>Pick a topic</h2></div></div>${tiles(ctx, MONEY.items)}</div></section>

<section class="sec band"><div class="wrap sec-in"><div class="sec-h"><div class="sec-t"><h2>Or pick a government</h2></div></div>${tiles(ctx, GOVERNMENTS.items, "t5")}</div></section>

${nextStep(ctx, { step: "Start here", title: "The debt", text: "How it more than doubled, what it pays for, and when it is paid off.", route: "debt", label: "See the debt" })}</div>`;
}

export function debtPage(ctx: Ctx): string {
  const { summary, debtTable, debtSide } = finParts(ctx);
  const notVoted = `<div class="callout"><b>Not all debt goes to a vote.</b> ${rich(
    ctx,
    "Bonds need an election. Certificates of obligation and tax notes do not: the City or County publishes a notice, and an election is required only if at least 5% of registered voters sign a petition. {{c:tx-lgc-271-049}} Since 2020 the City has issued certificates of obligation in 2020, 2022, 2023, and 2024, and tax notes in 2023, 2025, and 2026. <span class=\"unv\">We are matching each issue to the debt still owed, to show how much was voted on.</span> {{c:city-record-review}}",
  )}</div>`;
  return `<div class="pg-wide">${pageHead({
    eyebrow: "Money",
    title: "Debt",
    lede: "What our local governments borrowed, and when they pay it back.",
    meta: [`Updated ${SITE.updated}`],
  })}
${moneyNav(ctx, "debt")}


${keyPoints(ctx, [
  { kicker: "School district", big: "$385M", text: "New bonds sold in 2025. That is the jump.", tone: "saisd", cite: ["brb-saisd"] },
  { kicker: "Interest", big: "$535M", text: "Interest still to pay on all three governments' debt.", tone: "ink", cite: ["brb-san-angelo", "county-auditor-aug2026", "saisd-hb1378", "our-analysis"] },
  { kicker: "Paid off", big: "2055", text: "The last school bond payment, if nothing new is borrowed.", tone: "city", cite: ["brb-saisd"] },
], "The short version", "Our three local governments owe $763 million, more than double a year earlier. Most of the jump is the school district's 2025 bonds, which carry $424 million in interest and run until 2055. {{c:brb-san-angelo,brb-tgc,brb-saisd,saisd-hb1378,our-analysis}}")}

<section class="lead-chart"><div class="wrap"><div class="fin-card">${debtJump(ctx)}</div></div></section>

${section({ id: "who", title: "By government", body: `<div class="fin-grid one">${debtSide}</div>` })}

${moreHead()}
${section({ id: "history", fold: true, title: "Twenty years of debt", note: "How each government's debt grew since 2005, and the payoff schedule.", body: `<div class="fin-card">${debtTotalChart(ctx)}</div><div class="fin-card">${debtHistory(ctx)}</div>` })}
${section({ id: "purpose", fold: true, title: "What the debt pays for", note: "Roads, water, buildings, schools, and refinanced older debt.", body: debtPurpose(ctx) })}
${section({ id: "vote", fold: true, title: "Debt that skips a vote", note: "Certificates of obligation and tax notes need no election.", body: notVoted })}
${section({ id: "table", fold: true, title: "The numbers in a table", note: "Owed, interest, this year's payment, and the last payment.", body: `${summary}${debtTable}<div class="fin-notes"><p class="note">${rich(ctx, CITY_DEBT_NOTE)}</p><p class="note">${rich(ctx, "The history chart uses the Texas Bond Review Board's figures as of each Aug 31. Its County payoff line predates the County's Sept 2025 refunding. {{c:brb-tgc,county-afr-2025}}")}</p></div>` })}

${nextStep(ctx, { step: "Up next", title: "Your taxes", text: "Why a lower tax rate can still mean a bigger bill.", route: "taxes", label: "Next: taxes" })}</div>`;
}

export function taxesPage(ctx: Ctx): string {
  const { rateChart, rateNotes, baseTable } = finParts(ctx);
  const county = RATES.find((r) => r.gov === "Tom Green County")!;
  const nnr = 0.4509;
  const vat = 0.50058;
  const scale = (v: number) => ((v / 0.55) * 100).toFixed(1);
  const explainer = `<div class="nnr">
    <ol class="nnr-steps">
      <li><b>Values go up.</b> The Appraisal District raises property values.</li>
      <li><b>The break-even rate.</b> The state makes each government calculate a "no-new-revenue" rate: the rate that would bring in the same money as last year from the same properties.</li>
      <li><b>Above it means more money.</b> Any rate above the break-even rate raises more from the same homes and businesses, even if it is lower than last year's rate.</li>
    </ol>
    <div class="fin-card nnr-card">
      <h3 class="fc-t">Tom Green County, FY2027 <span class="unv-tag">Being rechecked</span></h3>
      <p class="fc-s">Rates per $100 of taxable value.${rich(ctx, " {{c:county-tax-notice-2026,county-budget-fy2027}}")}</p>
      <div class="nnr-bars">
        <div class="nnr-b"><span>Break-even (no-new-revenue)</span><i style="width:${scale(nnr)}%" class="nb-nnr"></i><b class="mono unv">$${nnr.toFixed(4)}</b></div>
        <div class="nnr-b on"><span>Adopted</span><i style="width:${scale(county.rate)}%" class="nb-adopt"></i><b class="mono">$${county.rate}</b></div>
        <div class="nnr-b"><span>Last year</span><i style="width:${scale(0.47075)}%" class="nb-prior"></i><b class="mono">$0.47075</b></div>
        <div class="nnr-b"><span>Highest without an election</span><i style="width:${scale(vat)}%" class="nb-vat"></i><b class="mono unv">$${vat.toFixed(4)}</b></div>
      </div>
      <p class="ss-d">The rate went <b>down</b> from last year, but it is <b>3.8% above</b> break-even, so the County collects more from the same properties.${rich(ctx, " {{c:our-analysis}}")}</p>
    </div>
  </div>
  <p class="note">The City and San Angelo ISD publish the same figures each year. We are adding them.</p>`;

  return `<div class="pg-wide">${pageHead({
    eyebrow: "Money",
    title: "Taxes",
    lede: "Why a lower tax rate can still mean a bigger bill.",
    meta: [`Updated ${SITE.updated}`],
  })}
${moneyNav(ctx, "taxes")}

${keyPoints(ctx, [
  { kicker: "City", big: `$${RATES[0].rate}`, text: "Per $100 of value for FY2027. The same rate as last year.", tone: "city", cite: RATES[0].cite },
  { kicker: "County", big: `$${RATES[1].rate}`, text: "Per $100 for FY2027, down from $0.47075.", tone: "county", cite: RATES[1].cite },
  { kicker: "San Angelo ISD", big: `$${RATES[2].rate}`, text: "Per $100 for 2026-27, down from $1.0706. About a third pays for debt.", tone: "saisd", cite: RATES[2].cite },
], "The short version", "Your bill is your property's value times each government's rate. Values went up, so even where rates held or fell, the City and the County collect more this year. {{c:city-budget-fy2027,county-budget-fy2027}}")}

${section({ id: "nnr", title: "Why a lower rate can cost you more", note: "The one idea that explains most tax-rate debates.", body: explainer })}

${moreHead()}
${section({ id: "rates", fold: true, title: "This year's rates, in detail", note: "Each rate has two parts: one for operations and one for debt payments.", body: `<div class="fin-card">${rateChart}</div>` + rateNotes })}

${section({ id: "base", title: "Tax base and credit ratings", note: "Taxable value is what the rates are applied to.", body: baseTable, fold: true })}

${nextStep(ctx, { step: "Up next", title: "The budgets", text: "What each government plans to spend, and how those plans change.", route: "budgets", label: "Next: budgets" })}`;
}

export function budgetsPage(ctx: Ctx): string {
  const { budgetChart, budgetNotes, also } = finParts(ctx);
  return `<div class="pg-wide">${pageHead({
    eyebrow: "Money",
    title: "Budgets",
    lede: "What each government plans to spend this year.",
    meta: [`Updated ${SITE.updated}`],
  })}
${moneyNav(ctx, "budgets")}

${keyPoints(ctx, [
  { kicker: "City", big: "Balanced as adopted", text: "But last year's budget, after changes, spent $6.1 million more than it took in.", tone: "city", cite: ["city-budget-fy2027"] },
  { kicker: "County", big: "-$17.4M", text: "Planned spending over revenue this year. Reserves fall from $39.4 million to $21.9 million.", tone: "county", cite: ["county-budget-fy2027"] },
  { kicker: "San Angelo ISD", big: "-$3.3M", text: "Planned spending over revenue for 2026-27, covered from savings.", tone: "saisd", cite: ["saisd-budget-2026-27"] },
], "The short version", "Each government passes a spending plan, then changes it during the year. This year the County plans to spend $17.4 million more than it takes in, and the school district $3.3 million more. {{c:county-budget-fy2027,saisd-budget-2026-27}}")}

${section({ id: "change", title: "Adopted is not final", body: `<div class="callout"><b>Adopted is not final.</b> ${rich(ctx, "These are the plans passed at the start of the year. Councils, courts, and boards amend them during the year as they vote on projects and spending, so a budget adopted in balance can end the year out of balance. The City's FY2026 budget, after revisions, spent $6.1 million more than it took in. {{c:city-budget-fy2027}} Tracking those mid-year votes is part of the dashboard we are building.")}</div>` })}

${moreHead()}
${section({ id: "budgets", fold: true, title: "This year's budgets, side by side", note: "Revenue and spending for day-to-day operations.", body: `<div class="fin-card">${budgetChart}</div>` + budgetNotes })}

${section({ id: "books", fold: true, title: "Big costs coming", note: "Pensions, water plants, the Coliseum, health insurance, and the new street fee.", body: also })}

${nextStep(ctx, { step: "Up next", title: "The data centers", text: "Three proposals near San Angelo, and who decides.", route: "data-centers", label: "Next: data centers" })}</div>`;
}

/** Spending per student and the enrollment trend, shown on the San Angelo ISD page. */
export function schoolSections(ctx: Ctx): string {
  const { students } = finParts(ctx);
  const enroll = [
    { y: "2021", v: 14100 },
    { y: "2025", v: 13004 },
  ];
  const trend = `<div class="trend">
    <div class="fin-card tr-card"><h3 class="fc-t">Enrollment</h3><p class="fc-s">Students enrolled, as SAISD reports it.${rich(ctx, " {{c:saisd-transparency}}")}</p>
      <div class="tr-pair"><span><em>${enroll[0].y}</em><b class="mono unv">14,100</b></span><span class="tr-arrow">${ICON.arrow}</span><span><em>${enroll[1].y}</em><b class="mono unv">13,004</b></span></div><p class="ss-d"><b>Down 8%</b> in four years.</p></div>
    <div class="fin-card tr-card"><h3 class="fc-t">Teachers</h3><p class="fc-s">Full-time teacher positions.${rich(ctx, " {{c:saisd-transparency}}")}</p>
      <div class="tr-pair"><span><em>2021</em><b class="mono unv">941.8</b></span><span class="tr-arrow">${ICON.arrow}</span><span><em>2025</em><b class="mono unv">840.2</b></span></div><p class="ss-d"><b>Down 11%</b> in four years.</p></div>
    <div class="fin-card tr-card"><h3 class="fc-t">New buildings</h3><p class="fc-s">Bond money voters approved in May 2025.${rich(ctx, " {{c:saisd-election-notice-2025}}")}</p>
      <div class="tr-pair"><span><em>Approved</em><b class="mono">$397M</b></span><span class="tr-arrow">${ICON.arrow}</span><span><em>Unspent, Sep 2026</em><b class="mono">$361.5M</b></span></div><p class="ss-d">${rich(ctx, "Most of the building is still ahead. {{c:saisd-invest-sep2026}}")}</p></div>
  </div>
  <p class="note">Fewer students and fewer teachers, alongside a large building program. The question worth asking is what enrollment forecast the new buildings were sized for. It is on the list below.</p>`;

  return `${section({ id: "students", fold: true, title: "Spending per student", note: "SAISD spends less than the state average in every category, and pays teachers less.", body: students })}

${section({ id: "trend", fold: true, title: "Fewer students, bigger buildings", note: "Enrollment is down 8% in four years while the bond program builds.", body: trend })}`;
}
