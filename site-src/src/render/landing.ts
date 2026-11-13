// Building blocks for the sign-up landing pages (zoning alerts, appraisal check).

import { esc, type Ctx, rich } from "./html.ts";
import { GI, type IconName } from "./icons.ts";

export interface Feature {
  icon: IconName;
  k: string;
  v: string;
}

export function audience(items: Array<Feature & { tone?: string }>): string {
  return `<div class="aud">${items
    .map((a) => `<div class="aud-c tone-${a.tone ?? "ink"}"><span class="aud-ic">${GI[a.icon]}</span><h3>${a.k}</h3><p>${a.v}</p></div>`)
    .join("")}</div>`;
}

export function features(ctx: Ctx, items: Feature[]): string {
  return `<ul class="feat">${items.map((f) => `<li><span class="feat-ic">${GI[f.icon]}</span><div><h3>${f.k}</h3><p>${rich(ctx, f.v)}</p></div></li>`).join("")}</ul>`;
}

export interface Plan {
  name: string;
  who: string;
  price: string;
  items: string[];
  pick?: boolean;
}

export function plans(list: Plan[], note: string): string {
  return `<div class="plans">${list
    .map(
      (p) => `<div class="plan${p.pick ? " pick" : ""}">${p.pick ? '<span class="plan-flag">Most useful</span>' : ""}<h3>${p.name}</h3><p class="plan-who">${p.who}</p><p class="plan-price">${p.price}</p><ul>${p.items
        .map((i) => `<li><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8.5 6.5 12 13 4.5"/></svg>${i}</li>`)
        .join("")}</ul></div>`,
    )
    .join("")}</div><p class="note plans-note">${note}</p>`;
}

export function faq(ctx: Ctx, items: Array<{ q: string; a: string }>): string {
  return `<div class="faq">${items.map((f) => `<details class="faq-i"><summary>${esc(f.q)}<span class="faq-x" aria-hidden="true"></span></summary><p>${rich(ctx, f.a)}</p></details>`).join("")}</div>`;
}

/** Radio pills for a form. */
export function pills(name: string, idp: string, opts: string[], checked = 0, type: "radio" | "checkbox" = "radio"): string {
  return `<div class="radios">${opts
    .map((t, i) => `<label class="ck" for="${idp}${i}"><input id="${idp}${i}" type="${type}" name="${name}" value="${esc(t)}"${type === "radio" && i === checked ? " checked" : ""}><span>${t}</span></label>`)
    .join("")}</div>`;
}
