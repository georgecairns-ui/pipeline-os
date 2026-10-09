# Testing Pipeline OS

How to test the whole thing as a customer would, without touching the repo. Also follow section 5 of `SHARED-V3-CHANGES.md` and the testing section of `SHARED-V4-CHANGES.md` for the shared parts.

## 1. Make a fresh copy

Never test inside the repo: setup writes real details into it. Build the release zip and unzip it somewhere else:

```bash
bash maintainers/make-release.sh
```

Then unzip `dist/pipeline-os.zip` into a test location, for example `Documents/Pipeline OS test`. Each test run starts from a fresh unzip.

## 2. Run setup as a customer

1. Open Claude Code in the test folder and type `/setup`.
2. Answer as a real small business owner would. A test Gmail account is ideal, so Claude reads a test inbox: send it an enquiry, a reply from a prospect asking about price, a proposal from the "owner", and a newsletter (which Claude should ignore). Put a few meetings in its calendar: a "Discovery call" with a stranger, a catch-up with a supplier, a dentist appointment, and a "Quick chat" with someone unknown.
3. In step 4 (your customers), try skipping questions 1 to 3. Setup must explain why they're needed, ask once more, then stop and leave the step unticked. The app must show "Tell Claude what you sell".
4. Try stopping halfway and starting a new conversation with "carry on setting up". It should pick up from `setup/progress.md`.

## 3. What to check

**Setup**
- [ ] Claude drafts the sales answers from the website and email before asking, and marks guesses as guesses.
- [ ] `context/sales.md` is filled in, short and in the owner's words; `settings.salesSetUp` is true and the stages are theirs.
- [ ] It never asks for a password or key in chat, and no jargon reaches the customer (agent, repo, JSON, MCP, API, MEDDPICC field names).
- [ ] The first run sorts the test calendar correctly: the discovery call is a sales meeting on a deal, the supplier and dentist are ignored, the "Quick chat" becomes a question in Review.
- [ ] Every open deal has a deal check with evidence for each Known answer, next steps, a coaching tip and, where due, an email.
- [ ] No deal check answer, value or service was invented.

**The app**
- [ ] Pipeline: deals by stage, each column's value adds up, the numbers along the top match the deals. Drag a deal to another stage: it moves, Undo works.
- [ ] Open a deal. Paste 3 lines into Add call notes and press Update the deal: "Claude is reading your notes" shows, and within a minute or 2 the deal updates by itself. With `TLOS_AUTO_CLAUDE=off`, the notes wait and the Open in Claude button appears.
- [ ] Choose a .txt file in the notes box, and drop one on it: both read. A .pdf is refused with a plain message.
- [ ] Draft opens the email in Gmail or Outlook, written and addressed. "I've sent it" adds a line to the timeline.
- [ ] Review: Keep and Undo on a deal Claude moved; Add to pipeline and Not a deal on a suggested deal (Undo works); Draft, Done and Skip on a chase; Yes and No on a question.
- [ ] Mark won, Mark lost (with a reason), Reopen.
- [ ] Preferences: rename, add and remove a stage (deals in a removed stage go to the first one), reword a deal check question, switch "Let Claude move deals" off. Save and reload: all kept.
- [ ] Ask Claude "add a deal for a new website for Test Ltd, about £3,000" with the app open: it appears within a few seconds with "Claude updated your pipeline".
- [ ] Fresh install (empty pipeline file, no name): the Pipeline page and the first Home box show "Let's set up your pipeline" with /setup to copy; nothing mentions a demo.
- [ ] Light and dark on every page; phone width (the board scrolls sideways, the sidebar opens from the menu button).

**Home**
- [ ] On its own, Pipeline OS's Home boxes are switched on by default. Attached to Task List OS, they start switched off and show in Customise's hidden list.

## 4. Attached to Task List OS

On a scratch copy of Task List OS, follow `ATTACHING.md` to attach this tool, then check:
- [ ] Both tools show as dropdowns in the sidebar; Home offers both tools' boxes; nothing in Task List OS broke.
- [ ] Setup didn't ask what the business does again (only what `context/sales.md` still needed).
- [ ] People shows the task list's contacts with their deals, read only.
- [ ] A recorded sales call is written up once: on the task list's Calls page and, with the sales side, on the deal.
- [ ] Call prep and chases appear as suggested tasks in the task list with `source.tool` set to `pipeline`, and nothing moves without a click.
- [ ] One check-in runs both tools' steps.
