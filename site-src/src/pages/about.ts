import { ABOUT_LEDE, CORRECTIONS, DISCLAIMER, SITE_PRIVACY, STANDARDS, WHO } from "../content/about.ts";
import { facts, ICON, pageHead, prose, section, table } from "../render/components.ts";
import { anchorLink, type Ctx, href } from "../render/html.ts";

export function aboutPage(ctx: Ctx): string {
  const plan = `<div class="cta-card">
    <div><h3>A public finance dashboard, in development</h3><p>The proposal lays out what the dashboard would do, how it would gather and check the public record, the rollout order, and what it takes to build. We are looking for sponsors.</p></div>
    <div class="cta-acts"><a class="btn" href="${href(ctx, "proposal")}">See the proposal ${ICON.arrow}</a>${anchorLink(ctx, "proposal", "sponsor", "Sponsor the build", "btn btn-ghost")}</div>
  </div>
  <p class="note">Published reports and the ones in progress are on the <a href="${href(ctx, "reports")}">Reports</a> page. Analysis and opinion are labeled and kept apart from the data pages.</p>`;

  const corrections = table(
    ctx,
    { head: ["Date", "Page", "What changed"], rows: CORRECTIONS.map((c) => [c.date, c.page, c.what]) },
    "Corrections log",
  );

  return `${pageHead({ eyebrow: "About", title: "About San Angelo DOGE", lede: ABOUT_LEDE })}

${section({ id: "who", title: "Who runs it", body: prose(ctx, WHO) })}

${section({ id: "building", title: "What we're working on", body: plan, band: true })}

${section({ id: "standards", title: "How we work", body: facts(ctx, STANDARDS) })}

${section({ id: "corrections", title: "Corrections log", note: "Report an error through the tip line and we will check it against the source document.", body: corrections, band: true })}

${section({ id: "site-privacy", title: "Your privacy on this site", body: prose(ctx, SITE_PRIVACY) })}

${section({ id: "disclaimer", title: "Disclaimer", body: prose(ctx, DISCLAIMER), band: true })}`;
}
