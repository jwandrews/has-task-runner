import test from 'ava';
import m from '../index.js';

test( 'no path', t => {
  const task = '';
  const path = '/non/existent/path/';

  const error = t.throws(
    () => {
      m(task, {path})
    },
    Error
  );

  t.is( error.message, 'Cannot find path to project.');
});
