/*
  DEMO DATA
  ---------
  Made-up sample data for Demo mode, so videos and screenshots never show real client data.
  The business is the same fictional one as Task List OS: Fern & Finch, a 2 person branding and
  web design studio, with the same clients (Tom at Greenway Café, Hannah at Marlow Dental, Dev at
  Hollins Lettings, Mark at Ellis Joinery). Every date is worked out from today.
*/
(function () {
  "use strict";

  function makePipelineDemoData() {
    const ui = window.TaskListOS.ui;
    const now = new Date();
    const day = function (offset) { return ui.isoDate(ui.addDays(now, offset)); };
    const at = function (offset, hour, minute) { const d = ui.addDays(now, offset); d.setHours(hour, minute || 0, 0, 0); return d.toISOString(); };
    const local = function (offset, hhmm) { return day(offset) + "T" + hhmm; };
    const K = function (status, answer, evidence) { return { status: status, answer: answer || "", evidence: evidence || "" }; };

    const people = [
      { id: "p-tom", name: "Tom Ashby", organisation: "Greenway Café", role: "client", email: "tom@greenway.example", notes: "Owner. Quick on email, prefers calls for anything big." },
      { id: "p-hannah", name: "Hannah Price", organisation: "Marlow Dental", role: "client", email: "hannah@marlowdental.example", notes: "Practice manager. Formal, likes things in writing." },
      { id: "p-raj", name: "Dr Raj Marlow", organisation: "Marlow Dental", role: "prospect", email: "raj@marlowdental.example", notes: "Principal dentist. Signs anything over £1,000." },
      { id: "p-dev", name: "Dev Patel", organisation: "Hollins Lettings", role: "prospect", email: "dev@hollins.example", notes: "Operations lead. Organised, replies fast." },
      { id: "p-mark", name: "Mark Ellis", organisation: "Ellis Joinery", role: "prospect", email: "mark@ellisjoinery.example", notes: "Referral from Tom. Runs the workshop with his brother." },
      { id: "p-nadia", name: "Nadia Brook", organisation: "Northgate Physio", role: "prospect", email: "nadia@northgatephysio.example", notes: "Opening a second clinic in the spring." },
      { id: "p-amy", name: "Amy Cole", organisation: "Bramble & Co", role: "prospect", email: "amy@brambleandco.example", notes: "Found us through the Greenway case study." },
      { id: "p-lena", name: "Lena Hart", organisation: "Hart Interiors", role: "other", email: "lena@hartinteriors.example", notes: "" },
      { id: "p-ben", name: "Ben Ward", organisation: "Kettle Yard Bakery", role: "prospect", email: "ben@kettleyard.example", notes: "" }
    ];

    const blankCheck = function () { return {}; };

    const deals = [
      {
        id: "d-hollins", title: "New website for Hollins Lettings", organisation: "Hollins Lettings", personIds: ["p-dev"], value: 4800, stage: "proposal",
        source: "Referral from Greenway Café", created: at(-16, 10), lastContact: at(-1, 16, 20), stageChangedAt: at(-1, 16, 30),
        moved: { from: "talking", to: "proposal", at: at(-1, 16, 30), reason: "You sent Dev the proposal yesterday at 4:20pm (“Hollins Lettings website proposal”).", seen: false },
        summary: "Lettings agency with 3 branches. Their site can't be updated without the old developer, and landlords keep ringing to ask about listings that are already let.",
        nextSteps: [
          { text: "Walk Dev through the proposal on your call", due: day(2), done: false },
          { text: "Send 2 examples of property sites you've built", due: day(1), done: false },
          { text: "Ask who else needs to see the proposal before they decide", due: day(2), done: false }
        ],
        email: { to: "dev@hollins.example", subject: "Your website proposal, and 2 examples", why: "Dev asked for examples on the call. Sending them before your call keeps the proposal fresh.",
          body: "Hi Dev,\n\nThanks again for the time last week. As promised, here are 2 property sites we've built recently, both with listings the team updates themselves:\n\n- Calder Homes: calderhomes.example\n- Wren Estates: wrenestates.example\n\nWhen we speak I'll walk you through the proposal properly. It would help to know if anyone else at Hollins needs to see it before you decide, so I can make sure it answers their questions too.\n\nCheers,\nSam" },
        coaching: "You found the pain fast. You didn't ask who signs off, so the proposal may sit on the wrong desk. Ask on your next call.",
        check: {
          metrics: K("known", "About 6 hours a week answering calls about properties that are already let.", "Dev on the call: “probably 6 hours a week, easy”"),
          economicBuyer: K("partly", "Dev says the directors decide. Not clear which director, or what they want to see.", "Dev: “it'll go to the directors”"),
          decisionCriteria: K("known", "The team must be able to update listings themselves. It has to look better than Mayfield Lettings' site.", "Dev, twice on the call"),
          decisionProcess: K("partly", "Want to decide before the end of the month. Steps not discussed.", "Dev: “ideally sorted this month”"),
          paperProcess: K("gap"),
          pain: K("known", "Old developer won't make changes; landlords complain about out-of-date listings.", "Dev: “we're stuck with whatever he built”"),
          competition: K("partly", "Getting a quote from one other agency. Name not given.", "Dev mentioned “another quote”"),
          champion: K("known", "Dev. He brought you in and wants it done before the busy season.", "Introduced by Tom, chased the proposal himself"),
          risks: ["The directors haven't been on a call. If they don't see the 6 hours a week, it becomes a price conversation.", "Another agency is quoting."],
          signals: ["Dev asked when you could start.", "They want it live before the spring lettings rush."],
          questions: ["Which director signs this off, and what will they want to see?", "Is there anything that has to happen before you can agree, such as a contract review?", "Who is the other quote from, and what do you like about it?"],
          checkedAt: at(-1, 16, 35)
        },
        alsoHelp: [{ problem: "Their branch window cards look different in every branch.", service: "Brand refresh and print", question: "You mentioned the window cards. Would it help if the new site and the cards matched?" }],
        nextMeeting: { start: local(2, "11:00"), title: "Proposal walk-through with Hollins Lettings", prep: ["Which director signs this off?", "What would make the other quote win?"] },
        timeline: [
          { id: "e-h1", at: at(-16, 10), kind: "email", title: "Enquiry from Dev", summary: "Referred by Tom at Greenway Café. Wants a new website for 3 branches.", by: "claude" },
          { id: "e-h2", at: at(-7, 14), kind: "call", title: "Discovery call (Fathom)", summary: "Dev explained the listings problem and the 6 hours a week. Asked for examples and a proposal.", by: "claude", callId: "c-hollins" },
          { id: "e-h3", at: at(-1, 16, 20), kind: "email", title: "You sent the proposal", summary: "Hollins Lettings website proposal, £4,800.", by: "claude" },
          { id: "e-h4", at: at(-1, 16, 30), kind: "stage", title: "Moved from Talking to Proposal sent", by: "claude" }
        ]
      },
      {
        id: "d-ellis", title: "Logo refresh for Ellis Joinery", organisation: "Ellis Joinery", personIds: ["p-mark"], value: 1200, stage: "talking",
        source: "Referral from Tom", created: at(-5, 9), lastContact: at(-1, 11), summary: "Family joinery workshop. Wants a logo that looks as good as their work.",
        nextSteps: [{ text: "Get Mark's brand questionnaire back before the call", due: day(1), done: false }],
        coaching: "First call is tomorrow. Go in with the 3 questions below: you know almost nothing about how they'll decide yet.",
        check: { metrics: K("gap"), economicBuyer: K("partly", "Mark and his brother run it together.", "Mark's email"), decisionCriteria: K("gap"), decisionProcess: K("gap"),
          paperProcess: K("gap"), pain: K("partly", "Says the logo looks “home-made” next to the quality of the work.", "Mark's first email"),
          competition: K("gap"), champion: K("partly", "Mark is keen. His brother's view isn't known.", "Mark's email"),
          risks: ["Mark's brother may need convincing, and hasn't been in touch."], signals: ["Came by referral from a happy client."],
          questions: ["Will your brother join the call, or how will you decide between you?", "Where does the logo let you down most: the van, quotes, the website?", "What would make this worth it for you?"], checkedAt: at(-1, 11, 10) },
        alsoHelp: [{ problem: "Mark said their website “hasn't been touched since 2015”.", service: "Website design", question: "You mentioned the website. Is that something you'd want to look at once the logo's done?" }],
        nextMeeting: { start: local(1, "10:00"), title: "Call with Mark Ellis about the logo", prep: ["Will your brother join the call?", "Where does the logo let you down most?"] },
        timeline: [{ id: "e-e1", at: at(-5, 9), kind: "email", title: "Enquiry from Mark", summary: "Referred by Tom. Wants a logo refresh.", by: "claude" },
          { id: "e-e2", at: at(-1, 11), kind: "email", title: "Call booked for tomorrow", summary: "Mark picked 10am through your booking link.", by: "claude" }]
      },
      {
        id: "d-marlow", title: "New patient brochure for Marlow Dental", organisation: "Marlow Dental", personIds: ["p-hannah", "p-raj"], value: 2400, stage: "negotiating",
        source: "Existing client", created: at(-30, 10), lastContact: at(-9, 15), summary: "Brochure and welcome pack for new patients, to go with the logo work you did for them.",
        nextSteps: [{ text: "Chase Hannah: no reply for 9 days", due: day(0), done: false }],
        email: { to: "hannah@marlowdental.example", subject: "Re: New patient brochure", why: "No reply for 9 days after Hannah asked for a lower price. A short, friendly nudge with an option.",
          body: "Hi Hannah,\n\nI wanted to pick up where we left off on the new patient brochure. If the full welcome pack is more than you'd like to spend right now, we could start with the brochure on its own for £1,650 and add the rest later.\n\nWould either of those work for Dr Marlow?\n\nKind regards,\nSam" },
        coaching: "Price came up and the deal went quiet. Offer a smaller first step rather than a discount.",
        check: { metrics: K("partly", "New patients ask the same questions at reception every day. No numbers given.", "Hannah's email"),
          economicBuyer: K("known", "Dr Raj Marlow signs anything over £1,000.", "Hannah, in writing"), decisionCriteria: K("known", "Must match the logo work. Price matters.", "Hannah's emails"),
          decisionProcess: K("partly", "Hannah recommends, Dr Marlow decides. No date.", "Hannah's email"), paperProcess: K("known", "Purchase order from the practice.", "Last project"),
          pain: K("partly", "Reception spends time explaining the same things.", "Hannah"), competition: K("known", "Doing nothing, or printing a leaflet themselves.", "Hannah mentioned a DIY leaflet"),
          champion: K("known", "Hannah wants it and has pushed for it before.", "Last project"), risks: ["Asked for a lower price, then went quiet for 9 days."],
          signals: ["Already a happy client."], questions: ["Would starting with the brochure on its own work?", "When does Dr Marlow next review spending?"], checkedAt: at(-9, 15, 30) },
        alsoHelp: [], timeline: [{ id: "e-m1", at: at(-12, 10), kind: "email", title: "You sent the quote", summary: "£2,400 for the brochure and welcome pack.", by: "claude" },
          { id: "e-m2", at: at(-9, 15), kind: "email", title: "Hannah asked for a lower price", summary: "“Dr Marlow thinks it's a bit more than we planned.”", by: "claude" }]
      },
      {
        id: "d-northgate", title: "Brand for Northgate Physio's second clinic", organisation: "Northgate Physio", personIds: ["p-nadia"], value: 1800, stage: "new",
        source: "Website enquiry", created: at(-3, 13), lastContact: at(-1, 15), summary: "Opening a second clinic in the spring and wants signage that matches.",
        noTranscript: true,
        nextSteps: [{ text: "Write 3 lines on how yesterday's call went, so Claude can fill this in", due: day(0), done: false }],
        check: { risks: [], signals: [], questions: [] }, alsoHelp: [],
        timeline: [{ id: "e-n1", at: at(-3, 13), kind: "email", title: "Enquiry from Nadia", summary: "Second clinic opening in the spring.", by: "claude" },
          { id: "e-n2", at: at(-1, 15), kind: "meeting", title: "Video call (Google Meet)", summary: "No recording or transcript for this call.", by: "claude" }]
      },
      {
        id: "d-bramble", title: "Packaging for Bramble & Co", organisation: "Bramble & Co", personIds: ["p-amy"], value: 3000, stage: "new", suggested: true,
        source: "Email enquiry", created: at(0, 8, 5), lastContact: at(0, 8, 5),
        suggestReason: "Amy emailed this morning asking for a quote for packaging for 4 new candle scents. She found you through the Greenway case study.",
        check: { risks: [], signals: [], questions: [] }, alsoHelp: [], nextSteps: [],
        timeline: [{ id: "e-b1", at: at(0, 8, 5), kind: "email", title: "Enquiry from Amy", summary: "Quote for packaging for 4 candle scents.", by: "claude" }]
      },
      {
        id: "d-greenway", title: "Menu boards and rebrand for Greenway Café", organisation: "Greenway Café", personIds: ["p-tom"], value: 3200, stage: "won",
        source: "Existing client", created: at(-40, 10), lastContact: at(-4, 9), closedAt: at(-4, 9), stageChangedAt: at(-4, 9), check: blankCheck(), nextSteps: [], alsoHelp: [],
        timeline: [{ id: "e-g1", at: at(-4, 9), kind: "won", title: "Tom signed the contract", by: "claude" }]
      },
      {
        id: "d-kettle", title: "Website for Kettle Yard Bakery", organisation: "Kettle Yard Bakery", personIds: ["p-ben"], value: 2600, stage: "lost",
        source: "Website enquiry", created: at(-50, 10), lastContact: at(-20, 10), closedAt: at(-20, 10), lostReason: "Went with a cheaper freelancer.", check: blankCheck(), nextSteps: [], alsoHelp: [],
        timeline: [{ id: "e-k1", at: at(-20, 10), kind: "lost", title: "Ben went with a cheaper freelancer", by: "claude" }]
      }
    ];

    const calls = [
      { id: "c-hollins", title: "Discovery call with Hollins Lettings", date: local(-7, "14:00"), source: "Fathom", ref: "demo-1", dealId: "d-hollins", personIds: ["p-dev"],
        summary: "Dev explained that their old developer won't update the site and landlords keep calling about listings that are already let. About 6 hours a week lost. Wants examples and a proposal.",
        decisions: ["Sam sends a proposal by Monday", "Dev shares the current site's login"] },
      { id: "c-northgate", title: "Video call with Northgate Physio", date: local(-1, "15:00"), source: "Google Meet", dealId: "d-northgate", personIds: ["p-nadia"], noTranscript: true,
        summary: "" }
    ];

    const suggestions = [
      { id: "s-chase-marlow", kind: "chase", dealId: "d-marlow", title: "Chase Hannah about the brochure", reason: "No reply for 9 days after she asked for a lower price. The draft offers a smaller first step instead of a discount.",
        email: deals[2].email, status: "waiting", createdAt: at(0, 7, 50) },
      { id: "s-prep-ellis", kind: "prep", dealId: "d-ellis", title: "Prep for your call with Mark Ellis tomorrow at 10am", reason: "You know little about how they'll decide. Go in with the 3 questions on the deal.", status: "waiting", createdAt: at(0, 7, 50),
        notes: "Who: Mark Ellis runs Ellis Joinery with his brother. Referred by Tom at Greenway Caf\u00e9.\nSo far: Mark says the logo looks home-made next to their work. He booked through your link.\nYou promised: nothing yet. His brand questionnaire is due back before the call.\nFind out: 1. Will your brother join, or how will you decide between you? 2. Where does the logo let you down most? 3. What would make this worth it?\nWorth raising: the website \"hasn't been touched since 2015\".\nWatch for: his brother hasn't been in touch." },
      { id: "s-sales-lena", kind: "question", personId: "p-lena", title: "Is your “Quick chat” with Lena Hart this week a sales call?", reason: "Lena isn't a client or in your team, and there's no earlier email. Say yes and Claude starts a deal for Hart Interiors. Say no if it isn't about work, and Claude won't ask about Lena again.",
        status: "waiting", createdAt: at(0, 7, 50) }
    ];

    return {
      about: ["Sample data for Demo mode. A made-up business."],
      formatVersion: 1,
      settings: { yourName: "Sam", businessName: "Fern & Finch", currency: "GBP", chaseAfterDays: 7, autoMove: true, emailProvider: "gmail", calendarProvider: "google" },
      deals: deals, people: people, calls: calls, suggestions: suggestions,
      checkIn: { lastRunAt: at(0, 7, 50), nextRunAt: at(0, 8, 50), emailsRead: 34, callsRead: 1, dealsUpdated: 3 },
      activity: [
        { at: at(-4, 9), type: "deal-moved", dealId: "d-greenway", from: "negotiating", to: "won" },
        { at: at(-20, 10), type: "deal-moved", dealId: "d-kettle", from: "proposal", to: "lost" }
      ]
    };
  }

  window.makePipelineDemoData = makePipelineDemoData;
})();
