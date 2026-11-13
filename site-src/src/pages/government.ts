import { SITE } from "../config.ts";
import { GOV_PAGES, type GovId, type GovPage } from "../content/governments.ts";
import { type Question, QUESTIONS } from "../content/questions.ts";
import { byTopic, type ReportTopic } from "../content/reports.ts";
import { ICON, keyPoints, section } from "../render/components.ts";
import { esc, type Ctx, href, rich } from "../render/html.ts";
import { GI } from "../render/icons.ts";
import { tiles } from "../render/tiles.ts";
import { reportsFor } from "./reports.ts";

const STATUS_KIND: Record<string, string> = { "Not yet asked": "plain", Asked: "open", Answered: "good", "No reply": "hold", Resolved: "good" };

/** One open question as a card. */
export function questionCard(ctx: Ctx, q: Question, showGov = true): string {
  const govs = q.gov.map((g) => GOV_PAGES[g]);
  return `<article class="qcard${q.unv ? " unv-card" : ""}" id="q-${q.id}">
  <div class="qc-top">
    <span class="qc-topic">${q.topic}</span>
    ${showGov ? govs.map((g) => `<a class="qc-gov tone-${g.tone}" href="${href(ctx, g.id)}"><i class="dot"></i>${g.short}</a>`).join("") : ""}
    <span class="st st-${STATUS_KIND[q.status]} qc-st">${q.status}${q.asked ? `, ${q.asked}` : ""}</span>
  </div>
  <h3>${q.q}</h3>
  <dl class="qc-dl">
    <div><dt>What the record shows</dt><dd>${rich(ctx, q.record)}</dd></div>
    <div><dt>Who can answer</dt><dd>${q.who}</dd></div>
    ${q.answer ? `<div class="qc-ans"><dt>Their answer</dt><dd>${rich(ctx, q.answer)}</dd></div>` : ""}
  </dl>
</article>`;
}

const TOPICS: Partial<Record<GovId, ReportTopic>> = { saisd: "finances" };

function bondsSection(ctx: Ctx): string {
  return section({
    id: "bonds",
    title: "The 2025 school bonds",
    note: "Proposition A, approved by voters on May 3, 2025.",
    band: true,
    body: `<div class="bond-steps">
      <div class="bs"><span class="bs-k">Approved</span><b class="mono">$397.0M</b><p>${rich(ctx, "For new and rebuilt schools and safety work. {{c:saisd-election-notice-2025}}")}</p></div>
      <div class="bs"><span class="bs-k">Borrowed</span><b class="mono">$385.1M</b><p>${rich(ctx, "Sold in 2025, plus a premium of about $16.9 million. {{c:saisd-hb1378}}")}</p></div>
      <div class="bs alt"><span class="bs-k">Interest on it</span><b class="mono">$424.5M</b><p>${rich(ctx, "More than the amount borrowed, paid through 2055. {{c:saisd-hb1378}}")}</p></div>
      <div class="bs"><span class="bs-k">Unspent, Sep 30, 2026</span><b class="mono">$361.5M</b><p>${rich(ctx, "Still in the construction fund. {{c:saisd-invest-sep2026}}")}</p></div>
    </div>
    <div class="callout"><b>Payments are back-loaded.</b> ${rich(ctx, "Repayment of principal on the 2025 bonds does not begin until February 2028, and the largest payments come near the end, through 2055. {{c:saisd-hb1378}} Back-loading keeps early payments low and raises the total interest.")}</div>`,
  });
}

function appraisalSection(ctx: Ctx): string {
  return section({
    id: "check",
    title: "Coming: an appraisal check for every property",
    note: "See if your value is in line with similar properties nearby, before the protest deadline.",
    band: true,
    body: `<div class="promo">
      <div class="promo-ic">${GI.appraisal}</div>
      <div class="promo-t"><p>${rich(ctx, "Each spring the District mails appraisal notices. Owners can protest by May 15, or 30 days after the notice arrives, whichever is later. {{c:tx-tax-41-44}} Most people never check whether their value is in line with their neighbors'. We are building a tool that does it for you, for homes, rentals, and businesses.")}</p>
      <a class="btn btn-lg" href="${href(ctx, "appraisal-check")}">Get early access ${ICON.arrow}</a></div>
    </div>`,
  });
}

function devcorpSection(ctx: Ctx): string {
  return section({
    id: "sales",
    title: "Where the half-cent goes",
    note: "Sales tax collected for the Development Corporation each fiscal year.",
    band: true,
    body: `<div class="fin-card"><div class="mini-bars">${[
      ["FY2022", 11.2],
      ["FY2023", 12.21],
      ["FY2024", 12.4],
      ["FY2025", 12.8],
    ]
      .map(([y, v]) => `<div class="mb"><i style="height:${((Number(v) / 14) * 100).toFixed(1)}%"></i><b class="mono unv">$${Number(v).toFixed(1)}M</b><span>${y}</span></div>`)
      .join("")}</div><p class="note">${rich(ctx, "From the Development Corporation's monthly statements. Being rechecked. {{c:cosadc-financials}}")}</p></div>`,
  });
}

export function govPage(ctx: Ctx, id: GovId): string {
  const g: GovPage = GOV_PAGES[id];
  const qs = QUESTIONS.filter((q) => q.gov.includes(id));
  const others = (Object.values(GOV_PAGES) as GovPage[]).filter((x) => x.id !== id);

  const watch = `<div class="watch">${g.watch
    .map((w) => `<div class="w${w.unv ? " unv-card" : ""}">${w.fig ? `<b class="w-fig mono">${w.fig}</b>` : ""}<h3>${w.k}</h3><p>${rich(ctx, w.v)}</p></div>`)
    .join("")}</div>${g.watchNote ? `<p class="note">${g.watchNote}</p>` : ""}`;

  const mark = (s: string) => (s === "yes" ? `<span class="rc rc-yes">${ICON.check}Posted</span>` : s === "no" ? `<span class="rc rc-no">${ICON.close.replace('width="20" height="20"', 'width="14" height="14"')}Missing</span>` : `<span class="rc rc-unk">${ICON.dash}Partial</span>`);
  const records = `<ul class="rec">${g.records.map((r) => `<li>${mark(r.status)}<span class="rec-w"><b>${r.what}</b><span>${r.note}</span></span></li>`).join("")}</ul>
  <p class="note">${rich(ctx, g.recordsNote)}</p>
  <div class="find">${g.find.map((f) => `<a class="find-a" href="${esc(f.url)}" target="_blank" rel="noopener">${f.label} ${ICON.out}</a>`).join("")}</div>`;

  const qBlock = qs.length
    ? `<div class="qgrid">${qs.map((q) => questionCard(ctx, q, false)).join("")}</div><p class="note">We send each question to the office named. Their answer is posted here as given. <a href="${href(ctx, "questions")}">All open questions</a></p>`
    : "";

  const extra = g.extra === "bonds" ? bondsSection(ctx) : g.extra === "appraisal" ? appraisalSection(ctx) : g.extra === "devcorp" ? devcorpSection(ctx) : "";
  const topic = TOPICS[id];

  return `<header class="phead wrap gov-head tone-${g.tone}">
  <nav class="crumbs" aria-label="Breadcrumb"><span>Governments</span><span aria-hidden="true">/</span><span>${g.short}</span></nav>
  <div class="gh-row"><span class="gh-ic">${GI[g.icon]}</span><div><h1>${g.name}</h1></div></div>
  <p class="lede">${g.lede}</p>
  <p class="meta"><span>${g.who}</span><span>Updated ${SITE.updated}</span></p>
</header>
<nav class="wrap gov-switch" aria-label="Governments">${(Object.values(GOV_PAGES) as GovPage[])
    .map((x) => `<a class="tone-${x.tone}" href="${href(ctx, x.id)}"${x.id === id ? ' aria-current="page"' : ""}><span class="gs-ic">${GI[x.icon]}</span>${x.short}</a>`)
    .join("")}</nav>

${keyPoints(ctx, g.keys, "Key numbers")}

${section({ id: "watch", title: "What to know", note: "The figures and changes worth your attention.", body: watch })}

${extra}

${qs.length ? section({ id: "questions", title: "Open questions", note: "What the record does not answer yet.", body: qBlock, band: !extra }) : ""}

${section({ id: "records", title: "What they post, and what is missing", note: "A public body's records should be easy to find. Here is what we found.", body: records, band: !!extra })}

${topic ? reportsFor(ctx, byTopic(topic)) : ""}

<section class="sec"><div class="wrap sec-in"><div class="sec-h"><div class="sec-t"><h2>Related</h2></div></div>${tiles(ctx, g.related)}
<p class="sub-h gov-others">Other governments</p>${tiles(ctx, others.map((x) => ({ route: x.id, label: x.short === "SAISD" ? "San Angelo ISD" : x.name, desc: "", icon: x.icon, tone: x.tone })), "t-small")}</div></section>`;
}
