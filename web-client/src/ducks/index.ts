import auth from './auth/reducer';
import findRequestReducer from './findRequests/reducer';
import myOfferReducer from './myOffers/reducer';
import myRequestReducer from './myRequests/reducer';
import profile from './profile/reducer';
import search from './search/reducer';
import offers from './specificOffers/reducer';
import timeline from './timeline/reducer';

export default {
  auth,
  offers,
  profile,
  myOfferReducer,
  myRequestReducer,
  findRequestReducer,
  timeline,
  search,
};
