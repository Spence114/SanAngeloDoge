import { SITE } from "../config.ts";
import { CITY_DEBT_NOTE, RATES } from "../content/finances.ts";
import { GOVERNMENTS, MONEY } from "../content/nav.ts";
import { byTopic } from "../content/reports.ts";
import { debtHistory, debtPurpose } from "../render/debtcharts.ts";
import { ICON, keyPoints, pageHead, section } from "../render/components.ts";
import { type Ctx, href, rich } from "../render/html.ts";
import { tiles } from "../render/tiles.ts";
import { debtTotalChart } from "../render/totalchart.ts";
import { finParts } from "./finances.ts";
import { reportsFor } from "./reports.ts";

const cta = (ctx: Ctx, h: string, p: string) => `<section class="cta-band">
  <div class="wrap cta-in">
    <div><h2>${h}</h2><p>${p}</p></div>
    <a class="btn btn-give btn-lg" href="${href(ctx, "proposal")}">${ICON.heart} Support Transparency</a>
  </div>
</section>`;

const moneyNav = (ctx: Ctx, here: string) =>
  `<nav class="wrap subnav" aria-label="Money pages">${[{ route: "finances" as const, label: "Overview" }, ...MONEY.items]
    .map((n) => `<a href="${href(ctx, n.route)}"${n.route === here ? ' aria-current="page"' : ""}>${n.label}</a>`)
    .join("")}</nav>`;

/** Money overview: the headline chart, the short version, and a way into each part. */
export function financesPage(ctx: Ctx): string {
  const { tot } = finParts(ctx);
  return `<div class="pg-wide">${pageHead({
    eyebrow: "Money",
    title: "What our local governments owe, spend, and tax",
    lede: "The City, Tom Green County, and San Angelo ISD. Start with the big picture, then pick a topic. Every figure shows its date and its source.",
    meta: [`Updated ${SITE.updated}`],
  })}
${moneyNav(ctx, "finances")}

<section class="lead-chart"><div class="wrap"><div class="fin-card">${debtTotalChart(ctx)}</div></div></section>

${keyPoints(ctx, [
  { kicker: "All three together", big: `$${Math.round(tot[tot.length - 1].total / 1e6)}M`, text: `Owed on Aug 31, 2025. One year earlier: $${Math.round(tot[tot.length - 2].total / 1e6)} million.`, tone: "ink", cite: ["brb-san-angelo", "brb-tgc", "brb-saisd", "our-analysis"] },
  { kicker: "School district", big: "$385M", text: "New bonds San Angelo ISD sold in 2025. That is why the total jumped.", tone: "saisd", cite: ["brb-saisd"] },
  { kicker: "Per student", big: "$10,882", text: "What SAISD spent to operate per student in 2022-23. The state average was $12,382.", tone: "city", cite: ["saisd-efficiency-audit-2024"] },
  { kicker: "Payoff", big: "2055", text: "When the last school bond payment comes due, if nothing new is borrowed.", tone: "county", cite: ["brb-saisd"] },
])}

<section class="sec"><div class="wrap sec-in"><div class="sec-h"><div class="sec-t"><h2>Pick a topic</h2></div></div>${tiles(ctx, MONEY.items)}</div></section>

<section class="sec band"><div class="wrap sec-in"><div class="sec-h"><div class="sec-t"><h2>Or pick a government</h2></div></div>${tiles(ctx, GOVERNMENTS.items, "t5")}</div></section>

${reportsFor(ctx, byTopic("finances"))}

${cta(ctx, "Next: payment schedules, budget history, and votes", "Part of the dashboard we are raising money to build.")}</div>`;
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
    lede: "What the City, the County, and San Angelo ISD borrowed, what they still owe, what it pays for, and when it is paid off.",
    meta: [`Updated ${SITE.updated}`],
  })}
${moneyNav(ctx, "debt")}

<section class="lead-chart"><div class="wrap"><div class="fin-card">${debtTotalChart(ctx)}</div></div></section>

${keyPoints(ctx, [
  { kicker: "Owed", big: "$757M", text: "Principal still owed by the three, from each one's latest report.", tone: "ink", cite: ["brb-san-angelo", "county-auditor-aug2026", "saisd-hb1378", "our-analysis"] },
  { kicker: "Plus interest", big: "$535M", text: "Interest still scheduled. $424 million of it is on the 2025 school bonds alone.", tone: "saisd", cite: ["brb-san-angelo", "county-auditor-aug2026", "saisd-hb1378", "our-analysis"] },
  { kicker: "Not always voted on", big: "No election", text: "Certificates of obligation and tax notes can be issued without one.", tone: "city", cite: ["tx-lgc-271-049"] },
])}

${section({
  id: "debt",
  title: "Who owes what, and for how long",
  body: `${summary}
  <div class="fin-grid">
    <div class="fin-card fc-wide">${debtHistory(ctx)}</div>
    ${debtSide}
  </div>
  ${notVoted}`,
})}

${section({ id: "purpose", title: "What the debt pays for", note: "Debt owed on Aug 31, 2025, by the purpose each government reported to the state. Bars share one scale, so their lengths compare.", body: debtPurpose(ctx), band: true })}

${section({
  id: "table",
  fold: true,
  title: "The numbers in a table",
  note: "Owed, interest, this year's payment, and the last payment, by government.",
  body: `${debtTable}<div class="fin-notes"><p class="note">"Due this fiscal year" is scheduled principal plus interest: City FY2027, County FY2027, SAISD 2026-27.</p><p class="note">${rich(ctx, CITY_DEBT_NOTE)}</p><p class="note">${rich(ctx, "The history chart uses the Texas Bond Review Board's figures as of each Aug 31. Its County payoff line predates the County's Sept 2025 refunding, so the County's own schedule, in the table, runs slightly differently. {{c:brb-tgc,county-afr-2025}}")}</p></div>`,
})}

${section({
  id: "how",
  fold: true,
  title: "How to read these numbers",
  body: `<div class="prose"><p><strong>Owed</strong> is what was borrowed and not yet repaid. <strong>Interest still to pay</strong> is the interest on the repayment schedule from the report date to the last payment.</p><p>Local debt does not grow every second the way the federal debt does. Principal goes down as payments are made and jumps when new debt is sold.</p></div>`,
})}

${cta(ctx, "Next: a live debt clock", "Every issue, voted on or not, with its payments. Part of the dashboard we are raising money to build.")}</div>`;
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
    lede: "Your property tax bill is the appraised value times each government's rate. Here are the rates, and why a lower rate can still mean a bigger bill.",
    meta: [`Updated ${SITE.updated}`],
  })}
${moneyNav(ctx, "taxes")}

${keyPoints(ctx, [
  { kicker: "City", big: `$${RATES[0].rate}`, text: "Per $100 of value for FY2027. The same rate as last year.", tone: "city", cite: RATES[0].cite },
  { kicker: "County", big: `$${RATES[1].rate}`, text: "Per $100 for FY2027, down from $0.47075.", tone: "county", cite: RATES[1].cite },
  { kicker: "San Angelo ISD", big: `$${RATES[2].rate}`, text: "Per $100 for 2026-27, down from $1.0706. About a third pays for debt.", tone: "saisd", cite: RATES[2].cite },
])}

${section({ id: "nnr", title: "Why a lower rate can cost you more", note: "The one idea that explains most tax-rate debates.", body: explainer })}

${section({ id: "rates", title: "This year's rates", note: "Per $100 of taxable value. Each rate has two parts: one for operations and one for debt payments.", body: `<div class="fin-card">${rateChart}</div>` + rateNotes, band: true })}

${section({ id: "base", title: "Tax base and credit ratings", note: "Taxable value is what the rates are applied to.", body: baseTable, fold: true })}

<section class="sec"><div class="wrap sec-in"><div class="sec-h"><div class="sec-t"><h2>Think your value is too high?</h2><p>Our Appraisal Check, in development, compares your property with similar ones nearby before the protest deadline.</p></div></div>${tiles(ctx, [{ route: "appraisal-check", label: "Appraisal check", desc: "Join the list for early access", icon: "appraisal" }, { route: "appraisal", label: "The Appraisal District", desc: "Who sets values, and how", icon: "appraisal", tone: "ink" }])}</div></section>`;
}

export function budgetsPage(ctx: Ctx): string {
  const { budgetChart, budgetNotes, also } = finParts(ctx);
  return `<div class="pg-wide">${pageHead({
    eyebrow: "Money",
    title: "Budgets",
    lede: "What each government plans to spend this year, where it falls short, and the big costs coming. A budget is a plan, and plans change during the year.",
    meta: [`Updated ${SITE.updated}`],
  })}
${moneyNav(ctx, "budgets")}

${keyPoints(ctx, [
  { kicker: "City", big: "Balanced as adopted", text: "But last year's budget, after changes, spent $6.1 million more than it took in.", tone: "city", cite: ["city-budget-fy2027"] },
  { kicker: "County", big: "-$17.4M", text: "Planned spending over revenue this year. Reserves fall from $39.4 million to $21.9 million.", tone: "county", cite: ["county-budget-fy2027"] },
  { kicker: "San Angelo ISD", big: "-$3.3M", text: "Planned spending over revenue for 2026-27, covered from savings.", tone: "saisd", cite: ["saisd-budget-2026-27"] },
])}

${section({ id: "budgets", title: "This year's General Fund budgets", note: "Revenue and spending as adopted. The General Fund pays for day-to-day operations.", body: `<div class="fin-card">${budgetChart}</div><div class="callout"><b>Adopted is not final.</b> ${rich(ctx, "These are the plans passed at the start of the year. Councils, courts, and boards amend them during the year as they vote on projects and spending, so a budget adopted in balance can end the year out of balance. The City's FY2026 budget, after revisions, spent $6.1 million more than it took in. {{c:city-budget-fy2027}} Tracking those mid-year votes is part of the dashboard we are building.")}</div>` + budgetNotes })}

${section({ id: "books", title: "Big costs coming", note: "Commitments beyond this year's budget and bonded debt. Pink text rests on news coverage until we check the source document.", body: also, band: true })}

${cta(ctx, "Next: every budget change, as it is voted", "Part of the dashboard we are raising money to build.")}</div>`;
}

export function schoolsPage(ctx: Ctx): string {
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
  <p class="note">Fewer students and fewer teachers, alongside a large building program. The question worth asking is what enrollment forecast the new buildings were sized for. <a href="${href(ctx, "questions")}">See Open Questions</a></p>`;

  return `<div class="pg-wide">${pageHead({
    eyebrow: "Money",
    title: "Schools: spending per student",
    lede: "What San Angelo ISD spends on each student, next to the state average, and how enrollment is changing as new schools are built.",
    meta: [`Updated ${SITE.updated}`],
  })}
${moneyNav(ctx, "schools")}

${keyPoints(ctx, [
  { kicker: "Per student", big: "$10,882", text: "SAISD's operating spending per student in 2022-23. The state average was $12,382.", tone: "saisd", cite: ["saisd-efficiency-audit-2024"] },
  { kicker: "Teachers", big: "$53,477", text: "SAISD's average teacher salary that year. The state average was $60,716.", tone: "city", cite: ["saisd-efficiency-audit-2024"] },
  { kicker: "Central office", big: "33% below", text: "General administration costs per student, compared with the state average.", tone: "county", cite: ["saisd-efficiency-audit-2024"] },
])}

${section({ id: "students", title: "Spending per student", note: "San Angelo ISD next to the state average and ten peer districts the district's own audit chose.", body: students })}

${section({ id: "trend", title: "Fewer students, bigger buildings", note: "Enrollment and teaching staff are falling while the bond program builds.", body: trend, band: true })}

<section class="sec"><div class="wrap sec-in"><div class="sec-h"><div class="sec-t"><h2>More on the school district</h2></div></div>${tiles(ctx, [GOVERNMENTS.items[2], { route: "saisd", anchor: "bonds", label: "The 2025 school bonds", desc: "$385M borrowed, repaid through 2055", icon: "bond", tone: "saisd" }])}</div></section>`;
}
