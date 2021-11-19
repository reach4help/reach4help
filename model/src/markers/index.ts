import { MarkerType } from './type';

export { MarkerType };

export const MARKER_COLLECTION_ID = 'markers';

export const MARKERS_STORAGE_PATH = {
  hidden: 'map-markers-public/data-hidden.json',
  visible: 'map-markers-public/data-visible.json',
};

/**
 * Contact details capture various methods to contact an organization.
 */
export interface ContactDetails {
  facebookGroup?: string;
  web?: { [id: string]: string }; // List of URLs
  phone?: string[];
  email?: string[];
}

/**
 * Locations can be saved so they can be re-used for other markers.
 *
 * See the LOCATIONS array.
 */
export interface Location<GeoPoint> {
  /**
   * Human readable name for the location -- displayed on the web.
   */
  description: string;
  /**
   * Firestore compatible lat-lng object
   */
  latlng: GeoPoint;
  /**
   *  Measured in Meters (per Google Maps standard)
   */
  serviceRadius?: number;
}

export interface ContactGroup {
  /** general contact information */
  general?: ContactDetails;
  /** details of how those that need help can interact with the organization  */
  getHelp?: ContactDetails;
  /** details of how those who want to help can interact with the organization  */
  volunteers?: ContactDetails;
}

/**
 * A marker that will be rendered on the map. A short title and description is also visible to users.
 *
 * TODO: remove type parameter when OldMarkerInfo is deleted
 */
interface EitherMarkerInfo<Location> {
  /** name of the organization or community effort */
  contentTitle: string;
  /** description of the organization or community effort */
  contentBody?: string;
  /**
   * What type of datapoint is this?
   */
  type: MarkerType;
  /**
   * the different avenues with which to contact an organization,
   * depending on your desired involvement
   */
  contact: ContactGroup;
  /**
   * The location data for this organization
   */
  loc: Location;
}

export interface MarkerInfo<GeoPoint>
  extends EitherMarkerInfo<Location<GeoPoint>> {
  /**
   * Whether the marker has been made visible to everyone
   *
   * (i.e. has it been reviewed for accuraccy).
   */
  visible: boolean;
  source?: {
    name: 'hardcoded' | 'mutualaid.wiki' | 'mutualaidhub.org';
    id: string;
    /**
     * The original data from the other source that we derive our info from
     */
    data?: any;
  };
}

export interface MarkerInfoWithId<GeoPoint> extends MarkerInfo<GeoPoint> {
  id: string;
}

export type OldMarkerInfo = EitherMarkerInfo<{
  description: string;
  lat: number;
  lng: number;
  serviceRadius: number;
}>;
