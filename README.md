# SanAngeloDOGE.com

The public website for San Angelo DOGE, an independent, citizen-sponsored look at the finances of the City of San Angelo, Tom Green County, San Angelo ISD, and the Tom Green County Appraisal District.

## How this repo is laid out

- The repo root is the live site. Everything here except `.github/`, `site-src/`, `README.md`, and `CLAUDE.md` is uploaded to SiteGround as is.
- `site-src/` is the TypeScript source. Pages, content, and sources live there; the build writes plain HTML.
- `reports/` holds the report PDFs, served at `sanangelodoge.com/reports/`.
- `.github/workflows/deploy.yml` uploads the site to SiteGround over SSH on every push to `main`, or by hand from the Actions tab (with a dry run option).

## Updating the site

```
cd site-src
npx tsx build.ts          # writes dist/site/
cp -a dist/site/. ../     # copy the built pages to the repo root
```

Then commit and push. The push publishes.

Forms hand the visitor's message to their email app, addressed to Spencer@sanangelodoge.com. To use a form service instead, add its URL to `FORMS` in `site-src/src/config.ts` and rebuild.
