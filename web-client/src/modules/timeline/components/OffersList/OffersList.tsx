import React, { useEffect, useState } from 'react';
import { Offer } from 'src/models/offers';

interface OffersListProps {
  offers: Record<string, Offer>;
  loading: boolean;
  handleOffer: (action: boolean) => void;
}

interface OfferItemProps {
  offer: Offer;
  handleOffer: (action: boolean) => void;
}

const OfferItem: React.FC<OfferItemProps> = ({
  offer,
  handleOffer,
}): React.ReactElement => (
  <>
    {offer.cavUserSnapshot.displayName}
    <button type="button" onClick={() => handleOffer(true)}>
      Accept
    </button>
    <button type="button" onClick={() => handleOffer(false)}>
      Reject
    </button>
  </>
);

const OffersList: React.FC<OffersListProps> = ({
  offers,
  handleOffer,
}): React.ReactElement => {
  const [offersList, setOffersList] = useState<React.ReactElement<any>[]>([]);

  useEffect(() => {
    const internalOffersList: React.ReactElement<any>[] = [];
    for (const key in offers) {
      if (offers[key]) {
        internalOffersList.push(
          <OfferItem handleOffer={handleOffer} offer={offers[key]} />,
        );
      }
    }

    setOffersList(internalOffersList);
  }, [offers, handleOffer, setOffersList]);

  return <>{offersList}</>;
};

export default OffersList;
