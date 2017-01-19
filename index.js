'use strict';

const path = require( 'path' );
const resolvePkg = require( 'resolve-pkg' );
const pathExists = require( 'path-exists' );

const taskRunners = {
  gulp: { name: 'Gulp', file: 'gulpfile.js', pkg: 'gulp' },
  grunt: { name: 'Grunt', file: 'gruntfile.js', pkg: 'grunt' },
  broccoli: { name: 'BroccoliJS', file: 'Brocfile.js', pkg: 'broccoli' }
};

module.exports = ( task, opts = {}) => {
  const projectPath = opts.path || process.cwd();
  const tasks = Object.keys( taskRunners );

  if ( !pathExists.sync( projectPath )) {
    throw new Error( 'Cannot find path to project.' );
  }

  if ( !task ) {
    throw new Error( 'No task runner specified.' );
  }

  if ( tasks.indexOf( task ) === -1 ) {
    throw new Error( `${task} is currently unsupported.` );
  }

  const taskFile = taskRunners[task].file;
  const taskName = taskRunners[task].name;
  const taskRunnerFilePath = path.join( projectPath, taskFile );
  const hasTaskPkg = resolvePkg( taskRunners[task].pkg, { cwd: projectPath });

  return new Promise(( resolve, reject ) => {
    pathExists( taskRunnerFilePath )
      .then( exists => {
        if ( !exists ) {
          reject({ path: taskRunnerFilePath, name: task, runnerExists: false, pkgExists: !!hasTaskPkg, message: `No ${taskFile} file found.` });
        } else if ( !hasTaskPkg ) {
          reject({ path: taskRunnerFilePath, name: task, runnerExists: true, pkgExists: !!hasTaskPkg, message: `${taskFile} found, but ${taskName} is not installed.` });
        }

        resolve({ path: taskRunnerFilePath, name: task, runnerExists: true, pkgExists: !!hasTaskPkg, message: `This is a ${taskName} project.` });
      });
  })
  .catch( err => err );
};
