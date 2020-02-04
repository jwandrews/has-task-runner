"use strict";

const test = require("ava");
const m = require("..");

test("no path", async t => {
  t.plan(1);

  const task = "";
  const path = "/non/existent/path/";

  try {
    await m(task, { path });
  } catch (error) {
    t.is(error.message, "Cannot find path to project.");
  }
});
