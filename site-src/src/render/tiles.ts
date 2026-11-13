import type { NavItem } from "../content/nav.ts";
import { ICON } from "./components.ts";
import { anchorLink, type Ctx, href } from "./html.ts";
import { GI } from "./icons.ts";

/** A grid of icon tiles that link to pages. */
export function tiles(ctx: Ctx, items: NavItem[], cls = ""): string {
  return `<div class="tiles ${cls}">${items
    .map((n) => {
      const inner = `<span class="tile-ic">${GI[n.icon]}</span><span class="tile-t"><b>${n.label}</b><span>${n.desc}</span></span><span class="tile-go">${ICON.arrow}</span>`;
      const c = `tile${n.tone ? ` tone-${n.tone}` : ""}`;
      return n.anchor ? anchorLink(ctx, n.route, n.anchor, inner, c) : `<a class="${c}" href="${href(ctx, n.route)}">${inner}</a>`;
    })
    .join("")}</div>`;
}
