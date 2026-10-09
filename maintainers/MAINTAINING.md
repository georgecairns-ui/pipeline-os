# Maintaining Pipeline OS

For people developing the kit itself. Customers never need this folder, but it is public on GitHub, so keep it free of anything private.

## What this project is

Pipeline OS is tool 2 of the small business toolkit, built the same way as Task List OS (`~/Repos/getaipowers/task-list-os`, the reference build). A small business owner asks Claude to clone it, opens it in Claude Code and types `/setup`. Claude follows `START-HERE.md`: it asks how they sell (`context/sales.md`, required), connects their email, calendar, call recorder and CRM (`setup/connections/`), and builds the pipeline app (`apps/pipeline/`) from their real conversations. From then on Claude keeps the pipeline up to date (`pipeline-check-in`, hourly if scheduled), and call notes added in the app are read straight away.

`maintainers/BUILD-PROMPT.md` is the brief it was built from. George's follow-up decisions (8 October 2026): keep it simple; call notes fill the deal in by themselves (shared version 4); Claude moves deals forward by itself with Undo; the app says "deal check", not MEDDPICC.

## Stack

- Same as Task List OS: no framework, no build step, nothing from the internet. Shared parts (`apps/server/`, `apps/shared/`, `apps/home/`, `setup/scripts/`, `setup/connections/`, the shared skills) are copied byte for byte from Task List OS. Never change them here: change them in Task List OS, raise the shared version, copy them to every tool.
- `apps/pipeline/`: `index.html`, `menu.json` (pages and Home scripts), `home-boxes.js`, `claude-jobs.json` (the one job the app can ask the helper to run: `update-deals`), `CLAUDE.md` (the data format and Claude's rules), `ATTACH-CLAUDE.md`, `data/pipeline.json` (blank template).
- `apps/pipeline/app/`: `model.js` (data shape, stages, the deal check, every number the person sees, every change), `links.js` (copied from Task List OS), `components.js`, `view-pipeline.js` (board and list), `view-review.js`, `view-calls.js`, `view-people.js`, `view-preferences.js`, `drawer.js` (deal, person and call panels, the call notes box), `app.js` (store, routing, actions, the notes-to-Claude loop, search, shortcuts), `app.css` (Task List OS's stylesheet plus Pipeline's pieces at the end). There is no demo mode (shared version 6): a fresh install shows a "Let's set up your pipeline" card on the Pipeline page and the first Home box. The sample business for the shareable demo is not in the kit: it lives in `~/Claude/08_Artifacts/Pipeline-OS-Demo/`.
- Claude's side: `START-HERE.md`, `CLAUDE.md`, `setup/` (shared steps adapted for the pipeline, plus `pipeline-01-your-customers.md`, `pipeline-02-first-run.md`, `pipeline-03-check-ins.md`), `.claude/skills/` (`pipeline-check-in`, `update-a-deal`, `qualify-a-deal`, `prep-for-a-sales-call`, `who-to-chase`, plus the shared ones), `context/sales.md`.

## Commands

- Run the app: `node apps/server/server.js` (or `python3 apps/server/server.py`), then open http://localhost:4747.
- Test: by hand, see `maintainers/TESTING.md`. Point `TLOS_CLAUDE` at a stand-in script to test the call notes loop without using Claude.
- Publish: the same as Task List OS. Run `bash maintainers/make-release.sh` first (it refuses to build if the shipped files contain real data). Bring `public-main` level with the work branch in one commit, push it with `git push origin public-main:main`, never force-push, then refresh the Drive copy with `git archive public-main`.

## Rules

- Same as Task List OS (see its `maintainers/MAINTAINING.md`): anything committed ships, so never commit real deals, filled-in `context/`, a ticked `setup/progress.md` or "Setup: complete"; every change goes through `store.update()`; read and draft only; no em dashes; British English; no prices for Get AI Powers services.
- Every number the person relies on (stage values, pipeline total, won this month, win rate, the deal check score) is worked out in `model.js` from the raw data. Claude never writes a number for the app to show.
- The deal check never guesses. Claude's instructions (`qualify-a-deal`) say a gap stays a gap.
- Claude may move a deal forward by itself (`settings.autoMove`), always with `moved` so the person can undo it. Never backwards, never to won or lost.
- **Sending (decided by George, 9 October 2026).** Claude sends an email only when the person pressed Claude emails, checked it and pressed Send (`sendStatus: "queued"`), through `send-approved-emails`, the only skill that sends. The send tool is approved per computer in `.claude/settings.local.json` during setup step 2.5, with the person's agreement; `.claude/settings.json` never pre-approves anything that sends, deletes or posts (the release check enforces it). This is a written rule for Claude, not a technical lock: once the send tool is approved, any Claude run in that folder could send. LinkedIn messages are never sent by Claude: LinkedIn's terms ban automated messaging.
- Claude makes the everyday calls itself: moves (no Keep or Undo in Review, a "Move it back" link on the deal for a week), adding deals that clearly fit `settings.fitCriteria`, and whether a meeting is a sales call. Review is for what only the person can do.
- The fit score is worked out in `model.js` (`fitScore`) from Claude's yes, partly, no or unknown per criterion; unknowns are left out and the app says how many it's based on.

## Open questions for George

- The shared rule that every non-Task-List tool's Home boxes start switched off leaves a standalone Pipeline OS with an empty Home. `home-boxes.js` works round it (boxes start on when Task List OS isn't in the folder). Worth writing into the shared rules for every tool.
- `ATTACHING.md`'s table should list call prep and next steps as things Pipeline OS sends to the task list, and `toolkit.json` has a `contextFiles` field (for `context/sales.md`) that `ATTACHING.md` doesn't mention yet. Both are changes to the shared spec, so they wait for the next shared version.
- Task List OS's `check-in` doesn't know about Pipeline OS; when attached, `ATTACH-CLAUDE.md` tells Claude to run `pipeline-check-in` straight after it. A line in Task List OS's `check-in` ("then run every attached tool's check-in") would be cleaner.
