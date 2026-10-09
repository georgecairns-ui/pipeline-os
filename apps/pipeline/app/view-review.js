/*
  REVIEW: everything Claude is waiting for the person to decide
  -------------------------------------------------------------
  - Deals Claude moved by itself (Keep or Undo)
  - New deals Claude spotted in email, the calendar or calls (Approve or Skip)
  - Chases with the email drafted, call prep, and questions ("is this a sales call?")
  Nothing is sent from here. A chase opens as a draft for the person to check and send.
*/
(function () {
  "use strict";

  const ui = window.TaskListOS.ui, esc = ui.esc, icon = ui.icon;
  const M = window.PL.model, C = window.PL.c;

  function dealLine(d, x) {
    return x ? '<button type="button" class="source-line source-line--btn" data-action="open-deal" data-deal="' + esc(x.id) + '">' + icon("trendingUp") + "<span><strong>" + esc(x.title) + "</strong> " + esc(M.stageLabel(x.stage)) + ", " + esc(M.money(d, x.value)) + "</span></button>" : "";
  }

  function movedRow(ctx, x) {
    const m = x.moved;
    return '<li class="proposal' + ctx.anim("mv-" + x.id) + '" data-deal="' + esc(x.id) + '">' +
      '<div class="proposal__body"><div class="proposal__top"><span class="chip chip--accent">' + icon("sparkle") + esc(M.stageLabel(m.from)) + " → " + esc(M.stageLabel(m.to)) + "</span></div>" +
      '<button type="button" class="proposal__title" data-action="open-deal">' + esc(x.title) + "</button>" +
      (m.reason ? '<p class="proposal__reason">' + esc(m.reason) + "</p>" : "") + "</div>" +
      '<div class="proposal__actions"><button type="button" class="btn btn--approve btn--sm" data-action="keep-move">' + icon("check") + "<span>Keep</span></button>" +
      '<button type="button" class="btn btn--ghost btn--sm" data-action="undo-move">' + icon("undo") + "Undo</button></div></li>";
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
    const kinds = { chase: ["mail", "Chase"], email: ["mail", "Email"], prep: ["phone", "Call prep"], question: ["info", "Question"], task: ["checkSquare", "To do"] };
    const k = kinds[s.kind] || ["sparkle", "Suggestion"];
    let actions;
    if (s.kind === "question") {
      actions = '<button type="button" class="btn btn--approve btn--sm" data-action="approve-suggestion">' + icon("check") + "<span>Yes</span></button>" +
        '<button type="button" class="btn btn--ghost btn--sm" data-action="skip-suggestion">No</button>';
    } else if (s.email && s.email.body) {
      actions = '<button type="button" class="btn btn--primary btn--sm" data-action="suggestion-draft">' + icon("pencil") + "Draft in " + esc(L.emailLabel(d.settings.emailProvider)) + "</button>" +
        '<button type="button" class="btn btn--approve btn--sm" data-action="approve-suggestion">' + icon("check") + "<span>Done</span></button>" +
        '<button type="button" class="btn btn--ghost btn--sm" data-action="skip-suggestion">Skip</button>';
    } else {
      actions = '<button type="button" class="btn btn--approve btn--sm" data-action="approve-suggestion">' + icon("check") + "<span>" + (s.kind === "prep" ? "Done" : "Approve") + "</span></button>" +
        (x ? '<button type="button" class="btn btn--sm" data-action="open-deal" data-deal="' + esc(x.id) + '">Open deal</button>' : "") +
        '<button type="button" class="btn btn--ghost btn--sm" data-action="skip-suggestion">Skip</button>';
    }
    return '<li class="proposal' + ctx.anim("s-" + s.id) + '" data-suggestion="' + esc(s.id) + '">' +
      '<div class="proposal__body"><div class="proposal__top"><span class="chip chip--info">' + icon(k[0]) + esc(k[1]) + "</span></div>" +
      '<p class="proposal__title proposal__title--static">' + esc(s.title) + "</p>" +
      (s.reason ? '<p class="proposal__reason">' + esc(s.reason) + "</p>" : "") +
      (s.email && s.email.body ? '<details class="peek"><summary>' + icon("mail") + "Read the draft</summary><p class=\"peek__to muted\">To " + esc(s.email.to || "") + " · " + esc(s.email.subject || "") + '</p><p class="peek__body">' + esc(s.email.body) + "</p></details>" : "") +
      (s.notes ? '<details class="peek"><summary>' + icon("list") + (s.kind === "prep" ? "Read the prep" : "More") + '</summary><p class="peek__body">' + esc(s.notes) + "</p></details>" : "") +
      dealLine(d, x) + "</div>" +
      '<div class="proposal__actions">' + actions + "</div></li>";
  }

  function render(ctx) {
    const d = ctx.d;
    const moved = d.deals.filter(function (x) { return x.moved && !x.moved.seen; });
    const fresh = d.deals.filter(M.isSuggested);
    const sugg = M.waitingSuggestions(d);
    const order = { chase: 0, prep: 1, email: 2, question: 3, task: 4 };
    const rank = function (s) { return s.kind in order ? order[s.kind] : 9; };
    sugg.sort(function (a, b) { return rank(a) - rank(b); });
    if (!moved.length && !fresh.length && !sugg.length) {
      return '<div class="page page--narrow">' + C.empty("celebrate", "All caught up.", "Nothing is waiting for you. When Claude spots a new deal, moves one, or has a chase ready, it lands here first.",
        '<div class="empty__actions">' + C.say("Update my pipeline") + C.say("Who should I chase?") + "</div>") + "</div>";
    }
    let html = '<div class="page page--narrow"><div class="page-intro"><p>Claude keeps your pipeline up to date and drafts every chase. You decide what happens: nothing is ever sent for you.</p></div>';
    if (moved.length) html += '<section class="panel">' + C.sectionHead("Deals Claude moved", { icon: "sparkle", count: moved.length }) + '<ul class="proposals" role="list">' + moved.map(function (x) { return movedRow(ctx, x); }).join("") + "</ul></section>";
    if (fresh.length) html += '<section class="panel">' + C.sectionHead("New deals Claude spotted", { icon: "trendingUp", count: fresh.length }) + '<ul class="proposals" role="list">' + fresh.map(function (x) { return newDealRow(ctx, x); }).join("") + "</ul></section>";
    if (sugg.length) html += '<section class="panel">' + C.sectionHead("Chases, call prep and questions", { icon: "inbox", count: sugg.length }) + '<ul class="proposals" role="list">' + sugg.map(function (s) { return suggestionRow(ctx, s); }).join("") + "</ul></section>";
    return html + "</div>";
  }

  window.PL.views = window.PL.views || {};
  window.PL.views.review = {
    title: function () { return "Review"; },
    sub: function (ctx) { const n = M.reviewCount(ctx.d); return n ? n + (n === 1 ? " thing" : " things") + " for you to decide" : "Nothing waiting"; },
    render: render
  };
})();
