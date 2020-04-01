import HTTPRequest, { IHTTPRequest } from '../../http/HTTPRequest';

const request: IHTTPRequest = HTTPRequest.getInstance();

const injectRequestMiddleware = ({ dispatch }: { dispatch: Function }) => (
  next: Function,
) => async (action: Record<string, any>) => {
  if (
    (action.api && typeof action.api === 'function') ||
    (action.firebase && typeof action.firebase === 'function')
  ) {
    dispatch({
      type: `${action.type}_PENDING`,
      payload: action.payload,
    });

    try {
      const response = await (action.api
        ? action.api(request, action.payload)
        : action.firebase(action.payload));

      return next({
        type: `${action.type}_COMPLETED`,
        payload: action.api ? response.data : response,
        meta: action.payload,
        api: action.api,
        firebase: !!action.firebase,
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
