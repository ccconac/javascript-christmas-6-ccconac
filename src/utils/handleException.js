const handleException = async (action, printError) => {
  while (true) {
    try {
      return await action();
    } catch ({ message }) {
      printError(message);
    }
  }
};

export default handleException;
