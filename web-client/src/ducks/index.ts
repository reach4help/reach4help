import auth from './auth/reducer';
import findRequestReducer from './findRequests/reducer';
import profile from './profile/reducer';
import myOfferReducer from './PublicOffers/reducer';
import myRequestReducer from './PublicRequests/reducer';
import search from './search/reducer';
import timeline from './timeline/reducer';
import offers from './xxspecificOffers/reducer';

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
