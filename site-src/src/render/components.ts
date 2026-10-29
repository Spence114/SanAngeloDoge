import type { DocLink, Fact, OpenQuestion, Table, TimelineItem } from "../content/types.ts";
import { type Ctx, esc, rich } from "./html.ts";

export const ICON = {
  arrow: `<svg class="ic" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h10M9 4l4 4-4 4"/></svg>`,
  out: `<svg class="ic" width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5.5 2.5h6v6M11.5 2.5 4 10M9.5 11.5h-7v-7"/></svg>`,
  menu: `<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M3.5 6h13M3.5 10h13M3.5 14h13" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  close: `<svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 5l10 10M15 5L5 15" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>`,
  check: `<svg class="ic" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5 6.5 12 13 4.5"/></svg>`,
  dash: `<svg class="ic" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M3.5 8h9"/></svg>`,
};

/** The civic column mark: a pediment over three columns that rise like a bar chart. */
export function mark(size = 26): string {
  return `<svg class="mark" width="${size}" height="${size}" viewBox="0 0 32 32" aria-hidden="true"><path class="m-roof" d="M4.5 11 16 4.5 27.5 11Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><rect class="m-c" x="7.2" y="19" width="4" height="7.5" rx=".5"/><rect class="m-c" x="14" y="15.5" width="4" height="11" rx=".5"/><rect class="m-hi" x="20.8" y="13" width="4" height="13.5" rx=".5"/><rect class="m-c" x="4.5" y="27.6" width="23" height="2" rx="1"/></svg>`;
}

/** Same mark as a standalone SVG string for the browser tab icon. */
export const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#F1EFEB"/><path d="M4.5 11 16 4.5 27.5 11Z" fill="#22242A"/><rect x="6.5" y="17" width="5" height="10" fill="#22242A"/><rect x="13.5" y="14" width="5" height="13" fill="#22242A"/><rect x="20.5" y="12.5" width="5" height="14.5" fill="#3A5C8C"/><rect x="4" y="27.5" width="24" height="3" fill="#22242A"/></svg>`;

export function pageHead(o: { eyebrow: string; title: string; lede: string; meta?: string[]; back?: string }): string {
  return `<header class="phead wrap">
  ${o.back ?? ""}
  <p class="eyebrow">${o.eyebrow}</p>
  <h1>${o.title}</h1>
  <p class="lede">${o.lede}</p>
  ${o.meta?.length ? `<p class="meta">${o.meta.map((m) => `<span>${m}</span>`).join("")}</p>` : ""}
</header>`;
}

export function section(o: { id?: string; title: string; note?: string; body: string; aside?: string; band?: boolean }): string {
  const hid = o.id ? `${o.id}-h` : "";
  return `<section class="sec${o.band ? " band" : ""}"${o.id ? ` id="${o.id}" aria-labelledby="${hid}"` : ""}>
  <div class="wrap sec-in">
    <div class="sec-h">
      <div class="sec-t"><h2${hid ? ` id="${hid}"` : ""}>${o.title}</h2>${o.note ? `<p>${o.note}</p>` : ""}</div>
      ${o.aside ?? ""}
    </div>
    ${o.body}
  </div>
</section>`;
}

export function facts(ctx: Ctx, list: Fact[]): string {
  return `<dl class="facts">${list
    .map(
      (f) => `<div class="frow${f.unv ? " unv" : ""}"><dt>${f.k}</dt><dd><span class="v">${rich(ctx, f.v)}${f.cite?.length ? ctx.cites.ref(f.cite) : ""}</span>${
        f.src ? `<span class="src">${rich(ctx, f.src)}</span>` : ""
      }</dd></div>`,
    )
    .join("")}</dl>`;
}

export function table(ctx: Ctx, t: Table, caption?: string): string {
  const num = new Set(t.num ?? []);
  const unv = new Set(t.unv ?? []);
  const strong = new Set(t.strong ?? []);
  const cell = (raw: string) => {
    const m = /^(yes|no|unk):(.*)$/s.exec(raw);
    if (!m) return rich(ctx, raw);
    return `<span class="mk-${m[1]}">${m[1] === "yes" ? ICON.check : ICON.dash}</span>${rich(ctx, m[2])}`;
  };
  return `<div class="tablewrap" tabindex="0" role="region"${caption ? ` aria-label="${esc(caption)}"` : ""}><table>
  <thead><tr>${t.head.map((h, i) => `<th scope="col"${num.has(i) ? ' class="num"' : ""}>${h}</th>`).join("")}</tr></thead>
  <tbody>${t.rows
    .map(
      (r, ri) =>
        `<tr${strong.has(ri) ? ' class="total"' : ""}>${r
          .map((c, ci) => {
            const cls = [num.has(ci) ? "num" : "", unv.has(`${ri}:${ci}`) ? "unv" : ""].filter(Boolean).join(" ");
            const tag = ci === 0 ? "th" : "td";
            return `<${tag}${ci === 0 ? ' scope="row"' : ""}${cls ? ` class="${cls}"` : ""}>${cell(c)}</${tag}>`;
          })
          .join("")}</tr>`,
    )
    .join("")}</tbody>
</table></div>`;
}

export function timeline(ctx: Ctx, items: TimelineItem[]): string {
  return `<ol class="tl">${items
    .map(
      (i) =>
        `<li${i.next ? ' class="next"' : ""}><span class="d">${i.d}</span><span class="e">${rich(ctx, i.e)}${
          i.src ? `<span class="s">${rich(ctx, i.src)}</span>` : ""
        }</span></li>`,
    )
    .join("")}</ol>`;
}

export function questions(list: OpenQuestion[], label = "Open"): string {
  return `<ul class="qs">${list
    .map(
      (q) =>
        `<li><span class="q">${q.q}${q.why ? `<span class="why">${q.why}</span>` : ""}</span><span class="st st-open">${label}</span></li>`,
    )
    .join("")}</ul>`;
}

export function bullets(ctx: Ctx, list: string[], cls = "bul"): string {
  return `<ul class="${cls}">${list.map((x) => `<li>${rich(ctx, x)}</li>`).join("")}</ul>`;
}

export function docs(list: DocLink[]): string {
  return `<ul class="docs">${list
    .map(
      (d) => `<li><span class="d">${d.tag}</span><span class="t"><a href="${esc(d.url)}" target="_blank" rel="noopener">${d.title}</a>${
        d.note ? `<span class="n">${d.note}</span>` : ""
      }</span><span class="k">${d.kind}</span></li>`,
    )
    .join("")}</ul>`;
}

export function chip(text: string, kind: "hold" | "open" | "good" | "plain" = "plain"): string {
  return `<span class="st st-${kind}">${text}</span>`;
}

export function prose(ctx: Ctx, paras: string[]): string {
  return `<div class="prose">${paras.map((p) => `<p>${rich(ctx, p)}</p>`).join("")}</div>`;
}

const DL_ICON = `<svg class="ic" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 2.5v8M4.5 7 8 10.5 11.5 7M3 13.5h10"/></svg>`;

function docIcon(label: string): string {
  return `<span class="rep-doc" aria-hidden="true"><svg width="34" height="42" viewBox="0 0 34 42"><path d="M3 1.5h19l9 9V39a1.5 1.5 0 0 1-1.5 1.5h-25A1.5 1.5 0 0 1 3 39z" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M22 1.5v9h9" fill="none" stroke="currentColor" stroke-width="1.5"/></svg><b>${label}</b></span>`;
}

export interface ReportCard {
  date: string;
  title: string;
  desc: string;
  url: string;
  format: "PDF" | "Web page";
  kind: string;
  length?: string;
  update?: string;
}

/** One report as a card with a download or read button. */
export function reportCard(r: ReportCard, full = false, ctx?: Ctx): string {
  const pdf = r.format === "PDF";
  const meta = [r.date, r.kind, r.length].filter(Boolean).map((m) => `<span>${m}</span>`).join("");
  return `<article class="rep${r.kind === "Opinion" ? " op" : ""}">
  ${docIcon(pdf ? "PDF" : "WEB")}
  <div class="rep-body">
    <p class="rep-meta">${meta}</p>
    <h3><a href="${esc(r.url)}" target="_blank" rel="noopener">${r.title}</a></h3>
    ${r.desc ? `<p class="rep-desc">${r.desc}</p>` : ""}
    ${r.update ? (full ? `<p class="rep-upd"><strong>Correction and update.</strong> ${ctx ? rich(ctx, r.update) : r.update}</p>` : `<p class="rep-upd-s">Corrected and updated since publication. See the Reports page.</p>`) : ""}
  </div>
  <a class="btn btn-sm rep-dl" href="${esc(r.url)}" target="_blank" rel="noopener">${pdf ? `${DL_ICON} Download PDF` : `Read ${ICON.out}`}</a>
</article>`;
}

/** A band of report cards placed near the top of a page, so reports are one click away. */
export function reportStrip(o: { title: string; note?: string; cards: string[]; more?: string }): string {
  return `<section class="rstrip" aria-label="${esc(o.title)}">
  <div class="wrap rstrip-in">
    <div class="rstrip-h"><div><h2>${o.title}</h2>${o.note ? `<p>${o.note}</p>` : ""}</div>${o.more ?? ""}</div>
    <div class="reps">${o.cards.join("")}</div>
  </div>
</section>`;
}

/** Numbered source list for the bottom of a page. Renders nothing if the page cites nothing. */
export function sourcesSection(ctx: Ctx, checked: string): string {
  const list = ctx.cites.entries();
  if (!list.length) return "";
  const host = (u: string) => {
    try {
      return new URL(u).hostname.replace(/^www\./, "");
    } catch {
      return "";
    }
  };
  return `<section class="sec sources" aria-labelledby="sources-${ctx.route}-h">
  <div class="wrap sec-in">
    <div class="sec-h"><div class="sec-t"><h2 id="sources-${ctx.route}-h">Sources</h2><p>Each number on this page points to the source below. Checked against the source documents on ${checked}. Items in <span class="unv">pink</span> are not yet verified against a source document.</p></div></div>
    <ol class="srcs">${list
      .map(
        ({ n, s }) => `<li id="${ctx.cites.anchorId(n)}"><span class="sn mono">${n}</span><div class="sb">${
          s.url ? `<a href="${esc(s.url)}" target="_blank" rel="noopener">${s.title}</a>` : `<span class="st-t">${s.title}</span>`
        }<span class="sp">${[s.publisher, s.date].filter(Boolean).join(", ")}${s.url ? ` · <span class="sh">${host(s.url)}</span>` : ""}</span>${
          s.note ? `<span class="snote">${s.note}</span>` : ""
        }</div><span class="skind">${s.kind}</span></li>`,
      )
      .join("")}</ol>
  </div>
</section>`;
}

/** Status chip for a proposed dashboard module. */
export function moduleChip(status: string, when?: string): string {
  const kind = status === "Sign-up open" ? "good" : status === "Prototype" || status === "Designed" ? "open" : "plain";
  return `<span class="st st-${kind}">${status}${when ? `, ${when}` : ""}</span>`;
}
