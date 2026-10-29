import { SOURCES } from "./sources.ts";
import type { DocLink, Fact, OpenQuestion, Table, TimelineItem } from "./types.ts";

// Data center guide and project pages. Every fact carries source ids (see sources.ts),
// checked against the source documents on Oct 29, 2026. Pink marks company statements,
// projections, news-only items, and our own estimates.

const L = (url: string, label: string) => `<a href="${url}" target="_blank" rel="noopener">${label}</a>`;
const U = (id: string): string => {
  const u = SOURCES[id]?.url;
  if (!u) throw new Error(`Source ${id} has no URL`);
  return u;
};

export const DC_SRC = {
  dueDiligence: U("doge-june-report"),
  westlineBrief: U("sad-westline-brochure"),
  noise: U("sad-noise-report"),
  records: "https://sanangelotx.mycusthelp.com/WEBAPP/_rs/supporthome.aspx",
  agendas: "https://sanangelotx.portal.civicclerk.com/",
  county: "https://www.tomgreencountytx.gov",
  tceqComment: "https://www14.tceq.texas.gov/epic/eComment/",
};
const S = DC_SRC;

export type ProjectId = "skybox" | "cipher" | "beacon";

export interface CardRow {
  k: string;
  v: string;
  cite: string[];
  unv?: boolean;
}

export interface ProjectCard {
  id: ProjectId;
  name: string;
  where: string;
  whereCite: string[];
  rows: CardRow[];
  status: string;
  statusCite: string[];
}

export const PROJECTS: ProjectCard[] = [
  {
    id: "skybox",
    name: "Skybox / Emergent",
    where: "City-owned land, inside city limits",
    whereCite: ["city-dc-page", "sal-20260113"],
    rows: [
      { k: "Size", v: "Up to 600 MW in earlier project literature; investor materials say up to 1.2 GW", cite: ["sal-20251230", "doge-june-report"], unv: true },
      { k: "Power", v: "AEP grid, Red Creek substation", cite: ["city-dc-page", "sal-20260923"] },
      { k: "Water", v: "Closed loop, capped by city ordinance", cite: ["city-water-ord"] },
    ],
    status: "Grid request on hold",
    statusCite: ["sal-20260923", "gov-0803"],
  },
  {
    id: "cipher",
    name: "Cipher",
    where: "Private land under county jurisdiction",
    whereCite: ["sal-20260923"],
    rows: [
      { k: "Size", v: "1 GW requested from ERCOT", cite: ["sal-20260923", "cipher-8k-20260804-deck"] },
      { k: "Power", v: "AEP grid, Red Creek substation", cite: ["sal-20260923", "cipher-10k-2025"] },
      { k: "Water", v: "Closed loop; fill water trucked in, per Cipher", cite: ["sal-20260923"], unv: true },
    ],
    status: "Grid request on hold",
    statusCite: ["sal-20260923", "gov-0803"],
  },
  {
    id: "beacon",
    name: "Beacon",
    where: "Private land near Dove Creek, outside city limits",
    whereCite: ["tceq-nori-184380", "sal-20260602"],
    rows: [
      { k: "Size", v: "2,409 MW gas power plant, by the applicant's filing", cite: ["westline-modeling-protocol"] },
      { k: "Power", v: "240 gas engines on site; grid as backup", cite: ["westline-modeling-protocol", "sal-20260602"] },
      { k: "Water", v: "On-site well and brackish treatment, per developer", cite: ["sal-20260602"], unv: true },
    ],
    status: "Air permit pending, state pause",
    statusCite: ["tceq-nori-184380", "gov-0921"],
  },
];

export const FOURTH_COMPANY =
  "<span class=\"unv\">Our June 2026 report quoted San Angelo Chamber of Commerce leadership saying a fourth company was interested in the area. It has not been named, and we found no news report of it.</span> {{c:doge-june-report}}";

export const WHAT_IT_IS = [
  "A data center is a large industrial building full of computers. Those computers run websites, store files, and, more and more, train and run artificial intelligence. The owner sells space, electricity, and cooling to technology companies. {{c:lbnl-2024}}",
  "The two big inputs are <strong>electricity</strong> and <strong>a way to get rid of heat</strong>. Heat leaves through air coolers, which use little water, or through evaporating water, which uses a lot. {{c:lbnl-2024}} For a community, the questions are the same as for any big industrial plant: who pays for the roads and power lines, how much water it uses, how loud it is, what it pays in taxes, and what happens if it fails.",
];

export const TYPES_TABLE: Table = {
  head: ["", "Traditional (colocation)", "AI computing campus"],
  rows: [
    ["What it does", "Rents space to many tenants who bring their own servers", "Runs dense AI chips for one or two very large customers"],
    ["Power per rack", "About 3 to 10 kW {{c:uptime-2026,uptime-2020}}", "50 kW and up; about 130 kW in the newest AI racks {{c:uptime-2026,supermicro-gb200}}"],
    ["Cooling", "Usually air {{c:lbnl-2024}}", "Liquid to the chips, then air coolers or evaporative towers {{c:supermicro-gb200,lbnl-2024}}"],
    ["Water", "Low with closed-loop cooling {{c:lbnl-2024}}", "Low with closed loop and air coolers; very high with evaporative towers {{c:lbnl-2024}}"],
    ["Typical size", "A few to tens of megawatts; the largest reach a few hundred {{c:uptime-2026}}", "Hundreds of megawatts to more than a gigawatt {{c:dcf-abilene,ercot-0820}}"],
    ["Main risk for the host town", "Slow to fill if the market softens {{c:doge-june-report}}", "Depends on a few customers and on AI chips that can be outdated within a few years {{c:doge-june-report,register-amazon}}"],
  ],
};

export const TYPES_NOTE =
  "Typical ranges from industry sources, including the Uptime Institute's 2026 survey and Lawrence Berkeley National Laboratory. For scale: 1 gigawatt (GW) is 1,000 megawatts (MW).";

export const SIGNS_NOTE = "These tests are our analysis, drawn from our June 2026 report. {{c:doge-june-report}}";

export const GOOD_SIGNS = [
  "It sits inside city limits, where zoning, noise, lighting, and water rules apply.",
  "It cools with a closed loop and air, and buys no drinking water to evaporate.",
  "The developer pays for its own substation, power lines, and road wear.",
  "A named tenant has signed a lease before public land or tax breaks change hands.",
  "Tax breaks are small or none, and any deal claws money back if jobs or investment fall short.",
  "Its new taxable value lands where it actually helps local budgets.",
  "A bond or deposit pays for removal if it shuts down.",
  "Owners and investors are named, and agreements are public before the vote.",
];

export const BAD_SIGNS = [
  "It sits on county land, where no local zoning, noise, or water rules apply.",
  "It burns natural gas on site around the clock near homes, creeks, or schools.",
  "It draws groundwater or city water for evaporative cooling during drought.",
  "No tenant, no named investors, and financing that depends on future AI demand.",
  "Large tax breaks, unpublished agreements, or confidentiality deals with officials.",
  "Grid or transmission costs land on other ratepayers.",
  "Ownership can change hands with no local review.",
  "The only public meeting happens after the permits are filed.",
];

/** Cell text may start with "yes:", "no:", or "unk:" to show a marker. */
export const SCORECARD: Table = {
  head: ["", "Skybox / Emergent", "Cipher", "Beacon"],
  rows: [
    [
      "Under city rules",
      "yes:Yes. Zoning, noise, lighting, water, and sewer ordinances apply. {{c:city-landuse-ord,city-water-ord,city-sewer-ord}}",
      "no:No. County jurisdiction, where there is no zoning. {{c:sal-20260923,travis-county-powers}}",
      "no:No. County land, no zoning. {{c:tceq-nori-184380,travis-county-powers}}",
    ],
    [
      "Power",
      "AEP grid. Developer pays for a dedicated substation. {{c:city-dc-page}}",
      "AEP grid. Cipher says it paid AEP a $17 million interconnection fee. {{c:sal-20260923,cipher-8k-20260804-deck}}",
      "240 gas engines on site; grid as backup. {{c:westline-modeling-protocol,sal-20260602}}",
    ],
    [
      "Cooling water",
      "yes:Public and capped. Closed loop, air cooled. The ordinance requires a closed loop and caps city water, and the City says it will not supply water for evaporative cooling. {{c:city-water-ord,city-dc-page}}",
      "Closed loop, air cooled. About 2 million gallons of non-potable water trucked in to fill, per Cipher. {{c:sal-20260923}}",
      "On-site well, mesquite clearing, and brackish treatment, per developer. {{c:sal-20260602}}",
    ],
    [
      "Signed tenant",
      "no:None named {{c:city-dc-page}}",
      "no:None for this site {{c:sal-20260923,cipher-10k-2025}}",
      "no:None named {{c:tceq-nori-184380,sal-20261008}}",
    ],
    [
      "Tax incentives",
      "City says none offered yet. A Chapter 380 agreement is to be proposed and discussed in open session. {{c:city-dc-page,city-statement-0609}}",
      "Says no abatement sought; floated a tax agreement tied to operating rules. {{c:sal-20260923}}",
      "unk:None disclosed {{c:sal-20261008,sal-20260602}}",
    ],
    [
      "State status",
      "ERCOT request on hold for the state audit {{c:sal-20260923,gov-0803}}",
      "ERCOT request on hold for the state audit {{c:sal-20260923,gov-0803}}",
      "Air permit application pending; issuance paused Sep 21 {{c:tceq-nori-184380,gov-0921}}",
    ],
    [
      "Owners named",
      "yes:Yes. Skybox; buyer entity managed by Skybox Partners IV. {{c:doge-june-report}}",
      "Cipher holds 76% of Colchis LLC. The partner holding 24% is not named. {{c:cipher-10q-2026q1,cipher-10q-2026q2-jv}}",
      "Started by Nadia Partners, a Calgary firm per trade press; investors not disclosed. {{c:bw-nadia-20250116,dcd-nadia-beacon}}",
    ],
    [
      "Public meetings",
      "Council meetings and an Apr 22 special meeting {{c:city-dc-page,ktxs-20260422}}",
      "Commissioners Court briefing, Sep 22 {{c:sal-20260923}}",
      "One community meeting, Apr 16; Commissioners Court, Jun 2 {{c:sal-20261008,sal-20260602}}",
    ],
  ],
  unv: ["2:2", "2:3", "4:2"],
};

export const WHO_DECIDES: Table = {
  head: ["Decision", "Who decides", "Applies to"],
  rows: [
    ["Zoning, setbacks, noise, lighting", "City Council {{c:city-landuse-ord}}", "Skybox only"],
    ["Use of city water and sewer", "City Council, by ordinance {{c:city-water-ord,city-sewer-ord}}", "Skybox, and any project buying city water"],
    ["Development agreement and local incentives (Chapter 380)", "City Council {{c:tx-lgc-380001,city-statement-0609}}", "Skybox"],
    ["Zoning on county land", "No one. Texas counties cannot zone unincorporated land. {{c:travis-county-powers,dallas-county-zoning}}", "Cipher, Beacon"],
    ["County roads, road-use bonds, and Chapter 381 agreements", "Commissioners Court {{c:tx-transp-251016,tx-lgc-381004}}", "Cipher, Beacon"],
    ["Air permits for engines and generators", "TCEQ (state) {{c:tceq-nori-184380,tceq-pbr-106511}}", "Beacon's gas plant; backup generators everywhere"],
    ["Grid connection", "ERCOT and the Public Utility Commission, through AEP Texas {{c:ercot-0820}}", "Skybox, Cipher"],
    ["Water wells", "The local groundwater conservation district, where one exists. Much of rural Tom Green County is in the Lipan-Kickapoo district. {{c:lkwcd-plan-2018}}", "Any project that drills"],
    ["State sales tax exemption on equipment and power", "Texas Comptroller, once a project is certified under Tax Code 151.359 {{c:tx-tax-151359}}", "Any project that qualifies"],
    ["New rules", "Texas Legislature, next regular session Jan 12, 2027 {{c:tx-gov-301001}}", "All"],
  ],
};

export const TIMELINE_2026: TimelineItem[] = [
  { d: "Jan 13", e: "<b>City rezones the Skybox site</b> to light manufacturing, 6-1. {{c:sal-20260113,city-dc-page}}" },
  { d: "Apr 8", e: "<b>Beacon Data Centers surfaces</b> with a project near Dove Creek. {{c:sal-20260408}}" },
  { d: "Apr 16", e: "<b>Beacon holds its only community meeting</b>, at The Four56 Church. {{c:sal-20261008}}" },
  { d: "May 19", e: "<b>City adopts data center land use rules</b>, 6-0. {{c:city-landuse-ord,city-dc-page}}" },
  { d: "Jun 2", e: "<b>City adopts wastewater rules</b>, 5-1. <b>Commissioners decline a moratorium</b> and hear from Beacon. {{c:city-sewer-ord,sal-20260602}}" },
  { d: "Jun 10", e: "<b>Governor</b> tells the PUC and ERCOT to make data centers pay for the power infrastructure they need. {{c:gov-0610}}" },
  { d: "Jun 12", e: "<b>Beacon's applicant files for TCEQ air permits</b> on the expedited track. {{c:tceq-nori-184380}}" },
  { d: "Jun 16", e: "<b>City adopts its data center water ordinance</b>, 7-0. {{c:city-water-ord}}" },
  { d: "Aug 3", e: "<b>Governor orders an audit</b> of data centers in ERCOT's connection process and pauses their progress. {{c:gov-0803}}" },
  { d: "Aug 7", e: "<b>Governor says Skybox committed</b> to his data center standards. {{c:gov-0807}}" },
  { d: "Aug 10", e: "<b>Rep. Drew Darby writes TCEQ</b> and asks for a public meeting in Tom Green County. {{c:darby-tceq-0810}}" },
  { d: "Sep 14", e: "<b>Governor tells the Water Development Board</b> to penalize data centers that fail to report water use. {{c:gov-0914}}" },
  { d: "Sep 21", e: "<b>Governor tells TCEQ to issue no permits</b> for data center projects until the audits are done. {{c:gov-0921}}" },
  { d: "Sep 22", e: "<b>Cipher briefs the Commissioners Court</b> on its project. No vote. {{c:sal-20260923}}" },
  { d: "Sep 24", e: "<b>Attorney General opens an investigation</b> into water-use reporting by hundreds of data center developments. <span class=\"unv\">KERA News reported Tom Green County among the counties in the first round.</span> {{c:foley-0924,kera-0928}}" },
  { d: "Oct 8", e: "<b>Darby asks Beacon to withdraw</b> its permit applications. {{c:sal-20261008}}" },
  { d: "December", e: "<b>ERCOT audit report due Dec 10</b>, with a PUC meeting Dec 17. Cipher expects word on its grid request around Dec 7. {{c:ercot-0820,sal-20260923}}", next: true },
  { d: "Jan 2027", e: "<b>Legislature convenes Jan 12.</b> The Governor says he will ask lawmakers to end financial incentives for data centers. {{c:tx-gov-301001,gov-0921}}", next: true },
];

export const ASK_ANY_PROPOSAL = [
  "Who is the tenant, and is the lease signed?",
  "Where does the water come from, and how many gallons a year, in writing?",
  "Who pays for the substation, power lines, and road wear?",
  "What tax breaks are requested, from which governments, and what is clawed back if promises are missed?",
  "How loud will it be at the nearest home, in dBA and dBC, day and night?",
  "Who owns it, and can ownership change without notice?",
  "What bond covers cleanup and removal if it closes?",
];

export interface ProjectPage {
  id: ProjectId;
  eyebrow: string;
  title: string;
  lede: string;
  chips: string[];
  factsNote: string;
  facts: Fact[];
  extra?: { title: string; note?: string; facts?: Fact[]; table?: Table; tableNote?: string };
  timeline: TimelineItem[];
  questions: OpenQuestion[];
  doNote?: string;
  todo: string[];
  todoNote?: string;
  docs: DocLink[];
}

export const PROJECT_PAGES: Record<ProjectId, ProjectPage> = {
  skybox: {
    id: "skybox",
    eyebrow: "Data center · Inside city limits",
    title: "Skybox / Emergent campus",
    lede: "A data center campus proposed on city-owned land at the old city farm, near US 67 North and City Farm Road. It is the only one of the three proposals inside city limits, so city zoning, noise, lighting, water, and sewer rules apply.",
    chips: ["Grid request on hold", "380 agreement not yet proposed"],
    factsNote: "Pink rows are developer projections, news-only items, or figures that differ across sources.",
    facts: [
      { k: "Developer", v: "Skybox Datacenters of Dallas. Emergent markets the campus as SA1. Images of 380 agreement documents between the City and Emergent circulated online; the City says they were examples and nothing has been agreed.", cite: ["city-statement-0609", "sal-20251230", "doge-june-report"] },
      { k: "Buyer of record", v: "San Angelo Data Center Campus Power LLC, managed by Skybox Partners IV LLC. Took over the buyer's interest Dec 19, 2025.", cite: ["doge-june-report"], src: "Title commitment GF No. 2505041TG, cited in our June report" },
      { k: "Site", v: "City-owned land northeast of town near US 67 North and City Farm Road. Annexed and rezoned from Ranch and Estate to Light Manufacturing.", cite: ["city-dc-page", "sal-20260111", "sal-20260113"] },
      { k: "Acres and price", v: "About 345 to 350 acres at $50,000 an acre: roughly $17.3 million to $17.5 million. Sources differ on the acreage.", cite: ["sal-20260111", "dcd-skybox", "ktxs-20260105"], src: "News coverage", unv: true },
      { k: "Land sale", v: "Purchase and sale agreement signed in 2025. The City's page does not show the sale as closed.", cite: ["doge-june-report", "city-dc-page", "dcd-skybox"] },
      { k: "Size", v: "Up to 600 MW in earlier project literature. Emergent's investor materials describe up to 1.2 GW. The developer's answers on the City page assume a first phase of 100 to 250 MW. Up to six buildings.", cite: ["sal-20251230", "doge-june-report", "city-dc-page", "dcd-skybox"], src: "Figures differ across sources", unv: true },
      { k: "Power", v: "AEP Texas, Red Creek 345-kV substation. The developer pays for a dedicated substation and upgrades. ERCOT sets the final load after its studies.", cite: ["city-dc-page", "sal-20260923"] },
      { k: "Grid status", v: "In ERCOT's first group of large requests (\"Batch Zero\"). On hold since the state audit ordered Aug 3, 2026.", cite: ["sal-20260923", "ercot-0820", "gov-0803"] },
      { k: "Cooling and water", v: "Closed loop, air cooled. The City will not supply water for evaporative cooling. Initial fill capped at 8.0 gallons per square foot of building; make-up water capped at 6% of loop volume a year. The developer's example: a 250,000 sq ft building needs about 2 million gallons to fill and about 60,000 gallons a year after. The ordinance would allow up to about 120,000 gallons a year for that building.", cite: ["city-water-ord", "city-dc-page"] },
      { k: "Wastewater", v: "The sewer ordinance sets rules and testing for discharges of treated cooling fluid to the city sewer. The developer says nothing goes to ground or storm drains and no PFAS will be added. The City has no written chemical list yet.", cite: ["city-sewer-ord", "city-dc-page"] },
      { k: "Noise, light, setbacks", v: "Sound study required, with a limit of 55 dBA day and night at the property line. Shielded lighting with a 90 degree cutoff, 3000K at most. Buildings at least 300 feet from residential zoning and from homes outside city limits; ground equipment at least 200 feet away. 75 feet and three stories at most.", cite: ["city-landuse-ord"] },
      { k: "Jobs", v: "Developer projection: 30 to 60 in year one, 120 to 200 at full build over 10 years, average pay $75,000 to $110,000.", cite: ["city-dc-page"], src: "Developer figures", unv: true },
      { k: "Local incentives", v: "The City says no incentives or subsidies have been offered. A Chapter 380 agreement is to be proposed and discussed in open session. No date set.", cite: ["city-dc-page", "city-statement-0609"] },
      { k: "State tax break", v: "The state sales tax exemption on equipment and electricity applies to certified data centers that invest at least $200 million and create 20 jobs paying at least 120% of the county average wage. News coverage says this project is likely to qualify.", cite: ["tx-tax-151359", "sal-20260426"] },
      { k: "Economic study", v: "Under way with Cirrus Advisors. No figures published. Records reviewed for our June report show Cirrus was introduced to the City by Emergent's CEO.", cite: ["city-dc-page", "doge-june-report"] },
      { k: "Tenant", v: "None named.", cite: ["city-dc-page"] },
      { k: "Independent water review", v: "No independent water impact study or environmental review has been done, and the City says no environmental review is currently planned.", cite: ["city-dc-page"] },
      { k: "State standards", v: "The Governor announced Aug 7, 2026 that Skybox committed to comply with his data center standards.", cite: ["gov-0807"] },
      { k: "School district", v: "Not confirmed. The Cipher site next door is reported to be in Veribest ISD.", cite: ["sal-20260923"], src: "News coverage", unv: true },
    ],
    timeline: [
      { d: "May 2025", e: "<b>Council authorizes the sale</b> at $50,000 an acre. Purchase agreement signed. {{c:dcd-skybox,ktxs-20260105}}" },
      { d: "Dec 19, 2025", e: "<b>Buyer's interest assigned</b> to San Angelo Data Center Campus Power LLC. {{c:doge-june-report}}" },
      { d: "Jan 13, 2026", e: "<b>Zone change approved</b>, 6-1. {{c:sal-20260113,city-dc-page}}" },
      { d: "Apr 22, 2026", e: "<b>Special council meeting</b> on the project. {{c:city-dc-page,ktxs-20260422}}" },
      { d: "May 19, 2026", e: "<b>Land use rules</b> adopted, 6-0. {{c:city-landuse-ord}}" },
      { d: "Jun 2, 2026", e: "<b>Wastewater rules</b> adopted, 5-1. {{c:city-sewer-ord,city-dc-page}}" },
      { d: "Jun 9, 2026", e: "<b>City says 380 terms are not decided</b> after images of documents circulate online. {{c:city-statement-0609}}" },
      { d: "Jun 16, 2026", e: "<b>Water ordinance</b> adopted, 7-0. {{c:city-water-ord}}" },
      { d: "Aug 3, 2026", e: "<b>State audit pauses</b> ERCOT progress for data centers, including this project's Batch Zero request. {{c:gov-0803,sal-20260923}}" },
      { d: "Aug 7, 2026", e: "<b>Skybox commits</b> to the Governor's data center standards. {{c:gov-0807}}" },
      { d: "Next", e: "<b>ERCOT audit report</b> due Dec 10. <b>380 agreement</b> to be proposed in open session, no date. {{c:ercot-0820,city-statement-0609}}", next: true },
    ],
    questions: [
      { q: "Has the land sale closed, and for how many acres?", why: "The City's data center page does not say." },
      { q: "What will the 380 agreement give the developer, and what does the City get back?", why: "No draft has been posted." },
      { q: "Is this a 600 MW campus or a 1.2 GW campus?", why: "Project literature and investor materials differ." },
      { q: "Who is the tenant?" },
      { q: "What do the Cirrus Advisors numbers show, including a case where the project struggles?" },
      { q: "Which school district would tax the campus?" },
      { q: "What chemicals go in the cooling loop, and at what strength?", why: "The City says it does not have a written list." },
    ],
    todo: [
      `<strong>Watch the council agenda</strong> for the 380 agreement and speak during public comment: ${L(S.agendas, "City Council agendas")}.`,
      `<strong>Request records</strong> through the City's ${L(S.records, "public information portal")}, such as drafts of the 380 agreement and the Cirrus Advisors study.`,
      "<strong>Get an alert</strong> when the 380 agreement is posted: [[alerts|sign up]].",
    ],
    docs: [
      { tag: "City", title: "City of San Angelo data center information page", url: U("city-dc-page"), note: "Questions and answers, ordinances, meeting video, and water figures.", kind: "Web" },
      { tag: "May 2026", title: "Land use regulations", url: U("city-landuse-ord"), kind: "PDF" },
      { tag: "Jun 2026", title: "Water usage ordinance", url: U("city-water-ord"), kind: "PDF" },
      { tag: "Jun 2026", title: "Sewer and discharge ordinance", url: U("city-sewer-ord"), kind: "PDF" },
    ],
  },

  cipher: {
    id: "cipher",
    eyebrow: "Data center · County jurisdiction",
    title: "Cipher data center",
    lede: "A 1-gigawatt data center proposed by Cipher Digital on private land just east of the Skybox site, running south along City Farm Road to the Red Creek substation. It is under county jurisdiction, so no city ordinance applies and the county has no zoning power.",
    chips: ["Grid request on hold", "No tenant"],
    factsNote: "Much of what is known about this site comes from Cipher's Sep 22 briefing to the Commissioners Court. Those statements are shown in pink until they appear in a filing or agreement.",
    facts: [
      { k: "Developer", v: "Cipher Digital Inc. (Nasdaq: CIFR), through Colchis LLC. Cipher bought 53% of Colchis LLC in late 2025 and raised its stake to 76% in early 2026 through capital contributions. The partner holding the remaining 24% is not named. Cipher's filings say clauses in the agreement could require it to buy out the partner's share after events Cipher does not control.", cite: ["cipher-10k-2025-note8-detail", "cipher-10q-2026q1", "cipher-10q-2026q2-jv"] },
      { k: "Purchase date", v: "Cipher's 2025 annual report says it bought into Colchis LLC in November 2025; the notes to its financial statements say October 2025.", cite: ["cipher-10k-2025", "cipher-10k-2025-note8-detail"] },
      { k: "Site", v: "Private land off US 67 North, running south down City Farm Road to the Red Creek substation, which sits in the middle of Cipher's land. \"A few hundred acres\" bought, with options toward about 600 acres. Price not disclosed.", cite: ["sal-20260923", "cipher-10k-2025"] },
      { k: "Size", v: "1 GW requested from ERCOT.", cite: ["sal-20260923", "cipher-8k-20260804-deck"] },
      { k: "Power", v: "AEP Texas grid at Red Creek. Cipher says it paid AEP a $17 million interconnection fee and holds a conditional utility approval.", cite: ["sal-20260923", "cipher-10k-2025", "cipher-8k-20260804-deck"] },
      { k: "Grid status", v: "In ERCOT's \"Batch Zero\" group; on hold until the state audit is done. Cipher expects word around Dec 7.", cite: ["sal-20260923", "cipher-8k-20260804-deck", "gov-0803"] },
      { k: "Cooling and water", v: "Closed loop with air-cooled chillers. About 2 million gallons of non-potable water (produced or brackish) trucked in to fill the loop, then about 5 gallons a day per employee. No drinking water for cooling, construction, or dust control. Cipher said it is not drilling drinking-water wells. Loop water treated and hauled off when changed.", cite: ["sal-20260923"], src: "Cipher at Commissioners Court, Sep 22, 2026", unv: true },
      { k: "Backup power", v: "Four-hour batteries, per Cipher. No TCEQ power plant application on file.", cite: ["sal-20260923", "tceq-nsr-pending"] },
      { k: "Tenant", v: "None signed for this site. Cipher's $5.5 billion, 15-year Amazon Web Services lease is for its Black Pearl site near Wink, in Winkler County, not this one.", cite: ["cipher-10k-2025", "cipher-8k-20251103-pr", "texas-almanac-winkler"] },
      { k: "Jobs", v: "Company estimate: at least 100 permanent jobs, maybe 200 to 300, average pay $70,000 to $80,000. Construction would last almost two years; Commissioner Nanny asked about a workforce of roughly 1,000.", cite: ["sal-20260923"], src: "Cipher, Sep 22, 2026", unv: true },
      { k: "Timeline", v: "Company plan: design final in late 2026; construction from early 2027 if the audit clears; 14 to 20 months to build.", cite: ["sal-20260923"], src: "Cipher, Sep 22, 2026", unv: true },
      { k: "Taxes", v: "Cipher says it is not seeking an abatement, but suggested a tax agreement tied to operating rules.", cite: ["sal-20260923"], src: "Cipher, Sep 22, 2026", unv: true },
      { k: "School district", v: "Veribest ISD, as stated by Councilman Patrick Keely at the Sep 22 meeting. Not SAISD.", cite: ["sal-20260923"], src: "News coverage", unv: true },
      { k: "County role", v: "No county zoning. The county controls its roads, and Cipher needs a road-use agreement for City Farm Road.", cite: ["sal-20260923", "tx-transp-251016"] },
      { k: "Company finances", v: "First quarter 2026: net loss $114.3 million; total debt $4.73 billion; interest expense $59.2 million against $34.8 million of bitcoin mining revenue. Net losses in each of 2023, 2024, and 2025; accumulated deficit $1.118 billion.", cite: ["cipher-10q-2026q1-ops", "cipher-10q-2026q1-bs", "cipher-10k-2025-ops"] },
    ],
    extra: {
      title: "What commissioners asked for on Sep 22",
      note: "No vote was taken. Judge Lane Carter declined a private meeting, so the briefing was held in open court. From news coverage of the meeting.",
      facts: [
        { k: "Shawn Nanny", v: "A full-time on-site ombudsman, a decommissioning bond, a Chapter 381 agreement with strict penalties up to shutdown, and at least 50% local construction hiring.", cite: ["sal-20260923"], unv: true },
        { k: "Chad Decker", v: "Groundwater pollution safeguards.", cite: ["sal-20260923"], unv: true },
        { k: "Ralph Hoelscher", v: "Opposes tax breaks and said he would be the first to vote against one.", cite: ["sal-20260923"], unv: true },
        { k: "Lane Carter", v: "Said any abatement would be handled like past wind and solar negotiations.", cite: ["sal-20260923"], unv: true },
      ],
    },
    timeline: [
      { d: "Oct 2025", e: "<b>Cipher buys 53% of Colchis LLC</b>, announced Nov 3. {{c:cipher-10k-2025-note8-detail,cipher-8k-20251103-pr}}" },
      { d: "Early 2026", e: "<b>Cipher's stake rises to 76%</b> through capital contributions. {{c:cipher-10q-2026q1}}" },
      { d: "Mar 2026", e: "<b>Land purchases.</b> <span class=\"unv\">A residents' petition cites four tracts totaling more than 301 acres.</span> {{c:petition-cipher-water}}" },
      { d: "Aug 3, 2026", e: "<b>State audit</b> pauses ERCOT progress for data centers. {{c:gov-0803}}" },
      { d: "Aug 4, 2026", e: "<b>Cipher tells investors</b> it expects the project to be included in ERCOT's Batch Zero. {{c:cipher-8k-20260804-deck}}" },
      { d: "Aug 19, 2026", e: "<b>Petition</b> asks the Lipan-Kickapoo Water Conservation District to require Cipher's water plan before any well permit. {{c:petition-cipher-water}}" },
      { d: "Sep 22, 2026", e: "<b>Commissioners Court briefing.</b> No vote. {{c:sal-20260923}}" },
      { d: "December", e: "<b>ERCOT decision</b> expected after the audit, due Dec 10. Construction would follow in 2027 if cleared. {{c:ercot-0820,sal-20260923}}", next: true },
    ],
    questions: [
      { q: "Who owns the other 24% of Colchis LLC?", why: "Cipher's filings do not name the partner." },
      { q: "Who is the tenant?" },
      { q: "What tax agreement would Cipher want, from which governments, and with what penalties?" },
      { q: "Where will the fill water come from, and how many truckloads on City Farm Road?" },
      { q: "Who pays for road wear, and what bond covers it?" },
      { q: "Will there be a decommissioning bond?" },
    ],
    todo: [
      `<strong>Speak at Commissioners Court</strong> when a road-use or Chapter 381 agreement comes up: ${L(S.county, "tomgreencountytx.gov")}.`,
      "<strong>Watch the groundwater district</strong> for any well application on these tracts.",
      "<strong>Get an alert</strong> when ERCOT rules or an agreement is posted: [[alerts|sign up]].",
    ],
    docs: [
      { tag: "SEC", title: "Cipher Digital 2025 annual report (Form 10-K)", url: U("cipher-10k-2025"), kind: "Filing" },
      { tag: "SEC", title: "Cipher Digital quarterly report, Mar 31, 2026 (Form 10-Q)", url: U("cipher-10q-2026q1"), kind: "Filing" },
      { tag: "Sep 2026", title: "Coverage of the Sep 22 Commissioners Court briefing", url: U("sal-20260923"), note: "San Angelo LIVE!", kind: "News" },
      { tag: "Aug 2026", title: "Residents' petition on Cipher's water plan", url: U("petition-cipher-water"), note: "An advocacy document; its claims are the author's.", kind: "Web" },
    ],
  },

  beacon: {
    id: "beacon",
    eyebrow: "Data center · County land · Private power plant",
    title: "Beacon data center",
    lede: "A data center with its own natural gas power plant, proposed about a quarter mile south of US 67 on FM 2335, along Spring Creek near Dove Creek, about 10 miles southwest of San Angelo. The plant would power only the data center. It sits outside city limits, where the county cannot zone or regulate noise.",
    chips: ["Air permit pending", "State permit pause"],
    factsNote: "Plant figures come from the applicant's own filings with TCEQ. Gas use is our estimate, because the filings do not state it.",
    facts: [
      { k: "Developer", v: "Beacon Data Centers. The permit applicant is Westline TX Holdings LLC, and the state filings call the project Westline 2335.", cite: ["tceq-nori-184380", "tceq-pls-184380"] },
      { k: "Ownership", v: "Started by Nadia Partners, which trade press describes as a Calgary-based venture firm. Investors not disclosed.", cite: ["bw-nadia-20250116", "bw-beacon-20250515", "dcd-nadia-beacon"] },
      { k: "Air permit application", v: "One application under TCEQ permit numbers 184380, PSDTX1710, and GHGPSDTX275, filed Jun 12, 2026 on the expedited track. None granted. <span class=\"unv\">Rep. Darby's letter also lists HAP93, which does not appear in TCEQ's notice.</span>", cite: ["tceq-nori-184380", "tceq-nsr-pending", "darby-tceq-0810"] },
      { k: "Engines", v: "240 gas engines with 180-foot stacks. Up to 200 would run at once, under a proposed yearly cap on engine-hours equal to 200 engines running full time.", cite: ["westline-modeling-protocol"] },
      { k: "Power plant size", v: "2,409 megawatts net, by the applicant's own figure for 200 engines running. That is enough for roughly 480,000 homes, by our estimate. None of it would go to the public.", cite: ["westline-modeling-protocol", "eip-0625", "our-analysis"] },
      { k: "Hazardous air pollutants", v: "The applicant's own potential to emit: 697 tons a year, about 28 times the federal major-source threshold of 25 tons. <span class=\"unv\">Gas engines typically emit formaldehyde and acetaldehyde; the filings we could reach do not list the compounds.</span>", cite: ["westline-modeling-protocol", "usc-7412", "sad-westline-brochure"] },
      { k: "Gas use", v: "About 440 million cubic feet a day. The application does not state gas use or name a supplier; the Matterhorn Express pipeline crosses southern Tom Green County.", cite: ["sad-westline-brochure", "salive-matterhorn-2023"], src: "Our estimate", unv: true },
      { k: "Air modeling", v: "The air modeling covers 200 engines running at once at full load, while 240 would be installed. The applicant proposes a yearly cap on engine-hours, not a limit on how many engines can run at the same time.", cite: ["westline-modeling-protocol"] },
      { k: "Water", v: "The developer told commissioners on Jun 2 the plan relies on an on-site well, clearing mesquite to free up water, and treating brackish water.", cite: ["sal-20260602"], src: "Developer statement, from news coverage", unv: true },
      { k: "Tenant and investors", v: "None disclosed.", cite: ["tceq-nori-184380", "bw-beacon-20250515"] },
      { k: "Public meetings", v: "One community meeting, Apr 16, 2026, at The Four56 Church. Commissioners Court appearance Jun 2.", cite: ["sal-20260408", "sal-20261008", "sal-20260602"] },
      { k: "State pause", v: "On Sep 21, 2026, the Governor directed TCEQ to issue no permits for data center projects until state grid and water audits are done.", cite: ["gov-0921"] },
      { k: "State representative", v: "Rep. Drew Darby wrote TCEQ and Beacon on Aug 10 and asked TCEQ for a public meeting in Tom Green County. On Oct 8 he asked Beacon to withdraw its applications and said he will oppose each permit.", cite: ["darby-tceq-0810", "salive-darby-aug10", "sal-20261008"] },
    ],
    extra: {
      title: "How loud would it be?",
      note: "A screening estimate from our noise report, based on the engine maker's factory sound data, not a field measurement. It assumes all 240 engines running; with 200 running, levels would be about 1 dB lower. No noise study, noise data, or noise limit appears in the application, and TCEQ does not weigh noise in air permits. {{c:sad-noise-report,tceq-gi-650}}",
      table: {
        head: ["Place", "Distance", "Estimated level", "What it is like"],
        rows: [
          ["Foster Park", "1.1 mi", "60 dBA", "Like someone talking beside you"],
          ["West Texas Boys Ranch (36 boys, 25 staff)", "1.9 mi", "55 dBA", "A steady rumble, day and night. A quiet night there is estimated at about 29 dBA."],
          ["The Four56 Church", "2.0 mi", "54 dBA", "A steady rumble"],
          ["Twin Buttes Reservoir", "4.6 mi", "45 dBA", "A clear hum on a still night"],
          ["Edge of San Angelo", "8.4 mi", "39 dBA", "A faint hum, above natural quiet"],
        ],
        num: [1, 2],
        unv: ["0:2", "1:2", "2:2", "3:2", "4:2"],
      },
      tableNote: `dBA is what a sound meter reports. It filters out the deep rumble, which carries furthest and passes through walls. The low-frequency reading (dBC) runs about 24 to 27 dB higher at every distance. Method and assumptions: ${L(S.noise, "our noise screening")}. {{c:sad-noise-report}}`,
    },
    timeline: [
      { d: "Apr 8, 2026", e: "<b>Beacon surfaces</b> with a project in the Dove Creek area. {{c:sal-20260408}}" },
      { d: "Apr 16, 2026", e: "<b>Community meeting</b> at The Four56 Church. {{c:sal-20261008}}" },
      { d: "Jun 2, 2026", e: "<b>Beacon answers commissioners' questions</b>: gas engines, grid backup, on-site well. The court declines a moratorium. {{c:sal-20260602}}" },
      { d: "Jun 12, 2026", e: "<b>Air permit application filed</b> with TCEQ on the expedited track. {{c:tceq-nori-184380}}" },
      { d: "Jun 16, 2026", e: "<b>TCEQ's first public notice</b> issued; amended Jul 7. {{c:tceq-nori-184380-orig,tceq-nori-184380}}" },
      { d: "Aug 10, 2026", e: "<b>Darby writes TCEQ and Beacon</b>; asks TCEQ for a public meeting. {{c:darby-tceq-0810,salive-darby-aug10}}" },
      { d: "Sep 21, 2026", e: "<b>Governor pauses</b> TCEQ permits for data center projects. {{c:gov-0921}}" },
      { d: "Oct 8, 2026", e: "<b>Darby asks Beacon to withdraw.</b> No reply reported. {{c:sal-20261008}}" },
      { d: "Next", e: "<b>State audits</b> expected in December. If TCEQ resumes and drafts a permit, watch for the second notice, which starts the final 30 days for comments. {{c:ercot-0820,tac-55-152}}", next: true },
    ],
    questions: [
      { q: "Who are the investors, and who would buy the computing?", why: "Neither is disclosed in the filings or at public meetings." },
      { q: "Will the permit limit the plant to 200 engines running at once, as the air modeling assumes, and how would TCEQ check it?" },
      { q: "How much groundwater would the well draw, and from which aquifer?" },
      { q: "What noise limit, if any, would apply at the Boys Ranch and nearby homes?" },
    ],
    doNote: "An air permit application is not an approval. Residents have a defined role in TCEQ's process.",
    todo: [
      `<strong>Send a written comment</strong> to TCEQ on permit 184380 through its ${L(S.tceqComment, "online comment system")}. A few sentences is enough. TCEQ must respond in writing to timely comments that are relevant to its decision, and commenting puts you on the mailing list for later notices. Any later hearing request must rest on issues raised in comments, so comment early and name your concerns. {{c:tac-55-156,tac-55-201,tceq-participation-overview}}`,
      "<strong>If you live or own land nearby or downwind</strong>, you may qualify as an affected person who can request a contested case hearing, a trial-like proceeding before a state administrative law judge. Hearing requests are due 30 days after TCEQ mails its response to comments. Talk to an environmental attorney about deadlines. {{c:tceq-nori-184380,tac-55-201,tceq-participation-overview}}",
      "<strong>Watch for the second newspaper notice.</strong> TCEQ issued the first notice in June 2026 (amended Jul 7), so comments can be sent now. If TCEQ drafts a permit, the Notice of Application and Preliminary Decision will be published and mailed, and comments close 30 days after it runs. {{c:tceq-nori-184380,tac-55-152}}",
      "<strong>Ask for permit conditions</strong>: a permanent public air monitor, a hard limit of 200 engines running at once, and testing for the hazardous pollutants. {{c:westline-modeling-protocol}}",
      "<strong>Watch the groundwater district</strong> for well applications on this tract. {{c:lkwcd-plan-2018}}",
      "<strong>Read or request the file.</strong> The application can be viewed free at the Tom Green County Library's Angelo West Branch. TCEQ charges nothing to file a public information request; copies may carry a fee. {{c:tceq-nori-184380,tceq-records-request}}",
      "<strong>Get an alert</strong> when a TCEQ notice is published: [[alerts|sign up]].",
    ],
    todoNote: "This is general information, not legal advice.",
    docs: [
      { tag: "TCEQ", title: "Amended notice of receipt of application, permit 184380", url: U("tceq-nori-184380"), kind: "State" },
      { tag: "TCEQ", title: "Plain language summary, permit 184380", url: U("tceq-pls-184380"), kind: "State" },
      { tag: "Aug 2026", title: "Rep. Drew Darby's letter to TCEQ", url: U("darby-tceq-0810"), kind: "PDF" },
      { tag: "Oct 2026", title: "Darby asks Beacon to leave Dove Creek", url: U("sal-20261008"), note: "San Angelo LIVE!", kind: "News" },
      { tag: "Sep 2026", title: "Governor directs TCEQ to halt data center permits", url: U("gov-0921"), kind: "State" },
    ],
  },
};
