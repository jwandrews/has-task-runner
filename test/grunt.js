import { dirname, resolve } from 'node:path';
import test from 'ava';
import m from '../index.js';

const task = 'grunt';
const __dirname = dirname(new URL(import.meta.url).pathname);

test('taskfile exists, pkg exists', async (t) => {
  t.plan(3);

  const projectPath = resolve(__dirname, `fixtures/${task}/taskfile`);
  const response = await m(task, { path: projectPath });
  const { name, runnerExists, pkgExists } = response;

  t.is(name, task);
  t.true(runnerExists);
  t.true(pkgExists);
});

test('taskfile exists, no pkg', async (t) => {
  t.plan(3);

  const projectPath = resolve(__dirname, `fixtures/${task}/taskfile-no-pkg`);
  const response = await m(task, { path: projectPath });
  const { name, runnerExists, pkgExists } = response;

  t.is(name, task);
  t.true(runnerExists);
  t.false(pkgExists);
});

test('no taskfile, no pkg', async (t) => {
  t.plan(3);

  const projectPath = resolve(__dirname, `fixtures/${task}/no-taskfile-no-pkg`);
  const response = await m(task, { path: projectPath });
  const { name, runnerExists, pkgExists } = response;

  t.is(name, task);
  t.false(runnerExists);
  t.false(pkgExists);
});

test('no taskfile, pkg exists', async (t) => {
  t.plan(3);

  const projectPath = resolve(__dirname, `fixtures/${task}/no-taskfile-pkg-exists`);
  const response = await m(task, { path: projectPath });
  const { name, runnerExists, pkgExists } = response;

  t.is(name, task);
  t.false(runnerExists);
  t.true(pkgExists);
});
