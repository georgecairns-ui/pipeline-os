---
name: pipeline-check-in
description: The regular check-in that keeps Pipeline OS up to date on its own - reads new sales calls from the call recorder (Fathom, Fireflies, Otter, Granola, tl;dv, Read AI, Zoom, Microsoft Teams, Google Meet) and updates each deal, works out which meetings in the calendar are sales meetings, spots new enquiries and replies from prospects in email, preps the person for tomorrow's sales calls, and drafts chases for deals gone quiet. Use for scheduled runs ("Run /pipeline-check-in"), after Task List OS's check-in when both are attached, or when the person says "update my pipeline", "check in", "anything new on my deals?".
---

# Pipeline check-in

Runs every hour if setup scheduled it, or whenever the person asks. It adds and updates; it never removes anything, never closes a deal and never sends anything.

## What you need

- `apps/pipeline/data/pipeline.json` and `apps/pipeline/CLAUDE.md`.
- `context/sales.md` (what they sell, who to, how a sale usually goes) and `context/people.md` (who's a client, who's team, who isn't sales).
- The connections in `context/tools.md`: email, calendar, call recorder.

## Steps

1. Read the pipeline file now. Note `checkIn.lastRunAt`: everything since then is new (the last 24 hours if it's empty).
2. **Notes waiting.** For any deal with `notesInbox` items still `waiting`, follow `.claude/skills/update-a-deal`.
3. **Sales calls.** If a call recorder is connected, list calls since the last run (at most 5, newest first). For each, decide if it was a sales call (step 5's clues). For a sales call, link it to its deal (or suggest a new deal) and follow `update-a-deal` with the recording. When Task List OS is attached and has already written the call up (its `meetings`, same `ref`), use that write-up and the transcript; don't write it up again. Skip calls already in `calls` (same `ref`).
4. **No recording.** For a sales meeting that has happened in the last 2 days with no recording or transcript, set the deal's `noTranscript: true` and add a `timeline` line ("Video call (Google Meet). No recording."). The app asks the person for a few lines. Teams, Zoom and Google Meet only make a transcript when recording or transcription was switched on, so this is common: never treat it as an error.
5. **Sales meetings in the calendar.** Read the calendar for the past 2 days and the next 7. Sort each meeting:
   - **Sales**: about someone buying from them. For one coming up, set the deal's `nextMeeting` (the card then shows "Call booked" with the day and time); for someone new, add a suggested deal (`suggested: true`, with `suggestReason` and `nextMeeting`). For one that has happened, remove `nextMeeting` and, if the deal is still before Call completed, move it there (see "Moving deals" in `apps/pipeline/CLAUDE.md`), unless the calendar or email shows it was cancelled or moved.
   - **Customer**: someone who already buys from them, about existing work. Not a deal, unless it's clearly about selling them something more.
   - **Internal or personal**: team, suppliers, advisers, family, the dentist. Ignore it.
   - **Not sure**: add a `question` suggestion ("Is your 'Quick chat' with Lena Hart on Friday a sales call?") with `personId`. Ask once per person: check `context/people.md` and earlier questions first.
   Use several clues together, never one alone: the attendees' email addresses and whether they're a client, deal, team member or supplier (`context/people.md`, `people`, the deals); the title ("intro", "discovery", "quote", "site visit", "demo", "chat about", "proposal"); whether it came from their booking link; earlier emails with the same people; and who they sell to in `context/sales.md`.
6. **Email.** If email is connected, read new email since the last run (at most 50):
   - A new enquiry from someone who fits who they sell to: add a suggested deal with the person, `source`, a `summary`, a `value` only if one was mentioned, and the enquiry on the `timeline`. Draft a reply as the deal's `email` (`.claude/skills/human-email`, their voice).
   - A reply from a prospect on an open deal: add a `timeline` line, update `lastContact`, and if it changes things (a question, a yes, a price worry), follow `update-a-deal` with the email as the evidence.
   - The person sent a proposal or quote: add it to the timeline and move the deal on if `autoMove` allows (see "Moving deals").
   - Answered questions: act on approved `question` suggestions (start the deal, or note in `context/people.md` that this person isn't sales).
7. **Call prep.** For each sales call tomorrow (or later today, if not done yet), follow `.claude/skills/prep-for-a-sales-call`, unless there's already a `prep` suggestion for it.
8. **Chases.** Follow `.claude/skills/who-to-chase` for deals gone quiet.
9. **Task list.** If Task List OS is attached, add call prep, chases and next steps due in the next 7 days as suggested tasks there (`source: { "tool": "pipeline", "id": "<deal id>" }`), unless already there.
10. Update `checkIn`: `lastRunAt` now, `nextRunAt` (now plus the schedule interval, or null for a one-off), and add this run's `emailsRead`, `callsRead` and `dealsUpdated` if `lastRunAt` was today (start from zero on a new day).
11. Save safely: read right before writing, write the whole file, read it back and check it parses.
12. Make sure the app is running so the person sees it: `bash setup/scripts/start-task-list.sh` (Mac or Linux) or `powershell -ExecutionPolicy Bypass -File setup\scripts\start-task-list.ps1` (Windows). It does nothing if it's already running.

## What to say

If the person asked: 2 or 3 lines. "Updated 3 deals. Your call with Hollins went well: the deal check is at 69% and a reply is ready. 1 new enquiry from Bramble & Co is waiting in Review, and I've drafted a chase for Marlow Dental."
On a scheduled run, say nothing unless something is urgent (a hot new enquiry, a sales call in the next 2 hours with prep waiting); then one line.

## Rules

- Read and draft only. Never send, reply, book, accept or delete anything, and never send a bot or note-taker to a meeting.
- Never close a deal (won or lost) yourself. Suggest it.
- Never re-add a deal or suggestion the person skipped (check skipped suggestions, deals marked "Not a deal", and `context/people.md`).
- If a connection fails, carry on with the others and note it in `setup/progress.md`.
