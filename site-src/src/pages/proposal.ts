import { SITE } from "../config.ts";
import {
  DONE_SO_FAR,
  FLOW,
  MODULES,
  PROPOSAL_LEDE,
  ROLLOUT,
  SPONSOR,
  STILL_TO_BUILD,
  WHY_HARD,
} from "../content/proposal.ts";
import { chip, ICON, moduleChip, pageHead, section } from "../render/components.ts";
import { type Ctx, rich, usd } from "../render/html.ts";
import { TOUR } from "../content/proposal.ts";

export function proposalPage(ctx: Ctx): string {
  const status = `<div class="split">
    <div class="panel"><h3>Done in Phase 0</h3><ul class="checks">${DONE_SO_FAR.map((s) => `<li>${ICON.check}<span>${rich(ctx, s)}</span></li>`).join("")}</ul></div>
    <div class="panel todo"><h3>Still to build</h3><ul class="checks">${STILL_TO_BUILD.map((s) => `<li><span class="box" aria-hidden="true"></span><span>${s}</span></li>`).join("")}</ul></div>
  </div>`;

  const flow = `<ol class="flow">${FLOW.map(
    (f, i) => `<li><span class="fl-n mono">${i + 1}</span><h3>${f.k}</h3><p>${f.v}</p></li>`,
  ).join("")}</ol>
  <div class="aside-box"><h3>Why this takes real development</h3><ul class="plain">${WHY_HARD.map((w) => `<li>${w}</li>`).join("")}</ul></div>`;

  const modules = `<ul class="builds">${MODULES.map(
    (m) => `<li><div class="b-top"><h3>${m.name}</h3>${moduleChip(m.status, m.when)}</div><p>${m.what}</p></li>`,
  ).join("")}</ul>
  <p class="note">Prototype: an early working draft, not public. Designed: drawn and specified, not built. Planned: scoped for a later phase.</p>`;

  const rollout = `<ol class="rollout">${ROLLOUT.map(
    (r) => `<li${r.now ? ' class="now"' : ""}><span class="ro-name">${r.name}</span><span class="ro-what">${r.what}</span>${r.now ? '<span class="ro-tag">Now</span>' : ""}</li>`,
  ).join("")}</ol>
  <p class="note">${rich(ctx, "One government at a time, so each runs on its own before the next is added. {{c:internal-project-notes}}")}</p>`;

  const sponsor = `<section class="sec sponsor" id="sponsor" aria-labelledby="sponsor-h">
  <div class="wrap sec-in">
    <div class="sp-grid">
      <div class="sp-copy">
        <p class="eyebrow">Sponsor the build</p>
        <h2 id="sponsor-h">What it takes to build</h2>
        <p class="sp-lede">${SPONSOR.lede}</p>
        ${SPONSOR.why.map((p) => `<p>${p}</p>`).join("")}
        <h3>How sponsorship works</h3>
        <ul class="plain">${SPONSOR.terms.map((t) => `<li>${t}</li>`).join("")}</ul>
      </div>
      <aside class="sp-card" aria-label="Estimated cost to build">
        <p class="sp-k">Estimated cost to build</p>
        <p class="sp-fig mono">${usd(SPONSOR.low)} <span>to</span> ${usd(SPONSOR.high)}</p>
        <p class="sp-time">A few months of development and validation</p>
        <h3>What it pays for</h3>
        <ul class="checks">${SPONSOR.pays.map((p) => `<li>${ICON.check}<span>${p}</span></li>`).join("")}</ul>
        <form class="form" id="sponsor-form" data-form="sponsor" novalidate>
          <div class="hp" aria-hidden="true"><label for="sp-hp">Leave this empty</label><input id="sp-hp" type="text" name="_gotcha" tabindex="-1" autocomplete="off"></div>
          <div class="f2">
            <div class="fld"><label for="sp-name">Name</label><input id="sp-name" name="name" type="text" autocomplete="name" required></div>
            <div class="fld"><label for="sp-email">Email</label><input id="sp-email" name="email" type="email" autocomplete="email" required></div>
          </div>
          <div class="fld"><label for="sp-org">Business or organization <span class="opt">(optional)</span></label><input id="sp-org" name="organization" type="text" autocomplete="organization"></div>
          <div class="fld"><label for="sp-amt">Level you are considering</label>
            <select id="sp-amt" name="level"><option>Not sure yet</option><option>Under $1,000</option><option>$1,000 to $5,000</option><option>$5,000 to $10,000</option><option>$10,000 or more</option></select></div>
          <div class="fld"><label for="sp-msg">Message <span class="opt">(optional)</span></label><textarea id="sp-msg" name="message" rows="3"></textarea></div>
          <button class="btn btn-block" type="submit">Tell us you're interested</button>
        </form>
        <p class="fine">Or email <span class="sel mono">${SITE.contactEmail}</span> <button class="copy" type="button" data-copy="${SITE.contactEmail}">Copy</button></p>
      </aside>
    </div>
  </div>
</section>`;

  const base = ctx.mode === "artifact" ? `${SITE.origin}/assets/tour/` : "/assets/tour/";
  const flat = TOUR.flatMap((g) => g.items);
  let n = -1;
  const tour = `<div class="tour" data-tour>
    <div class="tour-list" role="tablist" aria-label="Dashboard features">
      ${TOUR.map(
        (g) => `<p class="tour-g">${g.group}</p>${g.items
          .map((x) => {
            n++;
            return `<button type="button" role="tab" aria-selected="${n === 0}" data-tour-i="${n}"><span class="tl-t"><b>${x.k}</b><span>${x.v}</span></span><svg class="tl-go" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3.5 10.5 8 6 12.5"/></svg></button>`;
          })
          .join("")}`,
      ).join("")}
    </div>
    <figure class="ipad tour-ipad">
      <div class="ipad-body">
        <div class="ipad-screen tour-screen">
          ${flat.map((x, i) => `<img${i === 0 ? ' class="on"' : ""} src="${base}${x.file}" alt="Dashboard prototype: ${x.k}" width="1400" height="973" decoding="async"${i === 0 ? "" : ' loading="lazy"'}>`).join("\n          ")}
          <span class="nv-mark" aria-hidden="true">Not validated</span>
        </div>
      </div>
      <figcaption>Prototype screens with sample figures. <b class="nv-text">Not validated</b> against the source documents yet.</figcaption>
    </figure>
  </div>`;

  return `${pageHead({
    eyebrow: "Proposal",
    title: "A public finance dashboard for San Angelo",
    lede: PROPOSAL_LEDE,
    meta: [chip("Phase 0: research and design", "open"), chip("Dashboard not yet built", "hold"), `Updated ${SITE.updated}`],
  })}

${section({ id: "tour", title: "Tour the prototype", note: "Click a feature on the left to show it on the iPad. These are design screens; the figures in them have not been checked.", body: tour })}

${section({ id: "status", title: "Where it stands", note: "Phase 0 is the groundwork. The dashboard itself is not built yet.", body: status, band: true })}

${section({ id: "works", title: "How it would work", note: "Public records go in one end, and checked figures come out the other, on a schedule, with little hand work.", body: flow })}

${section({ id: "modules", title: "What the dashboard would do", note: "Ten parts, built in phases. Most of it is not built yet.", body: modules, band: true })}

${section({ id: "rollout", title: "Rollout", body: rollout })}

${sponsor}`;
}
