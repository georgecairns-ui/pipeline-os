# Pipeline OS

**The pipeline that does the selling admin for you, and makes you better at selling.** A free kit from [Get AI Powers](https://getaipowers.com), run by Claude.

Every conversation you have with a prospective customer, by email, on a call or in a meeting, ends up on one board. Claude writes up your sales calls, tells you what to do next, drafts the email back and chases the deals that have gone quiet. It checks every deal against 8 questions good salespeople always ask, so you know which deals are real and exactly what to ask next time.

Nothing goes out without your click. Claude reads, researches, drafts and keeps your pipeline moving. When an email is ready you choose: **Claude emails** (you check it, press Send, and Claude sends it) or **I'll do it**.

Pipeline OS is part of a toolkit of 9 free tools from Get AI Powers. The others (a task list, proposals, content, money and more) show in the app's menu, and Get AI Powers sets them up with you on a free call.

## What happens when you type /setup

You copy the kit, open it in Claude Code and type **/setup**. In about 25 minutes, Claude:

- **Finds out what you already use.** Your email (Gmail or Outlook), your calendar, your call recorder (Microsoft Teams, Zoom, Google Meet, Fathom, Fireflies, Otter, Granola, tl;dv or Read AI) and where your deals live today (Pipedrive, HubSpot, a spreadsheet or your inbox), and connects them one by one.
- **Asks how you sell.** What you sell and for roughly how much, who your ideal customers are, the problems you solve for them, who isn't a good fit, and how a sale usually goes. It drafts the answers from your website and email first, so you mostly just correct them. This is what lets it tell a real deal from a time-waster.
- **Builds you your own sales skills.** Your deal check questions, your follow-up after a sales call, your replies to new enquiries: saved in the **skills-to-upload** folder so you can add them to Claude and use them everywhere, including on your phone.
- **Builds your pipeline from your real conversations.** 4 weeks of email, calls and meetings, turned into deals, each one checked, with next steps and an email ready, before you've opened the app.

## What it does

- **Brain dump.** Press **Brain dump** at the top of any page and talk about your sales, as messy as you like: how a call went, who to chase, a new lead you met. Pick what it's about (a deal, a person, your pipeline, or your task list) or let Claude decide. Claude updates the deals, adds the new ones, moves them on and writes the emails, usually within a minute or 2.
- **Fills in a deal from your call.** If you record calls, Claude reads each sales call and updates the deal. If you don't, press **Call notes**, paste a few rough lines or the transcript (or drop in a text file), and the deal fills itself in within a minute or 2: what happened, the deal check, your next steps and the email back to them.
- **Writes the email back, and sends it if you want.** In your voice, recapping what was agreed, with one question that moves the deal on. Press **Claude emails**, check it and press Send, and Claude sends it from your own email. Or press **I'll do it** and it opens in Gmail or Outlook for you. LinkedIn messages too: Claude writes them, you paste and send.
- **Researches everyone before the call.** Who they are, their role, what their business does, how well they fit your ideal client (a score worked out from your own setup answers), and how to run the call.
- **Makes you a better salesperson.** Every deal is checked against 8 questions (based on MEDDPICC, a standard way to qualify sales): what's the problem costing them, who signs it off, what will they judge it on, how and when will they decide, and more. Each is marked Known, Partly known or Not known yet, with what was actually said. You get the questions to ask next time and a short coaching tip on every deal.
- **Finds more work.** When a prospect mentions another problem you could solve, Claude notes it under **Also could help with**, with how to raise it.
- **Spots your sales meetings.** Claude reads your calendar, works out which meetings are sales calls and puts each on its deal, so the card shows the day and time the call is booked for. It preps you the day before (who you're meeting, what you promised, what to find out), and once the call has happened the deal moves to **Call completed** by itself.
- **Keeps deals moving.** When it's clear (you sent the proposal, they came back on price), Claude moves the deal to the next stage, and you can undo it. Deals that go quiet get a chase drafted, with a real reason to get in touch.
- **One board for everything.** **Pipeline** shows every deal by stage, with what each stage is worth, won this month and your win rate, all worked out from your deals. **Review** holds what Claude is waiting for you to decide. **Calls** shows the sales calls coming up and every call written up. **People** puts everyone in groups (clients, prospects, not contacted yet, gone quiet, and closed) and lets you email a whole group: one email with everyone in Bcc, or a personal email to each, written by Claude for you to check and send. **Home** is your dashboard.
- **Yours to shape.** Your own stages, your own wording for the deal check, your own colours, in light or dark.
- **Keeps itself up to date.** If you want, Claude checks in every hour while you work.

## What you need

- **Claude Code**, signed in with a paid Claude plan (Pro or Max). Your email, calendar and app connections come from your Claude account, and Claude Code only uses them when it's signed in with a subscription. The Claude desktop app works too.
- Nothing else to install in most cases. The app runs on your own computer using Node (Claude installs it for you if it's missing, with your permission).
- About 25 to 30 minutes, once.

## Get started

1. **Open Claude Code** in the Claude desktop app (the Code tab) or in the Terminal (on Windows, PowerShell). Any folder will do for this first step.
2. **Ask Claude to fetch the kit.** Paste this:
   > Copy https://github.com/georgecairns-ui/pipeline-os into a folder called "Pipeline OS" in my Documents, then tell me how to open it and set it up.

   Claude copies everything onto your computer and gives you one line to open the new folder. In the desktop app, you choose the folder instead. (If your computer asks to install "command line developer tools" or Git, say yes; it's free and takes a few minutes.)
3. **Open the Pipeline OS folder in Claude Code and choose "Yes, I trust this folder".** The first time, Claude Code asks whether you trust the folder and warns that it pre-approves some permissions. Those permissions only let Claude update your pipeline, your business notes and your files folder, search the web and start the app, without stopping to ask each time. It still can't send, delete or change anything in your email or other apps. Press the down arrow, then Enter.
4. **Type `/setup`.**

Then it opens your pipeline and gives you its link, **http://localhost:4747**. Bookmark it.

If an app needs a key rather than a sign-in, Claude gives you one line to paste into the Terminal. The key is stored in your computer's secure keychain, never in a chat and never in this folder.

## Every day

| Say (or type the command) | What happens |
|---|---|
| After a sales call: paste your notes into the deal | The deal check, next steps, a tip and the email back, filled in for you |
| "Update my pipeline" (`/pipeline-check-in`) | New calls, enquiries, replies and sales meetings, all on the deals. Runs on its own every hour if you turn that on |
| "Prep me for my call with Mark" | What you need to know and what to ask, in 2 minutes |
| "Who should I chase?" | A chase drafted for every deal gone quiet |
| "How qualified is this deal?" | The deal check, and the question that matters most |

## Your information

Your deals and notes live in this folder on your computer. Claude reads your email, calendar, calls and apps through the connections you approve. The only thing it ever sends is an email you've checked and pressed Send on, and only if you agreed to that in setup. It never deletes, pays or posts for you, never sends LinkedIn messages, and never sends a bot to your meetings. There's no Pipeline OS account or server; Get AI Powers can't see any of it. Read [docs/PRIVACY-AND-SAFETY.md](docs/PRIVACY-AND-SAFETY.md) for the detail.

## Make it yours

Change the stages, the deal check wording, the colours and the folders by asking Claude, or in Preferences. See [docs/CUSTOMISING.md](docs/CUSTOMISING.md).

## Want it set up properly for you?

Pipeline OS works on its own. If you'd like help building your folders, business context and Claude skills around how you really sell, Get AI Powers can help. Find us at [getaipowers.com](https://getaipowers.com).

## What's inside

```
START-HERE.md          Claude reads this first and runs setup (/setup)
toolkit.json           what this tool is, for attaching it to the others in the toolkit
ATTACHING.md           how the toolkit's tools attach to each other
CLAUDE.md              Claude's standing instructions in this folder
Open Pipeline.html     double-click to open your pipeline (or use the link Claude gives you)
setup/                 the 10 setup steps, a guide per app in connections/, and the key scripts
context/               Claude's notes about your business; sales.md is how you sell
.claude/skills/        saved know-how; each one also works as a command in Claude Code
skills-to-upload/      the skills Claude builds for your business, packed up to add to Claude
files/                 your business documents, in numbered folders
apps/                  the pipeline app and its look (theme.css)
docs/                  customising, privacy and safety
maintainers/           for people developing Pipeline OS itself
```

## Licence

Free to use and change for your own business. Not for resale. See [LICENSE](LICENSE) for the plain-English terms.

Fonts: Figtree (the app's font), plus Zilla Slab and Source Serif 4 for anyone who wants them, all under the SIL Open Font License (see `apps/shared/fonts/OFL.txt`).
