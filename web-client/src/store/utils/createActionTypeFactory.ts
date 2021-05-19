interface AsyncActionType {
  PENDING: string;
  COMPLETED: string;
  REJECTED: string;
  toString: Function;
}

interface ObserverActionType {
  SUBSCRIBE: string;
  UNSUBSCRIBE: string;
  ERROR: string;
  UPDATED: string;
  toString: Function;
}

const createActionTypeFactory = (module: string) => {
  const asyncType = (actionName: string): AsyncActionType => {
    const baseName = `${module}/${actionName}`;

    const baseAction: AsyncActionType = {
      PENDING: `${baseName}_PENDING`,
      COMPLETED: `${baseName}_COMPLETED`,
      REJECTED: `${baseName}_REJECTED`,
      toString: () => baseName,
    };

    return baseAction;
  };

  const observerType = (actionName: string): ObserverActionType => {
    const baseName = `${module}/${actionName}`;

    const baseAction: ObserverActionType = {
      SUBSCRIBE: `${baseName}_SUBSCRIBE`,
      UNSUBSCRIBE: `${baseName}_UNSUBSCRIBE`,
      UPDATED: `${baseName}_UPDATED`,
      ERROR: `${baseName}_ERROR`,
      toString: () => baseName,
    };

    return baseAction;
  };

  const syncType = (actionName: string): string => `${module}/${actionName}`;

  return {
    asyncType,
    syncType,
    observerType,
  };
};

export default createActionTypeFactory;
