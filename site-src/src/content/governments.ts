// One page per local government. Figures carry citation tokens; pink (unv) marks anything
// not yet rechecked against its source document.

import type { KeyPoint } from "../render/components.ts";
import type { IconName } from "../render/icons.ts";
import type { Route } from "../render/html.ts";

export type GovId = "city" | "county" | "saisd" | "appraisal" | "devcorp";

export interface WatchItem {
  /** Short label, set as a heading. */
  k: string;
  /** Large figure. */
  fig?: string;
  /** One or two plain sentences, may hold citation tokens. */
  v: string;
  unv?: boolean;
}

export interface RecordRow {
  what: string;
  status: "yes" | "no" | "unk";
  note: string;
}

export interface GovPage {
  id: GovId;
  name: string;
  short: string;
  icon: IconName;
  tone: "city" | "county" | "saisd" | "ink";
  kicker: string;
  lede: string;
  /** One or two plain sentences: the point of the page. */
  bottom: string;
  who: string;
  keys: KeyPoint[];
  watch: WatchItem[];
  watchNote?: string;
  records: RecordRow[];
  recordsNote: string;
  find: Array<{ label: string; url: string }>;
  related: Array<{ route: Route; label: string; desc: string; icon: IconName; anchor?: string }>;
  /** Extra section rendered after "What to know", by id. */
  extra?: "bonds" | "appraisal" | "devcorp";
}

export const GOV_PAGES: Record<GovId, GovPage> = {
  city: {
    id: "city",
    name: "City of San Angelo",
    short: "City",
    icon: "city",
    tone: "city",
    kicker: "Government",
    bottom: "The City owes $265.9 million and finished last year $6.1 million short. Several records its own policies call for, like quarterly investment reports, are not posted. {{c:brb-san-angelo,city-budget-fy2027,city-record-review}}",
    lede: "The City runs police, fire, water, sewer, streets, parks, and the airport. The City Council sets the budget and the tax rate, and hires the City Manager, who runs day-to-day operations.",
    who: "City Council. Agendas, packets, minutes, and video are on the City's CivicClerk portal.",
    keys: [
      { kicker: "Debt", big: "$265.9M", text: "Owed on Aug 31, 2025, repaid through 2048.", tone: "city", cite: ["brb-san-angelo", "brb-san-angelo-schedule"] },
      { kicker: "Budget", big: "$104.1M", text: "General Fund for FY2027, balanced as adopted.", tone: "ink", cite: ["city-budget-fy2027"] },
      { kicker: "Tax rate", big: "$0.7947", text: "Per $100 of taxable value, unchanged for FY2027.", tone: "ink", cite: ["city-budget-fy2027"] },
      { kicker: "Pensions", big: "$175.8M", text: "Owed to pensions and retiree health beyond what the plans hold.", tone: "county", cite: ["city-acfr-fy2025"] },
    ],
    watch: [
      { k: "Last year ran short", fig: "-$6.1M", v: "The FY2026 budget, after revisions during the year, spent $6.1 million more than it took in. {{c:city-budget-fy2027}}" },
      { k: "Health insurance", fig: "+71%", v: "The City's contribution to the active employee health plan rises from $7.16 million to $12.27 million in one year. The health fund was $4.13 million in the red as of June 2026. {{c:city-budget-fy2027}}" },
      { k: "New street fee", fig: "$8.75/mo", v: "Per home, first billed Jan 1, 2027. Adopted 4 to 3. Street costs moved out of the General Fund into a new Right of Way Fund. {{c:city-row-fee-page,cc-minutes-2026-09-15}}" },
      { k: "Firefighter pension", fig: "60.7%", v: "Funded at its Dec 31, 2023 valuation. The state has listed it as at risk of needing a funding restoration plan. {{c:city-acfr-fy2025,prb-fsrp-2026-07}}" },
      { k: "Water and sewer plants", fig: "$171.9M", v: "Capital plan estimates for the water treatment plant, water reclamation, and the Lake Nasworthy sewer. {{c:cc-packet-2023-07-06}}" },
      { k: "Debt without a vote", fig: "8 issues", v: "Certificates of obligation and tax notes issued since 2020 without an election. Voters can force one only by petition. {{c:city-record-review,tx-lgc-271-049}}", unv: true },
    ],
    records: [
      { what: "Council agendas, packets, and minutes", status: "yes", note: "Posted on CivicClerk, with video." },
      { what: "Annual audits (ACFR)", status: "unk", note: "Only FY2024 and FY2025 are on the City's site. Earlier years were accepted by Council but are not posted." },
      { what: "Quarterly investment reports to Council", status: "no", note: "Required by the City's investment policy. None found on any Council agenda from 2017 to 2026." },
      { what: "Investment Oversight Committee records", status: "no", note: "No agendas or minutes found online." },
      { what: "Audit Committee meetings", status: "no", note: "Re-chartered in Aug 2025. The portal category exists with no meetings posted." },
    ],
    recordsNote: "From our review of the City's CivicClerk portal, Nov 2015 to Sept 2026, and the City's website. {{c:city-record-review,city-investment-policy-2025}}",
    find: [
      { label: "CivicClerk: agendas, minutes, and video", url: "https://sanangelotx.portal.civicclerk.com/" },
      { label: "Records requests", url: "https://sanangelotx.mycusthelp.com/WEBAPP/_rs/supporthome.aspx" },
    ],
    related: [
      { route: "debt", label: "City debt", desc: "How it grew and what it pays for", icon: "debt" },
      { route: "budgets", label: "City budget", desc: "This year's plan and last year's gap", icon: "budget" },
      { route: "privacy", label: "Flock cameras", desc: "The City's plate camera contract", icon: "camera" },
      { route: "skybox", label: "Skybox data center", desc: "Proposed on city-owned land", icon: "server" },
      { route: "devcorp", label: "Development Corporation", desc: "The City's half-cent sales tax", icon: "devcorp" },
      { route: "alerts", label: "Zoning alerts", desc: "City zoning changes near you", icon: "alert" },
    ],
  },

  county: {
    id: "county",
    name: "Tom Green County",
    short: "County",
    icon: "county",
    tone: "county",
    kicker: "Government",
    bottom: "The County is spending down its savings, from $39.4 million to $21.9 million this year. Past meeting agendas and several required reports are not online. {{c:county-budget-fy2027,county-records-review}}",
    lede: "The County runs the courts, the jail, the Sheriff's Office, county roads, elections, and property records. The Commissioners Court, four commissioners and the County Judge, sets the budget and the tax rate.",
    who: "Commissioners Court. It meets most Tuesdays. Minutes since 2008 are online; past agendas are not.",
    keys: [
      { kicker: "Debt", big: "$43.95M", text: "Owed on Aug 31, 2026, after a 2025 refinancing.", tone: "county", cite: ["county-auditor-aug2026"] },
      { kicker: "Budget gap", big: "-$17.4M", text: "FY2027 spending over revenue, mostly one-time projects.", tone: "ink", cite: ["county-budget-fy2027"] },
      { kicker: "Reserves", big: "$39.4M to $21.9M", text: "The cushion the budget spends down this year.", tone: "ink", cite: ["county-budget-fy2027"] },
      { kicker: "Tax rate", big: "$0.46825", text: "Per $100 for FY2027, down slightly, but above the break-even rate.", tone: "ink", cite: ["county-budget-fy2027", "county-tax-notice-2026"] },
    ],
    watch: [
      { k: "Almost no dissent", fig: "7 of 3,256", v: "Recorded votes since January 2020 with a no vote. Nearly everything passes unanimously or on consent. {{c:county-vote-review}}", unv: true },
      { k: "Commissioners' pay", fig: "+34%", v: "The salary line for commissioners for FY2027, after a 3% raise for all elected officials, a $14,000 base raise for commissioners, and part of their car allowance moved into salary. {{c:county-budget-fy2027,county-minutes}}", unv: true },
      { k: "Outside auditor", fig: "Since FY2007", v: "The same firm has audited the County since at least FY2007. Since FY2016 the contract has been renewed each year without competitive bids. The FY2025 audit found no problems. {{c:county-minutes,county-afr-2025}}", unv: true },
      { k: "Internal audits", fig: "38 to 3", v: "Internal review letters fell from 38 a year in FY2021 and FY2022 to 3 in FY2025, with none posted for FY2026. One found 44% of employees had not finished required cybersecurity training. {{c:county-internal-audit}}", unv: true },
      { k: "A settlement", fig: "$450,000", v: "Paid Aug 27, 2025, after the Court approved a settlement on June 3, 2025. The amount appears in the check register, not the minutes. {{c:county-minutes,county-ap-reports}}", unv: true },
    ],
    watchNote: "Pink items come from our September 2026 review of County records and are being rechecked against each document.",
    records: [
      { what: "Commissioners Court minutes", status: "yes", note: "Online from 2008, with roll-call votes. About a week behind, which is normal." },
      { what: "Past agendas", status: "no", note: "Only the current week's agenda is posted, and the file is overwritten each week." },
      { what: "Meeting video", status: "yes", note: "On CivicClerk since late 2019." },
      { what: "Auditor and Treasurer monthly reports", status: "yes", note: "Posted, with a few missing months." },
      { what: "Weekly bills paid (check runs)", status: "unk", note: "Posted, but 8 weeks were missing this fiscal year." },
      { what: "Utility reports", status: "no", note: "Nothing posted after Feb 2026." },
      { what: "Court-appointed attorney fee reports", status: "no", note: "Nothing posted since Sept 2021." },
      { what: "Outstanding debt report", status: "no", note: "The posted report is from 2023 and predates the 2025 refinancing." },
    ],
    recordsNote: "From our review of the County's website on Sept 16, 2026. {{c:county-records-review}}",
    find: [
      { label: "Commissioners Court minutes (Destiny)", url: "https://public.destinyhosted.com/agenda_publish.cfm?id=86647" },
      { label: "Meeting video (CivicClerk)", url: "https://tomgreencotx.portal.civicclerk.com/" },
      { label: "Financial Transparency page", url: "https://www.tomgreencountytx.gov/page/ft.FinancialTransparency" },
    ],
    related: [
      { route: "budgets", label: "County budget", desc: "The $17.4M gap and the reserves", icon: "budget" },
      { route: "taxes", label: "County tax rate", desc: "Lower rate, more money", icon: "taxes" },
      { route: "beacon", label: "Beacon data center", desc: "On county land near Dove Creek", icon: "server" },
      { route: "cipher", label: "Cipher data center", desc: "On county land near Red Creek", icon: "server" },
    ],
  },

  saisd: {
    id: "saisd",
    name: "San Angelo ISD",
    short: "SAISD",
    icon: "isd",
    tone: "saisd",
    kicker: "Government",
    bottom: "The school district borrowed $385 million in 2025 and will pay $424 million in interest on it through 2055. It spends less per student than the state average, and fewer students are enrolling. {{c:saisd-hb1378,saisd-efficiency-audit-2024}}",
    lede: "San Angelo's public school district: what it spends per student, its 2025 school bonds, and what it owes. An elected Board of Trustees sets the budget and the tax rate and hires the superintendent. Most of its money comes from the state.",
    who: "Board of Trustees. Agendas, minutes, and attachments since 2005 are on BoardBook.",
    keys: [
      { kicker: "Debt", big: "$446.8M", text: "Owed on Aug 31, 2025, repaid through 2055.", tone: "saisd", cite: ["saisd-hb1378"] },
      { kicker: "Interest", big: "$436.5M", text: "Interest still to pay on that debt, almost as much as the debt itself.", tone: "ink", cite: ["saisd-hb1378"] },
      { kicker: "Per student", big: "$10,882", text: "Operating spending per student in 2022-23. State average $12,382.", tone: "ink", cite: ["saisd-efficiency-audit-2024"] },
      { kicker: "Budget gap", big: "-$3.3M", text: "2026-27 spending over revenue, covered from savings.", tone: "ink", cite: ["saisd-budget-2026-27"] },
    ],
    watch: [
      { k: "Enrollment", fig: "-8%", v: "From 14,100 students in 2021 to 13,004 in 2025, as the district reports it. {{c:saisd-transparency}}", unv: true },
      { k: "Teacher pay", fig: "$53,477", v: "Average teacher salary in 2022-23, against a state average of $60,716. {{c:saisd-efficiency-audit-2024}}" },
      { k: "Two debt figures", fig: "$473.3M", v: "The district's transparency page lists $473.3 million in total obligations, while its bonds total $446.8 million. The difference is not explained. {{c:saisd-transparency,saisd-hb1378}}", unv: true },
      { k: "Unspent bond money", fig: "$361.5M", v: "Still in the construction fund on Sep 30, 2026, earning interest while it waits to be spent. {{c:saisd-invest-sep2026}}" },
    ],
    records: [
      { what: "Board agendas, minutes, and attachments", status: "yes", note: "On BoardBook from 2005." },
      { what: "Monthly check registers", status: "yes", note: "Posted monthly from Sept 2020, as spreadsheets." },
      { what: "Adopted budget detail", status: "no", note: "The posted adopted budget is a one-page summary." },
      { what: "Records requests", status: "yes", note: "Public requests and responses are listed on NextRequest." },
    ],
    recordsNote: "From our review of the district's website and portals in Sept and Oct 2026. {{c:saisd-transparency,saisd-boardbook,saisd-nextrequest}}",
    find: [
      { label: "Board meetings (BoardBook)", url: "https://meetings.boardbook.org/Public/Organization/899" },
      { label: "Financial Transparency page", url: "https://www.saisd.org/departments/financial-services/financial-transparency" },
      { label: "Records requests (NextRequest)", url: "https://sanangeloisdtx.nextrequest.com" },
    ],
    related: [
      { route: "debt", label: "All local debt", desc: "The combined picture", icon: "debt" },
      { route: "taxes", label: "School tax rate", desc: "$1.0638 per $100", icon: "taxes" },
    ],
    extra: "bonds",
  },

  appraisal: {
    id: "appraisal",
    name: "Tom Green County Appraisal District",
    short: "Appraisal District",
    icon: "appraisal",
    tone: "ink",
    kicker: "Government",
    bottom: "The Appraisal District decides what your property is worth. Every tax bill starts there. If your value looks too high, you can protest, usually by May 15. {{c:tx-tax-41-44}}",
    lede: "The Appraisal District sets the value of every property in the county. Every tax bill starts there: each government's rate is applied to the value the District sets. It does not set tax rates.",
    who: "A board of directors chosen by the local taxing units and voters. An appeal board hears protests.",
    keys: [
      { kicker: "Taxable value", big: "$11.38B", text: "All taxable property in the county for 2025, up 6.7%.", tone: "ink", cite: ["tgcad-annual-2025", "tgcad-annual-2024"] },
      { kicker: "Budget", big: "$3.92M", text: "Proposed for 2027, up 3.1%. The local governments pay for it.", tone: "ink", cite: ["tgcad-budget-2027", "tgcad-impact-2027"] },
      { kicker: "School values", big: "-3.8%", text: "SAISD's taxable value fell in 2025 as larger state homestead exemptions took effect.", tone: "saisd", cite: ["tgcad-annual-2025", "tgcad-annual-2024"] },
    ],
    watch: [
      { k: "Exemptions", fig: "+39.9%", v: "Value removed from SAISD's tax roll by exemptions rose in 2025, mostly the state's larger homestead exemption. The state makes up most of that money to the school district. {{c:tgcad-annual-2025,tgcad-annual-2024}}", unv: true },
      { k: "Website down", fig: "Oct 28", v: "The District's website was unavailable when we checked on Oct 28, 2026. {{c:tgcad-site}}" },
    ],
    records: [
      { what: "Proposed budget", status: "yes", note: "Posted with a budget impact statement." },
      { what: "Adopted budget", status: "no", note: "Not posted when we checked." },
      { what: "Annual audits", status: "no", note: "Not found online." },
      { what: "Board minutes", status: "no", note: "Agendas posted; minutes not found." },
      { what: "Annual report and certified values", status: "yes", note: "Posted for 2024 and 2025." },
    ],
    recordsNote: "From our review of the District's website in Sept and Oct 2026. {{c:tgcad-site,tgcad-budget-2027}}",
    find: [{ label: "Appraisal District website", url: "https://www.southwestdatasolution.com/webindex.aspx?dbkey=TOMGREENCAD" }],
    related: [
      { route: "appraisal-check", label: "Appraisal check", desc: "Join the list for early access", icon: "appraisal" },
      { route: "taxes", label: "Tax rates", desc: "What each government charges", icon: "taxes" },
    ],
    extra: "appraisal",
  },

  devcorp: {
    id: "devcorp",
    name: "City of San Angelo Development Corporation",
    short: "Development Corporation",
    icon: "devcorp",
    tone: "ink",
    kicker: "Government",
    bottom: "A half-cent of every sales tax dollar, <span class=\"unv\">about $12.8 million a year</span>, goes to this City-created corporation for economic development. It does not publish what each award promised or delivered. {{c:cosadc-financials}}",
    lede: "A City-created corporation that spends a half-cent sales tax on economic development and voter-approved projects such as water supply. Its board approves grants to businesses and organizations.",
    who: "A board appointed by City Council. Its agendas and financial statements are on the City's CivicClerk portal.",
    keys: [
      { kicker: "Sales tax", big: "$12.8M", text: "Its half-cent sales tax in FY2025, up from $11.2M in FY2022.", tone: "ink", cite: ["cosadc-financials"] },
      { kicker: "Savings", big: "$29.0M", text: "Unassigned fund balance in Jul 2026, up from $20.7M in May 2025.", tone: "ink", cite: ["cosadc-financials", "our-analysis"] },
      { kicker: "Chamber", big: "$476K", text: "Paid each year to the San Angelo Chamber of Commerce.", tone: "ink", cite: ["cosadc-financials"] },
    ],
    watch: [
      { k: "Largest payments", fig: "$1.0M", v: "To Angelo State University in Aug 2025. Other large payments went to Skyline Aviation ($500,000 of a $1 million award) and True Lightning. {{c:cosadc-financials}}", unv: true },
      { k: "Transfers to the City", fig: "$4.4M", v: "Transferred in April 2026 for water supply, debt payments, and water rights. {{c:cosadc-financials}}", unv: true },
      { k: "Housing", fig: "$536K", v: "To Galilee Community Development for affordable housing and residential flood relief. {{c:cosadc-financials}}", unv: true },
    ],
    watchNote: "These figures were read from scanned monthly statements and are being rechecked. What each award promised, and whether it was delivered, is not in the statements.",
    records: [
      { what: "Monthly financial statements with payments", status: "yes", note: "Approved by the board each month; many are scanned images." },
      { what: "Award agreements and results", status: "unk", note: "Not posted in one place." },
    ],
    recordsNote: "From our review of board packets, May 2025 to Jul 2026. {{c:cosadc-financials,city-record-review}}",
    find: [{ label: "CivicClerk: board agendas and packets", url: "https://sanangelotx.portal.civicclerk.com/" }],
    related: [
      { route: "city", label: "City of San Angelo", desc: "The City that created it", icon: "city", },
      { route: "questions", label: "Open Questions", desc: "What the awards promised", icon: "question" },
    ],
    extra: "devcorp",
  },
};
