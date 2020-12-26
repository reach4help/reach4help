import algoliasearch from 'algoliasearch/lite';
import React from 'react';
import { connectHits, Hits, InstantSearch } from 'react-instantsearch-dom';
import {
  Control,
  GeoSearch,
  GoogleMapsLoader,
  Marker,
} from 'react-instantsearch-dom-maps';
import styled from 'styled-components';

import { Algolia } from '../constants';

const searchClient = algoliasearch(Algolia.appId, Algolia.tempSearchKey);

// const searchClient = algoliasearch(
//   'latency',
//   '6be0576ff61c053d5f9a3225e2a90f76',
// );

const Debug = connectHits(({ hits }) => (
  <ul>
    {hits.map((hit, i) => (
      <li key={i}>{JSON.stringify(hit._geoloc)}</li>
    ))}
  </ul>
));

const FindRequestsContainer: React.FC = () => (
  <InstantSearch
    // indexName="airports"
    indexName={Algolia.tempAuthIndexName}
    searchClient={searchClient}
  >
    <div style={{ height: 500 }}>
      <GoogleMapsLoader
        // endpoint="https://maps.googleapis.com/maps/api/js?v3.40"
        apiKey={process.env.REACT_APP_GMAPS_API_KEY}
      >
        {google => (
          <GeoSearch
            enableRefineOnMapMove={false}
            google={google}
            mapTypeId={google.maps.MapTypeId.ROADMAP}
            initialPosition={{ lat: 42.3684331, lng: -71.0373524 }}
            initialZoom={8}
          >
            {({ hits }) => (
              <div>
                <Control />
                {hits.map(hit => (
                  <Marker key={hit.objectID} hit={hit} />
                ))}
              </div>
            )}
          </GeoSearch>
        )}
      </GoogleMapsLoader>
    </div>
    <Debug />
  </InstantSearch>
);

export default FindRequestsContainer;
