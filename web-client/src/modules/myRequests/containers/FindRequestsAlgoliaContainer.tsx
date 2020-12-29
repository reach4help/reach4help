import algoliasearch from 'algoliasearch/lite';
import React from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import {
  Control,
  GeoSearch,
  GoogleMapsLoader,
  Marker,
} from 'react-instantsearch-dom-maps';
import LoadingWrapper from 'src/components/LoadingComponent/LoadingComponent';
import { useSearchKey } from 'src/ducks/search/operations';

// const Debug = connectHits(({ hits }) => (
//   <ul>
//     {hits.map((hit, i) => (
//       <li key={i}>{JSON.stringify(hit._geoloc)}</li>
//     ))}
//   </ul>
// ));

const FindRequestsContainer: React.FC = () => {
  const searchKey = useSearchKey();

  if (!searchKey) {
    return <LoadingWrapper />;
  }

  const searchClient = algoliasearch(searchKey.appId, searchKey.searchKey);

  // Based on
  // https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/geo-search/react/
  // Data retrieval and UI component are tightly coupled
  return (
    <InstantSearch
      // indexName="airports"
      indexName={searchKey.indexName}
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
      {/* <Debug /> */}
    </InstantSearch>
  );
};

export default FindRequestsContainer;
