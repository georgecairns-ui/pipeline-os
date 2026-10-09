# Build prompt: Pipeline OS

**How to run this:** first make sure the Task List OS redesign (shared version 3) is checked and published. Then in the Claude desktop app, go to the Code tab, start a new session and choose your `getaipowers` folder inside `Repos`. Copy everything below the line, paste it in and send. Claude reads, comes back with a plan for you to OK, then does the rest, including GitHub and the Google Drive copy. It stops once more, just before publishing.

Rewritten 6 October 2026: shared version 3, sales meeting detection across every email and call recorder, a log of every sales conversation, MEDDPICC qualification, and required sales questions in Start Here. The previous version is in `_archive/build-prompts-v2/`.

Updated 8 October 2026 after the Task List OS release on GitHub (`main` at 8cf5ff4): Pipeline OS now owns the People page, setup gains a "build your skills" step, the Claude icon replaces the Get AI Powers emblem in the app, and the finish includes a 5-page install guide for non-members.

---

You're helping me (George, Get AI Powers) build **Pipeline OS**, one tool in our small business toolkit. I'm not a developer, so explain anything technical in plain English and give me exact click-by-click steps whenever I need to do something myself.

## The toolkit

The toolkit is a set of tools for UK small business owners: Task List OS (already built) plus 8 more. Each one is a complete kit someone can use on its own, and each one can be attached to any of the others, so whatever combination a customer has works as one app with one Claude. Attach all of them and they have the whole toolkit. That's the point Joey and I agreed: separate tools that are useful alone, that we can give away individually, and that click together into something bigger. The people using it run "boring" businesses: trades, agencies, recruiters, brewers, accountants. Smart, busy, non-technical. They'll never look at code.

## Read these first

1. **`ATTACHING.md`**, in the Google Drive toolkit folder: `~/Library/CloudStorage/GoogleDrive-george.cairns@getaipowers.com/Shared drives/Get AI Powers Brain/Claude/05_Marketing/small-business-toolkit/pipeline-os/ATTACHING.md`. The rules every tool follows so they attach to each other and show each other in the menu. Treat it as the spec. Copy it into the repository unchanged.
2. **Task List OS, at `~/Repos/getaipowers/task-list-os`.** It's the reference build, and Pipeline OS must look, feel, set up and behave like it. Read README.md, START-HERE.md, CLAUDE.md, LICENSE, `maintainers/MAINTAINING.md`, `maintainers/TESTING.md`, `docs/CUSTOMISING.md`, `apps/server/`, `apps/shared/`, `apps/home/`, everything in `apps/task-list/` (especially its CLAUDE.md, `menu.json` and `home-boxes.js`), `context/`, every file in `setup/` and `setup/connections/`, `.claude/skills/README.md`, and these skills in full: `process-calls`, `triage-inbox`, `check-in`, `meeting-follow-up`, `polite-chaser`, `human-email`, `write-like-me`, `match-my-brand`.
3. **Task List OS's `apps/shared/VERSION`.** It must say 3 or later: the redesign with the Home dashboard, the sidebar dropdowns, light and dark, and `match-my-brand`. If it says less, stop and tell me the Task List OS redesign isn't published yet. Read `maintainers/SHARED-V3-CHANGES.md`: it is the exact list of what every tool copies and what each tool makes for itself (`installed.json`, `toolkit.json`, `menu.json`, `home-boxes.js`, `index.html`, the store). If another tool in `~/Repos/getaipowers/` has a newer shared version, use that one.
4. **My MEDDPICC skill**, at `~/Claude/Skills/get-ai-powers/business/meddpicc-qualification/SKILL.md`. It's how Get AI Powers qualifies its own deals. Pipeline OS's deal check is built from it (see below), adapted for any small business. Don't copy it word for word: it mentions me and our own CRM.

5. **What changed in Task List OS on 7 and 8 October 2026.** Copy all of it:
   - **One Tasks page** (Today, This week or All, as a Board, List or Calendar) replaced the separate day, week, list and calendar pages. The sidebar is Tasks, Inbox, Review, Calls. The Voice note button is now **Brain dump**. Goals are gone.
   - **Preferences** (the cog) holds the editable categories, column names and defaults. Give Pipeline OS the same page for its stages and deal check wording.
   - **Claude can do this**: tasks Claude could do carry a ready prompt and an **Open in Claude** button (`claude://code/new?q=...&folder=...`, folder from the helper's `/api/info`). Use the same pattern for chases and call prep.
   - **The Claude icon**, `apps/shared/images/claude-icon.png`, is the sidebar brand, the footer mark and the browser-tab icon (see `SHARED-V3-CHANGES.md`). No Get AI Powers emblem inside the app.
   - **Setup is 9 steps.** New step 6, `setup/06-build-your-skills.md`, interviews the person about their services and builds 3 to 5 skills for their business, saved in `.claude/skills/` and zipped in `skills-to-upload/` with how to add them to Claude (Customize, then Skills). The hand-over ends with a list of everything Claude did, with real numbers.

If anything in this brief contradicts how Task List OS actually works, Task List OS wins: tell me what you found and follow it. Load my `get-ai-powers-brand` and `brand-web-kit` skills before designing any screen, but follow Task List OS's look (its `theme.css`, light and dark) so the tools match when they're attached.

## This tool: Pipeline OS, the pipeline that chases itself

**The pain.** Deals live in the owner's head, their inbox and a spreadsheet nobody updates. Sales calls happen, nobody writes them up, and the follow-up slips. Owners rarely ask the questions that tell them whether a deal is real, so they spend weeks on people who were never going to buy and miss the extra problems a good prospect mentioned in passing. Plenty pay monthly for a CRM like Pipedrive or Monday they barely open.

**What it does.** Pipeline OS keeps a record of every conversation the business has with a prospective customer, whatever it happened on, and turns it into a pipeline that runs itself:

- It reads their **email** and spots enquiries and replies from prospects.
- It reads their **calendar** and works out which meetings are sales meetings.
- It reads their **call recordings** and writes up each sales call against the deal.
- It **qualifies every deal** with MEDDPICC, a standard sales method, so the owner sees what they know, what they don't, and what to ask next time.
- It **spots other problems** the prospect mentioned that the business could also solve, and suggests them.
- It drafts every **chase** in the owner's voice, and works with the **task list** so call prep and follow-ups land where the owner already works.

The person approves every change with a click and sends every email themselves. Claude never sends.

### Where conversations come from

Pipeline OS must work with whatever the person already uses. Reuse Task List OS's connection guides in `setup/connections/` for all of these; don't write new ones unless one is missing, and if one is missing, say so in your plan.

| Kind | Must work with |
|---|---|
| Email | Gmail and Google Workspace, Outlook with a work Microsoft account, Outlook.com and Hotmail |
| Calendar | Google Calendar, Outlook calendar |
| Video calls and recordings | Microsoft Teams, Zoom, Google Meet (what used to be Google Hangouts: say Google Meet in everything customer-facing), plus the recorders Task List OS already supports: Fathom, Fireflies, Otter, Granola, tl;dv, Read AI |
| Anything else | A recorder that emails a summary after each call is read through their email. Otherwise they save transcripts into `files/08-projects/calls/`, the same fallback Task List OS uses |

Be honest about what each one gives. Teams, Zoom and Meet only produce a transcript if recording or transcription was switched on for that meeting. When a sales meeting has no transcript, Claude says so on the deal and asks the person for 3 lines on how it went (a voice note into Task List OS's Brain dump counts). Check each guide against what the connection really offers today and tell me in your plan where there are gaps.

### Spotting sales meetings

On every check-in, Claude looks at the calendar for the past 2 days and the next 7, and sorts each meeting:

- **Sales**: a new or existing prospect, about buying something. It gets linked to a deal, or a new suggested deal is made.
- **Customer**: someone who already buys from them. Not a deal, unless it's about selling them something more.
- **Internal or personal**: ignored.
- **Not sure**: becomes a one-click question in the suggestions tray ("Is your call with Jo Patel on Thursday a sales call?"). The answer teaches Claude: note it against the person, so it doesn't ask twice.

Clues Claude uses, written into the skill: the attendees' email addresses and whether they're already a customer, deal or team member in `context/people.md`; the meeting title ("intro", "discovery", "quote", "site visit", "demo", "chat about"); whether it came from a booking link; and earlier emails with the same people. It never decides from one clue alone.

### Working with the task list

Pipeline OS and Task List OS must feel like one assistant.

- **Before a sales meeting:** the day before, a suggested task "Prep for your call with Tom at Greenway Café", with the deal's 2 or 3 biggest qualification gaps as questions to ask and anything they promised last time.
- **After a sales meeting:** the write-up goes on the deal's timeline, the qualification is updated, the person's actions become suggested tasks and a follow-up email is drafted.
- **One write-up per call, never 2.** When Task List OS is attached, its `process-calls` skill already writes each call up on its Calls page. Pipeline OS reads that write-up (reading is allowed by `ATTACHING.md`) and adds the sales side: the deal link, the qualification and the other problems spotted. It never writes the call up a second time and never edits Task List OS's records. Work out the cleanest way to do this and put it in your plan. If it needs a change to Task List OS's `process-calls` or `check-in` skills, tell me what and why: that change is made in Task List OS first.
- **Chases due** become suggested tasks, as `ATTACHING.md` already says.
- **One check-in.** When both are attached, the hourly check-in runs both tools' steps in one go. On its own, Pipeline OS has its own check-in.
- **People belongs to Pipeline OS.** Task List OS no longer has a People page (decided 7 October 2026, after user testing). Pipeline OS has the People page: every contact and company, with their deals, conversations and open tasks. Contacts are still stored once: when attached, they are the task list's `people` in `apps/task-list/data/tasks.json` (tasks already link to them with `personId`), never a second contact list. Plan how Pipeline OS reads and adds to them within `ATTACHING.md`'s rules.
- **On its own**, Pipeline OS does all of this itself: writes up the calls, keeps prep and chases on its own list, and keeps its own contacts.

### The deal check (MEDDPICC)

Every deal gets qualified against the 8 MEDDPICC questions, using the rules in my skill: each answer is **Known**, **Partly known** or **Not known yet**, with the evidence and who said it. A gap is more useful than a guess, so Claude never fills one by inference. Every new call, email or note re-runs the check. An answer only improves when there's new evidence, and if a call contradicts something already known, Claude flags it rather than quietly changing it. Everything is a suggestion until the person approves it.

Most owners won't know the word MEDDPICC, so the app calls it the **deal check** and asks each question in plain English. A small "Based on MEDDPICC, a standard way to qualify sales" line explains where it comes from. Agree the exact wording with me in your plan; as a starting point:

| MEDDPICC | In the app |
|---|---|
| Metrics | What is the problem costing them, in their numbers? |
| Economic buyer | Who signs it off? |
| Decision criteria | What will they judge it on? |
| Decision process | How and when will they decide? |
| Paper process | Contracts, purchase orders or checks before they can buy |
| Identify pain | What's actually hurting, in their words? |
| Competition | Who or what else are they considering, including doing nothing? |
| Champion | Who on their side wants this and will push for it? |

The deal page shows a score and the questions to ask next. **The app calculates the score** from the 8 answers (Known 1, Partly known 0.5, out of 8), never Claude. Claude writes the risks, the buying signals and the 3 to 5 next-call questions, ordered by what would move the deal most.

Make this a skill in the kit (`qualify-a-deal`), adapted from my MEDDPICC skill, reading the business's own sales notes so the questions fit what they sell. When a deal clearly doesn't fit who they sell to, Claude says so plainly and suggests marking it lost or parking it.

### Other problems they could solve

While qualifying, Claude listens for problems the prospect mentions that aren't part of the current deal, and compares them with what the business sells (from `context/sales.md`, below). Where there's a match, it adds an **"Also could help with"** suggestion to the deal: the problem in the prospect's words, which of the business's services fits, and a question to raise it on the next call. Only services the business actually offers; never invent one. Problems that match nothing they sell are still kept on the deal as notes, since they're useful when the person decides what to offer next.

### Data

`apps/pipeline/data/pipeline.json`, shaped after reading Task List OS's `tasks.json`:

- **settings**: stages in their own words, currency, days before a chase, which kinds of meeting count as sales.
- **deals**: business, person, value, stage, source, next step and date, last contact, notes, the deal check (8 answers with status and evidence, risks, buying signals, next-call questions), "also could help with" suggestions, history.
- **conversations**: every sales conversation, linked to a deal: kind (email, call, meeting, note), date, who, a short summary, where it came from (the recorder or inbox and its id) and, when Task List OS is attached, the id of its call write-up. Summaries and short quotes only, never whole transcripts or whole emails.
- **suggestions** waiting for approval, each with the reason and an optional draft email.
- **activity log**.

The business's sales notes (below) live in `context/sales.md`, not in the data file, so every attached tool can read them.

### Screens

Follow Task List OS's layout, look and patterns exactly, in light and dark.

- **Board**: deals by stage, the value of each column worked out by the app, overdue chases and upcoming sales calls flagged.
- **Conversations**: every sales conversation, newest first, filterable by email, calls and meetings, with the ones Claude wasn't sure about at the top.
- **Chases**: drafts ready to approve.
- **Deal page**: timeline of every conversation, the deal check with its score and next-call questions, "also could help with", notes.
- **Suggestions**: the same Approve, Edit, Skip pattern as Task List OS's Review.
- **Won and lost**: simple numbers only, worked out by the app (won this month, win rate).

Each page goes in `menu.json` so it appears in Pipeline OS's sidebar dropdown. Home boxes in `home-boxes.js`, all `defaultOn: false` as `SHARED-V3-CHANGES.md` says: Chases due, Sales calls this week, Pipeline value, Deals with the biggest gaps.

### Skills (also commands)

Update my pipeline, who should I chase, add a deal, we won or lost a deal, what's my pipeline worth, qualify this deal, prep me for my call, what else could I sell them. Reuse Task List OS's `draft-a-reply`, `polite-chaser`, `human-email`, `write-like-me` and `meeting-follow-up` rather than writing new ones. For your plan, list each skill with what people say to trigger it.

## START-HERE.md: the sales questions are required

`START-HERE.md` is what the customer's Claude reads when they've just copied Pipeline OS into their own computer. Copy Task List OS's (same structure, same ground rules, same tone), with one big difference: **Pipeline OS can't work until Claude knows what the business sells and who it sells to.** Without that it can't tell a sales meeting from any other, can't qualify a deal, and can't spot other problems the business could solve. So setup asks these questions as a required step, and doesn't finish until the first 3 are answered.

To keep it quick, Claude first works out what it can from their website, sent email and calendar (the way Task List OS's step 5 does), then shows its draft answers and asks the person to correct them, rather than starting from a blank page. Ask in one numbered message, short answers fine:

1. **What do you sell?** Each service or product, with a rough price or typical job size (so the pipeline can show what it's worth).
2. **Who do you sell to?** The kind of business or person, size, sector and area, and who usually says yes (the owner, a manager, a committee).
3. **What problems do they usually come to you with?** In their words, as many as come to mind.
4. **What does someone who isn't a good fit look like?** Too small, wrong area, wants something you don't do.
5. **How does a sale usually go?** Where enquiries come from, the steps from first chat to yes, roughly how long it takes, and your stages in your own words (offer a default: New enquiry, Talking, Proposal sent, Negotiating, Won, Lost).
6. **Who else do they usually consider?** Another firm, doing it themselves, or doing nothing.
7. **Where do your deals live today?** A spreadsheet, Pipedrive, HubSpot, your inbox, your head. Claude brings them in.
8. **How many days before you'd chase someone who's gone quiet?**

Save the answers in `context/sales.md` (a new file, which `ATTACHING.md` allows), with a status line like the other `context/` files. If the person skips the first 3, setup stops there and explains in one sentence why they're needed; the app shows a calm "Tell Claude what you sell" note on the Board until they're answered. When Pipeline OS is attached to a folder that already has `context/business.md`, reuse what's there and only ask what's missing: nobody gets asked what their business does twice. The `keep-context-fresh` skill should keep `context/sales.md` up to date as new services or customer types appear in their email and calls.

The rest of setup copies Task List OS's 9 steps (quick questions, connect email and calendar, connect call recordings, other apps, get to know the business with the brand step, build your skills, first run, make it automatic, check and hand over), with the sales questions as Pipeline OS's own step. In the build-your-skills step, Pipeline OS builds sales skills from the answers: for example their deal check questions, a proposal or quote in their format, and their follow-up after a sales call, saved in `skills-to-upload/` the same way. When attached to a folder that already has skills there, add to them, never replace them and the email, calendar and recorder steps covering everything in the table above. On the first run, Claude goes back through the last 4 weeks of email, calendar and calls, builds the starting pipeline, qualifies each deal and shows the person what it found.

## Set up the repository (do all of this for me)

1. Create the repository at `~/Repos/getaipowers/pipeline-os`, next to `task-list-os`, and set it up the way Task List OS is set up (same branch habits, same `.gitignore`, same release script adapted for this tool).
2. Lay it out exactly like Task List OS, as set out in `ATTACHING.md` and `SHARED-V3-CHANGES.md`: kit files at the root, `toolkit.json`, `apps/server/`, `apps/shared/` (including `catalogue.json`), `apps/home/`, `apps/installed.json` listing only this tool, `apps/pipeline/` (with `menu.json` and `home-boxes.js`), `context/`, `files/`, `setup/`, `.claude/skills/`, `docs/`, `maintainers/`, and the launcher `Open Pipeline.html`. Copy the shared parts across from Task List OS byte for byte, don't rewrite them.
3. Copy Task List OS's LICENSE and change only the product name. Copy this build prompt into `maintainers/BUILD-PROMPT.md` and `ATTACHING.md` to the root.
4. Write `toolkit.json`, `apps/pipeline/ATTACH-CLAUDE.md` and `maintainers/MAINTAINING.md` for this tool.
5. Commit at each milestone (set up, plan agreed, app working, setup and skills written, tested on its own, tested attached) with a plain-English message.
6. Publish: create a public GitHub repository called `pipeline-os` on the same account as Task List OS (`georgecairns-ui`) and push. Before the very first push, tell me in one line what's about to go public and wait for my yes. That's the only time you need to stop and ask.
7. Google Drive copy: refresh the Drive folder `~/Library/CloudStorage/GoogleDrive-george.cairns@getaipowers.com/Shared drives/Get AI Powers Brain/Claude/05_Marketing/small-business-toolkit/pipeline-os/` as a plain copy of the published version (no git history), the same way Task List OS's Drive copy works. Anything in that folder that isn't part of the published version goes into an `_archive` folder inside it, never deleted. Add the same "don't edit here" note Task List OS's copy has.
8. If `gh` (the GitHub command line tool) isn't installed or logged in, install it or walk me through the login in numbered steps, then carry on.

## Make it customisable for clients

- **Look**: `apps/shared/theme.css` and `apps/shared/images/` only, set by the `match-my-brand` step during setup.
- **The menu**: your tool uses the shared sidebar and `catalogue.json` as they are. Every other toolkit tool shows locked with the Book a free call panel. Don't build your own menu or your own booking link.
- **Words and settings**: labels, stages, the deal check's wording and anything business-specific in one obvious place, documented in `docs/CUSTOMISING.md` the way Task List OS does it.
- **Demo data**: the same made-up people and businesses as Task List OS (Sam, Priya, Tom at Greenway Café, Marlow Dental and the rest: check its `demo-data.js`), so a demo of several attached tools feels like one believable business. Include deals at every stage, a few half-finished deal checks, a sales call with no transcript, a meeting Claude wasn't sure about, and an "also could help with" suggestion.

## Rules (same as Task List OS)

- No frameworks, no libraries, nothing loaded from the internet. The app runs through the shared helper at http://localhost:4747 and works offline.
- Every change to a data file goes through `store.update()`.
- You propose, they approve. Read and draft only in connected apps. Never anything that sends, pays, deletes, posts, books or accepts on the customer's behalf, never sends a bot or note-taker to a meeting, and never pre-approve tools that could in `.claude/settings.json`.
- Any number the person relies on (pipeline value, deal check score, win rate) is calculated by the app from the raw data, never typed in by Claude.
- Customer-facing words never say agent, repo, repository, artifact, JSON, schema, API or MCP. British English, digits for numbers, no em dashes anywhere, including code comments.
- Never commit filled-in `context/`, real data, a ticked `setup/progress.md` or "Setup: complete". Copy Task List OS's release checks.
- No prices for Get AI Powers services anywhere. Point to getaipowers.com only.
- Never delete files. Move them to `files/99-archive/` (or `_archive/` for build files) and tell me.

## How to work with me

1. Read everything above, then come back with a short plan before writing any code: the screens in words, the data file, the skills and what people say to trigger them, the setup steps and the exact wording of the sales questions, how sales meetings get spotted, how calls are shared with Task List OS without being written up twice, the deal check wording, exactly what this tool reads from and sends to the others (from the table in `ATTACHING.md`, plus call prep tasks, which that table doesn't list yet), any changes the shared parts or Task List OS's skills need, and anything in this brief you think is wrong. Push back if something won't work. Wait for my OK.
2. Don't change the shared parts or Task List OS's skills. If you think they need changing, tell me what and why; that change gets made in Task List OS first and copied to every tool.
3. Build it, then test by hand following Task List OS's `maintainers/TESTING.md` and section 5 of `SHARED-V3-CHANGES.md`, on a scratch copy, never the shipped data.
4. **Test it on its own**: fresh copy, run `/setup` as if you were the customer's Claude with a made-up business, use every page and skill. Check setup won't finish without the first 3 sales questions, and that a made-up calendar with sales, customer, internal and unclear meetings gets sorted correctly.
5. **Test the menu**: on its own, every other tool shows locked, and clicking one opens the panel with the right booking link and tracking.
6. **Test it attached**: on a scratch copy of Task List OS, follow `ATTACHING.md` to attach this tool. Check both appear as dropdowns in the sidebar, Home offers both tools' boxes, nothing in Task List OS broke, setup didn't ask questions `context/` already answered, a sales call is written up once and shows on both the Calls page and the deal, call prep and chases land in Review, and every handoff waits for a click.
7. Write MARKETING.md in `maintainers/`: one plain sentence on what it does, the before and after for the owner, and the 3 things to show in a 60-second video. Mark any time-saving claim "to check".
8. Publish (step 6 of the repository section) and refresh the Drive copy.
8b. Make the install guide for non-members with my `ccf-install-guide` skill, using its non-member variant: copy the Task List OS guide's `build.py` and its `_brand/` folder (the getaipowers.com fonts and logo mark) from `~/Claude/05_Marketing/Guides-and-Assets/October 2026/Task-List-OS-Install-Guide/` and change only the content. It must look like getaipowers.com, never the old starburst logo. Page 3 must carry the clickable GitHub link and the exact prompt to copy into Claude Code.
9. Finish by telling me in plain English: where it is, the GitHub link, how to open it, how to try the demo, how attaching went, what isn't finished, and what you'd improve next.
