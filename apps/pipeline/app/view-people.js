/*
  PEOPLE: every contact and company, with their deals
  ---------------------------------------------------
  Pipeline OS's own contacts, plus Task List OS's contacts when it's attached (stored once, in
  the task list; shown here read only with their deals).
*/
(function () {
  "use strict";

  const ui = window.TaskListOS.ui, esc = ui.esc, icon = ui.icon;
  const M = window.PL.model, C = window.PL.c;

  function render(ctx) {
    const d = ctx.d;
    const filter = ctx.state.filterRole;
    const everyone = M.allPeople(d).slice().sort(function (a, b) { return a.name.localeCompare(b.name); });
    const people = everyone.filter(function (p) { return filter === "all" || p.role === filter; });
    const roles = M.ROLES.filter(function (r) { return everyone.some(function (p) { return p.role === r.key; }); });
    const filters = '<div class="filters" role="group" aria-label="Show">' +
      '<button type="button" class="filter' + (filter === "all" ? " is-active" : "") + '" data-action="filter-role" data-role="all">Everyone <span class="filter__n">' + everyone.length + "</span></button>" +
      roles.map(function (r) { const n = everyone.filter(function (p) { return p.role === r.key; }).length; return '<button type="button" class="filter' + (filter === r.key ? " is-active" : "") + '" data-action="filter-role" data-role="' + r.key + '">' + esc(r.label) + ' <span class="filter__n">' + n + "</span></button>"; }).join("") + "</div>";
    const bar = '<div class="toolbar">' + filters + '<span class="spacer"></span><button type="button" class="btn btn--primary" data-action="add-person">' + icon("plus") + "Add person</button></div>";
    if (!everyone.length) {
      return '<div class="page">' + C.empty("welcome", "No contacts yet.", "Everyone you're selling to appears here with their deals. Claude adds them from your email and calls, or add someone yourself.",
        '<div class="empty__actions"><button type="button" class="btn btn--primary" data-action="add-person">' + icon("plus") + "Add person</button></div>") + "</div>";
    }
    const rows = people.map(function (p) {
      const deals = M.dealsForPerson(d, p.id);
      const open = deals.filter(M.isOpen);
      const value = open.reduce(function (s, x) { return s + (Number(x.value) || 0); }, 0);
      const role = M.ROLES.find(function (r) { return r.key === p.role; });
      return '<button type="button" class="table__row' + ctx.anim("p-" + p.id) + '" role="row" data-action="open-person" data-person="' + esc(p.id) + '">' +
        '<span class="table__name" role="cell">' + C.avatar(p) + '<span><strong>' + esc(p.name) + '</strong><span class="muted">' + esc(p.organisation || p.email || "") + "</span></span></span>" +
        '<span role="cell"><span class="chip role-chip--' + esc(p.role || "other") + '">' + esc(role ? role.label : "Other") + "</span></span>" +
        '<span role="cell" class="muted">' + (open.length ? open.length + (open.length === 1 ? " open deal" : " open deals") : deals.length ? deals.length + (deals.length === 1 ? " past deal" : " past deals") : "") + "</span>" +
        '<span role="cell" class="num">' + (value ? esc(M.money(d, value)) : "") + "</span></button>";
    }).join("");
    return '<div class="page">' + bar + '<div class="panel panel--flush"><div class="table people-table" role="table">' +
      '<div class="table__row table__row--head" role="row"><span role="columnheader">Name</span><span role="columnheader">Type</span><span role="columnheader">Deals</span><span role="columnheader">In the pipeline</span></div>' +
      (rows || '<p class="list-empty">Nobody of that type yet.</p>') + "</div></div>" +
      (M.allPeople(d).some(function (p) { return p.fromTaskList; }) ? '<p class="muted page-foot">Includes the contacts in your task list. Change their details there; their deals show here.</p>' : "") + "</div>";
  }

  window.PL.views = window.PL.views || {};
  window.PL.views.people = {
    title: function () { return "People"; },
    sub: function (ctx) { const n = M.allPeople(ctx.d).length; return n ? n + (n === 1 ? " contact" : " contacts") : "Your contacts"; },
    render: render
  };
})();
