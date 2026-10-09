# Step 5: connect their other apps

Goal: connect the 2 or 3 other apps from step 1 that hold deals, customers or bookings. Not everything. If their deals live in Pipedrive, HubSpot or a spreadsheet (step "your customers", question 7), that comes first: the first run brings their open deals in.

## 5.1 Pick, with them

Rule of thumb: connect what holds **deals in progress**, **who their customers are**, or **sales meetings being booked**.

| App type | What it gives Pipeline OS | Guide |
|---|---|---|
| Accounts: Xero | Who's already a customer, so their meetings aren't mistaken for new sales | `setup/connections/xero.md` |
| Accounts: QuickBooks, FreeAgent | Usually no simple connection; a monthly export works | `setup/connections/quickbooks.md`, `setup/connections/freeagent.md` |
| Sales: HubSpot, Pipedrive | Their existing deals come into the pipeline; contacts fill People. Read only: nothing changes in the CRM | `setup/connections/hubspot.md`, `setup/connections/pipedrive.md` |
| Payments: Stripe | Who's already a customer | `setup/connections/stripe.md` |
| Files: Google Drive | Find and file documents; Meet transcripts | `setup/connections/google-drive.md` |
| Team chat: Slack | Requests from the team become suggestions | `setup/connections/slack.md` |
| Notes: Notion | Read their existing notes and to-dos | `setup/connections/notion.md` |
| Bookings: Calendly | New bookings become sales meetings on the deal, with call prep | `setup/connections/calendly.md` |

`setup/connections/README.md` lists every guide. If their app isn't listed, follow `.claude/skills/connect-a-tool`.

Suggest a shortlist of 2 or 3 with a reason each, and let them choose.

## 5.2 Connect each one

Follow its guide exactly. The order is always: a Claude connector (sign in, approve), then the app maker's own connection, then a key, then an export.

**If a key is needed**, never ask for it in chat. Tell them where to find it (the guide says), then:

> Open the Terminal app (on Windows, PowerShell) in your Pipeline OS folder and paste this line, then press Enter:
> `bash setup/scripts/save-key.sh FIREFLIES_API_KEY` (Mac) or `powershell -ExecutionPolicy Bypass -File setup\scripts\save-key.ps1 FIREFLIES_API_KEY` (Windows)
> It asks for your key. Paste it and press Enter (it won't show on screen). Then close and reopen Claude so it can see it.

The script keeps the key in the computer's own secure store (Keychain on a Mac). Nothing is written into this folder. Afterwards, check it's visible without printing it: `[ -n "$FIREFLIES_API_KEY" ] && echo found` (Mac) or `if ($env:FIREFLIES_API_KEY) { "found" }` (Windows).

## 5.3 Check and record

One harmless read per app ("I can see 4 unpaid invoices, the oldest from 12 September"). Add each to `context/tools.md` with what you may and may not do. If something gets fiddly, note it in `setup/progress.md` and move on: a partly connected setup that works beats a long afternoon. Tick step 5.
