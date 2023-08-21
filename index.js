import { join } from 'path';
import resolvePkg from 'resolve-pkg';
import { pathExists, pathExistsSync } from 'path-exists';

const taskRunners = {
  gulp: { name: 'Gulp', file: 'gulpfile.js', pkg: 'gulp' },
  grunt: { name: 'Grunt', file: 'gruntfile.js', pkg: 'grunt' },
};

class TaskRunnerError extends Error {
  constructor({ path, name, runnerExists, pkgExists, message }) {
    super(message);
    this.path = path;
    this.name = name;
    this.runnerExists = runnerExists;
    this.pkgExists = pkgExists;
  }
}

export async function hasTaskRunner(task, opts = {}) {
  const projectPath = opts.path || process.cwd();
  const tasks = Object.keys(taskRunners);

  if (!pathExistsSync(projectPath)) {
    throw new Error('Cannot find path to project.');
  }

  if (!task) {
    throw new Error('No task runner specified.');
  }

  if (tasks.indexOf(task) === -1) {
    throw new Error(`${task} is currently unsupported.`);
  }

  const taskFile = taskRunners[task].file;
  const taskName = taskRunners[task].name;
  const taskRunnerFilePath = join(projectPath, taskFile);
  const hasTaskPkg = resolvePkg(taskRunners[task].pkg, { cwd: projectPath });

  const exists = await pathExists(taskRunnerFilePath);
  if (!exists) {
    return new TaskRunnerError({
      path: taskRunnerFilePath,
      name: task,
      runnerExists: false,
      pkgExists: !!hasTaskPkg,
      message: `No ${taskFile} file found.`,
    });
  } else if (!hasTaskPkg) {
    return new TaskRunnerError({
      path: taskRunnerFilePath,
      name: task,
      runnerExists: true,
      pkgExists: !!hasTaskPkg,
      message: `${taskFile} found, but ${taskName} is not installed.`,
    });
  }

  return {
    path: taskRunnerFilePath,
    name: task,
    runnerExists: true,
    pkgExists: !!hasTaskPkg,
    message: `This is a ${taskName} project.`,
  };
}

export default hasTaskRunner;
