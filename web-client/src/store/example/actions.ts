import HTTPRequest from '../../http/HTTPRequest';
import { DECREMENT, FETCH_USERS_COMPLETED, INCREMENT, SUM } from './types';

export const incrementAction = {
  type: INCREMENT,
};

export const decrementAction = {
  type: DECREMENT,
};

export const sumAction = (value: number) => ({
  type: SUM,
  payload: {
    value,
  },
});
export const fetchUsersCompleted = (data: any) => ({
  type: FETCH_USERS_COMPLETED,
  payload: {
    users: data,
  },
});

export const fetchUsersAction = () => (dispatch: Function) => {
  HTTPRequest.getInstance().execute({
    method: 'GET',
    url: '/users',
  })
    .then((req: any) => req.data.data)
    .then((data: any) => dispatch(fetchUsersCompleted(data)));
};
