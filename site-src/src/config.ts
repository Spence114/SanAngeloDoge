// Site-wide settings. Change these, run `npm run build`, and every page picks them up.

export type BuildMode = "artifact" | "site";

export const SITE = {
  name: "San Angelo DOGE",
  domain: "sanangelodoge.com",
  origin: "https://sanangelodoge.com",
  updated: "Oct 29, 2026",
  /** Date every cited data point was last checked against its source. */
  checked: "Oct 29, 2026",
  contactEmail: "Spencer@sanangelodoge.com",
};

// Phase 0: the site links to the dashboard proposal, not to a live app.
// When the dashboard launches, add its URL here and point the header button at it.

// Form endpoints. Until a form service is connected, each form hands the message to the
// visitor's email app, addressed to SITE.contactEmail, so it lands in that inbox and no third
// party sees it. To switch a form to a service (Formspree, Netlify Forms, or our own endpoint
// on the local machine), paste its URL here. The tip line should eventually get its own inbox.
export const FORMS: Record<FormKind, string> = {
  subscribe: "",
  tip: "",
  sponsor: "",
  feedback: "",
};

export type FormKind = "subscribe" | "tip" | "sponsor" | "feedback";
