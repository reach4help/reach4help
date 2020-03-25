import HTTPRequest, { IHTTPRequest } from '../../http/HTTPRequest';

const request: IHTTPRequest = HTTPRequest.getInstance();

const injectRequestMiddleware = ({ dispatch }: { dispatch: Function }) => (next: Function) => async (action: Record<string, any>) => {
  if (action.api && typeof action.api === 'function') {

    dispatch({
      type: `${action.type}_PENDING`,
      payload: action.payload,
    });

    try {
      const response = await action.api(request, action.payload);

      return next({
        type: `${action.type}_COMPLETED`,
        payload: response.data,
        meta: action.payload,
        api: action.api,
      });

    } catch {
      return next({
        type: `${action.type}_REJECTED`,
        payload: action.payload,
      });
    }
  }
  return next(action);
};

export default injectRequestMiddleware;
