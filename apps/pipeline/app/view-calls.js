/*
  CALLS: every sales call, written up and linked to its deal
  ----------------------------------------------------------
  Claude reads each call from the person's recorder (Fathom, Fireflies, Otter, Granola, tl;dv,
  Read AI, Zoom, Microsoft Teams or Google Meet), writes it up and updates the deal. A call with
  no recording asks the person for a few lines instead.
*/
(function () {
  "use strict";

  const ui = window.TaskListOS.ui, esc = ui.esc, icon = ui.icon;
  const M = window.PL.model, C = window.PL.c;

  function callCard(ctx, c) {
    const d = ctx.d;
    const x = M.dealById(d, c.dealId);
    const people = (c.personIds || []).map(function (id) { return M.personById(d, id); }).filter(Boolean);
    return '<li class="call' + ctx.anim("call-" + c.id) + '" data-call="' + esc(c.id) + '"' + (x ? ' data-deal="' + esc(x.id) + '"' : "") + ">" +
      '<button type="button" class="call__main" data-action="' + (x ? "open-deal" : "open-call") + '">' +
      '<span class="call__top"><span class="call__title">' + esc(c.title) + '</span><span class="call__when">' + esc(M.whenLabel(c.date)) + "</span></span>" +
      '<span class="call__people">' + people.map(function (p) { return C.avatar(p); }).join("") + (c.source ? '<span class="chip">' + icon("phone") + esc(c.source) + "</span>" : "") + "</span>" +
      (c.summary ? '<span class="call__summary">' + esc(c.summary) + "</span>" :
        c.noTranscript ? '<span class="call__summary muted">There\'s no recording or transcript of this call. Add a few lines on how it went and Claude updates the deal.</span>' : "") +
      "</button>" +
      '<div class="call__foot">' +
      (x ? '<span class="chip">' + icon("trendingUp") + esc(x.title) + "</span>" : '<span class="chip chip--warning">' + icon("info") + "Not linked to a deal</span>") +
      (c.noTranscript ? '<button type="button" class="btn btn--sm btn--primary" data-action="add-notes">' + icon("pencil") + "Add how it went</button>" : "") +
      (c.transcriptUrl ? '<a class="btn btn--sm btn--ghost" href="' + esc(/^https?:\/\//i.test(c.transcriptUrl) ? c.transcriptUrl : "#") + '" target="_blank" rel="noopener">' + icon("external") + "Recording</a>" : "") +
      "</div></li>";
  }

  function render(ctx) {
    const d = ctx.d;
    const calls = M.callsSorted(d);
    if (!calls.length) {
      return '<div class="page page--narrow">' + C.empty("thinking", "No sales calls yet.", "If you record your calls (Fathom, Fireflies, Otter, Granola, tl;dv, Read AI, Zoom, Microsoft Teams or Google Meet), Claude writes up each sales call and updates the deal. No recorder? Add your notes to a deal and Claude does the same.",
        '<div class="empty__actions">' + C.say("Connect my call recordings") + '<button type="button" class="btn" data-action="add-notes">' + icon("pencil") + "Add call notes</button></div>") + "</div>";
    }
    return '<div class="page page--narrow"><ul class="calls" role="list">' + calls.map(function (c) { return callCard(ctx, c); }).join("") + "</ul></div>";
  }

  window.PL.views = window.PL.views || {};
  window.PL.views.calls = {
    title: function () { return "Calls"; },
    sub: function (ctx) { const n = ctx.d.calls.length; return n ? n + (n === 1 ? " sales call" : " sales calls") + " written up" : "Your sales calls, written up"; },
    render: render
  };
})();
