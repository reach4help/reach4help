import auth from './auth/reducer';
import requests from './findRequests/reducer';
import posts from './myRequests/reducer';
import profile from './profile/reducer';
import search from './search/reducer';
import offers from './specificOffers/reducer';
import timeline from './timeline/reducer';

export default {
  auth,
  offers,
  profile,
  posts,
  requests,
  timeline,
  search,
};
