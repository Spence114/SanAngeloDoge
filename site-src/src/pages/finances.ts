import { SITE } from "../config.ts";
import {
  ALSO_ON_THE_BOOKS,
  APPRAISAL_NOTE,
  BUDGETS,
  CITY_DEBT_NOTE,
  DEBT,
  DEBT_TOTAL,
  MEDIAN_HOME,
  PER_PERSON,
  RATES,
  TAX_BASE,
  TAX_BASE_NOTE,
} from "../content/finances.ts";
import { hbars } from "../render/charts.ts";
import { debtHistory, debtPurpose } from "../render/debtcharts.ts";
import { ICON, pageHead, section, table } from "../render/components.ts";
import { anchorLink, cite, type Ctx, href, rich, usd, usdM } from "../render/html.ts";
import { byTopic } from "../content/reports.ts";
import { reportsFor } from "./reports.ts";

export function financesPage(ctx: Ctx): string {
  const total = DEBT_TOTAL.principal + DEBT_TOTAL.interest;
  const all = DEBT.flatMap((d) => d.cite);

  const summary = `<div class="ledger">
    <div class="lcell"><span class="lk">Borrowed and still owed${cite(ctx, ...all, "our-analysis")}</span><span class="lv mono">${usd(DEBT_TOTAL.principal)}</span><span class="ls">City, County, and SAISD, from each one's latest report</span></div>
    <div class="lcell"><span class="lk">Interest still to pay${cite(ctx, ...all, "our-analysis")}</span><span class="lv mono">${usd(DEBT_TOTAL.interest)}</span><span class="ls">Scheduled from each report date to the last payment</span></div>
    <div class="lcell"><span class="lk">Total future payments${cite(ctx, "our-analysis")}</span><span class="lv mono">$${(total / 1e9).toFixed(2)} billion</span><span class="ls">Principal plus interest</span></div>
    <div class="lcell"><span class="lk">Due this fiscal year${cite(ctx, ...all, "our-analysis")}</span><span class="lv mono">${usd(DEBT_TOTAL.dueThisYear)}</span><span class="ls">Principal and interest, all three</span></div>
  </div>
  <p class="ticker"><span>Interest since you opened this page</span><b class="mono unv" data-ticker data-per-year="${DEBT_TOTAL.interestThisYear}">$0.00</b><span class="tick-note">This year's scheduled interest, ${usdM(DEBT_TOTAL.interestThisYear)}, spread evenly across the year.</span></p>`;

  const debtChart = hbars({
    aria: `Debt by government. San Angelo ISD owes ${usdM(DEBT[2].principal)} plus ${usdM(DEBT[2].interest)} in interest. The City owes ${usdM(DEBT[0].principal)} plus ${usdM(DEBT[0].interest)}. The County owes ${usdM(DEBT[1].principal, 2)} plus ${usdM(DEBT[1].interest)}.`,
    max: 900e6,
    step: 300e6,
    tick: (v) => (v === 0 ? "$0" : `$${Math.round(v / 1e6)}M`),
    legend: [
      { cls: "p", label: "Principal owed" },
      { cls: "i", label: "Interest still to pay" },
    ],
    rows: [...DEBT]
      .sort((x, y) => y.principal + y.interest - (x.principal + x.interest))
      .map((d) => ({
        label: d.gov,
        sub: `Last payment ${d.lastPayment}`,
        segs: [
          { v: d.principal, cls: "p" as const, title: `Principal ${usdM(d.principal)}` },
          { v: d.interest, cls: "i" as const, title: `Interest ${usdM(d.interest)}` },
        ],
        value: usdM(d.principal + d.interest),
      })),
  });

  const debtTable = table(
    ctx,
    {
      head: ["Government", "Owed", "Interest still to pay", "Due this fiscal year", "Last payment", "Source"],
      rows: [
        ...DEBT.map((d) => [
          `${d.gov}${cite(ctx, ...d.cite)}`,
          usd(d.principal),
          usd(d.interest),
          `${usd(d.dueThisYear)}<span class="cell-sub">${d.fiscalYear}: ${usdM(d.duePrincipal)} principal, ${usdM(d.dueInterest)} interest</span>`,
          String(d.lastPayment),
          `${d.source}<span class="cell-sub">${d.asOf}</span>`,
        ]),
        [`Total, three with debt${cite(ctx, "our-analysis")}`, usd(DEBT_TOTAL.principal), usd(DEBT_TOTAL.interest), usd(DEBT_TOTAL.dueThisYear), "", "Sum of the rows above"],
      ],
      num: [1, 2, 3, 4],
      strong: [3],
    },
    "Debt by government",
  );

  const budgetChart = hbars({
    aria: "General Fund revenue and spending this year. The City is balanced. The County spends $17.4 million more than it takes in. SAISD spends $3.3 million more than it takes in.",
    max: 150e6,
    step: 50e6,
    tick: (v) => (v === 0 ? "$0" : `$${Math.round(v / 1e6)}M`),
    legend: [
      { cls: "r", label: "Revenue" },
      { cls: "s", label: "Spending" },
    ],
    rows: BUDGETS.flatMap((b) => {
      const gap = b.revenue - b.spending;
      return [
        { group: `${b.gov} <span>${b.year}</span>`, label: "Revenue", segs: [{ v: b.revenue, cls: "r" as const, title: usd(b.revenue) }], value: usdM(b.revenue) },
        {
          group: `${b.gov} <span>${b.year}</span>`,
          label: "Spending",
          segs: [{ v: b.spending, cls: "s" as const, title: usd(b.spending) }],
          value: usdM(b.spending),
          sub: gap < 0 ? `<em class="neg">${"-" + usdM(-gap)} gap</em>` : `<em class="even">Balanced</em>`,
        },
      ];
    }),
  });

  const budgetNotes = `<div class="notes3">${BUDGETS.map(
    (b) => `<div class="note-c"><h3>${b.gov}</h3><p>${rich(ctx, b.note)}</p><p class="src">${b.source}</p></div>`,
  ).join("")}</div>
  <p class="note">${rich(ctx, APPRAISAL_NOTE)}</p>`;

  const maxRate = 1.2;
  const rateChart = hbars({
    aria: "Property tax rates per $100 of taxable value, split into operations and debt.",
    max: maxRate,
    step: 0.4,
    tick: (v) => `$${v.toFixed(2)}`,
    legend: [
      { cls: "o", label: "Operations" },
      { cls: "d", label: "Debt payments" },
    ],
    rows: RATES.map((r) => ({
      label: r.gov,
      sub: `${r.year}. ${r.prior}.`,
      segs: [
        { v: r.ops, cls: "o" as const, title: `Operations $${r.ops}` },
        { v: r.debt, cls: "d" as const, title: `Debt $${r.debt}` },
      ],
      value: `$${r.rate}`,
    })),
  });

  const rateNotes = `<div class="notes3">${RATES.map(
    (r) => `<div class="note-c"><h3>${r.gov}</h3><p><span class="mono">$${r.ops}</span> for operations and <span class="mono">$${r.debt}</span> for debt. ${r.levyNote}.${cite(ctx, ...r.cite)}</p></div>`,
  ).join("")}</div>
  <p class="callout-line">On the median city homestead, taxable at <span class="mono">${usd(MEDIAN_HOME.taxable)}</span> (last year <span class="mono">${usd(MEDIAN_HOME.prior)}</span>), the City's share of the bill is about <span class="mono">${usd(MEDIAN_HOME.cityBill, 2)}</span>.${cite(ctx, "city-impact-statement", "our-analysis")} County and school taxes are figured on their own taxable values, which differ because of exemptions.</p>`;

  const baseTable = table(
    ctx,
    {
      head: ["Government", "Taxable value, 2025", "Change from 2024", "Credit ratings"],
      rows: TAX_BASE.map((t) => [t.gov, t.taxable, t.change, t.ratings]),
      num: [1, 2],
    },
    "Tax base and credit ratings",
  ) + `<p class="note">${TAX_BASE_NOTE}</p>`;

  const also = `<ul class="books">${ALSO_ON_THE_BOOKS.map(
    (i) => `<li class="${i.unv ? "unv" : ""}"><div class="bk-h"><span class="bk-who">${i.who}</span><h3>${i.k}</h3></div><p class="bk-fig mono">${i.fig}</p><p class="bk-v">${rich(ctx, i.v)}${i.cite?.length ? cite(ctx, ...i.cite) : ""}</p></li>`,
  ).join("")}</ul>`;

  const jump = `<nav class="wrap fin-jump" aria-label="On this page">${[
    ["debt", "Debt"],
    ["purpose", "What it pays for"],
    ["budgets", "Budgets"],
    ["rates", "Tax rates"],
    ["base", "Tax base"],
    ["books", "Also on the books"],
  ]
    .map(([a, l]) => anchorLink(ctx, "finances", a, l, "fj"))
    .join("")}</nav>`;

  const debtSide = `<div class="fin-card"><h3 class="fc-t">Who owes the most</h3><p class="fc-s">Principal plus the interest still scheduled.</p>${debtChart}
    <h3 class="fc-t fc-gap">Per person, compared with similar governments</h3><p class="fc-s">FY2025. The state's trend line for peers of similar size.</p>
    <ul class="pp-list">${PER_PERSON.map((r) => {
      const hi = Math.max(r.v, r.peer);
      const diff = Math.round(((r.v - r.peer) / r.peer) * 100);
      return `<li><div class="pp-h"><span><span>${r.label}${cite(ctx, ...r.cite)}</span>${r.note ? `<small>${r.note}</small>` : ""}</span><b class="mono">${usd(r.v)}</b></div>
      <div class="pp-bars"><span class="pp-b us" style="width:${((r.v / hi) * 100).toFixed(1)}%"></span><span class="pp-b peer" style="width:${((r.peer / hi) * 100).toFixed(1)}%"></span></div>
      <p class="pp-n">Peers ${usd(r.peer)}. ${diff === 0 ? "About the same." : diff > 0 ? `${diff}% above.` : `${-diff}% below.`}</p></li>`;
    }).join("")}</ul>
    <div class="legend"><span><i class="sw pp-us"></i>Local</span><span><i class="sw pp-peer"></i>Peer trend</span></div></div>`;

  return `<div class="pg-wide">${pageHead({
    eyebrow: "Basic finances",
    title: "What our local governments owe, spend, and tax",
    lede: "The City of San Angelo, Tom Green County, and San Angelo ISD: their debt, what it pays for, this year's budgets, and their property tax rates. Each government reports on its own calendar, so each figure shows its date.",
    meta: [`Updated ${SITE.updated}`, "Three governments", "Same rules for each"],
  })}
${jump}

${reportsFor(ctx, byTopic("finances"))}

${section({
  id: "debt",
  title: "Debt",
  note: "What each government borrowed and still owes, how that changed over twenty years, and when it is scheduled to be paid off.",
  body: `${summary}
  <div class="fin-grid">
    <div class="fin-card fc-wide">${debtHistory(ctx)}</div>
    ${debtSide}
  </div>
  ${debtTable}
  <div class="fin-notes"><p class="note">"Due this fiscal year" is scheduled principal plus interest: City FY2027, County FY2027, SAISD 2026-27.</p><p class="note">${rich(ctx, CITY_DEBT_NOTE)}</p><p class="note">${rich(ctx, "The history chart uses the Texas Bond Review Board's figures as of each Aug 31. Its County payoff line predates the County's Sept 2025 refunding, so the County's own schedule, in the table, runs slightly differently. {{c:brb-tgc,county-afr-2025}}")}</p></div>`,
})}

${section({ id: "purpose", title: "What the debt pays for", note: "Debt owed on Aug 31, 2025, by the purpose each government reported to the state. Bars share one scale, so their lengths compare across governments.", body: debtPurpose(ctx), band: true })}

${section({ id: "budgets", title: "This year's budgets", note: "General Fund revenue and spending as adopted. The General Fund pays for day-to-day operations.", body: `<div class="fin-card">${budgetChart}</div>` + budgetNotes })}

${section({ id: "rates", title: "Property tax rates", note: "Per $100 of taxable value. Each rate has two parts: one for operations and one for debt payments.", body: `<div class="fin-card">${rateChart}</div>` + rateNotes, band: true })}

${section({ id: "base", title: "Tax base and credit ratings", note: "Taxable value is what the rates are applied to. Ratings come from the agencies that rate each government's bonds.", body: baseTable })}

${section({ id: "books", title: "Also on the books", note: "Large costs and commitments beyond bonded debt. Pink text rests on news coverage until we check the source document.", body: also, band: true })}

${section({
  id: "how",
  title: "How to read these numbers",
  body: `<div class="prose"><p><strong>Owed</strong> is what was borrowed and not yet repaid. <strong>Interest still to pay</strong> is the interest on the repayment schedule from the report date to the last payment. Together they are the total future payments.</p><p>Local debt does not grow every second the way the federal debt does. Principal goes down as payments are made and jumps when new bonds are sold. The interest counter spreads this year's scheduled interest evenly across the year so you can see the pace.</p><p>Some official documents disagree with each other. The proposed dashboard would show both figures and the question for the office that published them.</p></div>`,
})}

<section class="cta-band">
  <div class="wrap cta-in">
    <div><h2>Payment schedules, budget history, and votes</h2><p>These are part of the proposed dashboard, now in development.</p></div>
    <a class="btn btn-lg" href="${href(ctx, "proposal")}">See the proposal ${ICON.arrow}</a>
  </div>
</section></div>`;
}
