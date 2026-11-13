import type { IconName } from "../render/icons.ts";
import type { Route } from "../render/html.ts";

export interface NavItem {
  route: Route;
  label: string;
  desc: string;
  icon: IconName;
  anchor?: string;
  tone?: "city" | "county" | "saisd" | "ink";
}

export interface NavGroup {
  key: string;
  label: string;
  icon: IconName;
  /** Routes that light up this menu item. */
  covers: Route[];
  items: NavItem[];
  /** Link at the foot of the panel. */
  foot?: NavItem;
}

export const MONEY: NavGroup = {
  key: "money",
  label: "Money",
  icon: "money",
  covers: ["finances", "debt", "taxes", "budgets", "schools"],
  items: [
    { route: "debt", label: "Debt", desc: "What is owed, how it grew, and when it is paid off", icon: "debt" },
    { route: "taxes", label: "Taxes", desc: "Tax rates, and why a lower rate can still mean a bigger bill", icon: "taxes" },
    { route: "budgets", label: "Budgets", desc: "What each government plans to spend, and how plans change", icon: "budget" },
    { route: "schools", label: "Schools per student", desc: "What San Angelo ISD spends on each student", icon: "school" },
    { route: "devcorp", label: "Sales tax and incentives", desc: "The half-cent sales tax and who receives awards", icon: "sales" },
  ],
  foot: { route: "finances", label: "Money overview", desc: "", icon: "money" },
};

export const ISSUES: NavGroup = {
  key: "issues",
  label: "Issues",
  icon: "issues",
  covers: ["data-centers", "skybox", "cipher", "beacon", "privacy"],
  items: [
    { route: "data-centers", label: "Data centers", desc: "Three proposed campuses and who decides", icon: "server" },
    { route: "privacy", label: "Flock cameras", desc: "Plate cameras, police drones, and our view", icon: "camera" },
    { route: "saisd", anchor: "bonds", label: "School bonds", desc: "Prop A: $385M borrowed, repaid through 2055", icon: "bond" },
  ],
};

export const GOVERNMENTS: NavGroup = {
  key: "governments",
  label: "Governments",
  icon: "county",
  covers: ["city", "county", "saisd", "appraisal", "devcorp"],
  items: [
    { route: "city", label: "City of San Angelo", desc: "City Council, the City Manager, and city services", icon: "city", tone: "city" },
    { route: "county", label: "Tom Green County", desc: "Commissioners Court, courts, jail, and roads", icon: "county", tone: "county" },
    { route: "saisd", label: "San Angelo ISD", desc: "The school board and the public schools", icon: "isd", tone: "saisd" },
    { route: "appraisal", label: "Appraisal District", desc: "Sets the property values every tax bill starts from", icon: "appraisal", tone: "ink" },
    { route: "devcorp", label: "Development Corporation", desc: "Spends the half-cent sales tax on economic development", icon: "devcorp", tone: "ink" },
  ],
};

export const TOOLS: NavGroup = {
  key: "tools",
  label: "Tools",
  icon: "alert",
  covers: ["alerts", "appraisal-check", "tips"],
  items: [
    { route: "alerts", label: "Zoning alerts", desc: "Know about a zoning change near you before the vote", icon: "alert" },
    { route: "appraisal-check", label: "Appraisal check", desc: "See if your property value is in line with your neighbors'", icon: "appraisal" },
    { route: "tips", label: "Tip line", desc: "Report waste, wrongdoing, or an error in our data", icon: "question" },
  ],
};

export const MENU_GROUPS = [MONEY, ISSUES, GOVERNMENTS, TOOLS];

/** Plain links in the top menu after the dropdowns. */
export const MENU_LINKS: NavItem[] = [
  { route: "questions", label: "Open Questions", desc: "What the record does not answer yet", icon: "question" },
  { route: "reports", label: "Reports", desc: "Our analysis, as PDFs", icon: "reports" },
  { route: "about", label: "About", desc: "Who we are and how we work", icon: "about" },
];
