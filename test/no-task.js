"use strict";

const test = require("ava");
const m = require("..");

test("task is empty string", async t => {
  t.plan(1);
  let task = "";

  try {
    await m(task);
  } catch (error) {
    t.is(error.message, "No task runner specified.");
  }
});

test("task is null", async t => {
  t.plan(1);
  let task = null;

  try {
    m(task);
  } catch (error) {
    t.is(error.message, "No task runner specified.");
  }
});

test("task is undefined", async t => {
  t.plan(1);
  let task;

  try {
    m(task);
  } catch (error) {
    t.is(error.message, "No task runner specified.");
  }
});

test("task is something else", async t => {
  t.plan(1);
  let task = "not-a-task-runner-or-an-unsupported-runner";

  try {
    m(task);
  } catch (error) {
    t.is(error.message, `${task} is currently unsupported.`);
  }
});
