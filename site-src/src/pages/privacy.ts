import { SITE } from "../config.ts";
import {
  CONSTITUTION_INTRO,
  CONSTITUTION_NOTE,
  COURTS,
  CRITICS,
  FLOCK_RESPONSE,
  HOW_IT_WORKS,
  LOCAL_PLAN,
  PV_DOCS,
  PV_FACTS,
  PV_LEDE,
  PV_QUESTIONS,
  PV_QUESTIONS_NOTE,
  PV_STANCE_SHORT,
  PV_TODO,
  RIGHTS,
  RIGHTS_AFTER,
  RIGHTS_INTRO,
  RIGHTS_NOTE,
  SAPD_MEETINGS,
  STANCE,
  STANCE_AFTER,
  SUPPORTERS,
} from "../content/privacy.ts";
import { bullets, chip, docs, facts, ICON, keyPoints, pageHead, prose, questions, section, timeline } from "../render/components.ts";
import { anchorLink, type Ctx, rich } from "../render/html.ts";
import { bottomLine, moreHead, nextStep } from "../render/guide.ts";

export function privacyPage(ctx: Ctx): string {
  const sides = `<div class="split">
    <div class="panel"><h3>What supporters say</h3><ul class="plain">${SUPPORTERS.map((s) => `<li>${rich(ctx, s)}</li>`).join("")}</ul></div>
    <div class="panel"><h3>What critics raise</h3><ul class="plain">${CRITICS.map((s) => `<li>${rich(ctx, s)}</li>`).join("")}</ul></div>
  </div>
  <div class="aside-box"><h3>Flock's response</h3><p>${rich(ctx, FLOCK_RESPONSE)}</p></div>`;

  const stanceBar = `<div class="wrap stance-wrap"><div class="stance-bar">
    <p><strong>Our view.</strong> ${PV_STANCE_SHORT.replace(/^Our view: /, "")}</p>
    <span class="stance-links">${anchorLink(ctx, "privacy", "stand", `Where we stand ${ICON.arrow}`, "stance-go")}${anchorLink(ctx, "privacy", "rights", `Bill of Rights ${ICON.arrow}`, "stance-go")}</span>
  </div></div>`;

  const plan = `<ol class="lplan">${LOCAL_PLAN.map((x, i) => `<li><span class="lp-n mono">${i + 1}</span><h3>${x.k}</h3><p>${x.v}</p></li>`).join("")}</ol>`;

  const stance = `<div class="stance">
    ${prose(ctx, STANCE)}
    <div class="aside-box sapd"><h3>Working with SAPD</h3>${SAPD_MEETINGS.map((x) => `<p>${x}</p>`).join("")}<p class="note">The author's own account of the meetings. Spencer builds AI systems and is helping SAPD decide how to choose a local company to build this system. ${anchorLink(ctx, "about", "disclosure", "Read the disclosure")}</p></div>
    <h3 class="sub-h">How a local system would work</h3>
    ${plan}
    ${prose(ctx, STANCE_AFTER)}
  </div>`;

  let n = 0;
  const rights = `<div class="bor">
    <p class="bor-intro">${RIGHTS_INTRO}</p>
    <div class="bor-grid">${RIGHTS.map(
      (g) => `<section class="bor-g" aria-label="${g.title}">
        <h3>${g.title}</h3>
        <p class="bor-lede">${g.lede}</p>
        <ol class="bor-list">${g.rights.map((r) => `<li><span class="bor-n mono">${++n}</span><div><b>${r.k}.</b> ${r.v}</div></li>`).join("")}</ol>
      </section>`,
    ).join("")}</div>
    <p class="bor-after"><b>School district.</b> ${RIGHTS_AFTER}</p>
    <p class="note">${RIGHTS_NOTE}</p>
  </div>`;

  return `${pageHead({
    eyebrow: "Flock cameras",
    title: "License plate cameras and police drones",
    lede: PV_LEDE,
    meta: [`Updated ${SITE.updated}`],
  })}
${bottomLine(ctx, "In 2025 the City bought cameras that read every passing license plate, plus police drones. We support catching criminals. We believe the City should own the system, keep the data here, and search it only for an alert or a warrant.")}
${keyPoints(ctx, [
  { kicker: "The contract", big: "$309,050", text: "The spending limit for Flock plate cameras and police drones. Council approved it 7 to 0 on Oct 7, 2025.", tone: "city", cite: ["cc-agenda-2025-10-07", "cc-minutes-2025-10-07"] },
  { kicker: "How it works", big: "Every plate", text: "Each camera photographs passing vehicles and reads the plate. A match to a hotlist alerts officers.", tone: "ink", cite: ["npr-2026-02-17", "flock-lpr-product"], link: anchorLink(ctx, "privacy", "how", `How the system works ${ICON.arrow}`, "key-go") },
  { kicker: "Who pays", big: "Mostly grants", text: "Two state awards total $464,961. The local match is $77,495.", tone: "county", cite: ["cc-packet-2025-10-07"] },
  { kicker: "Our view", big: "Own it locally", text: "We support cameras the City owns, kept off the internet, and searched only for an APB or a warrant.", tone: "saisd", link: anchorLink(ctx, "privacy", "stand", `Where we stand ${ICON.arrow}`, "key-go") },
])}

${section({ id: "act", title: "What you can do", body: bullets(ctx, PV_TODO) })}

${moreHead()}
${section({ id: "stand", fold: true, title: "Where we stand", note: "Our opinion, labeled as such: a City-owned system, kept local.", body: stance })}

${section({ id: "rights", fold: true, title: "A Technology Bill of Rights", note: "Our proposal: 15 rules for how the City and County use technology.", body: rights })}

${section({ id: "glance", fold: true, title: "What the City bought", note: "The contract, the vote, who pays, and how many cameras.", body: facts(ctx, PV_FACTS) })}

${section({ id: "how", title: "How the system works", note: "What the cameras record, how long it is kept, and who can search it.", body: prose(ctx, HOW_IT_WORKS), fold: true })}

${section({ id: "constitution", fold: true, title: "The constitutional questions", note: CONSTITUTION_NOTE, body: `${prose(ctx, CONSTITUTION_INTRO)}<h3 class="sub-h">How the courts have ruled</h3>${timeline(ctx, COURTS)}` })}

${section({ id: "sides", title: "The case for and against", note: "The arguments as each side makes them in the national debate over Flock. Our own view is above, under Where we stand.", body: sides, fold: true })}

${section({ id: "open", title: "Questions residents ask", note: PV_QUESTIONS_NOTE, body: questions(PV_QUESTIONS), fold: true })}

${section({ id: "docs", title: "Documents and coverage", note: "The agenda, packet, minutes, court rulings, and news coverage behind this page.", body: docs(PV_DOCS), fold: true })}

${nextStep(ctx, { step: "You made it through", title: "Help keep this going", text: "This site is paid for by citizens. Help us build the live dashboard: debt, budgets, votes, and alerts.", route: "proposal", label: "Support Transparency" })}`;
}
