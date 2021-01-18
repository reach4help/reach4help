import { XSpecificOffer } from 'src/models/xSpecificOffers';
import createActionTypeFactory from 'src/store/utils/createActionTypeFactory';

export const { asyncType, observerType, syncType } = createActionTypeFactory(
  'XSPECIFIC_OFFERS',
);

export interface XSpecificOffersState {
  forRequest?: {
    requestId: string;
    data?: Record<string, XSpecificOffer>;
    loading: boolean;
    error?: Error;
  };
  data?: Record<string, XSpecificOffer>;
  loading: boolean;
  error?: Error;
  observerReceivedFirstUpdate: boolean;
  setAction: {
    success?: boolean;
    loading: boolean;
    modalState: boolean;
    error?: Error;
  };
}

export const DISPATCH_CREATE_XSPECIFIC_OFFER = asyncType(
  'DISPATCH_CREATE_XSPECIFIC_OFFER',
);
