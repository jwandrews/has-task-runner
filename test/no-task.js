import test from 'ava';
import m from '../index.js';

test( 'task is empty string', t => {
  let task = '';

  let error = t.throws(
    () => {
      m( task );
    },
    Error
  );

  t.is( error.message, 'No task runner specified.' );
});

test( 'task is null', t => {
  let task = null;

  let error = t.throws(
    () => {
      m( task );
    },
    Error
  );

  t.is( error.message, 'No task runner specified.' );
});

test( 'task is undefined', t => {
  let task;

  let error = t.throws(
    () => {
      m( task );
    },
    Error
  );

  t.is( error.message, 'No task runner specified.' );
});

test( 'task is something else', t => {
  let task = 'not-a-task-runner-or-an-unsupported-runner';

  let error = t.throws(
    () => {
      m( task );
    },
    Error
  );

  t.is( error.message, `${task} is currently unsupported.` );
});
