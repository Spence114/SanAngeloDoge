import { SOURCES } from "./sources.ts";
import type { DocLink, Fact, OpenQuestion, TimelineItem } from "./types.ts";

// Plate cameras and police drones. Checked against the City's agenda, packet, and minutes
// for Oct 7, 2025 and against national reporting on Oct 29, 2026.

const L = (url: string, label: string) => `<a href="${url}" target="_blank" rel="noopener">${label}</a>`;
const U = (id: string): string => {
  const u = SOURCES[id]?.url;
  if (!u) throw new Error(`Source ${id} has no URL`);
  return u;
};

export const PV_SRC = {
  civicclerk: "https://sanangelotx.portal.civicclerk.com/",
  flockPortal: U("flock-portal-sapd"),
  droneDashboard: U("aerodome-dashboard-sapd"),
  records: "https://sanangelotx.mycusthelp.com/WEBAPP/_rs/supporthome.aspx",
};
const S = PV_SRC;

export const PV_LEDE =
  "In October 2025 the City Council approved a contract with Flock Group Inc. for license plate reader cameras and a drone program for the San Angelo Police Department. This page sets out what was approved, how the system works, the constitutional questions, what supporters and critics say, and where this site stands, including a proposed Technology Bill of Rights for the City and County.";

/** Short statement shown near the top of the page, linking to the full position. */
export const PV_STANCE_SHORT =
  "Our view: privacy is a human right. We support plate cameras that the City owns outright, kept on a local network cut off from the internet, and searched only for an APB or a warrant. We also propose a Technology Bill of Rights for the City and County.";

export const PV_FACTS: Fact[] = [
  {
    k: "What was bought",
    v: "License plate reader and drone first responder products from Flock Group Inc. (Flock Safety), under a master services agreement through the Omnia purchasing cooperative, contract RS250203.",
    cite: ["cc-agenda-2025-10-07", "cc-minutes-2025-10-07"],
  },
  { k: "Contract limit", v: "$309,050, not to exceed.", cite: ["cc-agenda-2025-10-07", "cc-minutes-2025-10-07"] },
  {
    k: "State highways",
    v: "A multiple use agreement with TxDOT lets Flock cameras go on state right-of-way inside city limits.",
    cite: ["cc-agenda-2025-10-07", "cc-minutes-2025-10-07"],
  },
  { k: "Vote", v: "7-0, Oct 7, 2025, on a separate vote after the item was pulled from the consent agenda. No one spoke during public comment on it.", cite: ["cc-minutes-2025-10-07"] },
  {
    k: "Who pays",
    v: "Mostly state grants: two Texas Motor Vehicle Crime Prevention Authority awards totaling $464,961 and a pending $73,000 state homeland security grant. The two awards require a local match of $77,495, and they also pay for two officers and a drone lease. If the pending grant did not come through in time, police donations, seizure funds, or operating accounts would cover the gap.",
    cite: ["cc-packet-2025-10-07"],
  },
  {
    k: "Cameras",
    v: "About 42 across Tom Green County between SAPD and the Sheriff's Office, according to news coverage. The City's packet budgets for 20 cameras under the homeland security grant, 17 new plate reader cameras under the auto theft grant, and monitoring for 13 existing plate reader cameras.",
    cite: ["cvh-2025-10-07", "cc-packet-2025-10-07"],
    src: "The total of 42 comes from news coverage",
    unv: true,
  },
  {
    k: "Stated purpose",
    v: "Combating motor vehicle theft, according to the City's packet. Police Chief Travis Griffith said the plate readers would help with Amber Alerts and give officers in the field real-time information, and that a drone could give a bird's eye view of a major crime in about 45 seconds.",
    cite: ["cc-packet-2025-10-07", "cvh-2025-10-07"],
  },
  {
    k: "Public dashboards",
    v: `SAPD links a ${L(S.flockPortal, "license plate reader transparency portal")} and a ${L(S.droneDashboard, "drone flight dashboard")} from its Transparency and Accountability page.`,
    cite: ["sapd-transparency"],
  },
  {
    k: "Drone training",
    v: "The Mar 17, 2026 council agenda included accepting donated funds from Skyline Aviation Inc. for training and certification in the police drone program. No amount was listed, and minutes for that meeting were not posted when we checked.",
    cite: ["cc-agenda-2026-03-17"],
  },
];

export const HOW_IT_WORKS = [
  "Each camera photographs passing vehicles and reads the plate. Flock's software also records details such as make, model, and color, which police can use as search terms. Plates are checked against hotlists, such as stolen vehicles and Amber Alerts, and a match sends an alert to officers. {{c:npr-2026-02-17,flock-lpr-product}}",
  "Records are kept for a number of days each agency sets; Flock recommends 7. An agency can let other agencies search its records through Flock's statewide and national lookup networks. Flock says sharing is off by default, that each agency controls whom it shares with, and that every search is logged with the agency and a stated reason. {{c:npr-2026-02-17,flock-blog-how,flock-lpr-product}}",
  "A drone first responder program launches a docked drone toward a 911 call, so police can see the scene before officers arrive. {{c:flock-aerodome-product}}",
];

export const SUPPORTERS = [
  "Police credit plate readers with tracking down stolen cars and helping solve high-profile crimes. {{c:npr-2026-02-17}}",
  "SAPD publishes a plate reader transparency portal and a drone flight dashboard for the public. {{c:sapd-transparency}}",
  "State grants cover most of the cost. {{c:cc-packet-2025-10-07}}",
  "A drone can reach a scene before officers do, which can tell them what they are driving into. {{c:cvh-2025-10-07,flock-aerodome-product}}",
];

export const CRITICS = [
  "The cameras record every passing car, not only suspects, and the records can be searched without a warrant. That is the claim in a federal lawsuit against Norfolk, Virginia. {{c:ij-2024-10-21}}",
  "Several cities learned their data was shared more widely than they knew, and audits found local searches that appeared to be for immigration enforcement. {{c:npr-2026-02-17}}",
  "In Texas, sheriff's deputies searched the network for the car of a woman who had an abortion, according to a 404 Media report. {{c:404media-2025-05-29,npr-2026-02-17}}",
  "At least 30 local governments turned off Flock cameras or canceled contracts between the start of 2025 and February 2026. {{c:npr-2026-02-17}}",
];

export const FLOCK_RESPONSE =
  "Flock says it ended its federal pilot programs, that immigration authorities have no direct access to its platform, and that in June 2025 it added filters that block searches for immigration or reproductive health terms where state law bars them. It later required officers to pick an offense type before searching. {{c:flock-blog-ice,npr-2026-02-17}}";

export const CONSTITUTION_INTRO = [
  "The Fourth Amendment protects \"the right of the people to be secure in their persons, houses, papers, and effects, against unreasonable searches and seizures,\" and says no warrant shall issue but upon probable cause, particularly describing what is to be searched. The Texas Constitution makes the same promise in Article I, Section 9. {{c:us-const-4a,tx-const-1-9}}",
  "The question for plate cameras is whether photographing every passing car, and keeping those records to search later, is itself a search. If it is, police generally need a warrant to look. Courts have not settled it for camera networks. Since 2012, though, the Supreme Court has extended Fourth Amendment protection to records of where a person goes. {{c:scotus-jones,scotus-carpenter,scotus-chatrie}}",
];

export const COURTS: TimelineItem[] = [
  { d: "1983", e: "<b>United States v. Knotts.</b> Following a car on public roads with a radio beeper was not a search: \"A person travelling in an automobile on public thoroughfares has no reasonable expectation of privacy in his movements from one place to another.\" The Court left open whether \"dragnet type law enforcement practices\" would call for different rules. Courts upholding plate cameras still lean on this case. {{c:scotus-knotts,norfolk-appeal}}" },
  { d: "2012", e: "<b>United States v. Jones.</b> Attaching a GPS tracker to a car and following it for 28 days was a search. Justice Alito, writing for four justices, said \"longer term GPS monitoring in investigations of most offenses impinges on expectations of privacy.\" {{c:scotus-jones}}" },
  { d: "2018", e: "<b>Carpenter v. United States.</b> Getting a person's historical cell phone location records was a search, and police needed a warrant. The Court said people have \"a reasonable expectation of privacy in the whole of their physical movements,\" and that seven days of records was enough to count. {{c:scotus-carpenter}}" },
  { d: "2020", e: "<b>Commonwealth v. McCarthy</b> (Massachusetts high court). Four plate cameras at the ends of two bridges were not a search. But \"with enough cameras in enough locations,\" the court said, the location history from a plate reader system \"would constitute a search.\" {{c:mass-mccarthy}}" },
  { d: "Jan 2026", e: "<b>Schmidt v. City of Norfolk</b> (federal court, Virginia). A judge upheld Norfolk's Flock network, finding it did not invade a reasonable expectation of privacy because the cameras do not capture the whole of a person's movements. The residents appealed; the case was pending at the Fourth Circuit as of June 2026. {{c:norfolk-district,norfolk-appeal,ij-2024-10-21}}" },
  { d: "Jun 2026", e: "<b>Chatrie v. United States.</b> The Supreme Court ruled 6-3 that getting a person's phone location records from Google was a search, even for a short window: \"It does not matter if the time period scrutinized was only two hours.\" The case is about phone data, not cameras, but it rejects the idea that a small slice of a large location database is not a search. {{c:scotus-chatrie}}" },
];

export const CONSTITUTION_NOTE = "General information about court rulings, not legal advice.";

export const STANCE = [
  "<strong>Privacy is a human right.</strong> The Universal Declaration of Human Rights says \"no one shall be subjected to arbitrary interference with his privacy,\" and the Fourth Amendment and the Texas Constitution protect it here. The best systems catch car thieves and find missing children without keeping a searchable record of where everyone else drives. {{c:udhr-12,us-const-4a,tx-const-1-9}}",
  "<strong>Protecting the Fourth Amendment matters most when the technology is new.</strong> The courts are still deciding where plate cameras fall, and the trend favors privacy. San Angelo can lead on this instead of waiting for a ruling. {{c:scotus-carpenter,scotus-chatrie,mass-mccarthy}}",
  "<strong>We support localizing plate cameras.</strong> Keep the cameras, but bring the system home: owned by the City, run on a closed local network, and opened only when there is cause.",
];

export const LOCAL_PLAN: Array<{ k: string; v: string }> = [
  { k: "Air-gapped", v: "Cameras report to a local server on a closed network, cut off from the internet and from outside data-sharing networks." },
  { k: "APB or warrant only", v: "The system checks plates against active APBs and warrants. Only an APB or a warrant opens the live feeds or the stored photos to a search." },
  { k: "Kept 30 days", v: "Photos are deleted after 30 days. Outside an APB or a warrant, the record cannot be pulled." },
  { k: "Owned by the City", v: "SAPD owns the hardware, the software, and the data, with no subscription fees and safeguards against abuse built in." },
];

export const STANCE_AFTER = [
  "<span class=\"unv\">A local agency has already demonstrated a working prototype.</span> Building it locally means the police department owns the system outright, stops paying recurring fees, and keeps control of our data. Today the City's grant budget includes Flock monitoring fees for its plate cameras. {{c:cc-packet-2025-10-07}}",
  "We believe San Angelo would be one of the first cities in the world to run plate cameras this way. That is a story worth telling about our city.",
  "Technology should protect and serve our officers. To do that, the City has to own these assets. West Texas was built by self-sufficient people who kept control of what they depended on, and our public safety tools should be no different.",
  "<strong>The switch would take about a year:</strong> time for the current contracts to run out and for the new system to be built and tested. The current Flock agreement was approved Oct 7, 2025. {{c:cc-minutes-2025-10-07}}",
];

/** Our proposal: rights the City Council and Commissioners Court would adopt. Opinion, not law. */
export interface RightsGroup {
  title: string;
  lede: string;
  rights: Array<{ k: string; v: string }>;
}

export const RIGHTS_INTRO =
  "We propose that the City Council and the Commissioners Court each adopt a Technology Bill of Rights for residents. Technology changes faster than the law, so these rules set the limits before the next tool is bought, not after.";

export const RIGHTS: RightsGroup[] = [
  {
    title: "People stay in charge",
    lede: "Machines can help. People decide, and people speak for the government.",
    rights: [
      { k: "No autonomous robots", v: "No autonomous robots of any type. Every robot or drone the City or County uses is operated by a person or assisted by one in real time." },
      { k: "A person makes the call", v: "No AI makes the final decision on a resident's fine, permit, benefit, or arrest. A named person decides, and residents can appeal to a person." },
      { k: "Real people only", v: "No City or County communication uses synthetic or AI-generated people or voices in video, photos, or audio. Only real people speak for the City or County in an official capacity." },
      { k: "AI is labeled", v: "Any chatbot, phone line, or form run by AI says so up front. Records and police reports drafted with AI are labeled and signed by the person responsible." },
      { k: "No predictive policing", v: "No software that scores or flags individuals as likely to commit a crime." },
    ],
  },
  {
    title: "Your data stays home",
    lede: "Data collected on residents belongs to the public and stays under local control.",
    rights: [
      { k: "Stored in San Angelo", v: "Data the City and County collect on residents is stored within the city limits." },
      { k: "Never sold or shared", v: "Resident data is never sold, and never shared with vendors or other agencies without a warrant or court order, except where state or federal law requires it. No vendor may use it to train AI." },
      { k: "Government owns its data", v: "Every technology contract gives the City or County full ownership of its data, the right to export it, and the right to have the vendor delete it. No lock-in." },
      { k: "Collect less", v: "Collect only what a service needs, publish how long each kind of record is kept, and delete it on schedule." },
      { k: "Breach notice", v: "Residents are told within days when their data is exposed, and told what was exposed." },
    ],
  },
  {
    title: "Surveillance answers to the public",
    lede: "No new way of watching residents without a public vote and public rules.",
    rights: [
      { k: "No face recognition", v: "No facial, voice, or gait recognition on City or County cameras or recordings without a warrant." },
      { k: "Vote before buying", v: "Any new surveillance tool needs a public hearing, a published use policy, and a vote of the City Council or Commissioners Court before it is bought." },
      { k: "Public inventory", v: "A public list of every surveillance tool: what it collects, what it costs, and how long its data is kept, with an annual audit report." },
    ],
  },
  {
    title: "Everyone can reach their government",
    lede: "No one is shut out for not owning the latest device.",
    rights: [
      { k: "Right to a person", v: "Every City and County service can be reached by a real person, by phone or at a counter." },
      { k: "Cash and paper", v: "Taxes, bills, and fines can be paid in cash or by mail, and no service requires a smartphone or a digital ID." },
    ],
  },
];

export const RIGHTS_AFTER =
  "We ask San Angelo ISD to adopt the same rules for student data and school cameras.";

export const RIGHTS_NOTE =
  "A proposal, not law. Each right would need a vote of the City Council or the Commissioners Court, and state law may limit how some of them can be written.";

/** The author's own account of meetings with SAPD; a disclosure, shown inside the opinion section. */
export const SAPD_MEETINGS = [
  "Since 2024, Spencer Matthews, who writes this site, has met multiple times with the San Angelo Police Department about these cameras: with the Police Chief's office, the assistant police chief, and the department's technology team.",
  "They care about privacy as much as we do. Every one of those conversations has been about the same goal: a system that keeps residents safe and protects their rights.",
  "We think highly of them. They are working to put ideas like these into practice and to lead San Angelo toward a human-centered future, while keeping officers safe and the city ready for any emergency it may face.",
];

export const PV_QUESTIONS: OpenQuestion[] = [
  { q: "How many days are plate records kept?", why: "Flock lets each agency set its own retention and recommends 7 days." },
  { q: "Which agencies can search San Angelo's records, and is the City in Flock's statewide or national network?" },
  { q: "What written policy governs who may search, and for what reasons?" },
  { q: "How are search logs reviewed?" },
  { q: "Where are the cameras, and who chose the locations?" },
  { q: "How long is drone video kept, and does the drone record on its way to a call?" },
  { q: "What happens to the records if the contract ends?" },
];

export const PV_QUESTIONS_NOTE =
  "Questions residents ask about any plate camera system. SAPD's transparency portal answers some of them. As answers are published, we will post each one here with its source.";

export const PV_TODO = [
  `<strong>Read SAPD's transparency portal</strong> for camera counts, retention, and sharing: ${L(S.flockPortal, "plate reader transparency portal")}.`,
  "<strong>Back a local system.</strong> Tell your council member and county commissioner you support a City-owned plate camera system and the Technology Bill of Rights above.",
  `<strong>Speak at City Council</strong> during public comment. Agendas are posted on the City's ${L(S.civicclerk, "CivicClerk portal")}.`,
  "<strong>Get an alert</strong> when plate cameras or drones come back to council: [[alerts|sign up]].",
];

export const PV_DOCS: DocLink[] = [
  { tag: "Oct 2025", title: "City Council minutes, Oct 7, 2025", url: U("cc-minutes-2025-10-07"), note: "Item 5f, the vote.", kind: "PDF" },
  { tag: "Oct 2025", title: "City Council agenda packet, Oct 7, 2025", url: U("cc-packet-2025-10-07"), note: "Item 5f, the police report to council and the grants summary.", kind: "PDF" },
  { tag: "Oct 2025", title: "Council OKs police tech, weather-mod funding", url: U("live-2025-10-07"), note: "San Angelo LIVE!", kind: "News" },
  { tag: "Oct 2025", title: "To crime in 45 seconds: SAPD approved for drones, cameras and license plate readers", url: U("cvh-2025-10-07"), note: "Concho Valley Homepage", kind: "News" },
  { tag: "City", title: "SAPD Transparency and Accountability page", url: U("sapd-transparency"), note: "Links to the plate reader portal and the drone dashboard.", kind: "Web" },
  { tag: "Feb 2026", title: "Why some cities are ditching their Flock license plate readers", url: U("npr-2026-02-17"), note: "NPR", kind: "News" },
];
