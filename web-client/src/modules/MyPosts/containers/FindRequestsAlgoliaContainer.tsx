import algoliasearch from 'algoliasearch/lite';
import React, { useEffect } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import {
  Control,
  GeoSearch,
  GoogleMapsLoader,
  Marker,
} from 'react-instantsearch-dom-maps';
import { useDispatch, useSelector } from 'react-redux';
import LoadingWrapper from 'src/components/LoadingComponent/LoadingComponent';
import {
  getAuthenticatedSearchKey,
  getUnauthenticatedSearchKey,
} from 'src/ducks/search/actions';
import { AppState } from 'src/store';

// const Debug = connectHits(({ hits }) => (
//   <ul>
//     {hits.map((hit, i) => (
//       <li key={i}>{JSON.stringify(hit._geoloc)}</li>
//     ))}
//   </ul>
// ));

const FindRequestsContainer: React.FC = () => {
  const dispatch = useDispatch();

  const onboarded = useSelector((state: AppState) => state.auth.onboarded);
  const searchKeyState = useSelector(
    (state: AppState) => state.search.getSearchKey,
  );

  useEffect(() => {
    if (
      !searchKeyState.loading &&
      !searchKeyState.data &&
      !searchKeyState.error
    ) {
      if (onboarded) {
        dispatch(getAuthenticatedSearchKey());
      } else {
        dispatch(getUnauthenticatedSearchKey());
      }
    }
  }, [dispatch, onboarded, searchKeyState.loading]);

  if (!searchKeyState.data || searchKeyState.loading) {
    return <LoadingWrapper />;
  }

  const searchClient = algoliasearch(
    searchKeyState.data.appId,
    searchKeyState.data.searchKey,
  );

  return (
    <InstantSearch
      // indexName="airports"
      indexName={searchKeyState.data.indexName}
      searchClient={searchClient}
    >
      <div style={{ height: '100vh' }}>
        <GoogleMapsLoader apiKey={process.env.REACT_APP_GMAPS_API_KEY}>
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
