import type { BuildMode } from "../config.ts";
import type { Citations } from "./cite.ts";

export const ROUTES = [
  "home",
  "finances",
  "data-centers",
  "skybox",
  "cipher",
  "beacon",
  "privacy",
  "reports",
  "proposal",
  "about",
  "alerts",
  "tips",
] as const;

export type Route = (typeof ROUTES)[number];

export interface Ctx {
  mode: BuildMode;
  route: Route;
  cites: Citations;
}

/** Citation marker for use in page templates. */
export function cite(ctx: Ctx, ...ids: string[]): string {
  return ctx.cites.ref(ids);
}

/** Escape text for HTML element content or attribute values. */
export function esc(s: string | number): string {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Internal link target for a route in the current build mode. */
export function href(ctx: Ctx, route: Route): string {
  if (ctx.mode === "artifact") return route === "home" ? "#home" : `#${route}`;
  return route === "home" ? "/" : `/${route}/`;
}

/**
 * Link to a section within a page. The multi-page site uses a normal #anchor;
 * the single-file preview routes by hash, so the client scrolls via data-scroll.
 */
export function anchorLink(ctx: Ctx, route: Route, anchor: string, label: string, cls = ""): string {
  const c = cls ? ` class="${cls}"` : "";
  if (ctx.mode === "artifact") return `<a${c} href="${href(ctx, route)}" data-scroll="${anchor}">${label}</a>`;
  return `<a${c} href="${href(ctx, route)}#${anchor}">${label}</a>`;
}

/**
 * Content strings are authored HTML. Internal links are written as [[route|label]]
 * so the same content works in the single-file preview and the multi-page site.
 */
export function rich(ctx: Ctx, s: string): string {
  const linked = s.replace(/\[\[([a-z-]+)\|([^\]]+)\]\]/g, (_m, r: string, label: string) => {
    if (!(ROUTES as readonly string[]).includes(r)) throw new Error(`Unknown route in content: ${r}`);
    return `<a href="${href(ctx, r as Route)}">${label}</a>`;
  });
  return ctx.cites.fill(linked);
}

/** External link that opens in a new tab. */
export function ext(url: string, label: string): string {
  return `<a href="${esc(url)}" target="_blank" rel="noopener">${label}</a>`;
}

export function join(parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join("\n");
}

export const usd = (n: number, digits = 0): string =>
  "$" + n.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });

/** $267.2M style, for chart labels and compact figures. */
export const usdM = (n: number, digits = 1): string => `$${(n / 1e6).toFixed(digits)}M`;
