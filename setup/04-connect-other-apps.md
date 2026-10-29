# Step 5: connect their other apps

Goal: connect the 2 or 3 other apps from step 1 that hold deals, customers or bookings. Not everything. If their deals live in Pipedrive, HubSpot or a spreadsheet (step "your customers", question 7), that comes first: the first run brings their open deals in.

## 5.1 Pick, with them

Rule of thumb: connect what holds **deals in progress**, **who their customers are**, or **sales meetings being booked**.

| App type | What it gives Pipeline OS | Guide |
|---|---|---|
| Accounts: Xero | Who's already a customer, so their meetings aren't mistaken for new sales | `setup/connections/xero.md` |
| Accounts: QuickBooks | The "Intuit QuickBooks" connector for US customers; otherwise a monthly export works | `setup/connections/quickbooks.md` |
| Accounts: FreeAgent | No Claude connector found on 29 October 2026; a monthly export works | `setup/connections/freeagent.md` |
| Sales: HubSpot, Pipedrive | Their existing deals come into the pipeline; contacts fill People. Read only: nothing changes in the CRM | `setup/connections/hubspot.md`, `setup/connections/pipedrive.md` |
| Payments: Stripe | Who's already a customer | `setup/connections/stripe.md` |
| Files: Google Drive | Find and file documents; Meet transcripts | `setup/connections/google-drive.md` |
| Team chat: Slack | Requests from the team become suggestions | `setup/connections/slack.md` |
| Notes: Notion | Read their existing notes and to-dos | `setup/connections/notion.md` |
| Bookings: Calendly | New bookings become sales meetings on the deal, with call prep | `setup/connections/calendly.md` |

`setup/connections/README.md` lists every guide. If their app isn't listed, follow `.claude/skills/connect-a-tool`.

Suggest a shortlist of 2 or 3 with a reason each, and let them choose. Apps they named in step 1 but didn't put on the shortlist stay `not-connected` in `apps/home/data/connections.json`, with the note "Chose not to connect yet".

## 5.2 Connect each one

For each app on the shortlist, follow its guide and `.claude/skills/connect-a-tool`: find the route (our guide, or a search of Claude's connector directory), check, switch on or point to Connect, then prove it with one harmless read ("I can see 12 open deals in Pipedrive, the newest from Ellis Joinery").

An app with no connector gets this sentence, word for word with its name: "There's no Claude connector for [app], so I can't connect to it live. If you export a CSV or PDF from it and drop it in the files folder, I'll read it whenever you ask." Record it as `export-only`.

## 5.3 Record

Each app goes into `apps/home/data/connections.json` and `context/tools.md` (see `connect-a-tool`, part 3). An app that still won't connect after the loop is `needs-attention`: the Connections box on Home shows a Fix it button for it, so setup doesn't stall on it. Apps left off the shortlist stay `not-connected` with the note "Chose not to connect yet". Tick step 5.
