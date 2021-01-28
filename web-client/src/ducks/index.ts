import auth from './auth/reducer';
import findRequestReducer from './findRequests/reducer';
import profile from './profile/reducer';
import myOfferReducer from './PublicOffers/reducer';
import myRequestReducer from './PublicRequests/reducer';
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
