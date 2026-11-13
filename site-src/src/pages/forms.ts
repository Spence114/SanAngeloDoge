import { SITE } from "../config.ts";
import { chip, facts, pageHead, section } from "../render/components.ts";
import { anchorLink, type Ctx, rich } from "../render/html.ts";
import { audience, faq, features, pills, plans } from "../render/landing.ts";
import { GI } from "../render/icons.ts";

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
  const form = `<form class="form form-wide join-form" id="alerts-form" data-form="subscribe" data-subject="Zoning alerts: early access" novalidate>
  <input type="hidden" name="list" value="Zoning alerts">
  <div class="hp" aria-hidden="true"><label for="al-hp">Leave this empty</label><input id="al-hp" type="text" name="_gotcha" tabindex="-1" autocomplete="off"></div>
  <div class="f2">
    <div class="fld"><label for="al-email">Email</label><input id="al-email" name="email" type="email" autocomplete="email" required></div>
    <div class="fld"><label for="al-name">Name <span class="opt">(optional)</span></label><input id="al-name" name="name" type="text" autocomplete="name"></div>
  </div>
  <fieldset class="fld"><legend>I am a</legend>${pills("role", "al-r", ["Homeowner", "Renter", "Rental property owner", "Business owner", "Real estate or development professional"])}</fieldset>
  <div class="fld"><label for="al-address">Main address in San Angelo <span class="opt">(for distance alerts)</span></label><input id="al-address" name="address" type="text" autocomplete="street-address"></div>
  <div class="f2">
    <div class="fld"><label for="al-props">How many properties should we watch?</label><select id="al-props" name="properties"><option>1</option><option>2 to 5</option><option>6 to 20</option><option>More than 20</option></select></div>
    <div class="fld"><label for="al-phone">Mobile <span class="opt">(optional, for texts)</span></label><input id="al-phone" name="phone" type="tel" autocomplete="tel"></div>
  </div>
  <fieldset class="fld"><legend>How far from each address?</legend>${pills("distance", "al-d", RADII)}</fieldset>
  <fieldset class="fld later"><legend>Also tell me about <span class="opt">(optional)</span></legend><div class="checkgrid">${LATER.map(
    (t, i) => `<label class="ck" for="al-t${i}"><input id="al-t${i}" type="checkbox" name="interest" value="${t}"><span>${t}</span></label>`,
  ).join("")}</div></fieldset>
  <button class="btn btn-lg btn-block" type="submit">Get early access</button>
  <p class="fine">We use your address only to measure zoning cases against it. We never sell or share your information. Unsubscribe anytime. ${anchorLink(ctx, "about", "site-privacy", "Site privacy")}</p>
</form>`;

  const law = facts(ctx, [
    { k: "Letters", v: "Mailed only to owners of property within 200 feet, as listed on the tax roll, at least 10 days before the zoning commission hearing. Renters do not get one.", cite: ["tx-lgc-211007"] },
    { k: "Published notice", v: "In a newspaper and on the City's website, before the 15th day before the City Council hearing.", cite: ["tx-hb24-2025"] },
    { k: "Signs", v: "Since September 2025, a sign on the property, or in the right-of-way when the City proposes a change covering many properties, at least 10 days before the zoning commission hearing.", cite: ["tx-hb24-2025"] },
    { k: "Large changes", v: "For a new zoning code, a new zoning map, or an overlay district, the published notices are the only ones the law requires. No letters.", cite: ["tx-hb24-2025"] },
  ]);

  return `<section class="land-hero">
  <div class="wrap lh-in">
    <div class="lh-copy">
      <p class="eyebrow">Zoning alerts</p>
      <h1>Know before they vote</h1>
      <p class="lede">${rich(ctx, "The City only has to mail notice of a zoning change to owners within 200 feet. {{c:tx-lgc-211007}} Renters, neighbors one block over, and businesses down the street hear about it after the vote. We send you every case near the places you care about, in plain words, with the hearing dates.")}</p>
      <div class="hero-acts">${anchorLink(ctx, "alerts", "join", "Get early access", "btn btn-lg")}${anchorLink(ctx, "alerts", "how", "How it works", "btn btn-ghost btn-lg")}</div>
      <p class="hero-meta">${chip("Sign-up open", "good")} Alerts are in development. Early sign-ups are first in line.</p>
    </div>
    <div class="lh-art">${radiusDiagram()}</div>
  </div>
</section>

${section({
  id: "who",
  title: "Built for everyone near a change",
  note: "A zoning change can raise traffic, noise, and property values, or lower them. Everyone nearby has a stake.",
  body: audience([
    { icon: "home", k: "Homeowners", v: "Hear about rezonings, new apartments, and commercial projects near your street, not just next door.", tone: "city" },
    { icon: "key", k: "Renters", v: "The law sends letters to owners only. Get the same notice your landlord gets.", tone: "saisd" },
    { icon: "buildings", k: "Rental owners", v: "Watch every property you own from one account, so nothing changes around a rental without you knowing.", tone: "county" },
    { icon: "store", k: "Businesses", v: "See what is coming to your block: competitors, road changes, and new rules that affect your location.", tone: "ink" },
  ]),
})}

${section({
  id: "features",
  title: "What you get",
  band: true,
  body: features(ctx, [
    { icon: "ring", k: "Your distance", v: "250 feet, 1,000 feet, half a mile, or the whole city. Change it anytime." },
    { icon: "doc", k: "Every case read for you", v: "Our software reads each zoning case, scanned documents included, and pulls out the address, the change, and the dates." },
    { icon: "map", k: "On the map", v: "Each case is mapped and measured against your addresses." },
    { icon: "calendar", k: "Hearing dates and how to speak", v: "When the zoning commission and Council will hear it, and how to comment or show up." },
    { icon: "phone", k: "Email or text", v: "Get alerts by email, or by text for the ones closest to you." },
    { icon: "stack", k: "Many addresses, one account", v: "For rental owners, businesses, and anyone watching more than one place." },
  ]),
})}

${section({ id: "how", title: "How it works", note: "Before, notice meant a postcard and a legal ad. Now, when the City posts a case, we post it and tell you.", body: `<ol class="flow f4">${STEPS.map((x, i) => `<li><span class="fl-n mono">${i + 1}</span><h3>${x.k}</h3><p>${x.v}</p></li>`).join("")}</ol>` })}

${section({
  id: "plans",
  title: "Plans",
  note: "What we plan to offer when alerts launch.",
  band: true,
  body: plans(
    [
      { name: "Neighbor", who: "One home, nearby changes", price: "Free", items: ["One address", "Cases within 250 feet", "Email alerts", "Every case posted on this site"] },
      { name: "Plus", who: "Wider view for residents", price: "Low monthly fee", items: ["Up to 3 addresses", "Any distance, up to the whole city", "Text alerts", "Weekly citywide summary"], pick: true },
      { name: "Property and business", who: "Rental owners, businesses, and professionals", price: "Priced by properties", items: ["Many addresses, or upload a list", "Alerts for each property", "Team members on one account", "Monthly report of nearby cases"] },
    ],
    "Prices will be set at launch. Everyone who signs up now hears first and gets the launch offer. Subscriptions help pay for this site's public reporting, which stays free to read.",
  ),
})}

${section({ id: "why", title: "Why the legal notice is not enough", note: "What Texas law requires before a zoning vote.", body: law })}

${section({
  id: "faq",
  title: "Questions",
  band: true,
  body: faq(ctx, [
    { q: "Is this from the City?", a: "No. San Angelo DOGE is independent. We use the cases the City already posts publicly, and send them to you faster and in plainer words." },
    { q: "When do alerts start?", a: "They are in development now. Sign up and you will be on the list when the first alerts go out." },
    { q: "Does this cover the county?", a: "We start with City of San Angelo zoning cases, where the City has zoning power. Tom Green County does not zone land outside city limits." },
    { q: "What do you do with my address?", a: "We use it only to measure cases against it. We never sell or share it." },
  ]),
})}

<section class="sec join" id="join" aria-labelledby="join-h"><div class="wrap sec-in join-in">
  <div class="join-copy"><p class="eyebrow">Early access</p><h2 id="join-h">Be first to know</h2><p>Tell us where to watch. We will email you when alerts go live, and send your first case as soon as one lands near you.</p></div>
  ${form}
</div></section>`;
}

export function appraisalCheckPage(ctx: Ctx): string {
  const form = `<form class="form form-wide join-form" id="appraisal-form" data-form="subscribe" data-subject="Appraisal check: early access" novalidate>
  <input type="hidden" name="list" value="Appraisal check">
  <div class="hp" aria-hidden="true"><label for="ap-hp">Leave this empty</label><input id="ap-hp" type="text" name="_gotcha" tabindex="-1" autocomplete="off"></div>
  <div class="f2">
    <div class="fld"><label for="ap-email">Email</label><input id="ap-email" name="email" type="email" autocomplete="email" required></div>
    <div class="fld"><label for="ap-name">Name <span class="opt">(optional)</span></label><input id="ap-name" name="name" type="text" autocomplete="name"></div>
  </div>
  <fieldset class="fld"><legend>I own</legend>${pills("owns", "ap-o", ["My home", "Rental property", "A business property", "Land or ranch property"], 0, "checkbox")}</fieldset>
  <div class="f2">
    <div class="fld"><label for="ap-props">How many properties?</label><select id="ap-props" name="properties"><option>1</option><option>2 to 5</option><option>6 to 20</option><option>More than 20</option></select></div>
    <div class="fld"><label for="ap-address">Main property address <span class="opt">(optional)</span></label><input id="ap-address" name="address" type="text" autocomplete="street-address"></div>
  </div>
  <fieldset class="fld"><legend>Did you protest your value this year?</legend>${pills("protested", "ap-p", ["Yes", "No", "Not sure"], 1)}</fieldset>
  <button class="btn btn-lg btn-block" type="submit">Get early access</button>
  <p class="fine">We use your information only to send your check and updates about it. We never sell or share it. ${anchorLink(ctx, "about", "site-privacy", "Site privacy")}</p>
</form>`;

  const sample = `<figure class="ac-sample" aria-label="Example of an appraisal check, with made-up figures">
    <span class="ac-flag">Example only. Not real data.</span>
    <p class="ac-k">Your home, value per square foot</p>
    <div class="ac-bars">
      <div class="ac-b you"><span>Your home</span><i style="width:88%"></i><b class="mono">$142</b></div>
      <div class="ac-b"><span>Similar homes nearby</span><i style="width:74%"></i><b class="mono">$119</b></div>
      <div class="ac-b"><span>Your neighborhood</span><i style="width:70%"></i><b class="mono">$113</b></div>
    </div>
    <p class="ac-verdict"><b>19% above</b> similar homes nearby. Worth a closer look before the deadline.</p>
    <p class="ac-dead">${GI.calendar}<span>Protest deadline: May 15, or 30 days after your notice</span></p>
  </figure>`;

  return `<section class="land-hero">
  <div class="wrap lh-in">
    <div class="lh-copy">
      <p class="eyebrow">Appraisal check</p>
      <h1>Is your property value fair?</h1>
      <p class="lede">${rich(ctx, "Every tax bill starts with the value the Appraisal District sets. If it is too high, you pay too much to the City, the County, and the schools, every year. Appraisal Check compares your value with similar properties nearby and tells you, in plain words, whether a protest is worth your time, before the deadline. {{c:tx-tax-41-44}}")}</p>
      <div class="hero-acts">${anchorLink(ctx, "appraisal-check", "join", "Get early access", "btn btn-lg")}${anchorLink(ctx, "appraisal-check", "features", "What it does", "btn btn-ghost btn-lg")}</div>
      <p class="hero-meta">${chip("Coming in 2027", "open")} Built from the Appraisal District's public roll.</p>
    </div>
    <div class="lh-art">${sample}</div>
  </div>
</section>

${section({
  id: "who",
  title: "For anyone who pays a property tax bill",
  body: audience([
    { icon: "home", k: "Homeowners", v: "Find out in minutes whether your value is out of line, and check that your homestead and other exemptions are on file.", tone: "city" },
    { icon: "buildings", k: "Rental owners", v: "Check every rental at once. A lower value lowers the tax you would otherwise pass on in rent.", tone: "county" },
    { icon: "store", k: "Businesses", v: "Compare your building and land with similar properties, and get reminded before the April 15 rendition for business property.", tone: "ink" },
    { icon: "map", k: "Land and ranch owners", v: "See how your land is valued against nearby parcels, and whether it carries the special use valuation it should.", tone: "saisd" },
  ]),
})}

${section({
  id: "features",
  title: "What it does",
  band: true,
  body: features(ctx, [
    { icon: "chart", k: "Neighborhood comparison", v: "Your value per square foot next to similar properties nearby, drawn from the Appraisal District's public roll." },
    { icon: "stack", k: "Value history", v: "How your value has changed year by year, and how that compares with your neighborhood." },
    { icon: "shield", k: "Exemption check", v: "Flags exemptions you may qualify for but are not receiving, such as the homestead or over-65 exemption." },
    { icon: "calendar", k: "Deadline reminders", v: "Protest by May 15, or 30 days after your notice arrives, whichever is later. Business property renditions are due April 15. {{c:tx-tax-41-44,tx-tax-22-23}}" },
    { icon: "doc", k: "A report you can bring", v: "A printable summary of the comparison to take to an informal meeting or your protest hearing." },
    { icon: "taxes", k: "What it means for your bill", v: "The tax each government charges on your value, using this year's adopted rates." },
  ]),
})}

${section({
  id: "plans",
  title: "Plans",
  note: "What we plan to offer at launch.",
  body: plans(
    [
      { name: "Free check", who: "One property, the basic answer", price: "Free", items: ["Your value against similar properties", "Exemption check", "Deadline reminder"] },
      { name: "Full report", who: "When you plan to protest", price: "One-time fee", items: ["Everything in the free check", "Value history", "Printable comparison report", "Tax effect by government"], pick: true },
      { name: "Portfolio", who: "Rental owners and businesses", price: "Priced by properties", items: ["Every property in one view", "Flags the ones worth a closer look", "Reminders for each deadline", "Yearly summary"] },
    ],
    "Prices will be set at launch. Early sign-ups hear first and get the launch offer. Revenue helps pay for this site's public reporting, which stays free to read.",
  ),
})}

${section({
  id: "faq",
  title: "Questions",
  band: true,
  body: faq(ctx, [
    { q: "Will you file my protest for me?", a: "No. We give you the comparison and the report; you file and present your own protest. In Texas, representing someone in a protest for pay requires registration as a property tax consultant. {{c:tdlr-ptc}}" },
    { q: "Where does the data come from?", a: "The Appraisal District's public appraisal roll. Texas does not require sale prices to be disclosed, so comparisons use appraised values and property details, not private sale prices." },
    { q: "Is this from the Appraisal District?", a: "No. San Angelo DOGE is independent. We are not affiliated with the Appraisal District or any taxing unit." },
    { q: "When will it be ready?", a: "We plan to launch before the 2027 appraisal notices go out. Sign up and you will be first to know." },
  ]),
})}

<section class="sec join" id="join" aria-labelledby="ap-join-h"><div class="wrap sec-in join-in">
  <div class="join-copy"><p class="eyebrow">Early access</p><h2 id="ap-join-h">Check your value first</h2><p>Join the list. We will email you when Appraisal Check opens, in time for the 2027 notices.</p><p class="fine">Not tax or legal advice. We are not a property tax consulting firm.</p></div>
  ${form}
</div></section>`;
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
