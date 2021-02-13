import auth from './auth/reducer';
import findRequestReducer from './findRequests/reducer';
import myOfferReducer from './GeneralOffers/reducer';
import myRequestReducer from './GeneralRequests/reducer';
import profile from './profile/reducer';
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
