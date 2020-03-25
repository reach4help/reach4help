interface AsyncActionType {
  PENDING: string;
  COMPLETED: string;
  REJECTED: string;
  toString: Function;
}

const createActionTypeFactory = (module: string) => {

  const asyncType = (actionName: string): AsyncActionType => {
    const baseName = `${module}/${actionName}`;

    const baseAction: AsyncActionType = {
      PENDING: `${baseName }_PENDING`,
      COMPLETED: `${baseName }_COMPLETED`,
      REJECTED: `${baseName }_REJECTED`,
      toString: () => baseName,
    };

    return baseAction;
  };

  const syncType = (actionName: string): string => `${module}/${actionName}`;

  return {
    asyncType,
    syncType,
  };
};

export default createActionTypeFactory;
