import request from '../../http/Request';

const injectRequestMiddleware = () => (next: Function) => async (action: Record<string, any>) => {
  if (action.api && typeof action.api === 'function') {
    const response = await action.api(request, action.payload);

    return next({
      type: `${action.type}`,
      payload: response.data,
      meta: action.payload,
      api: action.api,
    });
  }
  return next(action);
};

export default injectRequestMiddleware;
