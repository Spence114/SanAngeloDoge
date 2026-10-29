// Bar charts drawn in HTML so labels stay readable at phone width.
// Every bar is placed on one linear scale from 0 to `max`.

export interface Seg {
  v: number;
  cls: "p" | "i" | "r" | "s" | "o" | "d";
  title: string;
}

export interface BarRow {
  label: string;
  sub?: string;
  segs: Seg[];
  value: string;
  valueCls?: string;
  group?: string;
}

export interface BarChart {
  aria: string;
  max: number;
  step: number;
  tick: (v: number) => string;
  rows: BarRow[];
  legend?: Array<{ cls: Seg["cls"]; label: string }>;
}

const pct = (v: number, max: number) => `${((v / max) * 100).toFixed(3)}%`;

export function hbars(c: BarChart): string {
  const ticks: number[] = [];
  for (let t = 0; t <= c.max + 1e-9; t += c.step) ticks.push(t);
  const stepPct = pct(c.step, c.max);
  let lastGroup = "";
  const rows = c.rows
    .map((r) => {
      const head = r.group && r.group !== lastGroup ? `<div class="hgroup">${r.group}</div>` : "";
      if (r.group) lastGroup = r.group;
      const segs = r.segs
        .map((s) => `<span class="seg ${s.cls}" style="width:${pct(s.v, c.max)}" title="${s.title}"></span>`)
        .join("");
      return `${head}<div class="hrow"><div class="hl">${r.label}${r.sub ? `<span>${r.sub}</span>` : ""}</div><div class="htrack" style="--step:${stepPct}">${segs}</div><div class="hv${r.valueCls ? ` ${r.valueCls}` : ""}">${r.value}</div></div>`;
    })
    .join("");
  const scale = `<div class="hrow hscale-row" aria-hidden="true"><div></div><div class="hscale">${ticks
    .map((t, i) => `<span style="left:${pct(t, c.max)}"${i === ticks.length - 1 ? ' class="end"' : ""}>${c.tick(t)}</span>`)
    .join("")}</div><div></div></div>`;
  const legend = c.legend
    ? `<div class="legend">${c.legend.map((l) => `<span><i class="sw ${l.cls}"></i>${l.label}</span>`).join("")}</div>`
    : "";
  return `<figure class="hbars" role="img" aria-label="${c.aria}">${legend}${rows}${scale}</figure>`;
}
