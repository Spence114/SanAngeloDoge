import type { Fact } from "./types.ts";

export const ABOUT_LEDE =
  "An independent, citizen-run look at local government finances in San Angelo and Tom Green County: the City of San Angelo, Tom Green County, San Angelo ISD, and the Tom Green County Appraisal District.";

export const WHO = [
  "San Angelo DOGE is run by <strong>Spencer Matthews</strong>, a San Angelo resident and independent journalist. It has no political party and is not affiliated with any government, or with any organization using the name DOGE at the federal or state level. The author has no financial interest in the data center projects covered here. His work building AI systems is disclosed below.",
  "The goal is simple: local government works better when residents can see the numbers. Budgets, debt, votes, and big projects are presented in plain words, with every figure linked to where it came from.",
];

export const DISCLOSURE = [
  "Spencer Matthews, who writes this site, builds AI systems for companies and organizations through his firm, Mosir.",
  "He is currently assisting the San Angelo Police Department in setting the selection criteria for bringing on a local company to build out the local plate camera system discussed on our Flock cameras page.",
];

export const STANDARDS: Fact[] = [
  { k: "Sources", v: "Figures come from public records: adopted budgets, audits, state debt reports, agendas and minutes, permit filings, and company filings. Each figure links to its source or names it." },
  { k: "Pink", v: "Pink marks anything not yet verified against a source document: estimates, projections, company statements, and items from news coverage.", unv: true },
  { k: "Same rules for all", v: "The four governments get the same scrutiny and the same format." },
  { k: "Privacy", v: "We hold that privacy is a human right. It shapes how we handle your information and how we cover surveillance. Our position on plate cameras and our proposed Technology Bill of Rights are on the [[privacy|Flock cameras page]]." },
  { k: "Data and opinion apart", v: "Data pages stick to the record. Analysis and opinion are labeled as such and kept apart." },
  { k: "Conflicts shown", v: "When two official documents disagree, we show both and list the question for the office that published them." },
  { k: "Corrections", v: "Errors are fixed and logged below with the date." },
];

export const CORRECTIONS = [
  {
    date: "Oct 29, 2026",
    page: "All pages",
    what: "Checked every figure on the site against its source document and added numbered sources to the bottom of each page.",
  },
  {
    date: "Oct 29, 2026",
    page: "Finances",
    what: "City debt now uses the Texas Bond Review Board's figures ($265.9 million as of Aug 31, 2025), because the City's FY2025 audit disagrees with itself. Added Fitch's June 2026 rating cut for the City. Water and sewer plant total is $171,939,200. {{c:brb-san-angelo,city-acfr-fy2025,news-fitch-downgrade,cc-packet-2023-07-06}}",
  },
  {
    date: "Oct 29, 2026",
    page: "Data centers",
    what: "Corrected: Cipher owns 76% of Colchis LLC, not 53%; we had called Cipher \"never profitable,\" but it reported net income for the first quarter of 2024, though net losses for each full year 2023 through 2025; the Beacon plant is 2,409 MW by the applicant's figure; the Attorney General's investigation was announced Sep 24, not Sep 25. {{c:cipher-10q-2026q1,cipher-8k-20240507-pr,cipher-10k-2025-ops,westline-modeling-protocol,foley-0924}}",
  },
  {
    date: "Oct 29, 2026",
    page: "Skybox",
    what: "Corrected: make-up water is capped at 6% of loop volume a year, not 3%; the building setback is 300 feet from residential zoning, with ground equipment at least 200 feet away; the site is about 345 to 350 acres. {{c:city-water-ord,city-landuse-ord,sal-20260111,dcd-skybox}}",
  },
  {
    date: "Oct 29, 2026",
    page: "Flock cameras",
    what: "Corrected: Flock dates its immigration and reproductive health search filters to June 2025, not October 2025. The vote and grant figures are now cited to the City's own minutes and packet. {{c:flock-blog-ice,cc-minutes-2025-10-07,cc-packet-2025-10-07}}",
  },
  {
    date: "Oct 29, 2026",
    page: "Reports",
    what: "Our Oct 28 update to the June 2026 data center report gave the adopted setback as 100 feet. It is 300 feet for buildings and 200 feet for ground equipment. The Beacon briefing is dated June 2026. {{c:city-landuse-ord,sad-westline-brochure}}",
  },
  {
    date: "Oct 28, 2026",
    page: "Reports",
    what: "Added updates to the June 2026 data center report.",
  },
];

export const SITE_PRIVACY = [
  "<strong>What we collect.</strong> Only what you type into a form: your email, and if you choose, your name, phone, street address, topics, and messages. Tip line contact fields are optional.",
  "<strong>Why.</strong> To send the alerts you asked for, to measure zoning cases against your address, and to answer you.",
  "<strong>Who sees it.</strong> Forms are sent by email to Spencer@sanangelodoge.com. Only the San Angelo DOGE team reads them. We never sell or share your information, and we never publish a tipster's name without permission.",
  "<strong>Your choices.</strong> Every email has an unsubscribe link. To have your information deleted, email Spencer@sanangelodoge.com.",
];

export const DISCLAIMER = [
  "SanAngeloDOGE.com is an independent citizen journalism and research project. It is not affiliated with, endorsed by, or acting on behalf of the City of San Angelo, Tom Green County, San Angelo ISD, the Tom Green County Appraisal District, any government agency, political party, or elected official, or any organization using the name \"DOGE\" at the federal or state level.",
  "Research, analysis, and commentary published here are the independent work and opinion of the author. Nothing on this site is legal, tax, financial, investment, or other professional advice.",
  "Data and source materials come from publicly available government records, official filings, meeting minutes, budgets, and other open sources. Every reasonable effort is made to be accurate, but no warranty is made as to completeness, timeliness, or fitness for any purpose. Errors, when found, are corrected.",
  "This site does not accept advertising. Opinions are the author's alone and do not represent any employer, business, organization, or other person.",
];
