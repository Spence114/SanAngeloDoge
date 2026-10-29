import type { Fact, Government } from "./types.ts";

// Figures from the governments' own reports and state records, checked against
// each source document on Oct 29, 2026. Source ids refer to src/content/sources.ts.
// Each government reports on its own calendar, so each figure carries its own date.

export interface DebtRow {
  gov: Government;
  short: string;
  principal: number;
  interest: number;
  dueThisYear: number;
  duePrincipal: number;
  dueInterest: number;
  fiscalYear: string;
  lastPayment: number;
  asOf: string;
  source: string;
  cite: string[];
}

export const DEBT: DebtRow[] = [
  {
    gov: "City of San Angelo",
    short: "City",
    principal: 265_865_000,
    interest: 88_111_705,
    dueThisYear: 24_055_329,
    duePrincipal: 15_825_000,
    dueInterest: 8_230_329,
    fiscalYear: "FY2027",
    lastPayment: 2048,
    asOf: "Aug 31, 2025",
    source: "Texas Bond Review Board",
    cite: ["brb-san-angelo", "brb-san-angelo-schedule"],
  },
  {
    gov: "Tom Green County",
    short: "County",
    principal: 43_950_000,
    interest: 10_615_846,
    dueThisYear: 5_560_289,
    duePrincipal: 3_945_000,
    dueInterest: 1_615_289,
    fiscalYear: "FY2027",
    lastPayment: 2039,
    asOf: "Aug 31, 2026",
    source: "County Auditor and FY2025 audit",
    cite: ["county-afr-2025", "county-auditor-aug2026", "brb-tgc"],
  },
  {
    gov: "San Angelo ISD",
    short: "SAISD",
    principal: 446_814_994,
    interest: 436_489_949,
    dueThisYear: 28_022_816,
    duePrincipal: 6_645_000,
    dueInterest: 21_377_816,
    fiscalYear: "2026-27",
    lastPayment: 2055,
    asOf: "Aug 31, 2025",
    source: "SAISD debt report (HB 1378)",
    cite: ["saisd-hb1378"],
  },
];

export const DEBT_TOTAL = {
  principal: DEBT.reduce((a, r) => a + r.principal, 0),
  interest: DEBT.reduce((a, r) => a + r.interest, 0),
  dueThisYear: DEBT.reduce((a, r) => a + r.dueThisYear, 0),
  interestThisYear: DEBT.reduce((a, r) => a + r.dueInterest, 0),
};

/** Shown under the debt table: the City's own audit disagrees with itself. */
export const CITY_DEBT_NOTE =
  "The City's FY2025 audit lists $277,392,000 in bonds and notes in its summary table, but that table repeats the prior year's utility debt unchanged. Until the City resolves the difference, the City row uses the state Bond Review Board's figures, which count bonds and certificates only. {{c:city-acfr-fy2025,brb-san-angelo}}";

export interface BudgetRow {
  gov: Government;
  short: string;
  year: string;
  revenue: number;
  spending: number;
  note: string;
  source: string;
  cite: string[];
}

export const BUDGETS: BudgetRow[] = [
  {
    gov: "City of San Angelo",
    short: "City",
    year: "FY2027",
    revenue: 104_075_985,
    spending: 104_075_985,
    note: "Balanced for FY2027. Last year (FY2026, revised) spent $6.1 million more than it took in. Adopted Sep 15, 2026, 7-0. {{c:city-budget-fy2027,cc-minutes-2026-09-15}}",
    source: "City FY2027 adopted budget",
    cite: ["city-budget-fy2027"],
  },
  {
    gov: "Tom Green County",
    short: "County",
    year: "FY2027",
    revenue: 71_465_652,
    spending: 88_883_018,
    note: "Spends $17.4 million more than it takes in, mostly $17.0 million of buildings, equipment, and other one-time costs. Reserves fall from $39.4 million to $21.9 million. Adopted Sep 8, 2026, 4-1. {{c:county-budget-fy2027}}",
    source: "County FY2027 adopted budget",
    cite: ["county-budget-fy2027"],
  },
  {
    gov: "San Angelo ISD",
    short: "SAISD",
    year: "2026-27",
    revenue: 127_143_762,
    spending: 130_422_348,
    note: "Spends $3.3 million more than it takes in, which would come out of its General Fund balance, estimated at $42.8 million in August 2026. 58% of revenue comes from the state. Adopted Aug 24, 2026, 7-0. {{c:saisd-budget-2026-27,saisd-notice-2026,saisd-minutes-2026-08-24}}",
    source: "SAISD 2026-27 adopted budget",
    cite: ["saisd-budget-2026-27"],
  },
];

export interface RateRow {
  gov: Government;
  year: string;
  rate: number;
  ops: number;
  debt: number;
  prior: string;
  levyNote: string;
  cite: string[];
}

export const RATES: RateRow[] = [
  {
    gov: "City of San Angelo",
    year: "FY2027",
    rate: 0.7947,
    ops: 0.631,
    debt: 0.1637,
    prior: "Unchanged",
    levyNote: "Levy up $962,035 (1.64%)",
    cite: ["city-budget-fy2027", "tgc-tit-summary-2025"],
  },
  {
    gov: "Tom Green County",
    year: "FY2027",
    rate: 0.46825,
    ops: 0.42044,
    debt: 0.04781,
    prior: "Was $0.47075",
    levyNote: "Levy up $1,756,626 (3.33%)",
    cite: ["county-budget-fy2027"],
  },
  {
    gov: "San Angelo ISD",
    year: "2026-27",
    rate: 1.0638,
    ops: 0.7054,
    debt: 0.3584,
    prior: "Was $1.0706",
    levyNote: "Taxable value fell 3.8% in 2025",
    cite: ["saisd-taxrate-info", "saisd-notice-2026", "tgcad-annual-2025", "tgcad-annual-2024"],
  },
];

/** Table cells may hold citation tokens and pink spans. */
export const TAX_BASE: Array<{ gov: Government; taxable: string; change: string; ratings: string }> = [
  {
    gov: "City of San Angelo",
    taxable: "$8.85 billion {{c:tgcad-annual-2025}}",
    change: "+6.0% {{c:tgcad-annual-2024}}",
    ratings: "Moody's Aa2, S&amp;P AA {{c:city-acfr-fy2025}}<br><span class=\"unv\">Fitch AA, lowered from AA+ in June 2026 (news)</span> {{c:news-fitch-downgrade}}",
  },
  {
    gov: "Tom Green County",
    taxable: "$11.38 billion {{c:county-budget-fy2027,tgcad-annual-2025}}",
    change: "+6.7%",
    ratings: "S&amp;P AA, Moody's Aa3 {{c:county-transparency}}",
  },
  {
    gov: "San Angelo ISD",
    taxable: "$7.24 billion {{c:saisd-notice-2026,tgcad-annual-2025}}",
    change: "-3.8% {{c:tgcad-annual-2024}}",
    ratings: "Moody's Aaa, Fitch AA+ {{c:saisd-hb1378,saisd-acfr-2025}}<br><span class=\"unv\">News reports a Fitch downgrade in June 2026</span> {{c:news-fitch-downgrade}}",
  },
];

export const TAX_BASE_NOTE =
  "Taxable value for the 2025 tax year, before the tax ceiling for homeowners over 65 and disabled homeowners, from the Appraisal District's certified roll summaries. The City and County certified values feed the FY2027 budgets.";

/** Large items beyond bonded debt. Pink parts rest on news coverage until checked against a source document. */
export const ALSO_ON_THE_BOOKS: Array<Fact & { who: string; fig: string }> = [
  {
    who: "City",
    k: "Pensions and retiree health",
    fig: "$175,762,888",
    v: "Owed beyond what the plans hold, Sep 30, 2025. The Firemen's Relief and Retirement Fund was 60.7% funded at its Dec 31, 2023 valuation and would take 34 years to close its gap. The state Pension Review Board has listed it as at risk of needing a funding restoration plan since at least July 2025, and it was still on that list in July 2026.",
    cite: ["city-acfr-fy2025", "prb-fsrp-2025-07", "prb-fsrp-2026-07"],
  },
  {
    who: "SAISD",
    k: "Bond money not yet spent",
    fig: "$361,509,892",
    v: "Left in the construction fund on Sep 30, 2026, from the $397 million bond voters approved in May 2025. The $385.1 million borrowed so far adds $424.5 million in interest and is repaid through 2055.",
    cite: ["saisd-invest-sep2026", "saisd-election-notice-2025", "saisd-hb1378"],
  },
  {
    who: "City",
    k: "Water and sewer plants",
    fig: "$171,939,200",
    v: "Capital plan estimates approved Jul 6, 2023: $62.4 million for the water treatment plant, $55.5 million for water reclamation, and $54.0 million for the Lake Nasworthy sewer. The Oct 20, 2026 council agenda included an application for up to $90 million from the state's Clean Water fund for the water reclamation plant. <span class=\"unv\">Part of the sewer work was financed with bonds in 2023, so some of this cost may already be in the debt figures above.</span> {{c:news-nasworthy-bond-2023}}",
    cite: ["cc-packet-2023-07-06", "cc-minutes-2023-07-06", "cc-agenda-2026-10-20"],
  },
  {
    who: "City",
    k: "Coliseum renovation",
    fig: "$47,200,000",
    v: "Construction contract awarded Aug 18, 2026, 7-0. Voters approved $41.66 million in bonds in May 2025, and the Stock Show and Rodeo Association is putting in $9 million.",
    cite: ["cc-minutes-2026-08-18", "election-notice-2025"],
  },
  {
    who: "City",
    k: "Employee health insurance",
    fig: "+$5,110,978",
    v: "The City's contribution to the active employee health plan rises 71% in one year, from $7.16 million to $12.27 million. Counting the retiree plan, City contributions rise $3.94 million, or 41.9%. The health fund was $4.13 million in the red as of June 2026.",
    cite: ["city-budget-fy2027"],
  },
  {
    who: "City",
    k: "New street fee",
    fig: "$8.75 a month",
    v: "Per home, first billed Jan 1, 2027. Adopted 4-3. Street, bridge, and traffic costs moved out of the General Fund into a $9.6 million Right of Way Fund.",
    cite: ["city-row-fee-page", "cc-minutes-2026-09-15", "city-budget-fy2027"],
  },
];

export const MEDIAN_HOME = { taxable: 212_830, prior: 207_300, cityBill: 1691.36 };

export const APPRAISAL_NOTE =
  "The Tom Green County Appraisal District's 2027 proposed budget is $3,924,849, up 3.1% from its 2026 budget as presented. The taxing units pay it in proportion to their levies. Its 2027 budget includes no debt payments; we have not yet checked its audit. {{c:tgcad-budget-2027,tgcad-agenda-2025-09-11,tgcad-impact-2027}}";
