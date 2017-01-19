import path from 'path';
import test from 'ava';
import m from '../index.js';

const task = 'gulp';

test( 'taskfile exists, pkg exists', t => {
  const projectPath = path.resolve( `fixtures/${task}/taskfile` );
  m( task, { path: projectPath }).then(({ name, runnerExists, pkgExists }) => {
    t.plan( 3 );
    t.is( name, task );
    t.true( runnerExists );
    t.true( pkgExists );
  });
});

test( 'taskfile exists, no pkg', t => {
  const projectPath = path.resolve( `fixtures/${task}/taskfile-no-pkg` );
  m( task, { path: projectPath }).then(({ name, runnerExists, pkgExists }) => {
    t.plan( 3 );
    t.is( name, task );
    t.true( runnerExists );
    t.false( pkgExists );
  });
});

test( 'no taskfile, no pkg', t => {
  const projectPath = path.resolve( `fixtures/${task}/no-taskfile-no-pkg` );
  m( task, { path: projectPath }).then(({ name, runnerExists, pkgExists }) => {
    t.plan( 3 );
    t.is( name, task );
    t.false( runnerExists );
    t.false( pkgExists );
  });
});

test( 'no taskfile, pkg exists', t => {
  const projectPath = path.resolve( `fixtures/${task}/no-taskfile-pkg-exists` );
  m( task, { path: projectPath }).then(({ name, runnerExists, pkgExists }) => {
    t.plan( 3 );
    t.is( name, task );
    t.false( runnerExists );
    t.true( pkgExists );
  });
});
