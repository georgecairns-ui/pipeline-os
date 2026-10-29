# Step 1: quick questions

Goal: in one short exchange, learn what the person uses, so every later step is about their apps and nothing else.

## 1.1 Check what you can reach (quietly, before asking anything)

1. **This folder.** Read `setup/progress.md`, write a test line to its "Notes for next time" section, read it back and remove it. If you can't, stop and ask them to open this folder in the Claude desktop app's Code tab, or give the Claude app access to it.
2. **Their connections, checked for real.** Look up this session's connections (`session_connectors_status`). For each one that is for email, calendar, call recording, files, accounts, customers or payments, note its name and status: on (`connected`), switched off for this session, needs signing in (`needs_auth`) or not working (`failed`). Step 2 and step 5 act on this list. Never ask the person to describe their screen; you can see the status yourself.
3. **Where the folder lives.** From its path: Downloads or Desktop (suggest moving it to Documents first, because the app remembers the location), a cloud-synced folder (fine, it's backed up), or a folder shared with other people (point out that anyone with access can read their deals).
4. **Their computer.** Mac or Windows, from the path or by running a harmless command.

## 1.2 Ask the questions

Use the guide mode from `setup/progress.md`: for `beginner`, ask the questions 2 at a time instead of all at once.

Open with what you found in 1.1, so they see you've already looked: "You've already got Gmail and Google Calendar connected to Claude, so I'll use those." Say what you actually found in 1.1, for example "I can see Gmail, but it needs signing in again, so we'll do that first." Then send the questions as a friendly, numbered message (all at once, unless their guide mode says otherwise). Skip anything you already know from 1.1 and say so. Tell them short answers are fine.

> To set this up properly I need to know a few things. Short answers are fine.
>
> 1. Your first name, your business's name, and in a sentence what it does.
> 2. Which email do you use for work? (Gmail or Google Workspace, Outlook with a work Microsoft account, Outlook.com or Hotmail, or something else.)
> 3. Which calendar? (Usually the same as your email.)
> 4. Do you record your sales calls or meetings? If so, with what? (For example Fathom, Fireflies, Otter, Granola, tl;dv, Read AI, Zoom, Microsoft Teams or Google Meet.)
> 5. Which other apps do you use for the business? For example accounts (Xero, QuickBooks, FreeAgent), customers and sales (HubSpot, Pipedrive, a spreadsheet), payments (Stripe), files (Google Drive, OneDrive), team chat (Slack, Teams), notes (Notion), bookings (Calendly).
> 6. Which days and hours do you usually work?
> 7. Is it just you, or do you hand work to anyone? (First names are enough.)

## 1.3 Write it down

Fill in `context/tools.md`:
- "Your setup": computer, Claude version (Claude Code or the Claude app), workspace location, email provider, calendar provider, solo or team.
- "Connected apps": one row per app they named, with "How it's connected" left as "to do".

Put their working days and hours in `context/routines.md`. Set `settings.yourName` and `settings.businessName` in `apps/pipeline/data/pipeline.json`, and `settings.emailProvider` (`gmail`, `outlook-work`, `outlook-personal` or `other`) and `settings.calendarProvider` (`google`, `outlook-work`, `outlook-personal` or `other`), so the app's Draft buttons open the right place.

Create `apps/home/data/connections.json` if it isn't there, in the format in `setup/connections/README.md` ("Recording a connection"), with one row per app they named (email and calendar from the same provider share one row, keyed by the guide's file name: `gmail-and-google-calendar` or `microsoft-365`; from different providers, they get a row each, keyed as in step 2's 2.6), each `"status": "not-connected"`. Only ever set `connected` after a real read works.

Tick step 1 in `setup/progress.md`.

## What to say

> Thanks Sam. Gmail and Google Calendar, Fathom for calls, Xero for accounts, and it's you plus Priya. I'll connect those in that order. Most of them are a couple of clicks: you sign in, I do the rest.
