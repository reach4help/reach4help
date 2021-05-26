import algoliasearch from 'algoliasearch/lite';
import React, { useCallback, useEffect, useState } from 'react';
import { InstantSearch } from 'react-instantsearch-dom';
import {
  GoogleMapsLoader,
  GeoSearch,
  Marker,
} from 'react-instantsearch-dom-maps';

const ALGOLIA_SEARCH_KEY = process.env.REACT_APP_ALGOLIA_SEARCH_KEY;
const ALGOLIA_APP_ID = process.env.REACT_APP_ALGOLIA_APP_ID;
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const searchClient = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_KEY);

const App = () => {
  const [currentLatitude, setCurrentLatitude] = useState();
  const [currentLongitude, setCurrentLongitude] = useState();

  const getLocPromiseFunc = () =>
    new Promise((resolve, reject) => {
      window.navigator.geolocation.getCurrentPosition(
        p => {
          resolve({ lat: p.coords.latitude, long: p.coords.longitude });
        },
        err => {
          reject(err);
        },
      );
    });

  const callbackGetLoc = useCallback(getLocPromiseFunc, []);

  useEffect(() => {
    async function getAsync() {
      // UseGetPos();
      const coords = await callbackGetLoc();
      if (coords) {
        setCurrentLatitude(coords.lat);
        setCurrentLongitude(coords.long);
      }
    }
    getAsync();
  }, [currentLatitude, currentLongitude, callbackGetLoc]);
  const lat = currentLatitude || 42.3684331;
  const long = currentLongitude || -71.0373524;
  return (
    <div style={{ width: '500px', height: '500px' }}>
      <p>
        Long {currentLongitude} {currentLatitude});
      </p>
      <InstantSearch indexName="airports" searchClient={searchClient}>
        {/* <Configure
          filters="free_shipping:true"
          hitsPerPage={4}
          analytics={false}
          enablePersonalization={true}
          distinct
        /> */}
        <div style={{ width: '500px', height: '500px' }}>
          <GoogleMapsLoader apiKey={GOOGLE_MAPS_API_KEY}>
            {google => (
              <GeoSearch
                google={google}
                mapTypeId={google.maps.MapTypeId.ROADMAP}
                initialPosition={{ lat: lat, lng: long }}
                initialZoom={18}
                mapObject={{ zoom: 18 }}
              >
                {({ hits }) => (
                  <div>
                    {hits.map((hit, i) => (
                      <div key={`div-${i}`}>
                        <p> {hit.name} </p>
                        <Marker hit={hit} />
                      </div>
                    ))}
                  </div>
                )}
              </GeoSearch>
            )}
          </GoogleMapsLoader>
        </div>
      </InstantSearch>
    </div>
  );
};

export default App;
