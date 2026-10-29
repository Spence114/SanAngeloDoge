import { SITE } from "../config.ts";
import { pageHead, section } from "../render/components.ts";
import { anchorLink, type Ctx } from "../render/html.ts";

const TOPICS = [
  "Monthly bulletin",
  "Data centers",
  "City of San Angelo",
  "Tom Green County",
  "San Angelo ISD",
  "Appraisals and property tax",
  "Plate cameras and drones",
  "Zoning near my address",
];

export function alertsPage(ctx: Ctx): string {
  const form = `<form class="form form-wide" id="alerts-form" data-form="subscribe" novalidate>
  <div class="hp" aria-hidden="true"><label for="al-hp">Leave this empty</label><input id="al-hp" type="text" name="_gotcha" tabindex="-1" autocomplete="off"></div>
  <div class="f2">
    <div class="fld"><label for="al-email">Email</label><input id="al-email" name="email" type="email" autocomplete="email" required></div>
    <div class="fld"><label for="al-name">Name <span class="opt">(optional)</span></label><input id="al-name" name="name" type="text" autocomplete="name"></div>
  </div>
  <div class="f2">
    <div class="fld"><label for="al-address">Street address in San Angelo <span class="opt">(optional, for the 250-foot zoning alert)</span></label><input id="al-address" name="address" type="text" autocomplete="street-address"></div>
    <div class="fld"><label for="al-phone">Mobile <span class="opt">(optional, for text alerts)</span></label><input id="al-phone" name="phone" type="tel" autocomplete="tel"></div>
  </div>
  <fieldset class="fld"><legend>Send me</legend><div class="checkgrid">${TOPICS.map(
    (t, i) => `<label class="ck" for="al-t${i}"><input id="al-t${i}" type="checkbox" name="topics" value="${t}"${i === 0 ? " checked" : ""}><span>${t}</span></label>`,
  ).join("")}</div></fieldset>
  <fieldset class="fld"><legend>I am</legend><div class="radios">${["A resident", "A business owner", "Both"]
    .map((t, i) => `<label class="ck" for="al-r${i}"><input id="al-r${i}" type="radio" name="role" value="${t}"${i === 0 ? " checked" : ""}><span>${t}</span></label>`)
    .join("")}</div></fieldset>
  <button class="btn" type="submit">Sign up</button>
  <p class="fine">We use your email to send what you pick, and your address only to match zoning cases near it. We never sell or share your information. Unsubscribe anytime. ${anchorLink(ctx, "about", "site-privacy", "Site privacy")}</p>
</form>`;

  const example = `<div class="bulletin">
  <p class="bl-h"><span>Example bulletin</span><span class="mono">Monthly</span></p>
  <ul>
    <li>County adopted its FY2027 budget, 4-1. General Fund reserves drop from $39.4M to $21.9M.</li>
    <li>Governor paused TCEQ permits for data centers until state audits finish.</li>
    <li>Coming up: ERCOT's audit of data center grid requests, expected in December.</li>
    <li>Trending: the street fee, first billed in January.</li>
  </ul>
  <p class="fine">Facts only, with the pros and cons on the record and a link to each source.</p>
</div>`;

  return `${pageHead({
    eyebrow: "Get alerts",
    title: "Know before the vote",
    lede: "A monthly bulletin of facts from the public record, alerts on the topics you pick, and a free notice when a rezoning case lands within 250 feet of your address.",
  })}
<section class="sec"><div class="wrap sec-in"><div class="two-col">${form}<div class="side">${example}
  <div class="aside-box"><h3>Zoning alerts</h3><p>When a rezoning, variance, or similar case on a city agenda falls within 250 feet of your address, we email you the case, the hearing date, and how to speak at it. Free.</p></div>
  <div class="aside-box"><h3>Coming in 2027</h3><p>An appraisal check that compares your home's value with your neighborhood, so you know whether a protest is worth filing.</p></div>
</div></div></div></section>`;
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
