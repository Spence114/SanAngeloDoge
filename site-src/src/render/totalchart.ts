// Combined debt of the three governments, one stacked column per year.
// Built from HTML boxes sized by percent, so it stays sharp and readable at any width.

import { DEBT_HISTORY, HISTORY_FIRST, HISTORY_LAST_REPORTED } from "../content/finances.ts";
import { cite, type Ctx } from "./html.ts";

const TOP = 800e6;
const N = HISTORY_LAST_REPORTED - HISTORY_FIRST + 1;
const ORDER = ["county", "city", "saisd"] as const; // bottom to top

export function debtTotals(): Array<{ year: number; total: number; parts: Record<string, number> }> {
  return Array.from({ length: N }, (_, i) => {
    const parts: Record<string, number> = {};
    for (const s of DEBT_HISTORY) parts[s.key] = s.values[i];
    return { year: HISTORY_FIRST + i, total: Object.values(parts).reduce((a, b) => a + b, 0), parts };
  });
}

const m0 = (v: number) => `$${Math.round(v / 1e6)}M`;

/** The headline chart: twenty years of combined debt, with the last year's jump called out. */
export function debtTotalChart(ctx: Ctx, o: { compact?: boolean } = {}): string {
  const rows = debtTotals();
  const last = rows[N - 1];
  const prev = rows[N - 2];
  const times = (last.total / prev.total).toFixed(1);
  const label = (k: string) => DEBT_HISTORY.find((d) => d.key === k)!.gov;

  const cols = rows
    .map((r, i) => {
      const segs = [...ORDER]
        .reverse()
        .map((k) => `<i class="tc-s tc-${k}" style="height:${((r.parts[k] / TOP) * 100).toFixed(2)}%"></i>`)
        .join("");
      const tip = `${r.year}: ${m0(r.total)} total. SAISD ${m0(r.parts.saisd)}, City ${m0(r.parts.city)}, County ${m0(r.parts.county)}.`;
      const cls = i === N - 1 ? " now" : i === N - 2 ? " prev" : "";
      const top = i >= N - 2 ? `<b class="tc-v" style="bottom:${((r.total / TOP) * 100).toFixed(2)}%">${m0(r.total)}</b>` : "";
      return `<div class="tc-col${cls}" title="${tip}">${top}${segs}<span class="tc-x${r.year % 5 === 0 ? " show" : ""}">${r.year}</span></div>`;
    })
    .join("");

  const grid = [200e6, 400e6, 600e6, 800e6].map((v) => `<span class="tc-g" style="bottom:${(v / TOP) * 100}%"><em>${m0(v)}</em></span>`).join("");

  const aria = `Stacked column chart of the combined debt of the City of San Angelo, Tom Green County, and San Angelo ISD each August 31 from ${HISTORY_FIRST} to ${HISTORY_LAST_REPORTED}. The total was ${m0(rows[0].total)} in ${HISTORY_FIRST}, ${m0(prev.total)} in ${prev.year}, and ${m0(last.total)} in ${last.year}, ${times} times the year before, after San Angelo ISD issued about $385 million in bonds.`;

  return `<figure class="tc${o.compact ? " compact" : ""}">
  <figcaption class="tc-cap">
    <span class="tc-kick">Combined local debt</span>
    <span class="tc-head">More than doubled in one year</span>
    <span class="tc-sub"><b class="mono">${m0(prev.total)}</b> on Aug 31, ${prev.year}. <b class="mono">${m0(last.total)}</b> on Aug 31, ${last.year}.${cite(ctx, "brb-san-angelo", "brb-tgc", "brb-saisd", "our-analysis")}</span>
  </figcaption>
  <div class="tc-plot" role="img" aria-label="${aria}">
    ${grid}
    <div class="tc-cols">${cols}</div>
  </div>
  <div class="tc-legend">${[...ORDER].reverse().map((k) => `<span><i class="tc-sw tc-${k}"></i>${label(k)}</span>`).join("")}</div>
  <p class="tc-note">Principal owed by the City, the County, and the school district, added together. The 2025 jump is the school district's $385 million in voter-approved bonds.</p>
</figure>`;
}
