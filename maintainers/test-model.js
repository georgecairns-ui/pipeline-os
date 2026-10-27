/*
  Checks the money sums in apps/pipeline/app/model.js (the views never sum, they ask the model).
  Run: node maintainers/test-model.js
*/
"use strict";

const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const file = path.join(__dirname, "..", "apps", "pipeline", "app", "model.js");
const sandbox = { window: { TaskListOS: { ui: new Proxy({}, { get: function () { return function () { return ""; }; } }) } }, console: console };
vm.runInNewContext(fs.readFileSync(file, "utf8"), sandbox, { filename: file });
const M = sandbox.window.PL.model;

const d = { deals: [
  { id: "a", stage: "won", value: 100 },
  { id: "b", stage: "won", value: "250.5" },
  { id: "c", stage: "won", value: null },
  { id: "d", stage: "won", value: 70, suggested: true },
  { id: "e", stage: "lost", value: 40 }
] };
const open = M.openStages()[0].key;
d.deals.push({ id: "f", stage: open, value: 300 }, { id: "g", stage: open, value: "abc" }, { id: "h", stage: open, value: 20, suggested: true });

assert.strictEqual(M.dealsValue([]), 0);
assert.strictEqual(M.dealsValue([{ value: 5 }, { value: "7" }, { value: undefined }, { value: "x" }]), 12);
assert.strictEqual(M.stageValue(d, "won"), 350.5);
assert.strictEqual(M.stageValue(d, "lost"), 40);
assert.strictEqual(M.stageValue(d, open), 300);
assert.strictEqual(M.pipelineValue(d), 300);
assert.strictEqual(M.dealsValue(M.dealsInStage(d, "won").filter(function (x) { return x.id !== "a"; })), 250.5);
console.log("test-model: all checks passed");
