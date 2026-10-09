---
name: sort-pipeline-brain-dump
description: Turns a brain dump from Pipeline OS (a voice note or typed note, from the Brain dump button) into changes to the pipeline - updating deals, adding new deals and people, moving deals on, recording how a call went, writing emails and LinkedIn messages, and putting tasks in the task list when Task List OS is attached. Uses what the person said it's about (a deal, a person, the pipeline, another tool) as a strong hint, then decides for itself. The app starts this straight away; also use when the person says "sort my brain dump" in Pipeline OS, or pastes a messy note about their sales.
---

# Sort a pipeline brain dump

The person pressed **Brain dump**, talked (or typed) and pressed Done. You turn it into the right changes, the way a sharp sales assistant would, without asking them anything.

## What you need

- `apps/pipeline/data/pipeline.json` and `apps/pipeline/CLAUDE.md` (the format and the rules), especially `dump`.
- `context/sales.md` and `settings.fitCriteria`, so you can judge new leads.
- `context/voice.md` and `.claude/skills/human-email` for anything you write.
- When Task List OS is attached: `apps/task-list/CLAUDE.md` (how to add a suggested task).

## A brain dump item

```json
{ "id": "b-x7k2p9", "text": "the whole note", "kind": "voice", "status": "unsorted", "createdAt": "...",
  "about": [ { "type": "deal", "id": "d-hollins", "label": "New website for Hollins Lettings" }, { "type": "tool", "id": "task-list", "label": "Task List OS" } ] }
```

`about` is what they picked under "What's it about?": `deal`, `person`, `pipeline` or `tool`. Empty means "Let Claude decide". Treat it as a strong hint, not a cage: if they picked the Hollins deal but also mention a new lead, deal with both.

## Steps

1. Read the pipeline file now. Take every `dump` item with `status: "unsorted"`. If the person pasted a note in chat instead, add it to `dump` first.
2. Voice notes are one long spoken paragraph. Read it all, then pull out every separate thing, in order. Ignore filler. One sentence can hold 3 things.
3. For each thing, decide what it is and do it:
   - **How a call or meeting went** ("just spoke to Dev, the directors want it by March"): treat it as call notes for that deal. Add it to the deal's `notesInbox`, then follow `.claude/skills/update-a-deal` (deal check, next steps, tip, the email back, and moving it on).
   - **News about a deal** ("Marlow said yes", "Leo's gone with someone else", "Hollins want a cheaper option"): update the deal. Move it on if the evidence is clear (see "Moving deals"). Never mark a deal won or lost yourself: add a `task` suggestion ("Mark as won? You said Hannah signed") so it's one click.
   - **A new lead** ("met Rosa at the Chamber breakfast, she wants a website next year"): add the person (`role: "prospect"`) and decide on the deal as `pipeline-check-in` describes under "New deals": clear fit goes straight on the board, not sure goes to Review.
   - **Someone to contact** ("chase Leo", "send Omar the examples", "message Tim on LinkedIn"): write it as an `email` (or `linkedin` when there's no address) on the deal or as a suggestion, so it lands in Review with **Claude emails** and **I'll do it**. Never send it.
   - **A value, date or detail** ("Fox & Hound budget is about two grand", "Ellis call moved to Thursday"): update the deal (`value` only from a figure they said, `nextMeeting`, `summary`, the person's details).
   - **A task that isn't sales** ("renew the domain", "book the van in"), or anything they pointed at Task List OS: if Task List OS is attached, add a suggested task there with `source: { "type": "braindump", "from": "Your brain dump in Pipeline OS", "subject": "<what they said>", "ref": "<dump id>" }`. If it isn't attached, add a `task` suggestion here.
   - **About another tool that isn't in this folder**: keep it as a `task` suggestion here and say which tool it's for.
   - **Nothing to do** (a thought, a worry): leave it, and mention it in the summary.
4. Add a `timeline` line on every deal you touched: `{ "kind": "note", "title": "From your brain dump: <what changed>", "by": "claude" }`.
5. Mark the item `status: "sorted"`, `sortedAt` now, and write `summary`: one plain line of what you did, which the app shows them. "Moved Hollins to Negotiating, wrote a reply to Dev, added Rosa Lind as a new lead, and put 'renew the domain' in your task list."
6. Save safely: read right before writing, write the whole file, read it back and check it parses. When you add tasks to the task list, save that file the same way.

## Rules

- Decide for yourself; don't ask questions. If something really is ambiguous, make your best reading and say so in the summary.
- Never drop anything silently. Every thing ends up done, suggested, or mentioned in the summary.
- Never send anything, never mark a deal won or lost, and never invent a value, a date or a service.
- Summaries and short quotes only on deals; the full note stays in `dump`.
