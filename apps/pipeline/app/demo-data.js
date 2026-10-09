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
      { id: "p-ben", name: "Ben Ward", organisation: "Kettle Yard Bakery", role: "prospect", email: "ben@kettleyard.example", notes: "" },
      { id: "p-ivy", name: "Ivy Morgan", organisation: "Copper Kettle Tearooms", role: "prospect", email: "ivy@copperkettle.example", notes: "Booked a call through your Calendly link." },
      { id: "p-omar", name: "Omar Reid", organisation: "Harbour View Dental", role: "prospect", email: "omar@harbourviewdental.example", notes: "Practice owner. Decides quickly." },
      { id: "p-sian", name: "Si\u00e2n Davies", organisation: "The Fox & Hound", role: "prospect", email: "sian@foxandhound.example", notes: "Landlady. Pub reopening after a refurb." },
      { id: "p-leo", name: "Leo Grant", organisation: "Willow Bistro", role: "prospect", email: "leo@willowbistro.example", notes: "Chef owner. Busy, short emails." },
      { id: "p-hana", name: "Hana Kim", organisation: "Oak & Ivy Florist", role: "prospect", email: "hana@oakandivy.example", notes: "" },
      { id: "p-jack", name: "Jack Hale", organisation: "Brightside Tutors", role: "prospect", email: "jack@brightsidetutors.example", notes: "" },
      { id: "p-dan", name: "Dan Price", organisation: "Pennywell Garage", role: "prospect", email: "dan@pennywell.example", notes: "Wants to revisit in the spring." },
      { id: "p-zoe", name: "Zoe Hart", organisation: "Bloom Yoga", role: "prospect", email: "zoe@bloomyoga.example", notes: "" },
      { id: "p-rosa", name: "Rosa Lind", organisation: "Lind Architects", role: "prospect", email: "rosa@lindarchitects.example", notes: "Met at the Bristol Chamber breakfast. Interested in a new website next year." },
      { id: "p-tim", name: "Tim Shaw", organisation: "Shaw Builders", role: "prospect", email: "", notes: "Connected on LinkedIn. No email yet." }
    ];

    const blankCheck = function () { return {}; };
    // Claude's research before a call: fit is checked against settings.fitCriteria; the app works out the score
    const F = function (criterion, result, why, dealBreaker) { return { criterion: criterion, result: result, why: why || "", dealBreaker: !!dealBreaker }; };

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
        research: { researchedAt: at(-1, 17), person: { name: "Dev Patel", role: "Operations lead", summary: "Runs day-to-day operations across the 3 branches. Joined from a larger agency in Bath 2 years ago." },
          company: { name: "Hollins Lettings", summary: "Independent lettings agency, 3 branches in Bristol and Bath, about 20 staff. Family-owned since 1998." },
          fit: [F("Independent business in the South West", "yes", "Bristol and Bath", true), F("Hospitality, health or property", "yes", "Lettings"), F("2 to 50 staff", "yes", "About 20 on their website"),
            F("The owner or a director makes the decision", "partly", "Dev isn't a director; the directors decide"), F("Budget of \u00a31,000 or more", "yes", "Accepted a \u00a34,800 proposal to review")],
          callPlan: [{ step: "Recap their problem", minutes: 5, detail: "6 hours a week on calls about let properties. Check it's still the main thing." },
            { step: "Walk through the proposal", minutes: 15, detail: "Lead with the listings the team updates themselves." },
            { step: "Find out who decides", minutes: 5, detail: "Which director signs it off, and what they'll want to see." },
            { step: "Agree the next step", minutes: 5, detail: "A date for the directors' decision, or a call with them." }],
          sources: [{ label: "hollins.example", url: "https://hollins.example" }, { label: "LinkedIn (public profile)", url: "https://www.linkedin.com/" }] },
        timeline: [
          { id: "e-h1", at: at(-16, 10), kind: "email", title: "Enquiry from Dev", summary: "Referred by Tom at Greenway Café. Wants a new website for 3 branches.", by: "claude" },
          { id: "e-h2", at: at(-7, 14), kind: "call", title: "Discovery call (Fathom)", summary: "Dev explained the listings problem and the 6 hours a week. Asked for examples and a proposal.", by: "claude", callId: "c-hollins" },
          { id: "e-h3", at: at(-1, 16, 20), kind: "email", title: "You sent the proposal", summary: "Hollins Lettings website proposal, £4,800.", by: "claude" },
          { id: "e-h4", at: at(-1, 16, 30), kind: "stage", title: "Moved from Talking to Proposal sent", by: "claude" }
        ]
      },
      {
        id: "d-ellis", title: "Logo refresh for Ellis Joinery", organisation: "Ellis Joinery", personIds: ["p-mark"], value: 1200, stage: "new",
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
        research: { researchedAt: at(0, 7, 50), person: { name: "Mark Ellis", role: "Co-owner", summary: "Runs Ellis Joinery with his brother Joe. Bespoke kitchens and staircases. Posts his work on Instagram most weeks." },
          company: { name: "Ellis Joinery", summary: "Family joinery workshop in Keynsham, 6 staff. Good reviews, a dated website and a hand-drawn logo." },
          fit: [F("Independent business in the South West", "yes", "Keynsham", true), F("Hospitality, health or property", "partly", "Trades, close to property"), F("2 to 50 staff", "yes", "6 staff"),
            F("The owner or a director makes the decision", "yes", "Mark co-owns it"), F("Budget of \u00a31,000 or more", "unknown", "Not mentioned yet"), F("Needs branding or a website, not just a logo", "partly", "Asked for a logo; the website is out of date")],
          callPlan: [{ step: "Get to know the business", minutes: 5, detail: "Ask about their best recent job. Joiners love talking about their work." },
            { step: "Find the real problem", minutes: 10, detail: "Where does the logo let you down? Quotes, the van, the website?" },
            { step: "Who decides and the budget", minutes: 5, detail: "Does Joe need to agree? What's he hoping to spend?" },
            { step: "Raise the website, lightly", minutes: 5, detail: "\u201cYou mentioned the website. Is that next?\u201d" },
            { step: "Next step", minutes: 5, detail: "Offer to send 3 logo routes with prices." }],
          sources: [{ label: "ellisjoinery.example", url: "https://ellisjoinery.example" }, { label: "Google reviews", url: "https://www.google.com/" }] },
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
        id: "d-northgate", title: "Brand for Northgate Physio's second clinic", organisation: "Northgate Physio", personIds: ["p-nadia"], value: 1800, stage: "call-completed",
        source: "Website enquiry", created: at(-3, 13), lastContact: at(-1, 15), stageChangedAt: at(-1, 16), summary: "Opening a second clinic in the spring and wants signage that matches.",
        moved: { from: "new", to: "call-completed", at: at(-1, 16), reason: "Your Google Meet call with Nadia was yesterday at 3pm.", seen: false },
        noTranscript: true,
        nextSteps: [{ text: "Write 3 lines on how yesterday's call went, so Claude can fill this in", due: day(0), done: false }],
        check: { risks: [], signals: [], questions: [] }, alsoHelp: [],
        timeline: [{ id: "e-n1", at: at(-3, 13), kind: "email", title: "Enquiry from Nadia", summary: "Second clinic opening in the spring.", by: "claude" },
          { id: "e-n2", at: at(-1, 15), kind: "meeting", title: "Video call (Google Meet)", summary: "No recording or transcript for this call.", by: "claude" },
          { id: "e-n3", at: at(-1, 16), kind: "stage", title: "Moved from New enquiry to Call completed", by: "claude" }]
      },
      {
        id: "d-bramble", title: "Packaging for Bramble & Co", organisation: "Bramble & Co", personIds: ["p-amy"], value: 3000, stage: "new", suggested: true,
        source: "Email enquiry", created: at(0, 8, 5), lastContact: at(0, 8, 5),
        suggestReason: "Amy wants packaging for 4 candle scents. Packaging isn't one of your services, but it's brand-led, \u00a33,000, and she's in Bath, so it could fit. Your call.",
        check: { risks: [], signals: [], questions: [] }, alsoHelp: [], nextSteps: [],
        timeline: [{ id: "e-b1", at: at(0, 8, 5), kind: "email", title: "Enquiry from Amy", summary: "Quote for packaging for 4 candle scents.", by: "claude" }]
      },
      {
        id: "d-copper", title: "Rebrand for Copper Kettle Tearooms", organisation: "Copper Kettle Tearooms", personIds: ["p-ivy"], value: 2200, stage: "new",
        source: "Calendly booking", created: at(-1, 18), lastContact: at(-1, 18), summary: "Tearoom in Clifton taking over a second site. Wants a fresher look for both.",
        nextSteps: [{ text: "Look at their current menus and Instagram before the call", due: day(2), done: false }],
        check: { risks: [], signals: [], questions: [] }, alsoHelp: [],
        nextMeeting: { start: local(3, "14:00"), title: "Intro call with Copper Kettle Tearooms", prep: ["What's prompting the change now?", "Who else is involved in choosing?"] },
        email: { to: "ivy@copperkettle.example", subject: "Looking forward to Monday", body: "Hi Ivy,\n\nThanks for booking in. Looking forward to hearing about the second site on Monday.\n\nCheers,\nSam", sendStatus: "sent", sentBy: "claude", sentAt: at(-1, 18, 20) },
        research: { researchedAt: at(-1, 18, 10), person: { name: "Ivy Morgan", role: "Owner", summary: "Opened the Copper Kettle in 2019. Featured in Bristol Life's best tearooms list last year." },
          company: { name: "Copper Kettle Tearooms", summary: "Tearoom in Clifton, 8 staff, opening a second site in Redland in the new year." },
          fit: [F("Independent business in the South West", "yes", "Clifton, Bristol", true), F("Hospitality, health or property", "yes", "Hospitality"), F("2 to 50 staff", "yes", "About 8"),
            F("The owner or a director makes the decision", "yes", "Ivy owns it"), F("Budget of \u00a31,000 or more", "unknown", "Not mentioned"), F("Needs branding or a website, not just a logo", "yes", "A rebrand for 2 sites")],
          callPlan: [{ step: "Their story", minutes: 5, detail: "Congratulate her on the second site. Ask what's changing." },
            { step: "What the rebrand needs to do", minutes: 10, detail: "Menus, signage, website? What's not working now?" },
            { step: "Timing and budget", minutes: 5, detail: "The Redland opening date sets the deadline." },
            { step: "Next step", minutes: 5, detail: "Offer a proposal within the week." }],
          sources: [{ label: "copperkettle.example", url: "https://copperkettle.example" }, { label: "Bristol Life", url: "https://www.google.com/" }] },
        timeline: [{ id: "e-c1", at: at(-1, 18), kind: "meeting", title: "Ivy booked an intro call", summary: "Through your Calendly link: \u201cthinking about a rebrand\u201d.", by: "claude" }]
      },
      {
        id: "d-oak", title: "Website for Oak & Ivy Florist", organisation: "Oak & Ivy Florist", personIds: ["p-hana"], value: 2800, stage: "new",
        source: "Website enquiry", created: at(-6, 11), lastContact: at(-6, 11), summary: "Florist who wants to take wedding orders online.",
        nextSteps: [{ text: "Reply to Hana and offer a call", due: day(0), done: false }],
        email: { to: "hana@oakandivy.example", subject: "Your new website", why: "Hana asked 6 days ago and hasn't had a reply yet.",
          body: "Hi Hana,\n\nThanks for getting in touch about a new website, and sorry for the slow reply. Taking wedding orders online is something we've done for a couple of florists, and it makes a real difference in the busy months.\n\nWould a 20 minute call this week work? Here's my calendar: [your booking link]\n\nCheers,\nSam" },
        check: { risks: [], signals: [], questions: [] }, alsoHelp: [],
        timeline: [{ id: "e-o1", at: at(-6, 11), kind: "email", title: "Enquiry from Hana", summary: "Wants to take wedding orders online.", by: "claude" }]
      },
      {
        id: "d-bright", title: "Logo for Brightside Tutors", organisation: "Brightside Tutors", personIds: ["p-jack"], value: 800, stage: "new",
        source: "Referral from Priya", created: at(0, 9, 20), lastContact: at(0, 9, 20), summary: "New tutoring business. Needs a logo before their website goes live.",
        check: { risks: [], signals: [], questions: [] }, alsoHelp: [], nextSteps: [],
        timeline: [{ id: "e-b2", at: at(0, 9, 20), kind: "email", title: "Enquiry from Jack", summary: "Needs a logo before the website goes live next month.", by: "claude" }]
      },
      {
        id: "d-harbour", title: "Website for Harbour View Dental", organisation: "Harbour View Dental", personIds: ["p-omar"], value: 5200, stage: "call-completed",
        source: "Google search", created: at(-5, 10), lastContact: at(-2, 11, 30), stageChangedAt: at(-2, 12), summary: "Dental practice whose site can't take online bookings. Losing new patients to the practice down the road.",
        nextSteps: [{ text: "Send Omar 3 examples of booking pages", due: day(0), done: false }, { text: "Send the proposal", due: day(3), done: false }],
        email: { to: "omar@harbourviewdental.example", subject: "3 booking pages, as promised", why: "You promised examples on the call. Sending them today keeps you ahead of the other quote.",
          body: "Hi Omar,\n\nThanks for your time on Tuesday. As promised, here are 3 booking pages we've built for other practices: [links]\n\nYou mentioned losing around 10 new patients a month to online booking elsewhere. Each of these lets patients book in under a minute, day or night.\n\nI'll have the proposal with you by Friday. Is it just you deciding, or will your practice manager want to see it too?\n\nKind regards,\nSam" },
        coaching: "Great call: you got a real number (10 patients a month). You didn't ask about the other quote. Find out who it's from before you price.",
        check: {
          metrics: K("known", "Losing about 10 new patients a month to practices with online booking.", "Omar on the call"),
          economicBuyer: K("partly", "Omar owns the practice. Not clear if the practice manager has a say.", "Omar"),
          decisionCriteria: K("known", "Online booking that works with their practice software, and a site that looks modern.", "Omar, twice"),
          decisionProcess: K("partly", "Wants it live before January. No steps discussed.", "Omar"),
          paperProcess: K("gap"), pain: K("known", "Patients ring after hours and go elsewhere.", "Omar: \u201cthe phone rings off the hook at 6pm\u201d"),
          competition: K("partly", "Has one other quote. Didn't say who.", "Omar"), champion: K("known", "Omar. He found you and wants it done.", "Omar"),
          risks: ["Another quote is in, and you don't know whose it is."], signals: ["Asked how soon you could start."],
          questions: ["Who's the other quote from, and what do you like about it?", "Will your practice manager want to see the proposal?", "Is there anything that has to happen before you sign?"], checkedAt: at(-2, 12)
        },
        alsoHelp: [{ problem: "Their leaflets in reception are \u201cfrom 2018\u201d.", service: "Print design", question: "Want the leaflets to match the new site?" }],
        moved: { from: "new", to: "call-completed", at: at(-2, 12), reason: "Your Fathom call with Omar on Tuesday was written up.", seen: true },
        timeline: [{ id: "e-hv1", at: at(-5, 10), kind: "email", title: "Enquiry from Omar", summary: "Found you on Google. Wants online booking.", by: "claude" },
          { id: "e-hv2", at: at(-2, 11, 30), kind: "call", title: "Discovery call (Fathom)", summary: "Losing about 10 new patients a month. Wants it live before January. Has another quote.", by: "claude", callId: "c-harbour" },
          { id: "e-hv3", at: at(-2, 12), kind: "stage", title: "Moved from New enquiry to Call completed", by: "claude" }]
      },
      {
        id: "d-fox", title: "Signage for The Fox & Hound", organisation: "The Fox & Hound", personIds: ["p-sian"], value: 1600, stage: "talking",
        source: "Walk-in", created: at(-12, 10), lastContact: at(-4, 16), summary: "Pub reopening after a refurb. Needs outside signage and menus.",
        nextSteps: [{ text: "Bring 2 signage sketches to next week's call", due: day(6), done: false }],
        coaching: "You've done 2 calls and still don't know the budget. Ask straight out next time: it saves you sketching for the wrong price.",
        check: { metrics: K("partly", "Reopening date is fixed, so signs must be up in time. No money figure.", "Si\u00e2n"), economicBuyer: K("known", "Si\u00e2n and the brewery's area manager.", "Si\u00e2n"),
          decisionCriteria: K("partly", "Must fit the brewery's rules on signage.", "Si\u00e2n"), decisionProcess: K("partly", "The brewery signs off on outside signs.", "Si\u00e2n"),
          paperProcess: K("partly", "Brewery approval, and possibly planning permission.", "Si\u00e2n"), pain: K("known", "Reopening in 6 weeks with old, peeling signs.", "Si\u00e2n"),
          competition: K("gap"), champion: K("known", "Si\u00e2n.", "Si\u00e2n"), risks: ["Needs the brewery's approval, which can be slow."], signals: ["Has a fixed reopening date."],
          questions: ["What budget has the brewery set for the signs?", "Who at the brewery approves it, and how long does that take?", "Is anyone else quoting?"], checkedAt: at(-4, 17) },
        alsoHelp: [], nextMeeting: { start: local(7, "10:30"), title: "Second call with The Fox & Hound", prep: ["What budget has the brewery set?"] },
        timeline: [{ id: "e-f1", at: at(-12, 10), kind: "note", title: "Si\u00e2n came into the studio", by: "you" },
          { id: "e-f2", at: at(-4, 16), kind: "call", title: "Call (Zoom)", summary: "Talked through the brewery's signage rules. Second call booked.", by: "claude", callId: "c-fox" }]
      },
      {
        id: "d-willow", title: "New menus for Willow Bistro", organisation: "Willow Bistro", personIds: ["p-leo"], value: 900, stage: "proposal",
        source: "Referral from Tom", created: at(-25, 10), lastContact: at(-12, 9), summary: "Seasonal menus and a specials board.",
        nextSteps: [{ text: "Chase Leo: no reply to the quote for 12 days", due: day(0), done: false }],
        check: { metrics: K("gap"), economicBuyer: K("known", "Leo owns it.", "Leo"), decisionCriteria: K("partly", "Price and turnaround.", "Leo"), decisionProcess: K("gap"),
          paperProcess: K("known", "None. Leo pays on invoice.", "Leo"), pain: K("partly", "Menus are printed at home and look it.", "Leo"), competition: K("gap"), champion: K("known", "Leo.", "Leo"),
          risks: ["No reply for 12 days."], signals: [], questions: ["Is the autumn menu still happening this year?"], checkedAt: at(-12, 10) },
        alsoHelp: [], timeline: [{ id: "e-w1", at: at(-12, 9), kind: "email", title: "You sent the quote", summary: "\u00a3900 for seasonal menus and a specials board.", by: "claude" }]
      },
      {
        id: "d-bloom", title: "Website refresh for Bloom Yoga", organisation: "Bloom Yoga", personIds: ["p-zoe"], value: 0, stage: "new", addedBy: "claude",
        source: "Email enquiry", created: at(0, 7, 40), lastContact: at(0, 7, 40), summary: "Yoga studio in Totterdown asking about a new website.",
        check: { risks: [], signals: [], questions: [] }, alsoHelp: [], nextSteps: [],
        timeline: [{ id: "e-z1", at: at(0, 7, 40), kind: "email", title: "Reply from Zoe", summary: "Asked if you do websites for small studios.", by: "claude" },
          { id: "e-z2", at: at(0, 7, 41), kind: "created", title: "Claude added this deal", summary: "A small health business in Bristol wanting a website: a clear fit.", by: "claude" }]
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
      },
      {
        id: "d-penny", title: "Website for Pennywell Garage", organisation: "Pennywell Garage", personIds: ["p-dan"], value: 3000, stage: "lost",
        source: "Referral", created: at(-70, 10), lastContact: at(-35, 10), closedAt: at(-35, 10), lostReason: "Timing. Revisit in the spring.", check: blankCheck(), nextSteps: [], alsoHelp: [],
        timeline: [{ id: "e-p1", at: at(-35, 10), kind: "lost", title: "Dan said not this year", by: "claude" }]
      }
    ];

    const calls = [
      { id: "c-hollins", title: "Discovery call with Hollins Lettings", date: local(-7, "14:00"), source: "Fathom", ref: "demo-1", dealId: "d-hollins", personIds: ["p-dev"],
        summary: "Dev explained that their old developer won't update the site and landlords keep calling about listings that are already let. About 6 hours a week lost. Wants examples and a proposal.",
        decisions: ["Sam sends a proposal by Monday", "Dev shares the current site's login"] },
      { id: "c-harbour", title: "Discovery call with Harbour View Dental", date: local(-2, "11:00"), source: "Fathom", ref: "demo-2", dealId: "d-harbour", personIds: ["p-omar"],
        summary: "Omar is losing about 10 new patients a month because the site can't take online bookings. Wants it live before January. Has one other quote.",
        decisions: ["Sam sends 3 booking page examples", "Proposal by Friday"] },
      { id: "c-fox", title: "Call with The Fox & Hound", date: local(-4, "16:00"), source: "Zoom", ref: "demo-3", dealId: "d-fox", personIds: ["p-sian"],
        summary: "Went through the brewery's rules for outside signs. Si\u00e2n needs them up before the reopening in 6 weeks.", decisions: ["Second call next week", "Sam brings 2 sketches"] },
      { id: "c-greenway", title: "Contract call with Greenway Caf\u00e9", date: local(-4, "09:00"), source: "Microsoft Teams", ref: "demo-4", dealId: "d-greenway", personIds: ["p-tom"],
        summary: "Tom agreed the scope and the price and signed during the call.", decisions: ["Work starts on the 1st", "50% deposit invoiced this week"] },
      { id: "c-northgate", title: "Video call with Northgate Physio", date: local(-1, "15:00"), source: "Google Meet", dealId: "d-northgate", personIds: ["p-nadia"], noTranscript: true,
        summary: "" }
    ];

    const suggestions = [
      { id: "s-chase-willow", kind: "chase", dealId: "d-willow", title: "Chase Leo about the menus", reason: "No reply to your quote for 12 days. Leo likes short emails, so this one is 3 lines.",
        email: { to: "leo@willowbistro.example", subject: "Re: Menus for Willow Bistro", body: "Hi Leo,\n\nIs the autumn menu still on? If so, I can have first designs with you within a week of a yes.\n\nCheers,\nSam" }, status: "waiting", createdAt: at(0, 7, 50) },
      { id: "s-task-harbour", kind: "email", dealId: "d-harbour", title: "Send Omar the 3 booking page examples", reason: "You promised them on Tuesday's call. Sending them today keeps you ahead of the other quote.",
        email: { to: "omar@harbourviewdental.example", subject: "3 booking pages, as promised", body: "Hi Omar,\n\nThanks for your time on Tuesday. As promised, here are 3 booking pages we've built for other practices: [links]\n\nI'll have the proposal with you by Friday. Is it just you deciding, or will your practice manager want to see it too?\n\nKind regards,\nSam" }, status: "waiting", createdAt: at(0, 7, 50) },
      { id: "s-email-rosa", kind: "email", personId: "p-rosa", title: "Email Rosa Lind after the Chamber breakfast", reason: "You met Rosa 3 days ago and she mentioned a new website next year. A short hello keeps you in mind.",
        email: { to: "rosa@lindarchitects.example", subject: "Good to meet you at the Chamber breakfast", body: "Hi Rosa,\n\nGood to meet you on Tuesday. You mentioned the website might be next year's job: when you're ready to think about it, I'd be happy to have a chat, no pressure.\n\nIn the meantime, here's a site we built for another practice you might like: [link]\n\nBest,\nSam" }, status: "waiting", createdAt: at(0, 7, 50) },
      { id: "s-chase-marlow", kind: "chase", dealId: "d-marlow", title: "Chase Hannah about the brochure", reason: "No reply for 9 days after she asked for a lower price. The draft offers a smaller first step instead of a discount.",
        email: deals[2].email, status: "waiting", createdAt: at(0, 7, 50) },
      { id: "s-prep-ellis", kind: "prep", dealId: "d-ellis", title: "Prep for your call with Mark Ellis tomorrow at 10am", reason: "You know little about how they'll decide. Go in with the 3 questions on the deal.", status: "waiting", createdAt: at(0, 7, 50),
        notes: "Who: Mark Ellis runs Ellis Joinery with his brother. Referred by Tom at Greenway Caf\u00e9.\nSo far: Mark says the logo looks home-made next to their work. He booked through your link.\nYou promised: nothing yet. His brand questionnaire is due back before the call.\nFind out: 1. Will your brother join, or how will you decide between you? 2. Where does the logo let you down most? 3. What would make this worth it?\nWorth raising: the website \"hasn't been touched since 2015\".\nWatch for: his brother hasn't been in touch." },
      { id: "s-linkedin-tim", kind: "linkedin", personId: "p-tim", title: "Message Tim Shaw on LinkedIn", reason: "You connected last week and there's no email for him. Shaw Builders fits your ideal client: a South West builder with 15 staff.",
        linkedin: { profileUrl: "https://www.linkedin.com/", body: "Hi Tim, thanks for connecting. I noticed Shaw Builders has had a busy year. We help South West builders turn their best projects into a website that wins the next job. Happy to share a couple of examples if that's useful. Sam" },
        status: "waiting", createdAt: at(0, 7, 50) }
    ];

    return {
      about: ["Sample data for Demo mode. A made-up business."],
      formatVersion: 1,
      settings: { yourName: "Sam", businessName: "Fern & Finch", currency: "GBP", chaseAfterDays: 7, autoMove: true, claudeSends: true, emailProvider: "gmail", calendarProvider: "google",
        fitCriteria: [{ text: "Independent business in the South West", dealBreaker: true }, { text: "Hospitality, health or property", dealBreaker: false }, { text: "2 to 50 staff", dealBreaker: false },
          { text: "The owner or a director makes the decision", dealBreaker: false }, { text: "Budget of \u00a31,000 or more", dealBreaker: false }, { text: "Needs branding or a website, not just a logo", dealBreaker: false }] },
      deals: deals, people: people, calls: calls, suggestions: suggestions,
      checkIn: { lastRunAt: at(0, 7, 50), nextRunAt: at(0, 8, 50), emailsRead: 34, callsRead: 2, dealsUpdated: 6 },
      activity: [
        { at: at(-4, 9), type: "deal-moved", dealId: "d-greenway", from: "negotiating", to: "won" },
        { at: at(-20, 10), type: "deal-moved", dealId: "d-kettle", from: "proposal", to: "lost" }
      ]
    };
  }

  window.makePipelineDemoData = makePipelineDemoData;
})();
