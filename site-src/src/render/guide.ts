// Pieces that lead a reader through the site: the bottom line, the next step, and a
// two-bar chart simple enough to read in a glance.

import type { Route } from "./html.ts";
import { anchorLink, type Ctx, href, rich } from "./html.ts";
import { ICON } from "./components.ts";
import { debtTotals } from "./totalchart.ts";

/** One or two plain sentences, set large, right under the page title. */
export function bottomLine(ctx: Ctx, text: string): string {
  return `<div class="wrap bl-wrap"><div class="bl"><span class="bl-k">The bottom line</span><p>${rich(ctx, text)}</p></div></div>`;
}

/** The one button that leads to the next page in the story. */
export function nextStep(ctx: Ctx, o: { step?: string; title: string; text: string; route: Route; anchor?: string; label: string }): string {
  const btn = o.anchor ? anchorLink(ctx, o.route, o.anchor, `${o.label} ${ICON.arrow}`, "btn btn-lg") : `<a class="btn btn-lg" href="${href(ctx, o.route)}">${o.label} ${ICON.arrow}</a>`;
  return `<section class="next" aria-label="Next step"><div class="wrap next-in">
  <div>${o.step ? `<p class="next-k">${o.step}</p>` : ""}<h2>${o.title}</h2><p>${o.text}</p></div>
  ${btn}
</div></section>`;
}

/** Heading for the folded detail below the essentials. */
export function moreHead(text = "Want the details? Open any of these."): string {
  return `<div class="wrap more-h"><p>${text}</p></div>`;
}

/** Two bars: combined debt a year ago and now. */
export function debtJump(ctx: Ctx): string {
  const t = debtTotals();
  const a = t[t.length - 2];
  const b = t[t.length - 1];
  const m = (v: number) => `$${Math.round(v / 1e6)} million`;
  return `<figure class="dj" role="img" aria-label="Combined local debt: ${m(a.total)} in ${a.year}, ${m(b.total)} in ${b.year}.">
  <div class="dj-row"><span class="dj-y">${a.year}</span><span class="dj-track"><i style="width:${((a.total / b.total) * 100).toFixed(1)}%"></i></span><b class="mono">${m(a.total)}</b></div>
  <div class="dj-row now"><span class="dj-y">${b.year}</span><span class="dj-track"><i style="width:100%"></i></span><b class="mono">${m(b.total)}</b></div>
  <figcaption>${rich(ctx, "Money owed by the City, the County, and the school district, added together, each August 31. {{c:brb-san-angelo,brb-tgc,brb-saisd,our-analysis}}")}</figcaption>
</figure>`;
}
