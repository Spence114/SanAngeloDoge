import { IN_PROGRESS, type Report, REPORTS } from "../content/reports.ts";
import { ICON, pageHead, reportCard, reportStrip, section } from "../render/components.ts";
import { type Ctx, href } from "../render/html.ts";

/** Report band for the top of a content page, with a link to the full list. */
export function reportsFor(ctx: Ctx, list: Report[], title = "Our reports"): string {
  if (!list.length) return "";
  return reportStrip({
    title,
    note: "Analysis by San Angelo DOGE, labeled as such. Each opens as a PDF you can save.",
    cards: list.map((r) => reportCard(r)),
    more: `<a class="more" href="${href(ctx, "reports")}">All reports ${ICON.arrow}</a>`,
  });
}

export function reportsPage(ctx: Ctx): string {
  const group = (title: string, note: string, list: Report[], band = false) =>
    !list.length ? "" : section({ title, note, body: `<div class="reps">${list.map((r) => reportCard(r, true, ctx)).join("")}</div>`, band });

  const dc = REPORTS.filter((r) => r.topics.includes("data-centers"));
  const fin = REPORTS.filter((r) => r.topics.includes("finances"));
  const op = REPORTS.filter((r) => r.kind === "Opinion");

  const progress = `<ul class="prog">${IN_PROGRESS.map((p) => `<li><span>${p.title}</span><span class="st st-plain">${p.kind}</span></li>`).join("")}</ul>
  <p class="note">Have records or expertise on one of these? Use the <a href="${href(ctx, "tips")}">tip line</a>. To hear when a report is published, <a href="${href(ctx, "alerts")}">get alerts</a>.</p>`;

  return `${pageHead({
    eyebrow: "Reports",
    title: "Reports and analysis",
    lede: "Analysis and opinion by Spencer Matthews, an independent journalist and San Angelo resident with no financial interest in the projects covered. The data pages stick to the public record; this is where the argument lives. Every report opens as a PDF or page you can save and share.",
  })}

${group("Data centers", "Briefings and analysis on the three proposed campuses.", dc)}

${group("Public finances", "Analysis of local debt and bonds.", fin, true)}

${group("Opinion", "Essays and talks. Opinion, labeled as such.", op)}

${section({ id: "progress", title: "In progress", note: "Reports being researched now.", body: progress, band: op.length > 0 })}`;
}
