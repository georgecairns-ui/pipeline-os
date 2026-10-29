# Step 2: connect email and calendar

Goal: you can read their email and calendar, proven with a real read, and you've read the last 30 days. This is how you spot new enquiries, replies from people they're selling to, the proposals they send and their sales meetings, so the pipeline keeps itself up to date. Nothing else in setup happens until this step is done.

## 2.1 One sentence on why

> This is the big one. Each time I check in I'll read your inbox and calendar, spot new enquiries, replies and sales meetings, update the deals and write your replies and chases. I never send anything unless you press Send on it in the app, and I never delete or tidy anything.

## 2.2 Connect, and check for yourself

Find their provider's guide:

| They use | Guide |
|---|---|
| Gmail or Google Workspace, Google Calendar | `setup/connections/gmail-and-google-calendar.md` |
| Outlook or Microsoft 365 with a work account | `setup/connections/microsoft-365.md` |
| Outlook.com, Hotmail, iCloud, Yahoo or another provider | There's no Claude connector for it. Go to 2.5 |

Email and calendar can come from different providers (for example iCloud mail with Google Calendar). Find the guide for each half separately. A half with no connector goes to 2.5; the other half still goes through 2.2 and 2.3 and must be proven.

Then look up this session's connections (`session_connectors_status`) and act on what you find, for the email connector and the calendar connector separately:

| What you find | What you do |
|---|---|
| It's there and on | Go to 2.3 |
| It's there but switched off for this session | Switch it on (`set_session_connector_enabled`). They'll be asked to approve: tell them that's expected. It works from your next message, so end this message by saying you've switched it on and will check it next |
| It isn't there | Give them the path from the guide, in their guide mode: in the Claude desktop app, Customize, then Connectors, then the app's name, then Connect, then sign in on Google's or Microsoft's own page and approve. Ask them to tell you when it's done, then look again |
| It needs signing in (`needs_auth`) | Tell them the one thing to do: open Connectors (or type `/mcp` in this chat), choose it and sign in. Then look again |
| It's not working (`failed`) | Reconnect it (`reconnect_session_connector`). It's ready from your next message; end this one by saying so, then look again |

Keep going round this table until both are on. Never ask for their email password: they sign in on Google's or Microsoft's own screen.

## 2.3 Prove it

With their permission, read the subjects and senders of the 5 most recent emails and today's calendar, and say what you see in one line, without quoting anything private:

> I can see your inbox (last email from Tom at Greenway Café, 20 minutes ago) and 3 things in your calendar today.

If the read fails, look up the connection status again and go back to 2.2. A connection only counts once a read has worked.

## 2.4 Read the last 30 days

Tell them first: "I'll now read the last 30 days of your email, so your pipeline starts full. On a busy inbox this takes a few minutes. I'll keep you posted."

Read `apps/pipeline/CLAUDE.md` first: it explains the pipeline file and how to edit it safely.

1. List every thread from the last 30 days by sender and subject only.
2. Leave out newsletters, receipts, automatic notifications and no-reply senders.
3. Open only the threads from real people, in batches. After each batch, one progress line: "Read 140 of 380 conversations, 6 look like deals so far."
4. Fill `apps/pipeline/data/pipeline.json` from what you read, following `setup/pipeline-02-first-run.md`'s rules for what counts as a deal:
   - **People:** everyone they're talking to about buying, and their existing customers, go into `people` with the right `role` (`prospect`, `client` or `customer`). When Task List OS is attached, link to its contacts instead (see "People" in `apps/pipeline/CLAUDE.md`).
   - **Open deals:** each conversation with a prospect becomes a deal (if it isn't one already) with the person, `source`, `summary`, the conversations on the `timeline` and `lastContact`, at the stage the evidence shows. Proposals and quotes in their sent email tell you a lot. A conversation with an existing customer is a deal only when it's about selling them something more.
   - You don't know how they sell yet (that's step 4), so add a deal straight to the board only when someone plainly wants to buy what the business sells (they asked for a quote, a price or a call about buying, or the business sent them a proposal or quote). Anything you're not sure is a deal goes in as a suggested deal (`suggested: true`, with a one-line `suggestReason`), not straight onto the board.
   - Don't run the deal check or write emails yet: step 8 does that for every deal, once step 4 has told you who they sell to.
5. Calendar: don't copy any events (Pipeline OS has no calendar view). Read the last 30 days of the calendar only to learn who they meet and what's recurring (people, routines). Step 8 sorts the sales meetings.
6. Set `checkIn.emailsRead` to the number of emails you read. Save, read the file back and check it's valid.

Keep the counts for the hand-over (emails read, people added, deals found). Nothing is sent, labelled, archived or marked as read.

## 2.5 The only ways past this step

- **Proven:** 2.3 worked for email and calendar, and 2.4 (the 30-day read) is done. Record them (2.6) and go on.
- **No Claude connector for their provider** (Outlook.com, Hotmail, iCloud, Yahoo, a hosting company's email). Say plainly: "There's no Claude connector for [provider], so I can't connect to your email live." Offer the one alternative: forward work email to a Gmail account and connect that. Record it as `no-connector` (2.6) and go on. The pipeline still works from the deals and call notes they add in the app.
  This exit covers only the half that has no connector. If their email has no connector but their calendar does (or the other way round), the other half still goes through 2.2 and 2.3, must be proven, and gets its part of 2.4.

If they don't want to connect email, say in one line what won't work without it ("I won't be able to spot new enquiries and replies from the people you're selling to, or draft your emails back"), and ask once if they'd like to go ahead. If they still say no, stop setup here, note it in `setup/progress.md`, and tell them they can type `/setup` whenever they're ready. Don't go on to step 3 without email.

If they're waiting on someone else first (for example their IT administrator has to approve the connector, or they need a password reset), stop in the same way: note it in `setup/progress.md` and tell them to type `/setup` when it's sorted. Don't go on to step 3.

## 2.6 Record it

In `apps/home/data/connections.json` (format: `setup/connections/README.md`, "Recording a connection"): `"status": "connected"` and today's date in `checked` for each one proven, or `no-connector`. Email and calendar from the same provider share 1 row, keyed `gmail-and-google-calendar` or `microsoft-365`, the same row step 1 started. From different providers, each has its own row: a no-connector email row is keyed by the provider's name in lower case with hyphens (for example `icloud-mail`), and a proven calendar keeps its guide's key (`gmail-and-google-calendar` or `microsoft-365`). The same goes the other way round. When email and calendar come from the same provider and neither has a Claude connector (for example iCloud), they share 1 row keyed by the provider's name, for example `icloud`.

In `context/tools.md` ("Connected apps"): app, how connected, today's date, "Read; prepare drafts", and "Never send, reply, forward, delete, archive, label or unsubscribe".

## 2.7 Ask whether Claude may send the emails they approve

If email is `no-connector`, don't ask this: set `settings.claudeSends` to `false`, tick step 2 in `setup/progress.md` and go to step 3.

Otherwise, explain in 2 lines and ask:

> When an email's ready, there'll be 2 buttons: **I'll do it** opens it in your email for you to send, and **Claude emails** lets you check it and press Send, then I send it for you. Shall I set that up? I'll only ever send an email you've pressed Send on, exactly as you saw it.

- **If yes:** find the send tool of their email connection (list your tools; for Gmail it's the connection's send tool). If there isn't one (some connections only read and draft), tell them in one line that **I'll do it** is the way for now, and set `settings.claudeSends` to `false`. If there is, add that one tool to the `allow` list in `.claude/settings.local.json` in this folder (create the file if needed), so a send they've approved doesn't stop to ask permission. Never add it to `.claude/settings.json`, and never add any other sending, deleting or posting tool. Set `settings.claudeSends` to `true` and note it in `context/tools.md` ("Sends only emails approved in the app").
- **If no:** set `settings.claudeSends` to `false`. The app shows only **I'll do it**. They can change their mind in Preferences, and you set it up then.

Don't send a test email. Tick step 2 in `setup/progress.md`.

## Rules for their inbox, from now on

- Read only to understand work. Don't read more than you need.
- Never send, reply, forward, delete, archive, label, mark as read, unsubscribe or accept an invite, even though the connection technically allows some of these.
- Drafts live on the deal in the pipeline file. The person sends each one with **Claude emails** (you send exactly that email, through `send-approved-emails`) or **I'll do it** (it opens in their email). Save a draft into their mailbox only if they ask for that specific email.
- Don't copy whole private emails into the pipeline file. A one-line summary on the deal's timeline and your draft are enough.
