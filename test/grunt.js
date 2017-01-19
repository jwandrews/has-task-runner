import path from 'path';
import test from 'ava';
import m from '../index.js';

const task = 'grunt';

test( 'taskfile exists, pkg exists', async t => {
  const projectPath = path.resolve(`fixtures/${task}/taskfile`);
  const tr = await m(task, {path: projectPath});

  t.is(tr.name, task);
  t.true(tr.runnerExists);
  t.true(tr.pkgExists);
});

test( 'taskfile exists, no pkg', async t => {
  const projectPath = path.resolve(`fixtures/${task}/taskfile-no-pkg`);
  const tr = await m(task, {path: projectPath});

  t.is(tr.name, task);
  t.true(tr.runnerExists);
  t.false(tr.pkgExists);
});

test( 'no taskfile, no pkg', async t => {
  const projectPath = path.resolve(`fixtures/${task}/no-taskfile-no-pkg`);
  const tr = await m(task, {path: projectPath});

  t.is(tr.name, task);
  t.false(tr.runnerExists);
  t.false(tr.pkgExists);
});

test( 'no taskfile, pkg exists', async t => {
  const projectPath = path.resolve(`fixtures/${task}/no-taskfile-pkg-exists`);
  const tr = await m(task, {path: projectPath});

  t.is(tr.name, task);
  t.false(tr.runnerExists);
  t.true(tr.pkgExists);
});
