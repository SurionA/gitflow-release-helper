const utils = { handleShellExecError };

export { utils as default, handleShellExecError };

function handleShellExecError(action, errorMessage) {
  console.log('action', action);
  if (action.code !== 0) {
    throw new Error({ message: errorMessage, stack: action.stderr });
  }

  return action.stdout;
}
