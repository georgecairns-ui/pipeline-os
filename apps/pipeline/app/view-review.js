/*
  REVIEW: what Claude needs from the person
  -----------------------------------------
  Claude makes the everyday calls itself (moving deals, adding deals that clearly fit the ideal
  client). Review holds what's left:
  - New deals Claude wasn't sure about (Add to pipeline, Edit, Not a deal)
  - Emails and chases: Claude emails (the person checks it and presses Send) or I'll do it
  - LinkedIn messages: Claude writes them, the person pastes and sends
  - Call prep, things to do, and the odd question
*/
(function () {
  "use strict";

  const ui = window.TaskListOS.ui, esc = ui.esc, icon = ui.icon;
  const M = window.PL.model, C = window.PL.c;

  function dealLine(d, x) {
    return x ? '<button type="button" class="source-line source-line--btn" data-action="open-deal" data-deal="' + esc(x.id) + '">' + icon("trendingUp") + "<span><strong>" + esc(x.title) + "</strong> " + esc(M.stageLabel(x.stage)) + ", " + esc(M.money(d, x.value)) + "</span></button>" : "";
  }

  function newDealRow(ctx, x) {
    const d = ctx.d;
    const p = M.personById(d, x.personIds[0]);
    return '<li class="proposal' + ctx.anim("nd-" + x.id) + '" data-deal="' + esc(x.id) + '">' +
      '<div class="proposal__body"><div class="proposal__top"><span class="new-tag">New</span>' + (x.value ? '<span class="chip num">' + esc(M.money(d, x.value)) + "</span>" : "") +
      (p ? '<span class="who">' + C.avatar(p) + '<span class="who__name">' + esc(p.name) + "</span></span>" : "") + "</div>" +
      '<button type="button" class="proposal__title" data-action="open-deal">' + esc(x.title) + "</button>" +
      (x.suggestReason ? '<p class="proposal__reason">' + esc(x.suggestReason) + "</p>" : "") + "</div>" +
      '<div class="proposal__actions"><button type="button" class="btn btn--approve btn--sm" data-action="approve-deal">' + icon("check") + "<span>Add to pipeline</span></button>" +
      '<button type="button" class="btn btn--sm" data-action="open-deal">' + icon("pencil") + "Edit</button>" +
      '<button type="button" class="btn btn--ghost btn--sm" data-action="skip-deal">Not a deal</button></div></li>';
  }

  function suggestionRow(ctx, s) {
    const d = ctx.d;
    const x = M.dealById(d, s.dealId);
    const L = window.PL.links;
    const kinds = { chase: ["mail", "Chase"], email: ["mail", "Email"], linkedin: ["external", "LinkedIn"], prep: ["phone", "Call prep"], question: ["info", "Question"], task: ["checkSquare", "To do"] };
    const k = kinds[s.kind] || ["sparkle", "Suggestion"];
    let actions;
    if (s.kind === "question") {
      actions = '<button type="button" class="btn btn--approve btn--sm" data-action="approve-suggestion">' + icon("check") + "<span>Yes</span></button>" +
        '<button type="button" class="btn btn--ghost btn--sm" data-action="skip-suggestion">No</button>';
    } else if (s.email && s.email.body) {
      actions = C.emailActions(d, "suggestion", s.id, s.email, { small: true }) +
        (s.email.sendStatus === "queued" ? "" : '<button type="button" class="btn btn--ghost btn--sm" data-action="skip-suggestion">Skip</button>');
    } else if (s.linkedin && s.linkedin.body) {
      actions = C.linkedinActions("suggestion", s.id, s.linkedin, { small: true }) + '<button type="button" class="btn btn--ghost btn--sm" data-action="skip-suggestion">Skip</button>';
    } else {
      actions = '<button type="button" class="btn btn--approve btn--sm" data-action="approve-suggestion">' + icon("check") + "<span>Done</span></button>" +
        (x ? '<button type="button" class="btn btn--sm" data-action="open-deal" data-deal="' + esc(x.id) + '">Open deal</button>' : "") +
        '<button type="button" class="btn btn--ghost btn--sm" data-action="skip-suggestion">Skip</button>';
    }
    return '<li class="proposal' + ctx.anim("s-" + s.id) + '" data-suggestion="' + esc(s.id) + '">' +
      '<div class="proposal__body"><div class="proposal__top"><span class="chip chip--info">' + icon(k[0]) + esc(k[1]) + "</span></div>" +
      '<p class="proposal__title proposal__title--static">' + esc(s.title) + "</p>" +
      (s.reason ? '<p class="proposal__reason">' + esc(s.reason) + "</p>" : "") +
      (s.linkedin && s.linkedin.body ? '<details class="peek"><summary>' + icon("external") + "Read the message</summary><p class=\"peek__body\">" + esc(s.linkedin.body) + "</p></details>" : "") +
      (s.email && s.email.body ? '<details class="peek"><summary>' + icon("mail") + "Read the email</summary><p class=\"peek__to muted\">To " + esc(s.email.to || "") + " · " + esc(s.email.subject || "") + '</p><p class="peek__body">' + esc(s.email.body) + "</p></details>" : "") +
      (s.notes ? '<details class="peek"><summary>' + icon("list") + (s.kind === "prep" ? "Read the prep" : "More") + '</summary><p class="peek__body">' + esc(s.notes) + "</p></details>" : "") +
      dealLine(d, x) + "</div>" +
      '<div class="proposal__actions">' + actions + "</div></li>";
  }

  function render(ctx) {
    const d = ctx.d;
    const fresh = d.deals.filter(M.isSuggested);
    const sugg = M.waitingSuggestions(d);
    const order = { chase: 0, email: 1, linkedin: 2, prep: 3, task: 4, question: 5 };
    const rank = function (s) { return s.kind in order ? order[s.kind] : 9; };
    sugg.sort(function (a, b) { return rank(a) - rank(b); });
    if (!fresh.length && !sugg.length) {
      return '<div class="page page--narrow">' + C.empty("celebrate", "All caught up.", "Nothing needs you. Claude keeps your deals moving; when there's an email to send or a deal it isn't sure about, it lands here.",
        '<div class="empty__actions">' + C.say("Update my pipeline") + C.say("Who should I chase?") + "</div>") + "</div>";
    }
    let html = '<div class="page page--narrow"><div class="page-intro"><p>Claude moves your deals on and adds the ones that clearly fit by itself. This is what it needs from you. Press <strong>Claude emails</strong> to check an email and have Claude send it, or <strong>I\'ll do it</strong> to send it yourself.</p></div>';
    if (sugg.length) html += '<section class="panel">' + C.sectionHead("To send and to do", { icon: "inbox", count: sugg.length }) + '<ul class="proposals" role="list">' + sugg.map(function (s) { return suggestionRow(ctx, s); }).join("") + "</ul></section>";
    if (fresh.length) html += '<section class="panel">' + C.sectionHead("Deals Claude wasn\'t sure about", { icon: "trendingUp", count: fresh.length }) + '<ul class="proposals" role="list">' + fresh.map(function (x) { return newDealRow(ctx, x); }).join("") + "</ul></section>";
    return html + "</div>";
  }

  window.PL.views = window.PL.views || {};
  window.PL.views.review = {
    title: function () { return "Review"; },
    sub: function (ctx) { const n = M.reviewCount(ctx.d); return n ? n + (n === 1 ? " thing" : " things") + " for you to decide" : "Nothing waiting"; },
    render: render
  };
})();
