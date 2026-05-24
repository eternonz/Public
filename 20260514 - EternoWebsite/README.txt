EternoWebsite
=============

Started: 2026-05-14
Project type: App (Vite + React company website)
Repo: github.com/eternonz/Public (subdir "20260514 - EternoWebsite")

Brief
-----
Eterno Limited company website at https://eterno.nz/. Vite + React 19 +
TypeScript + react-router-dom. Showcases KeaLedger as flagship app, includes
privacy/terms pages. Deployed via GitHub Pages from the Public tier repo
through a GitHub Actions workflow that builds on every push to Build/.

How it deploys
--------------
  1. You edit files under Build/.
  2. ProjectRepoSync daemon commits + pushes to eternonz/Public on every
     change.
  3. .github/workflows/deploy-eterno.yml triggers on push to main when paths
     matching "20260514 - EternoWebsite/Build/**" change.
  4. Workflow: npm ci -> npm run build -> upload-pages-artifact -> deploy-pages.
  5. GitHub Pages serves the dist/ output at eterno.nz (custom domain set on
     eternonz/Public; HTTPS cert auto-managed, valid through 2026-07-09).
  6. Cloudflare proxies eterno.nz DNS to GitHub Pages IPs.

Folder layout (App-type, per TopRules §8)
-----------------------------------------
  Build/                — Vite + React source (package.json, src/, public/, etc.)
  Build/public/CNAME    — contains "eterno.nz" (Vite copies to dist/ at build)
  Backup/, Docs/, Elements/, Others/  — standard

Change log (newest first)
-------------------------
2026-05-24  Migrated source from legacy eternonz/Repos/eterno-website/ into
            Public/20260514 - EternoWebsite/Build/. Added GH Actions deploy
            workflow. Atomic CNAME cutover: deleted eternonz.github.io repo
            -> set cname=eterno.nz on eternonz/Public. Hard-deleted legacy
            eternonz/Projects + eternonz/Repos GitHub repos.
2026-05-14  Original source committed to legacy eternonz/Repos/eterno-website/
            monorepo. Live site at eternonz.github.io with eterno.nz CNAME.

Maintained by: eterno (solo)
Note: This README.txt is a human-readable brief. Authoritative deploy mechanics
documented in TopRules.md §9 + the workflow file at
.github/workflows/deploy-eterno.yml. If they conflict, those win and this
README.txt is the one to update.
