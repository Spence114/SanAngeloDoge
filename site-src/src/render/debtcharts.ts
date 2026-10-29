// Debt history line chart and debt-by-purpose bars for the Finances page.
// The plot is an SVG stretched to its box (strokes stay crisp with non-scaling-stroke);
// every label is HTML placed by percent, so text stays readable at any width.

import { DEBT_HISTORY, DEBT_PURPOSE, HISTORY_EVENTS, HISTORY_FIRST, HISTORY_LAST_REPORTED } from "../content/finances.ts";
import { cite, type Ctx, usd, usdM } from "./html.ts";

const LAST = 2055;
const YMAX = 500e6;
const xPct = (yr: number) => ((yr - HISTORY_FIRST) / (LAST - HISTORY_FIRST)) * 100;
const yPct = (v: number) => (1 - v / YMAX) * 100;
const pt = (yr: number, v: number) => `${(xPct(yr) * 10).toFixed(1)} ${(yPct(v) * 4).toFixed(1)}`;

export function debtHistory(ctx: Ctx): string {
  const nowX = xPct(HISTORY_LAST_REPORTED);
  const repN = HISTORY_LAST_REPORTED - HISTORY_FIRST + 1;

  const lines = DEBT_HISTORY.map((s) => {
    const rep = s.values.slice(0, repN).map((v, i) => pt(HISTORY_FIRST + i, v));
    const sch = s.values.slice(repN - 1).map((v, i) => pt(HISTORY_LAST_REPORTED + i, v));
    return `<path class="ln ln-${s.key}" d="M${rep.join("L")}"/><path class="ln ln-${s.key} sched" d="M${sch.join("L")}"/>`;
  }).join("");

  const grid = [0, 100e6, 200e6, 300e6, 400e6, 500e6]
    .map((v) => `<span class="lc-y" style="top:${yPct(v)}%">${v === 0 ? "$0" : `$${v / 1e6}M`}</span>`)
    .join("");
  const gridLines = [100e6, 200e6, 300e6, 400e6].map((v) => `<path class="gl" d="M0 ${yPct(v) * 4}H1000"/>`).join("");

  const xs = [2005, 2010, 2015, 2020, 2025, 2030, 2035, 2040, 2045, 2050, 2055]
    .map((y) => `<span class="lc-x${y === HISTORY_LAST_REPORTED ? " now" : ""}" style="left:${xPct(y)}%">${y}</span>`)
    .join("");

  const ends = DEBT_HISTORY.map((s) => {
    const v = s.values[repN - 1];
    return `<span class="lc-end lc-${s.key}" style="left:${nowX}%;top:${yPct(v)}%"><b>${s.label}</b> ${usdM(v)}</span>`;
  }).join("");

  const events = HISTORY_EVENTS.map((e, i) => {
    const s = DEBT_HISTORY.find((d) => d.key === e.key)!;
    const v = s.values[e.year - HISTORY_FIRST];
    return `<span class="lc-ev lc-${e.key}" style="left:${xPct(e.year)}%;top:${yPct(v)}%" aria-hidden="true">${i + 1}</span>`;
  }).join("");

  const series = JSON.stringify({
    first: HISTORY_FIRST,
    last: LAST,
    now: HISTORY_LAST_REPORTED,
    max: YMAX,
    s: DEBT_HISTORY.map((d) => ({ k: d.key, l: d.label, v: d.values })),
  }).replace(/"/g, "&quot;");

  const aria = `Line chart of debt owed from 2005 to 2025 and the payoff schedule to 2055. SAISD debt was about $23 million in 2008, rose to $138 million in 2009, fell to $69 million by 2024, and jumped to $448 million in 2025. City debt rose from $70 million in 2005 to $232 million in 2011 and stood at $266 million in 2025. County debt was under $15 million until 2016, peaked at $66 million in 2018, and was $49 million in 2025. With no new borrowing, County debt ends in 2038, City debt in 2047, and SAISD debt in 2054.`;

  const legend = `<div class="legend lc-legend">${DEBT_HISTORY.map((s) => `<span><i class="lsw lc-${s.key}"></i>${s.gov}${cite(ctx, ...s.cite)}</span>`).join("")}<span><i class="lsw dash"></i>Payoff schedule, no new borrowing</span></div>`;

  return `<figure class="lc" data-lc="${series}">
  <figcaption class="lc-cap"><span class="lc-t">Debt owed, 2005 to today, and the payoff schedule</span><span class="lc-s">Principal outstanding each Aug 31. Hover or tap the chart to read a year.</span></figcaption>
  ${legend}
  <div class="lc-box">
    <div class="lc-yax" aria-hidden="true">${grid}</div>
    <div class="lc-plot" role="img" aria-label="${aria}">
      <span class="lc-future" style="left:${nowX}%"><span>Scheduled payoff</span></span>
      <svg viewBox="0 0 1000 400" preserveAspectRatio="none" aria-hidden="true" focusable="false">${gridLines}<path class="gl base" d="M0 400H1000"/><path class="nowl" d="M${nowX * 10} 0V400"/>${lines}</svg>
      ${ends}${events}
      <span class="lc-rule" hidden></span>
      <div class="lc-read" hidden></div>
    </div>
    <div class="lc-xax" aria-hidden="true">${xs}</div>
  </div>
  <ol class="lc-events">${HISTORY_EVENTS.map((e) => `<li><span class="mono">${e.year}</span> ${e.text}</li>`).join("")}</ol>
</figure>`;
}

export function debtPurpose(ctx: Ctx): string {
  const max = Math.max(...DEBT_PURPOSE.map((r) => r.total));
  const rows = DEBT_PURPOSE.map((r) => {
    const bar = r.slices
      .map((s) => `<span class="pseg t${s.tone}${/revenue/.test(s.k) ? " rev" : ""}" style="width:${((s.v / r.total) * 100).toFixed(3)}%" title="${s.k}: ${usdM(s.v)}"></span>`)
      .join("");
    const key = r.slices
      .map(
        (s) => `<li><i class="psw t${s.tone}${/revenue/.test(s.k) ? " rev" : ""}"></i><span class="pk">${s.k}${s.note ? `<small>${s.note}</small>` : ""}</span><span class="pv mono">${usdM(s.v)}</span><span class="pp mono">${Math.round((s.v / r.total) * 100)}%</span></li>`,
      )
      .join("");
    return `<div class="prow">
      <div class="ph"><h3>${r.gov}${cite(ctx, ...r.cite)}</h3><span class="mono">${usd(r.total)}</span></div>
      <div class="pbar-track"><div class="pbar" style="width:${((r.total / max) * 100).toFixed(3)}%">${bar}</div></div>
      <ul class="pkey">${key}</ul>
      <p class="pnote">${r.note}</p>
    </div>`;
  }).join("");
  return `<div class="purpose" role="group" aria-label="Debt by purpose for each government, drawn on one scale">${rows}</div>`;
}
