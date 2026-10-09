# Step 2: connect email and calendar

Goal: you can read their email and calendar. This is how you spot new enquiries, replies from people they're selling to, the proposals they send and their sales meetings, so the pipeline keeps itself up to date.

## 2.1 One sentence on why

> This is the big one. Each time I check in I'll read your inbox and calendar, spot new enquiries, replies and sales meetings, update the deals and write your replies and chases. I never send anything unless you press Send on it in the app, and I never delete or tidy anything.

If they'd rather not connect email, note it in `context/tools.md` and move on. The pipeline still works from the deals and call notes they add in the app.

## 2.2 Connect

Follow the guide for their provider, exactly:

| They use | Follow |
|---|---|
| Gmail or Google Workspace, Google Calendar | `setup/connections/gmail-and-google-calendar.md` |
| Outlook or Microsoft 365 with a work account | `setup/connections/microsoft-365.md` |
| Outlook.com, Hotmail, iCloud, Yahoo or another provider | Read the "If neither works" section of `setup/connections/microsoft-365.md`, then offer: forward work email to a Gmail account they connect, or skip email for now and use the brain dump |

Menus in the Claude app change. Describe what to look for, ask what they can see, and adapt. Never ask for their email password; they sign in on Google's or Microsoft's own screen.

## 2.3 Check it works

With their permission, read the subjects and senders of the 5 most recent emails and today's calendar, and say what you see in one line, without quoting anything private:

> I can see your inbox (last email from Tom at Greenway Café, 20 minutes ago) and 3 things in your calendar today.

If it fails, try once more, then note it in `setup/progress.md` and carry on. It can be fixed later.

## 2.4 Record it

Add a row for each to `context/tools.md` ("Connected apps"): app, how connected, today's date, "Read; prepare drafts", and "Never send, reply, forward, delete, archive, label or unsubscribe". Tick step 2 in `setup/progress.md`.

## 2.5 Ask whether Claude may send the emails they approve

Explain in 2 lines and ask:

> When an email's ready, there'll be 2 buttons: **I'll do it** opens it in your email for you to send, and **Claude emails** lets you check it and press Send, then I send it for you. Shall I set that up? I'll only ever send an email you've pressed Send on, exactly as you saw it.

- **If yes:** find the send tool of their email connection (list your tools; for Gmail it's the connection's send tool). If there isn't one (some connections only read and draft), tell them in one line that **I'll do it** is the way for now, and set `settings.claudeSends` to `false`. If there is, add that one tool to the `allow` list in `.claude/settings.local.json` in this folder (create the file if needed), so a send they've approved doesn't stop to ask permission. Never add it to `.claude/settings.json`, and never add any other sending, deleting or posting tool. Set `settings.claudeSends` to `true` and note it in `context/tools.md` ("Sends only emails approved in the app").
- **If no:** set `settings.claudeSends` to `false`. The app shows only **I'll do it**. They can change their mind in Preferences, and you set it up then.

Don't send a test email.

## Rules for their inbox, from now on

- Read only to understand work. Don't read more than you need.
- Never send, reply, forward, delete, archive, label, mark as read, unsubscribe or accept an invite, even though the connection technically allows some of these.
- Drafts live on the deal in the pipeline file. The person sends each one with **Claude emails** (you send exactly that email, through `send-approved-emails`) or **I'll do it** (it opens in their email). Save a draft into their mailbox only if they ask for that specific email.
- Don't copy whole private emails into the pipeline file. A one-line summary on the deal's timeline and your draft are enough.
