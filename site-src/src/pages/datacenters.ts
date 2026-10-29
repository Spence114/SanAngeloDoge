import { SITE } from "../config.ts";
import {
  ASK_ANY_PROPOSAL,
  BAD_SIGNS,
  FOURTH_COMPANY,
  GOOD_SIGNS,
  PROJECT_PAGES,
  PROJECTS,
  type ProjectId,
  SCORECARD,
  SIGNS_NOTE,
  TIMELINE_2026,
  TYPES_NOTE,
  TYPES_TABLE,
  WHAT_IT_IS,
  WHO_DECIDES,
} from "../content/datacenters.ts";
import {
  bullets,
  chip,
  docs,
  facts,
  ICON,
  pageHead,
  prose,
  questions,
  section,
  table,
  timeline,
} from "../render/components.ts";
import { type Ctx, cite, href, rich } from "../render/html.ts";
import { byTopic } from "../content/reports.ts";
import { reportsFor } from "./reports.ts";

function projectCards(ctx: Ctx): string {
  // Cards are not links as a whole: they hold citation links, and anchors cannot nest.
  return `<div class="projects">${PROJECTS.map(
    (p) => `<article class="proj">
    <div class="proj-h"><h3><a href="${href(ctx, p.id)}">${p.name}</a></h3><p>${p.where}${cite(ctx, ...p.whereCite)}</p></div>
    <dl>
      ${p.rows.map((r) => `<div><dt>${r.k}</dt><dd>${r.unv ? `<span class="unv">${r.v}</span>` : r.v}${cite(ctx, ...r.cite)}</dd></div>`).join("")}
      <div><dt>Status</dt><dd>${chip(p.status, "hold")}${cite(ctx, ...p.statusCite)}</dd></div>
    </dl>
    <a class="go" href="${href(ctx, p.id)}">Project page ${ICON.arrow}</a>
  </article>`,
  ).join("")}</div>`;
}

export function dataCentersPage(ctx: Ctx): string {
  const signs = `<div class="split">
    <div class="panel good"><h3>Signs it can work</h3><ul class="checks">${GOOD_SIGNS.map((s) => `<li>${ICON.check}<span>${s}</span></li>`).join("")}</ul></div>
    <div class="panel bad"><h3>Signs it will cost us</h3><ul class="checks">${BAD_SIGNS.map((s) => `<li>${ICON.dash}<span>${s}</span></li>`).join("")}</ul></div>
  </div>`;

  return `${pageHead({
    eyebrow: "Data center guide",
    title: "Data centers in Tom Green County",
    lede: "Three companies have proposed data center campuses around San Angelo. This guide explains what a data center is, when one helps a community and when it costs one, who has the power to say yes or no, and where each project stands today.",
    meta: [`Updated ${SITE.updated}`, "3 proposals", "All waiting on state audits"],
  })}

${reportsFor(ctx, byTopic("data-centers"))}

${section({
  id: "where",
  title: "Where each project stands",
  note: "Two would plug into the AEP Red Creek substation northeast of town. The third would build its own gas-fired power plant southwest of town.",
  body: projectCards(ctx) + `<p class="note">${rich(ctx, FOURTH_COMPANY)}</p>`,
})}

${section({
  id: "what",
  title: "What a data center is",
  body: prose(ctx, WHAT_IT_IS) + table(ctx, TYPES_TABLE, "Traditional and AI data centers compared") + `<p class="note">${TYPES_NOTE}</p>`,
  band: true,
})}

${section({
  id: "tests",
  title: "When a data center helps a community, and when it costs one",
  note: "The same building can be either. The terms decide which.",
  body: signs + `<p class="note">${rich(ctx, SIGNS_NOTE)}</p>`,
})}

${section({
  id: "scorecard",
  title: "The three projects against those tests",
  note: "From public records and the companies' own statements. Pink cells come from company statements not yet confirmed in a filing or agreement.",
  body: table(ctx, SCORECARD, "Scorecard for the three projects"),
  band: true,
})}

${section({
  id: "who",
  title: "Who decides what",
  note: "Inside city limits, the City Council has real tools. On county land, most of the decisions are in Austin.",
  body: table(ctx, WHO_DECIDES, "Who decides each question"),
})}

${section({ id: "timeline", title: "2026 timeline", note: "Local and state actions that shape all three projects.", body: timeline(ctx, TIMELINE_2026), band: true })}

${section({
  id: "ask",
  title: "Questions to bring to any data center proposal",
  note: "Use these at City Council, Commissioners Court, or a community meeting.",
  body: `<ol class="asklist">${ASK_ANY_PROPOSAL.map((q) => `<li>${q}</li>`).join("")}</ol>`,
})}`;
}

export function projectPage(ctx: Ctx, id: ProjectId): string {
  const p = PROJECT_PAGES[id];
  const back = `<nav class="crumbs" aria-label="Breadcrumb"><a href="${href(ctx, "data-centers")}">Data centers</a><span aria-hidden="true">/</span><span>${p.title}</span></nav>`;
  const switcher = `<nav class="switch wrap" aria-label="Data center projects">${PROJECTS.map(
    (x) => `<a href="${href(ctx, x.id)}"${x.id === id ? ' aria-current="page"' : ""}>${x.name}</a>`,
  ).join("")}</nav>`;

  let extra = "";
  if (p.extra) {
    const body = (p.extra.facts ? facts(ctx, p.extra.facts) : "") + (p.extra.table ? table(ctx, p.extra.table, p.extra.title) : "") + (p.extra.tableNote ? `<p class="note">${rich(ctx, p.extra.tableNote)}</p>` : "");
    extra = section({ id: "more", title: p.extra.title, note: p.extra.note ? rich(ctx, p.extra.note) : undefined, body, band: true });
  }

  return `${pageHead({
    eyebrow: p.eyebrow,
    title: p.title,
    lede: p.lede,
    meta: [`Updated ${SITE.updated}`, ...p.chips.map((c) => chip(c, "hold"))],
    back,
  })}
${switcher}

${reportsFor(ctx, byTopic(id), "Our reports on this project")}

${section({ id: "glance", title: "At a glance", note: p.factsNote, body: facts(ctx, p.facts) })}

${extra}

${section({ id: "history", title: "How we got here", body: timeline(ctx, p.timeline), band: !p.extra })}

${section({ id: "open", title: "Open questions", note: "What the public record does not answer yet.", body: questions(p.questions), band: !!p.extra })}

${section({ id: "act", title: "What you can do", note: p.doNote, body: bullets(ctx, p.todo) + (p.todoNote ? `<p class="note">${p.todoNote}</p>` : ""), band: !p.extra })}

${section({ id: "docs", title: "Documents", body: docs(p.docs), band: !!p.extra })}`;
}
