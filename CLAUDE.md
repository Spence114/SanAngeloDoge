# SanAngeloDOGE.com repo notes

- The repo root is the published site (static HTML). Do not hand-edit the HTML at the root; edit `site-src/` and rebuild.
- Build: `cd site-src && npx tsx build.ts`, then `cp -a dist/site/. ../`. Type check: `npx tsc --noEmit -p .`.
- Content is typed in `site-src/src/content/`. Every figure cites a source id from `src/content/sources.ts` with `{{c:id}}` tokens; the build fails on an unknown id.
- House style: no em or en dashes anywhere in copy (the build fails on them), use the Oxford comma, plain words, no filler. Pink (`unv`) marks anything not verified against a source document.
- Opinion and proposals are labeled as such and kept apart from the record. Tone toward SAPD and local officials is respectful.
- Pushing to `main` publishes to SiteGround through `.github/workflows/deploy.yml`.
