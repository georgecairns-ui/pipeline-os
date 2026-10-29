# Step 3: connect call recordings

Goal: if they record calls, you can read the transcripts and summaries. Each sales call then updates its deal by itself: the write-up, the deal check, the next steps and the email back, drafted.

Be honest about what each one gives. Microsoft Teams, Zoom and Google Meet only make a transcript when recording or transcription is switched on for that meeting (and on some plans not at all). When a sales call has no transcript, the deal asks them for a few lines on how it went. A note-taker such as Fathom, Fireflies or Granola is the easiest way to have every call written up.

If they said in step 1 that they don't record calls, say one sentence ("No problem. After a sales call, paste your notes into the deal in the app, even 3 rough lines, and I'll fill the deal in. If you ever start recording calls, with Fathom or Fireflies for example, it happens by itself") and go to step 4.

## 3.1 Connect their recorder

| They use | Follow |
|---|---|
| Fathom | `setup/connections/fathom.md` |
| Fireflies | `setup/connections/fireflies.md` |
| Otter | `setup/connections/otter.md` |
| Granola | `setup/connections/granola.md` |
| tl;dv | `setup/connections/tldv.md` |
| Read AI | `setup/connections/read-ai.md` |
| Zoom | `setup/connections/zoom.md` |
| Microsoft Teams | `setup/connections/microsoft-365.md` |
| Google Meet | `setup/connections/google-drive.md` |
| Something else | Find the route with `.claude/skills/connect-a-tool` (search Claude's connector directory for it). If there is no connector, say the no-connector sentence from that skill and record `export-only`; if the recorder emails a summary after each call, you'll read those through their email (step 2), otherwise they paste their notes or the transcript into the deal in the app (the Call notes button), or save transcripts into `files/08-projects/calls/`. |

Follow the recorder's guide and `.claude/skills/connect-a-tool` (check, switch on or point to Connect, prove, record). Most recorders have a Claude connector: the person signs in, approves, done.

## 3.2 Check it works

Read the list of their 3 most recent calls (titles and dates only) and tell them:

> I can see your calls. The latest was "Discovery call with Ellis Joinery" yesterday. In the first run I'll go through your sales calls from the last 4 weeks and update each deal.

If the read fails, go back to the loop. If it still won't connect, record it as `needs-attention` and carry straight on to step 4.

## 3.3 Record it

Record it only after that read worked: `apps/home/data/connections.json` (format in `setup/connections/README.md`, "Recording a connection") with `"status": "connected"` and today's date in `checked`, and the row in `context/tools.md` with "Read transcripts and summaries" and "Never send a bot to a meeting, share a recording or invite anyone". Tick step 3 in `setup/progress.md`.
