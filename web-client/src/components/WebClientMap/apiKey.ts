/**
 * The default API Key is obtained from the env variable REACT_APP_GMAPS_API_KEY
 * The one provided in the repo is what's used on the live site,
 * and is restricted to map.reach4help.org
 *
 * To use your own key,
 * set the environment variable `REACT_APP_GMAPS_API_KEY` to your key.
 * or set the global window variable `GOOGLE_MAPS_API_KEY`
 */
const PUBLIC_API_KEY = process.env.REACT_APP_GMAPS_API_KEY;

declare global {
  interface Window {
    GOOGLE_MAPS_API_KEY?: string;
  }
}

const apiKey = window.GOOGLE_MAPS_API_KEY
  ? window.GOOGLE_MAPS_API_KEY
  : PUBLIC_API_KEY;

export default apiKey;
