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

// Principal outstanding at each Aug 31, from the Texas Bond Review Board issuer pages
// (City 3224, County 3600, SAISD 3225). FY2005 to FY2025 are reported. FY2026 onward is
// the payoff schedule for debt outstanding on Aug 31, 2025, with no new borrowing.
// The BRB County schedule predates the County's Sept 2025 refunding.
export const HISTORY_FIRST = 2005;
export const HISTORY_LAST_REPORTED = 2025;
export const DEBT_HISTORY: Array<{ key: "city" | "county" | "saisd"; gov: Government; label: string; values: number[]; cite: string[] }> = [
  {
    key: "saisd",
    gov: "San Angelo ISD",
    label: "SAISD",
    cite: ["brb-saisd"],
    values: [29024991, 27043081, 25195000, 23135000, 138004985, 135769985, 132213822, 128690000, 124510000, 120190000, 115129982, 110304982, 105829982, 101369982, 96694982, 93115000, 86884994, 81294994, 75419994, 69254994, 447884994,
      446040000, 439275000, 431940000, 424035000, 415535000, 406510000, 397030000, 387080000, 376630000, 367340000, 357455000, 346940000, 335765000, 323895000, 311290000, 297915000, 283730000, 268695000, 252760000, 235885000, 217995000, 199010000, 178875000, 157525000, 134900000, 110925000, 85525000, 58625000, 30145000, 0],
  },
  {
    key: "city",
    gov: "City of San Angelo",
    label: "City",
    cite: ["brb-san-angelo", "brb-san-angelo-schedule"],
    values: [69610000, 82515000, 101740000, 95395000, 113315000, 105635000, 231660000, 218425000, 205095000, 192000000, 192595000, 191155000, 221760000, 220960000, 204665000, 260190000, 236010000, 192905000, 231850000, 216745000, 265865000,
      246860000, 231035000, 215595000, 199715000, 183105000, 165780000, 154570000, 143005000, 131030000, 118640000, 106195000, 94225000, 81805000, 70215000, 58200000, 48145000, 37730000, 28310000, 18545000, 8420000, 5185000, 2645000, 0],
  },
  {
    key: "county",
    gov: "Tom Green County",
    label: "County",
    cite: ["brb-tgc"],
    values: [14610000, 12850000, 11005000, 11080000, 8930000, 15065000, 12785000, 10475000, 8025000, 5470000, 2780000, 50000000, 59515000, 65940000, 63950000, 61785000, 59485000, 57080000, 54560000, 51935000, 49200000,
      46320000, 43300000, 40155000, 36845000, 33415000, 29845000, 26115000, 22240000, 18220000, 14035000, 9680000, 5170000, 530000, 0],
  },
];

/** Moments worth labeling on the history chart. */
export const HISTORY_EVENTS = [
  { year: 2009, key: "saisd", text: "SAISD bonds, about $115M" },
  { year: 2011, key: "city", text: "City borrows $126M in one year" },
  { year: 2016, key: "county", text: "County bonds, $47M" },
  { year: 2025, key: "saisd", text: "SAISD issues $385M (Prop A)" },
] as const;

export interface PurposeSlice {
  k: string;
  v: number;
  tone: number;
  note?: string;
  unv?: boolean;
}

export interface PurposeRow {
  gov: Government;
  short: string;
  total: number;
  asOf: string;
  slices: PurposeSlice[];
  note: string;
  cite: string[];
}

// What the debt was borrowed for, as of Aug 31, 2025 (state FY2025), from the BRB issuer pages.
export const DEBT_PURPOSE: PurposeRow[] = [
  {
    gov: "City of San Angelo",
    short: "City",
    total: 265_865_000,
    asOf: "Aug 31, 2025",
    slices: [
      { k: "Transportation", v: 67_005_000, tone: 1 },
      { k: "Water, revenue bonds", v: 57_855_000, tone: 2, note: "Repaid from water bills, not property taxes" },
      { k: "Refunding older bonds", v: 53_800_000, tone: 3 },
      { k: "Economic development", v: 41_660_000, tone: 4, note: "The 2025 Coliseum bonds" },
      { k: "Water, tax-supported", v: 39_355_000, tone: 5 },
      { k: "Public safety", v: 3_290_000, tone: 6 },
      { k: "General purpose", v: 2_900_000, tone: 7 },
    ],
    note: "$208.0M is repaid from property taxes and $57.9M from water revenue.",
    cite: ["brb-san-angelo"],
  },
  {
    gov: "Tom Green County",
    short: "County",
    total: 49_200_000,
    asOf: "Aug 31, 2025",
    slices: [{ k: "General purpose", v: 49_200_000, tone: 1 }],
    note: "The state lists all County debt as general purpose. After a Sept 2025 refunding and a year of payments, the County reports $43.95M owed as of Aug 31, 2026.",
    cite: ["brb-tgc", "county-auditor-aug2026"],
  },
  {
    gov: "San Angelo ISD",
    short: "SAISD",
    total: 447_884_994,
    asOf: "Aug 31, 2025",
    slices: [
      { k: "2025 school bonds", v: 385_100_000, tone: 1, note: "Issued under Proposition A, the May 3, 2025 bond election" },
      { k: "Earlier bonds", v: 62_784_994, tone: 3, note: "Total owed less the 2025 bonds, our arithmetic" },
    ],
    note: "School district debt pays for buildings and facilities. SAISD reports $446.8M owed after a Feb 2026 payment.",
    cite: ["brb-saisd", "saisd-election-notice-2025", "saisd-hb1378", "our-analysis"],
  },
];

// Debt per resident (per student in average daily attendance for SAISD), FY2025, against the
// Bond Review Board's trend line for similar governments. The City figure counts tax-supported debt only.
export const PER_PERSON = [
  { label: "City, per resident", note: "Tax-supported debt only", v: 2076.8, peer: 2521, cite: ["brb-san-angelo"] },
  { label: "County, per resident", note: "", v: 409.65, peer: 410.1, cite: ["brb-tgc"] },
  { label: "SAISD, per student", note: "Per student in average daily attendance", v: 37943.85, peer: 28461.55, cite: ["brb-saisd"] },
];
