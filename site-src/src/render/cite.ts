// Numbered citations. Each page collects the sources it cites, in order of first use,
// and lists them at the bottom. Content cites a source with {{c:source-id}} or {{c:id1,id2}}.

import { type Source, SOURCES } from "../content/sources.ts";
import type { BuildMode } from "../config.ts";

export class Citations {
  readonly order: string[] = [];
  constructor(
    readonly route: string,
    readonly mode: BuildMode,
  ) {}

  private num(id: string): number {
    if (!SOURCES[id]) throw new Error(`Unknown source id "${id}" on page "${this.route}"`);
    let i = this.order.indexOf(id);
    if (i === -1) {
      this.order.push(id);
      i = this.order.length - 1;
    }
    return i + 1;
  }

  anchorId(n: number): string {
    return `src-${this.route}-${n}`;
  }

  private link(n: number): string {
    const target = this.anchorId(n);
    const title = SOURCES[this.order[n - 1]]?.title ?? "";
    const attr = `title="${title.replace(/"/g, "&quot;")}"`;
    if (this.mode === "artifact") return `<a href="#${this.route}" data-scroll="${target}" ${attr}>${n}</a>`;
    return `<a href="#${target}" ${attr}>${n}</a>`;
  }

  /** Superscript marker for one or more sources. */
  ref(ids: string[]): string {
    const nums = [...new Set(ids.map((id) => this.num(id.trim())))].sort((a, b) => a - b);
    return `<sup class="cite">${nums.map((n) => this.link(n)).join("")}</sup>`;
  }

  /** Replace {{c:...}} tokens in authored content. */
  fill(s: string): string {
    // Swallow the space before a citation so the number never wraps onto its own line.
    return s.replace(/\s*\{\{c:([a-z0-9,\- ]+)\}\}/g, (_m, list: string) => this.ref(list.split(",")));
  }

  entries(): Array<{ n: number; id: string; s: Source }> {
    return this.order.map((id, i) => ({ n: i + 1, id, s: SOURCES[id] }));
  }
}
