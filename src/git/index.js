import shell from 'shelljs';

import { handleShellExecError } from '../utils';

const getBumpVersion = `git log -1 --pretty=%B |grep -oE "[^Merge branch 'release\/](\.\d+){0,2}"`;
const getPreviousTag = `git log --pretty=%B $PREVIOUS_VERSION...HEAD |grep "Merge branch 'feature/" |grep -oE "'(.*)'"`;

export default class RepoManager {
  constructor() {
    checkGit();
    this.bumpVersion = handleShellExecError(shell.exec(getBumpVersion), 'Fail to get the bump version');
    this.previousTag = handleShellExecError(shell.exec(getPreviousTag), 'Fail to get the previous tag');
  }
}

function checkGit() {
  if (!shell.which('git')) {
    throw new Error('Git is not installed.');
  }
}
