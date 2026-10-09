# Skills

Saved know-how for running your pipeline. You don't need to remember any of this: ask in your own words and Claude picks the right one.

Each skill is a folder with a `SKILL.md` inside. Claude reads them from here whenever this folder is open. During setup, Claude also writes you skills of your own, about your services, prices and way of selling. They're saved here, and packed up in the `skills-to-upload` folder so you can add them to Claude and use them in every conversation.

## Your pipeline

In Claude Code, every skill is also a command: type `/` and its name, for example `/pipeline-check-in`.

| Skill | Say something like | What happens |
|---|---|---|
| `pipeline-check-in` | "Update my pipeline" (runs every hour if you turned that on) | New sales calls written up, new enquiries and replies spotted, sales meetings found in your calendar, deals updated, chases drafted |
| `update-a-deal` | Paste your call notes, or press **Update the deal** in the app | The deal fills itself in: the write-up, the deal check, next steps, a coaching tip and the email back, drafted |
| `sort-brain-dump` | Press **Brain dump** on any page (or V) and talk | Claude sorts it and sends each part to the right tool |
| `sort-pipeline-brain-dump` | (used by `sort-brain-dump`) | The sales part: Claude updates and adds deals, moves them on and writes emails |
| `qualify-a-deal` | "How qualified is this deal?" | The deal check: 8 questions (based on MEDDPICC), what's known, what isn't, and what to ask next time |
| `research-a-prospect` | "Who am I meeting tomorrow?" (and before every booked call) | Who they are, their role and business, how well they fit your ideal client, and how to run the call |
| `prep-for-a-sales-call` | "Prep me for my call with Mark" | Who you're meeting, what's happened, what you promised and the questions to ask |
| `send-approved-emails` | Press **Claude emails**, then **Send** | Claude sends exactly that email from your email. Nothing else, ever |
| `who-to-chase` | "Who should I chase?" | A chase drafted for every deal gone quiet, with a real reason to get back in touch |

## Writing

| Skill | Say something like | What happens |
|---|---|---|
| `human-email` | "Make this sound less robotic" | Any draft is checked so it reads like a person wrote it. Used by every writing skill |
| `write-like-me` | "Learn how I write" | Claude learns your style (with permission) and writes in it |
| `polite-chaser` | "Chase the Marlow deal" | A chaser at the right level of firmness, with all the specifics |

## Keeping things organised

| Skill | Say something like | What happens |
|---|---|---|
| `file-it` | "Save this proposal" | Claude suggests a folder and a name, and files it once you agree |
| `connect-a-tool` | "Connect my Pipedrive" | Claude walks you through connecting an app safely |
| `match-my-brand` | "Make it match my brand" | Your colours, font and logo on the app, from your website or brand guidelines |
| `setup` | `/setup` | Runs the setup, or carries on where it left off |
| `open-task-list` | "Open my pipeline" | Starts the app if needed and gives you the link, http://localhost:4747 |
| `keep-context-fresh` | (automatic) | When you mention a new service, price or kind of customer, Claude offers to update its notes |

## The rules every skill follows

- Claude keeps your pipeline moving and makes the everyday calls. Nothing goes out without your click: Claude only sends an email you've checked and pressed Send on.
- Nothing is paid, deleted or posted on your behalf, and LinkedIn messages are yours to send.
- Claude never guesses about a deal: anything nobody said stays "Not known yet".
- Everything stays in this folder or in the apps you've connected.

## Adding your own

Ask Claude: "Make a skill for how we do X." It'll write one in this folder using the same format, and show it to you first.
