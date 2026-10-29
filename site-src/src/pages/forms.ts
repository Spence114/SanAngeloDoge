import { SITE } from "../config.ts";
import { chip, facts, pageHead, section } from "../render/components.ts";
import { anchorLink, type Ctx } from "../render/html.ts";

const LATER = [
  "Data center updates",
  "City budget and votes",
  "County budget and votes",
  "San Angelo ISD",
  "Appraisals and property tax",
  "Flock cameras and drones",
  "A monthly summary",
];

const RADII = ["250 feet", "1,000 feet", "Half a mile", "The whole city"];

const STEPS = [
  { k: "The City posts it", v: "Zoning cases and ordinances go up on the City's agendas and website before the hearings." },
  { k: "Our agent reads it", v: "Software picks up each new case, reads the documents, scanned ones included, and records the address, the change asked for, and the hearing dates." },
  { k: "We map it", v: "Each case goes on the map and is measured against every subscriber's address." },
  { k: "You get an email", v: "What would change, where, the hearing dates, and how to speak. The case is posted on this site too." },
];

/** Rings around a home, not to scale: the state's mailed-notice line, then the distances a subscriber can pick. */
function radiusDiagram(): string {
  const cx = 210;
  const cy = 150;
  const ring = (r: number, cls: string) => `<circle class="${cls}" cx="${cx}" cy="${cy}" r="${r}"/>`;
  const label = (x: number, y: number, t: string, cls = "rd-l") => `<text class="${cls}" x="${x}" y="${y}">${t}</text>`;
  return `<figure class="radius">
  <svg viewBox="0 0 420 300" role="img" aria-label="Rings around a home: the City mails letters within 200 feet. You can choose alerts at 250 feet, 1,000 feet, half a mile, or the whole city. A zoning case about 700 feet away gets no letter but is inside a 1,000-foot alert.">
    <rect class="rd-city" x="6" y="6" width="408" height="288" rx="10"/>
    ${label(20, 282, "The whole city", "rd-l rd-strong")}
    ${ring(134, "rd-ring")}
    ${ring(92, "rd-ring rd-on")}
    ${ring(42, "rd-ring")}
    ${ring(33, "rd-state")}
    <circle class="rd-home" cx="${cx}" cy="${cy}" r="6"/>
    <rect class="rd-case" x="${cx - 69}" y="${cy - 65}" width="14" height="14" rx="2"/>
    <path class="rd-lead" d="M${cx - 69} ${cy - 65}L${cx - 108} ${cy - 92}"/>
    ${label(20, cy - 104, "Zoning case", "rd-l rd-strong")}
    ${label(20, cy - 90, "700 ft away")}
    ${label(cx + 47, cy + 26, "250 ft")}
    ${label(cx + 96, cy + 52, "1,000 ft", "rd-l rd-on-l")}
    ${label(cx + 104, cy + 112, "Half mile")}
    ${label(cx - 15, cy - 12, "Home")}
  </svg>
  <ul class="rd-key">
    <li><i class="k-state" aria-hidden="true"></i>200 ft: the City mails letters to owners</li>
    <li><i class="k-on" aria-hidden="true"></i>Your alert distance (1,000 ft shown)</li>
  </ul>
  <figcaption>Not to scale. A case 700 feet away gets no letter from the City. With a 1,000-foot alert, you hear about it.</figcaption>
</figure>`;
}

export function alertsPage(ctx: Ctx): string {
  const form = `<form class="form form-wide" id="alerts-form" data-form="subscribe" novalidate>
  <div class="hp" aria-hidden="true"><label for="al-hp">Leave this empty</label><input id="al-hp" type="text" name="_gotcha" tabindex="-1" autocomplete="off"></div>
  <div class="f2">
    <div class="fld"><label for="al-email">Email</label><input id="al-email" name="email" type="email" autocomplete="email" required></div>
    <div class="fld"><label for="al-name">Name <span class="opt">(optional)</span></label><input id="al-name" name="name" type="text" autocomplete="name"></div>
  </div>
  <div class="fld"><label for="al-address">Street address in San Angelo <span class="opt">(needed for distance alerts)</span></label><input id="al-address" name="address" type="text" autocomplete="street-address"></div>
  <fieldset class="fld"><legend>How far from your address?</legend><div class="radios">${RADII.map(
    (t, i) => `<label class="ck" for="al-d${i}"><input id="al-d${i}" type="radio" name="distance" value="${t}"${i === 0 ? " checked" : ""}><span>${t}</span></label>`,
  ).join("")}</div></fieldset>
  <div class="f2">
    <div class="fld"><label for="al-phone">Mobile <span class="opt">(optional, for text alerts)</span></label><input id="al-phone" name="phone" type="tel" autocomplete="tel"></div>
    <fieldset class="fld"><legend>I am</legend><div class="radios">${["A resident", "A business owner", "Both"]
      .map((t, i) => `<label class="ck" for="al-r${i}"><input id="al-r${i}" type="radio" name="role" value="${t}"${i === 0 ? " checked" : ""}><span>${t}</span></label>`)
      .join("")}</div></fieldset>
  </div>
  <fieldset class="fld later"><legend>Other alerts we could add <span class="opt">(not running yet)</span></legend><div class="checkgrid">${LATER.map(
    (t, i) => `<label class="ck" for="al-t${i}"><input id="al-t${i}" type="checkbox" name="interest" value="${t}"><span>${t}</span></label>`,
  ).join("")}</div><p class="fine">Tick any you would use. We will build the most requested next.</p></fieldset>
  <button class="btn" type="submit">Sign up</button>
  <p class="fine">We use your address only to measure zoning cases against it. We never sell or share your information. Unsubscribe anytime. ${anchorLink(ctx, "about", "site-privacy", "Site privacy")}</p>
</form>`;

  const flow = `<ol class="flow f4">${STEPS.map((x, i) => `<li><span class="fl-n mono">${i + 1}</span><h3>${x.k}</h3><p>${x.v}</p></li>`).join("")}</ol>
  <p class="note">In development. Sign up now and you will be on the list when the first alerts go out.</p>`;

  const law = facts(ctx, [
    {
      k: "Letters",
      v: "Mailed only to owners of property within 200 feet, as listed on the tax roll, at least 10 days before the zoning commission hearing. Renters do not get one.",
      cite: ["tx-lgc-211007"],
    },
    {
      k: "Published notice",
      v: "In a newspaper and on the City's website, before the 15th day before the City Council hearing.",
      cite: ["tx-hb24-2025"],
    },
    {
      k: "Signs",
      v: "Since September 2025, a sign at least 24 by 48 inches on the property, or in the right-of-way when the City proposes a change covering many properties, at least 10 days before the zoning commission hearing.",
      cite: ["tx-hb24-2025"],
    },
    {
      k: "Large changes",
      v: "For a comprehensive change, such as a new zoning code, a new zoning map, or an overlay district, the published notices are the only ones the law requires. No letters.",
      cite: ["tx-hb24-2025"],
    },
  ]);

  return `${pageHead({
    eyebrow: "Zoning alerts",
    title: "Know before they vote",
    lede: "When the City posts a zoning change, we post it and email everyone who asked to hear about it. You choose the distance from your home: 250 feet, 1,000 feet, half a mile, or the whole city.",
    meta: [chip("Sign-up open", "good"), "Alerts are in development"],
  })}
<section class="sec"><div class="wrap sec-in"><div class="two-col">${form}<div class="side">${radiusDiagram()}
  <div class="aside-box"><h3>Coming in 2027</h3><p>An appraisal check that compares your home's value with your neighborhood, so you know whether a protest is worth filing.</p></div>
</div></div></div></section>

${section({ id: "how", title: "How it works", note: "Before, notice meant a postcard and a legal ad in the newspaper. Now, when the City posts a case on its website, we post it and email you.", body: flow, band: true })}

${section({ id: "why", title: "Why the legal notice is not enough", note: "What Texas law requires a city to do before a zoning vote.", body: law + `<p class="note">Large rezonings have caught San Angelo neighborhoods off guard before, and residents have had to organize on short notice to be heard. Everyone near a change should know about it in time to speak.</p>` })}`;
}

export function tipsPage(ctx: Ctx): string {
  const form = `<form class="form form-wide" id="tip-form" data-form="tip" novalidate>
  <div class="hp" aria-hidden="true"><label for="tp-hp">Leave this empty</label><input id="tp-hp" type="text" name="_gotcha" tabindex="-1" autocomplete="off"></div>
  <fieldset class="fld"><legend>What are you sending?</legend><div class="radios">${["A tip", "A correction to our data", "A question"]
    .map((t, i) => `<label class="ck" for="tp-k${i}"><input id="tp-k${i}" type="radio" name="kind" value="${t}"${i === 0 ? " checked" : ""}><span>${t}</span></label>`)
    .join("")}</div></fieldset>
  <div class="fld"><label for="tp-what">What happened, or what is wrong?</label><textarea id="tp-what" name="details" rows="6" required placeholder="Who, what, where, and when, as far as you know. Plain words are fine."></textarea></div>
  <div class="f2">
    <div class="fld"><label for="tp-gov">Which government?</label><select id="tp-gov" name="government"><option>Not sure</option><option>City of San Angelo</option><option>Tom Green County</option><option>San Angelo ISD</option><option>Appraisal District</option><option>A data center project</option><option>State agency</option></select></div>
    <div class="fld"><label for="tp-when">When? <span class="opt">(optional)</span></label><input id="tp-when" name="when" type="text"></div>
  </div>
  <div class="fld"><label for="tp-where">Where can we confirm it? <span class="opt">(optional)</span></label><input id="tp-where" name="confirm" type="text" placeholder="Meeting dates, contract or invoice numbers, departments, or records we could request"></div>
  <div class="fld"><label for="tp-contact">How can we reach you? <span class="opt">(optional)</span></label><input id="tp-contact" name="contact" type="text" placeholder="Leave blank to stay anonymous"></div>
  <fieldset class="fld"><legend>If we contact you</legend><div class="radios">${["Never name me", "Ask me before naming me"]
    .map((t, i) => `<label class="ck" for="tp-n${i}"><input id="tp-n${i}" type="radio" name="naming" value="${t}"${i === 0 ? " checked" : ""}><span>${t}</span></label>`)
    .join("")}</div></fieldset>
  <button class="btn" type="submit">Send</button>
</form>`;

  return `${pageHead({
    eyebrow: "Tip line",
    title: "Report waste, wrongdoing, or an error",
    lede: "If you work for a local government, do business with one, or saw something, tell us. Spotted a wrong number on this site? Send that here too. We check everything against the public record before anything is published, and we never publish your name without your permission.",
  })}
<section class="sec"><div class="wrap sec-in"><div class="two-col">${form}<div class="side">
  <div class="aside-box"><h3>Before you send</h3><ul class="plain"><li>Use a personal phone or computer on a home network, not a work device, work email, or work Wi-Fi.</li><li>Do not send your only copy of anything.</li><li>Files can carry your name in hidden details. Describing a document, or where to find it, is often safer than sending it.</li></ul></div>
  <div class="aside-box"><h3>What we do with it</h3><p>We read every tip. We confirm it through public records and records requests before publishing anything. If we cannot confirm it, it is not published. Corrections are checked against the source document and logged on the About page.</p></div>
  <div class="aside-box"><h3>Legal protection</h3><p>Texas law protects public employees who report a violation of law in good faith to an appropriate law enforcement authority (Texas Government Code, Chapter 554). A tip to a journalist is not that kind of report, so this tip line cannot give you that protection. If you want it, also report to the right authority, and talk to a lawyer first.</p></div>
  <div class="aside-box"><h3>Email</h3><p><span class="sel mono">${SITE.contactEmail}</span> <button class="copy" type="button" data-copy="${SITE.contactEmail}">Copy</button></p></div>
</div></div></div></section>`;
}
