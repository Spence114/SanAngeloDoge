# SanAngeloDOGE.com

The front-door website for San Angelo DOGE. It is a static site written in TypeScript. Every page is rendered at build time from typed content files, so there is no server and no database.

## Build

```
npm install
npm run build     # writes dist/
npm run check     # type-checks everything
```

The build writes two outputs:

- `dist/site/` is the production site for sanangelodoge.com. It has one folder per page with clean URLs (`/finances/`, `/data-centers/`, `/privacy/`, and so on). Upload this folder to any static host (Cloudflare Pages, Vercel, Netlify, or the NAS behind a web server).
- `dist/preview/index.html` is a single self-contained file with hash routes (`#finances`). It is used for the shareable preview link.

## Where things live

| Path | What it holds |
| --- | --- |
| `src/config.ts` | Site name, update date, contact email, and the form endpoints |
| `src/content/` | All page content and figures, typed. Edit numbers and copy here. |
| `src/pages/` | One file per page that lays out the content |
| `src/render/` | Shared pieces: header, footer, logo mark, tables, timelines, bar charts |
| `src/styles.css` | The e-paper brand: tokens at the top, then components |
| `src/client.ts` | Browser behavior: menu, hash routing for the preview, interest counter, forms |
| `build.ts` | Renders every page and writes `dist/` |

## Content rules

- Strings in `src/content/` may contain HTML. Link to another page with `[[route|label]]`, for example `[[alerts|sign up]]`. The build turns it into the right link for each output.
- Mark anything not yet verified against a source document with `unv: true` (or list the cell in a table's `unv` array). It renders in pink.
- No em or en dashes in copy. The build fails if it finds one.

## Before launch

1. Phase 0 links to the dashboard proposal (`/proposal/`), not a live app. When the dashboard launches at app.sanangelodoge.com, point the header button and hero button at it.
2. Paste a form service URL for each form in `FORMS` in `src/config.ts`. The tip line should go to its own private inbox. Until then, forms show "Preview: nothing was sent."
3. Update `SITE.updated` whenever the figures change.
4. Report PDFs are listed in `src/content/reports.ts` and served from `sanangelodoge.com/reports/`. They live in the `reports/` folder of the SanAngeloDoge repo; the deploy workflow copied them in from the old uploads folder on its first run (see `.github/reports.txt`). To add a report, put the PDF in `reports/` and add an entry to `reports.ts`.

## Pages

Home, Finances, Data centers (guide plus Skybox, Cipher, and Beacon project pages), Privacy (license plate cameras and police drones), Reports (every published report with a download button, plus what is in progress), The dashboard proposal (where it stands, how it would work, the ten parts, rollout, and the sponsor ask), About (who runs it, standards, corrections, site privacy, disclaimer), Get alerts, and Tip line.
