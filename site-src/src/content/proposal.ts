// The dashboard proposal: what it would do, how it would work, where it stands, and the sponsor ask.
// Phase 0 framing: the dashboard is proposed and in development, not built.

export type ModuleStatus = "Prototype" | "Designed" | "Planned" | "Considering" | "Sign-up open";

export interface Module {
  name: string;
  what: string;
  status: ModuleStatus;
  when?: string;
}

export const PROPOSAL_LEDE =
  "A dashboard that tracks the finances of the City of San Angelo, Tom Green County, San Angelo ISD, and the Appraisal District, gathered from the public record on a schedule and checked against the source documents. This page lays out what it would do, how it would work, what it takes to build, and how sponsors can help.";

export const DONE_SO_FAR = [
  "Mapped the public records of all four governments: websites, document centers, meeting portals, and state reports. More than 30 public data systems identified. {{c:internal-data-catalog}}",
  "Pulled the headline figures by hand from budgets, audits, and state debt reports, and published them on this site with their sources.",
  "Reviewed City Council records back to 2015, and Commissioners Court meetings and contested votes back to 2008, to learn where the money decisions are recorded. {{c:internal-council-review,internal-county-review}}",
  "Designed the dashboard and the data plan, and drew up the rules for checking each figure.",
];

export const STILL_TO_BUILD = [
  "Automated collection that pulls new agendas, budgets, audits, and reports on a schedule, in every format the governments use.",
  "Automatic validation that checks each figure against its source document and flags conflicts for review.",
  "Databases and a records archive that can take in years of documents and keep growing.",
  "The public dashboard and alerts, built on that data.",
  "A dedicated local AI machine to run it all and answer residents' research questions from the record.",
];

export const FLOW = [
  { k: "Public records", v: "Agendas, minutes, budgets, audits, state debt reports, and appraisal data." },
  { k: "Scheduled collection", v: "Pulled automatically as new documents post, in PDFs, portals, and spreadsheets." },
  { k: "Automatic validation", v: "Each figure checked against its source. Conflicts and unverified items flagged in pink." },
  { k: "Archive and databases", v: "Every document saved with its date and link, on a machine we control." },
  { k: "Dashboards and research", v: "Dashboards and alerts, plus AI that answers questions from the record." },
];

export const WHY_HARD = [
  "Each government publishes in its own way: scanned PDFs, meeting portals, spreadsheets, and web pages that change without notice.",
  "The volume is large: years of agendas, minutes, budgets, and audits, and more every week.",
  "A wrong number does real harm, so every figure has to be traced to its source and checked before it goes live.",
  "The goal is a system that runs itself with a few hours of upkeep a month, which takes more engineering up front than a site someone updates by hand.",
];

export const ROLLOUT = [
  { name: "Phase 0", what: "Research, design, headline figures, and sign-ups", now: true },
  { name: "City of San Angelo", what: "First government on the dashboard" },
  { name: "San Angelo ISD", what: "Added once the City runs on its own" },
  { name: "Tom Green County", what: "Next in line" },
  { name: "Appraisal District", what: "With the appraisal check, planned for spring 2027 ahead of protest season" },
];

export const MODULES: Module[] = [
  { name: "Debt clock", what: "City, County, and school district debt in one running total, with interest accruing and a calendar of what comes due each year.", status: "Prototype" },
  { name: "Money in, money out", what: "Where each government's money comes from and where it goes, and how the budget changes during the year.", status: "Designed" },
  { name: "Votes and meetings", what: "Recorded votes for City Council and Commissioners Court, and a look ahead at what is on upcoming agendas.", status: "Designed" },
  { name: "Issue boards", what: "One page for each major local decision: the record, the costs, the arguments on each side, and the next date to show up.", status: "Designed" },
  { name: "Public records archive", what: "Every agenda, budget, and audit we use, saved with its date and source link, so a page that changes or disappears stays on record.", status: "Planned" },
  { name: "Zoning alerts", what: "An agent picks up every zoning case the City posts, reads it into the database, and emails each subscriber by distance from their home: 250 feet, 1,000 feet, half a mile, or the whole city.", status: "Sign-up open" },
  { name: "Monthly summary", what: "Facts only: what changed, what is coming up, and what is trending, with a link to each source. Could be agent run, like the alerts.", status: "Considering" },
  { name: "Records requests", what: "Targeted public information requests for what governments do not publish, with each request and answer logged.", status: "Planned" },
  { name: "Appraisal check", what: "Compare your home's appraised value with your neighborhood's, so you know whether a protest is worth filing.", status: "Planned", when: "Spring 2027" },
  { name: "Economy and business view", what: "Jobs, industries, and growth, plus the large needs a business would want to know about, such as the water plant, with their costs.", status: "Planned" },
];

export const SPONSOR = {
  lede: "We are looking for project sponsors to build it. The work ahead is a few months of development and data validation.",
  why: [
    "Most of the cost is development. The goal is a system that runs itself: databases that take in large volumes of public records on a regular schedule, check them automatically, and keep the dashboards current without someone updating them by hand. Building that ingest and validation, and proving every figure matches its source document, takes a lot of work.",
    "The rest is a dedicated local AI machine to run it. It keeps the records archive and the databases on a machine we control, and lets AI prompts feed the dashboards and answer residents' research questions from the public record.",
  ],
  low: 10_000,
  high: 20_000,
  pays: [
    "Databases built for large, regular ingest of public records",
    "Automatic validation that checks each figure against its source document",
    "A dedicated local AI machine to run the system, feed the dashboards, and power citizen research",
    "Building the debt clock, budgets, votes, and alerts for launch",
  ],
  terms: [
    "Sponsors above a set amount are listed publicly.",
    "Sponsors have no say over what we cover or how we cover it.",
    "Once the tools are live, subscriptions are meant to cover upkeep, so the project does not depend on any one backer.",
    "San Angelo DOGE is not a nonprofit, so sponsorships are not tax-deductible.",
  ],
};

/** Screens from the dashboard prototype, shown on the proposal page's iPad tour. */
export const TOUR: Array<{ group: string; items: Array<{ file: string; k: string; v: string }> }> = [
  {
    group: "Start",
    items: [
      { file: "priorities.webp", k: "Priorities", v: "The biggest public money matters, ranked by published rules." },
      { file: "ask.webp", k: "Research assistant", v: "Ask a question in plain words; answers cite the record." },
    ],
  },
  {
    group: "Money",
    items: [
      { file: "clock.webp", k: "Debt clock", v: "City, County, and school district debt, with interest adding up live." },
      { file: "money.webp", k: "Money in, money out", v: "Where each budget's money comes from and where it goes." },
      { file: "midyear.webp", k: "Mid-year money", v: "Spending changes made outside the adopted budget." },
    ],
  },
  {
    group: "Decisions",
    items: [
      { file: "votes.webp", k: "Recorded votes", v: "How each council member and commissioner voted." },
      { file: "radar.webp", k: "Meeting radar", v: "What is coming up on the next agendas." },
      { file: "issues.webp", k: "Issue tracker", v: "Major local decisions, from first mention to follow-up." },
    ],
  },
  {
    group: "Place",
    items: [
      { file: "map.webp", k: "City map", v: "Projects, tax breaks, and zoning cases on the map." },
      { file: "appraisal.webp", k: "Appraisal check", v: "Your home's value against comparable homes nearby." },
      { file: "alerts.webp", k: "Zoning alerts", v: "Zoning cases near your address, at the distance you choose." },
    ],
  },
  {
    group: "Context",
    items: [
      { file: "economy.webp", k: "Economy", v: "Jobs, wages, and growth in Tom Green County." },
      { file: "business.webp", k: "Business view", v: "Taxes, fees, and the big needs a business would want to know." },
      { file: "bulletin.webp", k: "Monthly summary", v: "What changed this month, generated from the record." },
      { file: "sources.webp", k: "Sources and methods", v: "Every source, how often it is checked, and the rules we follow." },
    ],
  },
];
