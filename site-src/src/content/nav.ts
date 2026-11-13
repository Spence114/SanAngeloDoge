import type { IconName } from "../render/icons.ts";
import type { Route } from "../render/html.ts";

export interface NavItem {
  route: Route;
  label: string;
  desc: string;
  icon: IconName;
  anchor?: string;
  tone?: "city" | "county" | "saisd" | "ink";
  /** Position in the guided path (Debt 1 through Flock cameras 5). */
  step?: number;
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
  covers: ["finances", "debt", "taxes", "budgets"],
  items: [
    { route: "debt", label: "Debt", desc: "What is owed, and when it is paid off", icon: "debt", step: 1 },
    { route: "taxes", label: "Taxes", desc: "Why a lower rate can still mean a bigger bill", icon: "taxes", step: 2 },
    { route: "budgets", label: "Budgets", desc: "What each government plans to spend", icon: "budget", step: 3 },
  ],
  foot: { route: "finances", label: "Money overview", desc: "", icon: "money" },
};

export const ISSUES: NavGroup = {
  key: "issues",
  label: "Issues",
  icon: "issues",
  covers: ["data-centers", "skybox", "cipher", "beacon", "privacy"],
  items: [
    { route: "data-centers", label: "Data centers", desc: "Three proposals near San Angelo, and who decides", icon: "server", step: 4 },
    { route: "privacy", label: "Flock cameras", desc: "Police plate cameras, and what we propose", icon: "camera", step: 5 },
    { route: "saisd", anchor: "bonds", label: "School bonds", desc: "$385M borrowed in 2025, repaid through 2055", icon: "bond" },
  ],
};

export const GOVERNMENTS: NavGroup = {
  key: "governments",
  label: "Governments",
  icon: "county",
  covers: ["city", "county", "saisd", "appraisal", "devcorp"],
  items: [
    { route: "city", label: "City of San Angelo", desc: "City Council and city services", icon: "city", tone: "city" },
    { route: "county", label: "Tom Green County", desc: "Commissioners Court, courts, jail, and roads", icon: "county", tone: "county" },
    { route: "saisd", label: "San Angelo ISD", desc: "Schools, spending per student, and bonds", icon: "isd", tone: "saisd" },
    { route: "appraisal", label: "Appraisal District", desc: "Sets the value every tax bill starts from", icon: "appraisal", tone: "ink" },
    { route: "devcorp", label: "Development Corporation", desc: "The half-cent sales tax for economic development", icon: "devcorp", tone: "ink" },
  ],
};

export const MORE: NavGroup = {
  key: "more",
  label: "More",
  icon: "about",
  covers: ["questions", "alerts", "appraisal-check", "reports", "tips", "about"],
  items: [
    { route: "questions", label: "Open Questions", desc: "What the record does not answer yet", icon: "question" },
    { route: "alerts", label: "Zoning alerts", desc: "Know about a zoning change near you", icon: "alert" },
    { route: "appraisal-check", label: "Appraisal check", desc: "Is your property value fair? Coming 2027", icon: "appraisal" },
    { route: "reports", label: "Reports", desc: "Our analysis, as PDFs", icon: "reports" },
    { route: "tips", label: "Tip line", desc: "Report waste, wrongdoing, or an error", icon: "doc" },
    { route: "about", label: "Who we are", desc: "Who runs this site and how we check facts", icon: "about" },
  ],
};

export const MENU_GROUPS = [MONEY, ISSUES, GOVERNMENTS, MORE];

/** Plain links in the top menu after the dropdowns. */
export const MENU_LINKS: NavItem[] = [];
