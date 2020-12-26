import { User } from 'src/models/users';

import { observeFindRequests as observeFindRequestsFunc } from '../posts/functions';

export const observeFindRequests = (
  nextValue: Function,
  {
    status,
    userRef,
  }: {
    status: string | null;
    userRef: firebase.firestore.DocumentReference<User>;
  },
) =>
  observeFindRequestsFunc(nextValue, { requestingHelp: true, status, userRef });
