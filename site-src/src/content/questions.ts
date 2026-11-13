// Open Questions: what the public record does not answer yet. Each card names the office that
// can answer. Status moves from "Not yet asked" to "Asked" (with the date), then "Answered" with
// their reply quoted, "No reply", or "Resolved".

import type { GovId } from "./governments.ts";

export type QStatus = "Not yet asked" | "Asked" | "Answered" | "No reply" | "Resolved";

export interface Question {
  id: string;
  gov: GovId[];
  topic: "Debt" | "Budgets" | "Investments" | "Audits" | "Records" | "Schools" | "Contracts" | "Privacy" | "Incentives";
  q: string;
  record: string;
  who: string;
  status: QStatus;
  asked?: string;
  answer?: string;
  unv?: boolean;
}

export const QUESTIONS: Question[] = [
  {
    id: "city-investment-reports",
    gov: ["city"],
    topic: "Investments",
    q: "Where are the City's quarterly investment reports?",
    record: "The City's investment policy, re-adopted each year, says investment reports are presented to Council at least quarterly and reviewed by an oversight committee. We found none on any Council agenda from 2017 to 2026. {{c:city-investment-policy-2025,city-record-review}}",
    who: "City Finance Department, City Manager",
    status: "Not yet asked",
  },
  {
    id: "city-committees",
    gov: ["city"],
    topic: "Audits",
    q: "When did the Investment Oversight Committee and the Audit Committee last meet?",
    record: "Members were appointed to both. No agendas or minutes for either are online, and the Audit Committee's portal page shows no meetings. {{c:city-record-review}}",
    who: "City Clerk",
    status: "Not yet asked",
  },
  {
    id: "city-voted-debt",
    gov: ["city", "county"],
    topic: "Debt",
    q: "How much of the debt still owed was approved by voters?",
    record: "Since 2020 the City has issued certificates of obligation and tax notes, which need no election unless 5% of voters petition. The state's debt data does not say which debt was voted on. {{c:city-record-review,tx-lgc-271-049}}",
    who: "City Finance Department, County Auditor",
    status: "Not yet asked",
  },
  {
    id: "city-refunding",
    gov: ["city"],
    topic: "Debt",
    q: "What did the bonds behind the City's $53.8 million in refunding debt originally pay for?",
    record: "The state lists $53.8 million of City debt as refunding: new bonds sold to pay off older ones. It does not say what the older bonds built. {{c:brb-san-angelo}}",
    who: "City Finance Department",
    status: "Not yet asked",
  },
  {
    id: "city-streets",
    gov: ["city"],
    topic: "Debt",
    q: "Which streets and projects does the City's $67.0 million in transportation debt cover?",
    record: "The state's category is transportation. The City's certificates of obligation in 2020 and 2022 were for streets. A project list is not in the state data. {{c:brb-san-angelo,city-record-review}}",
    who: "City Finance Department, Public Works",
    status: "Not yet asked",
  },
  {
    id: "saisd-obligations",
    gov: ["saisd"],
    topic: "Debt",
    q: "Why does SAISD list $473.3 million in obligations when its bonds total $446.8 million?",
    record: "The district's transparency page gives $473.3 million in total obligations as of Aug 31, 2025. Its debt report lists $446.8 million in bonds. {{c:saisd-transparency,saisd-hb1378}}",
    who: "SAISD Financial Services",
    status: "Not yet asked",
    unv: true,
  },
  {
    id: "saisd-bond-interest",
    gov: ["saisd"],
    topic: "Investments",
    q: "Where does the interest earned on unspent bond money go?",
    record: "$361.5 million of bond money sat in the construction fund on Sep 30, 2026, earning about $1.2 million that month. Federal rules can require earnings above the bond rate to be paid back. {{c:saisd-invest-sep2026}}",
    who: "SAISD Financial Services",
    status: "Not yet asked",
  },
  {
    id: "saisd-forecast",
    gov: ["saisd"],
    topic: "Schools",
    q: "What enrollment forecast were the new school buildings sized for?",
    record: "Enrollment fell from 14,100 in 2021 to 13,004 in 2025, as the district reports it, while voters approved $397 million for new and rebuilt schools in May 2025. {{c:saisd-transparency,saisd-election-notice-2025}}",
    who: "SAISD Superintendent, Board of Trustees",
    status: "Not yet asked",
    unv: true,
  },
  {
    id: "saisd-authority",
    gov: ["saisd"],
    topic: "Debt",
    q: "How much of the $397 million voters approved can still be borrowed?",
    record: "SAISD sold $385.1 million of the $397 million authorized, plus a premium of about $16.9 million. Whether the premium counts against the authorization decides what is left. {{c:saisd-hb1378,saisd-election-notice-2025}}",
    who: "SAISD Financial Services",
    status: "Not yet asked",
    unv: true,
  },
  {
    id: "county-auditor-bid",
    gov: ["county"],
    topic: "Audits",
    q: "When will the County next seek competitive bids for its outside auditor?",
    record: "The same firm has audited the County since at least FY2007. Since FY2016 the contract has been renewed yearly under a professional-services exemption, without bids. {{c:county-minutes}}",
    who: "Commissioners Court, County Judge",
    status: "Not yet asked",
    unv: true,
  },
  {
    id: "county-internal-audit",
    gov: ["county"],
    topic: "Audits",
    q: "Why have internal audit reviews dropped, and when will FY2026 reviews be posted?",
    record: "The County Auditor's page lists 38 review letters in FY2021 and FY2022, 3 in FY2025, and none for FY2026. {{c:county-internal-audit}}",
    who: "County Auditor",
    status: "Not yet asked",
    unv: true,
  },
  {
    id: "county-agendas",
    gov: ["county"],
    topic: "Records",
    q: "Will the County keep past Commissioners Court agendas online?",
    record: "Only the current week's agenda is posted, and the file is replaced each week. Several standing reports stopped updating, some in 2021. {{c:county-records-review}}",
    who: "County Clerk, County Judge",
    status: "Not yet asked",
  },
  {
    id: "county-settlement",
    gov: ["county"],
    topic: "Contracts",
    q: "Why was the $450,000 settlement amount left out of the minutes?",
    record: "The Court approved a negotiated settlement on June 3, 2025. The minutes give no amount. The check register shows a $450,000 settlement payment on Aug 27, 2025. {{c:county-minutes,county-ap-reports}}",
    who: "County Attorney, County Judge",
    status: "Not yet asked",
    unv: true,
  },
  {
    id: "flock-sharing",
    gov: ["city"],
    topic: "Privacy",
    q: "Is statewide or national sharing turned on for San Angelo's Flock cameras, and how long are records kept?",
    record: "Flock lets each agency choose whether other agencies can search its plate records, and how many days records are kept. The City's packet does not say which settings SAPD uses. {{c:flock-blog-how,cc-packet-2025-10-07}}",
    who: "San Angelo Police Department",
    status: "Not yet asked",
  },
  {
    id: "cad-records",
    gov: ["appraisal"],
    topic: "Records",
    q: "Will the Appraisal District post its adopted budget, audits, and board minutes?",
    record: "Its proposed budget and annual reports are posted. Its adopted budget, audits, and board minutes were not, and the website was down on Oct 28, 2026. {{c:tgcad-site,tgcad-budget-2027}}",
    who: "Chief Appraiser, Board of Directors",
    status: "Not yet asked",
  },
  {
    id: "devcorp-results",
    gov: ["devcorp"],
    topic: "Incentives",
    q: "What did each Development Corporation award promise, and was it delivered?",
    record: "Monthly statements list the payments, such as $1 million to Angelo State University and $500,000 to Skyline Aviation. They do not list what each recipient agreed to do or whether it did. {{c:cosadc-financials}}",
    who: "Development Corporation board and staff",
    status: "Not yet asked",
    unv: true,
  },
];
