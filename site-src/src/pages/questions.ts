import { SITE } from "../config.ts";
import { GOV_PAGES, type GovPage } from "../content/governments.ts";
import { QUESTIONS } from "../content/questions.ts";
import { keyPoints, pageHead } from "../render/components.ts";
import { type Ctx, href } from "../render/html.ts";
import { questionCard } from "./government.ts";

export function questionsPage(ctx: Ctx): string {
  const govs = Object.values(GOV_PAGES) as GovPage[];
  const count = (s: string) => QUESTIONS.filter((q) => q.status === s).length;
  const filters = `<div class="qf" role="toolbar" aria-label="Filter questions by government">
    <button type="button" class="qf-b" aria-pressed="true" data-qf="all">All <span class="mono">${QUESTIONS.length}</span></button>
    ${govs
      .map((g) => {
        const n = QUESTIONS.filter((q) => q.gov.includes(g.id)).length;
        return n ? `<button type="button" class="qf-b tone-${g.tone}" aria-pressed="false" data-qf="${g.id}"><i class="dot"></i>${g.short} <span class="mono">${n}</span></button>` : "";
      })
      .join("")}
  </div>`;

  return `${pageHead({
    eyebrow: "Open Questions",
    title: "What the record does not answer yet",
    lede: "Each card is a question the public record leaves open, with what the record shows and who can answer it. We send each one to that office and post the answer as given.",
    meta: [`Updated ${SITE.updated}`],
  })}

${keyPoints(ctx, [
  { kicker: "Open", big: String(QUESTIONS.length), text: "Questions on the list.", tone: "ink" },
  { kicker: "Answered", big: String(count("Answered") + count("Resolved")), text: "Answers received so far. We post each one in full.", tone: "saisd" },
  { kicker: "How it works", big: "Ask, then post", text: "We send each question to the office named and give it time to reply.", tone: "city" },
], "Where it stands")}

<section class="sec"><div class="wrap sec-in">
  ${filters}
  <div class="qgrid" data-qgrid>${QUESTIONS.map((q) => `<div class="qwrap" data-gov="${q.gov.join(" ")}">${questionCard(ctx, q)}</div>`).join("")}</div>
  <p class="note">Pink cards rest on our own review of the records and are being rechecked against each document. Know the answer, or have a record that settles one? Use the <a href="${href(ctx, "tips")}">tip line</a>.</p>
</div></section>`;
}
