// Published reports. Analysis and opinion by Spencer Matthews, kept apart from the data pages.
// PDFs are served from sanangelodoge.com/reports/. The deploy workflow copies them in from the
// old uploads folder on its first run (see .github/reports.txt in the site repo).

export type ReportTopic = "data-centers" | "beacon" | "skybox" | "cipher" | "finances" | "opinion";

export interface Report {
  id: string;
  date: string;
  title: string;
  desc: string;
  url: string;
  format: "PDF" | "Web page";
  kind: "Analysis" | "Briefing" | "Opinion";
  length?: string;
  topics: ReportTopic[];
  update?: string;
}

const UP = "https://sanangelodoge.com/reports";

export const REPORTS: Report[] = [
  {
    id: "westline-brief",
    date: "Jun 2026",
    title: "Beacon's gas plant: what the air permit asks for",
    desc: "Beacon's gas plant application in brief: scale, air, water, gas supply, and the steps residents can take in TCEQ's process.",
    url: `${UP}/beacon-air-permit-briefing.pdf`,
    format: "PDF",
    kind: "Briefing",
    topics: ["data-centers", "beacon"],
  },
  {
    id: "beacon-noise",
    date: "Aug 2026",
    title: "How loud would it be? Beacon noise screening",
    desc: "Calculated sound levels from the engine maker's data at the Boys Ranch, Foster Park, The Four56 Church, and the edge of town.",
    url: `${UP}/beacon-noise-screening.pdf`,
    format: "PDF",
    kind: "Analysis",
    length: "2 pages",
    topics: ["data-centers", "beacon"],
  },
  {
    id: "due-diligence",
    date: "Jun 2026",
    title: "Data centers due diligence: a city, county, and state assessment",
    desc: "Financing, power, water, and governance for the Skybox, Cipher, and Beacon proposals, with actions for council, commissioners, and legislators.",
    url: `${UP}/data-center-due-diligence.pdf`,
    format: "PDF",
    kind: "Analysis",
    topics: ["data-centers", "skybox", "cipher", "beacon"],
    update:
      "The land use rules the City adopted May 19, 2026 set a 300-foot building setback from residentially zoned property, not the 200 feet the report gives; 200 feet is the limit for ground equipment such as generators and cooling units. {{c:city-landuse-ord,cc-minutes-2026-05-19}} The City adopted its data center water ordinance Jun 16, 2026, 7-0. {{c:city-water-ord,cc-minutes-2026-06-16}} HB 3970 (2025) passed the Texas House but did not become law. {{c:tlo-hb3970-engrossed,tlo-hb3970-history}}",
  },
  {
    id: "school-bond-letter",
    date: "2025",
    title: "Open letter on the San Angelo school bond",
    desc: "An analysis of the 2025 SAISD bond before the vote. Current bond figures are on the Finances page.",
    url: `${UP}/saisd-bond-open-letter.pdf`,
    format: "PDF",
    kind: "Analysis",
    topics: ["finances"],
  },
];

export const IN_PROGRESS = [
  { title: "Flock license plate cameras", kind: "Analysis" },
  { title: "Local Fourth Amendment concerns", kind: "Analysis" },
  { title: "Accounts payable: where the money goes", kind: "Data" },
  { title: "Vendor analysis", kind: "Data" },
  { title: "Property tax levels", kind: "Data" },
  { title: "Society and the risks of AI", kind: "Opinion" },
  { title: "Abolishing the property tax", kind: "Opinion" },
  { title: "Economic gardening strategy", kind: "Opinion" },
  { title: "Free trade zones", kind: "Opinion" },
  { title: "Voter roll review", kind: "Data" },
];

export const byTopic = (t: ReportTopic) => REPORTS.filter((r) => r.topics.includes(t));
export const byId = (...ids: string[]) => ids.map((id) => REPORTS.find((r) => r.id === id)).filter((r): r is Report => !!r);
