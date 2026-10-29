// Shared shapes for page content. Strings may contain authored HTML and [[route|label]] links.

/** One labeled fact. `unv` marks anything not yet verified against a source document (shown in pink). */
export interface Fact {
  k: string;
  v: string;
  /** Source ids, numbered and listed at the bottom of the page. */
  cite?: string[];
  /** Short qualifier shown under the value, such as "company statement" or "our estimate". */
  src?: string;
  unv?: boolean;
}

export interface TimelineItem {
  d: string;
  e: string;
  src?: string;
  next?: boolean;
}

export interface OpenQuestion {
  q: string;
  why?: string;
}

export interface DocLink {
  tag: string;
  title: string;
  url: string;
  note?: string;
  kind: "PDF" | "Web" | "News" | "Filing" | "State" | "Agenda";
}

export interface Table {
  head: string[];
  rows: string[][];
  /** Column indexes that hold numbers (right-aligned, tabular figures). */
  num?: number[];
  /** Cells to show in pink, as "row:col". */
  unv?: string[];
  /** Rows to emphasize, such as a total. */
  strong?: number[];
}

export type Government = "City of San Angelo" | "Tom Green County" | "San Angelo ISD";
