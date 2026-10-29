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
import { bullets, chip, docs, facts, ICON, pageHead, prose, questions, section, timeline } from "../render/components.ts";
import { anchorLink, type Ctx, rich } from "../render/html.ts";

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
    <div class="aside-box sapd"><h3>Working with SAPD</h3>${SAPD_MEETINGS.map((x) => `<p>${x}</p>`).join("")}<p class="note">The author's own account of the meetings. Spencer builds AI systems and is helping SAPD set the selection criteria for a local company to build this system. ${anchorLink(ctx, "about", "disclosure", "Read the disclosure")}</p></div>
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
    meta: [`Updated ${SITE.updated}`, chip("Contract approved Oct 2025", "plain")],
  })}
${stanceBar}

${section({ id: "glance", title: "At a glance", note: "From the City's agenda, packet, and minutes for Oct 7, 2025, unless marked. Pink text rests on news coverage only.", body: facts(ctx, PV_FACTS) })}

${section({ id: "how", title: "How the system works", body: prose(ctx, HOW_IT_WORKS), band: true })}

${section({ id: "constitution", title: "The constitutional questions", note: CONSTITUTION_NOTE, body: `${prose(ctx, CONSTITUTION_INTRO)}<h3 class="sub-h">How the courts have ruled</h3>${timeline(ctx, COURTS)}` })}

${section({ id: "sides", title: "The case for and against", note: "The arguments as each side makes them in the national debate over Flock. Our own view follows in the next section.", body: sides, band: true })}

${section({ id: "stand", title: "Where we stand", note: "This section is our opinion, labeled as such. The rest of this page sticks to the record.", body: stance, aside: chip("Opinion", "plain") })}

${section({ id: "rights", title: "A Technology Bill of Rights", note: "Our proposal for the City of San Angelo and Tom Green County.", body: rights, aside: chip("Proposal", "plain"), band: true })}

${section({ id: "open", title: "Questions residents ask", note: PV_QUESTIONS_NOTE, body: questions(PV_QUESTIONS) })}

${section({ id: "act", title: "What you can do", body: bullets(ctx, PV_TODO), band: true })}

${section({ id: "docs", title: "Documents and coverage", body: docs(PV_DOCS) })}`;
}
