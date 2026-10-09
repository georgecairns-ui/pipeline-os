/*
  BRAIN DUMP: talk, and Claude sorts your pipeline
  ------------------------------------------------
  The same Brain dump as Task List OS: press "Brain dump" (or V) and talk. Your words appear as you
  speak. Press Done and Claude works out what to do: update a deal, add one, move one on, add a
  person, write an email, or put a task in the task list.

  Pipeline OS adds one thing: "What's it about?". The person can point Claude at a deal, a person,
  their pipeline in general, or another tool in the folder (Task List OS when it's attached), or
  leave it to Claude. Claude still decides what to create and what to move.

  The speech-to-text is done by the browser's built-in speech recognition (Chrome uses Google's
  speech service, Edge uses Microsoft's, Safari uses Apple's). Nothing is recorded or kept as audio:
  only the text is saved. In a browser without it (Firefox), the person types instead.
*/
(function () {
  "use strict";

  const ui = window.TaskListOS.ui, esc = ui.esc, icon = ui.icon;
  function recognition() { return window.SpeechRecognition || window.webkitSpeechRecognition; }
  function supported() { return typeof recognition() === "function"; }

  // The "What's it about?" row. opts.deals and opts.people are [{ id, label }], opts.tools is
  // [{ id, label }] for the other tools in this folder, opts.preset is an about item to start with.
  function aboutRow(opts) {
    const o = opts || {};
    const chip = function (type, id, label, on) {
      return '<button type="button" class="about-chip" data-about-type="' + esc(type) + '" data-about-id="' + esc(id || "") + '" aria-pressed="' + !!on + '">' + esc(label) + "</button>";
    };
    const preset = o.preset;
    return '<div class="about"><span class="about__label">What’s it about?</span><div class="about__chips">' +
      chip("auto", "", "Let Claude decide", !preset) +
      chip("pipeline", "", "My pipeline", false) +
      (o.deals && o.deals.length ? '<select class="select select--sm about__pick" data-about-pick="deal" aria-label="A deal"><option value="">A deal…</option>' +
        o.deals.map(function (x) { return '<option value="' + esc(x.id) + '"' + (preset && preset.type === "deal" && preset.id === x.id ? " selected" : "") + ">" + esc(x.label) + "</option>"; }).join("") + "</select>" : "") +
      (o.people && o.people.length ? '<select class="select select--sm about__pick" data-about-pick="person" aria-label="A person"><option value="">A person…</option>' +
        o.people.map(function (p) { return '<option value="' + esc(p.id) + '">' + esc(p.label) + "</option>"; }).join("") + "</select>" : "") +
      (o.tools || []).map(function (t) { return chip("tool", t.id, t.label, false); }).join("") +
      '</div><div class="about__picked" aria-live="polite"></div></div>';
  }

  // Keeps track of what's picked: Let Claude decide, or any mix of the others
  function bindAbout(root, preset) {
    const picked = [];
    const out = root.querySelector(".about__picked");
    const auto = root.querySelector('[data-about-type="auto"]');
    function draw() {
      auto.setAttribute("aria-pressed", String(!picked.length));
      root.querySelectorAll(".about-chip:not([data-about-type=auto])").forEach(function (b) {
        b.setAttribute("aria-pressed", String(picked.some(function (p) { return p.type === b.dataset.aboutType && p.id === b.dataset.aboutId; })));
      });
      out.innerHTML = picked.filter(function (p) { return p.type === "deal" || p.type === "person"; }).map(function (p, i) {
        return '<span class="about-tag">' + esc(p.label) + '<button type="button" class="about-tag__x" data-about-remove="' + i + '" aria-label="Remove ' + esc(p.label) + '">' + icon("x") + "</button></span>";
      }).join("");
    }
    function toggle(item) {
      const i = picked.findIndex(function (p) { return p.type === item.type && p.id === item.id; });
      if (i > -1) picked.splice(i, 1); else picked.push(item);
      draw();
    }
    if (preset) picked.push(preset);
    root.addEventListener("click", function (e) {
      const b = e.target.closest(".about-chip");
      if (b) {
        if (b.dataset.aboutType === "auto") picked.length = 0;
        else toggle({ type: b.dataset.aboutType, id: b.dataset.aboutId, label: b.textContent });
        draw();
        return;
      }
      const x = e.target.closest("[data-about-remove]");
      if (x) {
        const shown = picked.filter(function (p) { return p.type === "deal" || p.type === "person"; });
        const item = shown[Number(x.getAttribute("data-about-remove"))];
        picked.splice(picked.indexOf(item), 1);
        draw();
      }
    });
    root.querySelectorAll("[data-about-pick]").forEach(function (sel) {
      sel.addEventListener("change", function () {
        if (!sel.value) return;
        const item = { type: sel.dataset.aboutPick, id: sel.value, label: sel.options[sel.selectedIndex].textContent };
        if (!picked.some(function (p) { return p.type === item.type && p.id === item.id; })) picked.push(item);
        sel.value = "";
        draw();
      });
    });
    draw();
    return function () { return picked.slice(); };
  }

  // Opens the recorder. onDone(text, about) is called with the finished note and what it's about.
  function open(onDone, opts) {
    const o = opts || {};
    const dlg = document.createElement("dialog");
    dlg.className = "modal modal--voice";
    dlg.setAttribute("aria-labelledby", "voiceTitle");
    document.body.appendChild(dlg);

    // No speech in this browser: type it instead, with the same "What's it about?"
    if (!supported()) {
      dlg.innerHTML = '<div class="voice">' +
        '<button type="button" class="voice__close icon-btn" data-voice="cancel" aria-label="Cancel">' + icon("x") + "</button>" +
        '<h2 id="voiceTitle">Brain dump</h2>' + aboutRow(o) +
        '<textarea class="textarea voice__type" rows="7" placeholder="Everything on your mind about your sales: who to chase, what happened on a call, a new lead, a deal that’s gone cold. Claude sorts it out."></textarea>' +
        '<div class="voice__actions"><button type="button" class="btn btn--lg" data-voice="cancel">Cancel</button><button type="button" class="btn btn--primary btn--lg" data-voice="done">' + icon("check") + "Done</button></div>" +
        '<p class="voice__small">This browser can’t turn speech into text, so type it instead. In Chrome, Edge or Safari you can talk.</p></div>';
      const getAbout = bindAbout(dlg, o.preset);
      const ta = dlg.querySelector(".voice__type");
      dlg.addEventListener("click", function (e) {
        const b = e.target.closest("[data-voice]");
        if (!b) return;
        const text = ta.value.replace(/\s+/g, " ").trim();
        dlg.close(); dlg.remove();
        if (b.getAttribute("data-voice") === "done" && text) onDone(text, getAbout());
      });
      dlg.addEventListener("cancel", function () { dlg.remove(); });
      dlg.showModal();
      ta.focus();
      return;
    }

    dlg.innerHTML =
      '<div class="voice">' +
      '<button type="button" class="voice__close icon-btn" data-voice="cancel" aria-label="Cancel">' + icon("x") + "</button>" +
      '<h2 id="voiceTitle" class="sr-only">Brain dump</h2>' +
      '<div class="voice__mic is-live" aria-hidden="true">' + icon("mic") + "</div>" +
      '<p class="voice__status" role="status">Listening… <span class="voice__time num">0:00</span></p>' +
      '<div class="voice__text" aria-live="polite"><span class="voice__final"></span><span class="voice__interim"></span>' +
      '<span class="voice__hint">Talk naturally about your sales. Who to chase, how a call went, a new lead, a deal that’s moved. Claude works out what to update, add or move.</span></div>' +
      aboutRow(o) +
      '<div class="voice__actions"><button type="button" class="btn btn--lg" data-voice="cancel">Cancel</button>' +
      '<button type="button" class="btn btn--primary btn--lg" data-voice="done">' + icon("check") + "Done</button></div>" +
      '<p class="voice__small">Your browser turns your speech into text (Chrome uses Google’s speech service). Only the text is saved.</p>' +
      "</div>";

    const getAbout = bindAbout(dlg, o.preset);
    const finalEl = dlg.querySelector(".voice__final");
    const interimEl = dlg.querySelector(".voice__interim");
    const hintEl = dlg.querySelector(".voice__hint");
    const statusEl = dlg.querySelector(".voice__status");
    const micEl = dlg.querySelector(".voice__mic");
    const timeEl = dlg.querySelector(".voice__time");

    let finalText = "";
    let listening = true;   // false once Done or Cancel is pressed
    let failed = false;
    const started = Date.now();
    const clock = setInterval(function () {
      const s = Math.floor((Date.now() - started) / 1000);
      timeEl.textContent = Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
    }, 500);

    const Recognition = recognition();
    const rec = new Recognition();
    rec.lang = "en-GB";
    rec.continuous = true;
    rec.interimResults = true;

    rec.onresult = function (e) {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const piece = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalText += (finalText && !/\s$/.test(finalText) ? " " : "") + piece.trim();
        else interim += piece;
      }
      finalEl.textContent = finalText;
      interimEl.textContent = interim ? " " + interim : "";
      hintEl.hidden = !!(finalText || interim);
      const box = dlg.querySelector(".voice__text");
      box.scrollTop = box.scrollHeight;
    };
    rec.onerror = function (e) {
      if (e.error === "no-speech" || e.error === "aborted") return; // keep going
      failed = true;
      micEl.classList.remove("is-live");
      const messages = {
        "not-allowed": "Your microphone is blocked for this page. Click the microphone or lock icon in the address bar, allow the microphone, then try again.",
        "service-not-allowed": "Your microphone is blocked for this page. Click the microphone or lock icon in the address bar, allow the microphone, then try again.",
        "audio-capture": "No microphone was found. Check one is connected, then try again.",
        "network": "Your browser couldn’t reach its speech service. Check your internet connection and try again."
      };
      statusEl.textContent = messages[e.error] || "Something went wrong with the microphone. Please try again.";
      statusEl.classList.add("is-error");
    };
    // Browsers stop listening after a pause; carry on until the person presses Done
    rec.onend = function () {
      if (listening && !failed) { try { rec.start(); } catch (err) { /* already restarting */ } }
    };

    function finish(save) {
      listening = false;
      clearInterval(clock);
      try { rec.stop(); } catch (err) { /* already stopped */ }
      const text = (finalText + " " + interimEl.textContent).replace(/\s+/g, " ").trim();
      const about = getAbout();
      dlg.close();
      dlg.remove();
      if (save && text) onDone(text, about);
      else if (save) ui.toast("Nothing was heard, so nothing was saved", { icon: "info" });
    }
    dlg.addEventListener("click", function (e) {
      const b = e.target.closest("[data-voice]");
      if (b) finish(b.getAttribute("data-voice") === "done");
    });
    dlg.addEventListener("cancel", function (e) { e.preventDefault(); finish(false); }); // Esc
    dlg.showModal();
    dlg.querySelector('[data-voice="done"]').focus();
    try { rec.start(); } catch (err) { rec.onerror({ error: "audio-capture" }); }
  }

  window.PL = window.PL || {};
  window.PL.voice = { supported: supported, open: open };
})();
