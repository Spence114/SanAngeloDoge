import { SITE } from "../config.ts";
import {
  ALSO_ON_THE_BOOKS,
  APPRAISAL_NOTE,
  BUDGETS,
  CITY_DEBT_NOTE,
  DEBT,
  DEBT_TOTAL,
  MEDIAN_HOME,
  PAYOFF,
  STUDENT_SPEND,
  STUDENT_SPEND_CITE,
  STUDENT_SPEND_NOTE,
  TEACHER_PAY,
  RATES,
  TAX_BASE,
  TAX_BASE_NOTE,
} from "../content/finances.ts";
import { hbars } from "../render/charts.ts";
import { debtHistory, debtPurpose } from "../render/debtcharts.ts";
import { debtTotalChart, debtTotals } from "../render/totalchart.ts";
import { ICON, pageHead, section, table, keyPoints } from "../render/components.ts";
import { anchorLink, cite, type Ctx, href, rich, usd, usdM } from "../render/html.ts";
import { byTopic } from "../content/reports.ts";
import { reportsFor } from "./reports.ts";

export function finParts(ctx: Ctx) {
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
    aria: "General Fund revenue and spending this year. The City budget is balanced as adopted. The County spends $17.4 million more than it takes in. SAISD spends $3.3 million more than it takes in.",
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
          sub: gap < 0 ? `<em class="neg">${"-" + usdM(-gap)} gap</em>` : `<em class="even">Balanced as adopted</em>`,
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

  const tot = debtTotals();

  const debtSide = `<div class="fin-card"><h3 class="fc-t">Who owes the most</h3><p class="fc-s">Principal plus the interest still scheduled.</p>${debtChart}
    <h3 class="fc-t fc-gap">When it is paid off</h3><p class="fc-s">The last scheduled payment, if nothing new is borrowed.</p>
    <ul class="po-list">${PAYOFF.map((r) => `<li class="tone-${r.tone}"><span class="po-g"><i class="dot"></i>${r.gov}${cite(ctx, ...r.cite)}<small>${r.note}</small></span><b class="mono">${r.year}</b></li>`).join("")}</ul></div>`;

  const sMax = Math.max(...STUDENT_SPEND.map((r) => Math.max(r.saisd, r.state, r.peer)));
  const sBar = (label: string, v: number, hi: number, cls: string) => `<div class="ss-b"><span class="ss-l">${label}</span><span class="ss-track"><i class="${cls}" style="width:${((v / hi) * 100).toFixed(1)}%"></i></span><b class="mono">${usd(v)}</b></div>`;
  const students = `<div class="ss-grid">${STUDENT_SPEND.map((r, i) => {
    const hi = i === 0 ? sMax : Math.max(r.saisd, r.state, r.peer);
    const diff = Math.round(((r.saisd - r.state) / r.state) * 100);
    return `<div class="fin-card ss${i === 0 ? " ss-main" : ""}"><h3 class="fc-t">${r.k}${cite(ctx, ...STUDENT_SPEND_CITE)}</h3><p class="fc-s">${r.note}</p>
      ${sBar("SAISD", r.saisd, hi, "b-us")}${sBar("State average", r.state, hi, "b-state")}${sBar("Peer districts", r.peer, hi, "b-peer")}
      <p class="ss-d">SAISD is <b>${Math.abs(diff)}% ${diff < 0 ? "below" : "above"}</b> the state average.</p></div>`;
  }).join("")}</div>
  <div class="fin-card ss-pay"><h3 class="fc-t">Average teacher salary${cite(ctx, ...STUDENT_SPEND_CITE)}</h3>
    ${sBar("SAISD", TEACHER_PAY.saisd, TEACHER_PAY.state, "b-us")}${sBar("State average", TEACHER_PAY.state, TEACHER_PAY.state, "b-state")}${sBar("Peer districts", TEACHER_PAY.peer, TEACHER_PAY.state, "b-peer")}</div>
  <p class="note">${rich(ctx, STUDENT_SPEND_NOTE)}</p>`;

  return { summary, debtChart, debtTable, budgetChart, budgetNotes, rateChart, rateNotes, baseTable, also, debtSide, students, tot };
}
