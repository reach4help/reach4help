/** An immutable object representing a geo point in Firestore. The geo point
 * is represented as latitude/longitude pair.
 *
 * Latitude values are in the range of [-90, 90].
 * Longitude values are in the range of [-180, 180].
 */
export class R4HGeoPoint {
  /**
   * Creates a new immutable GeoPoint object with the provided latitude and
   * longitude values.
   * @param latitude The latitude as number between -90 and 90.
   * @param longitude The longitude as number between -180 and 180.
   */
  constructor(latitude: number, longitude: number) {
    this.latitude = latitude;
    this.longitude = longitude;
  }

  /**
   * The latitude of this GeoPoint instance.
   */
  readonly latitude: number;
  /**
   * The longitude of this GeoPoint instance.
   */
  readonly longitude: number;

  /**
   * Returns true if this `GeoPoint` is equal to the provided one.
   *
   * @param other The `GeoPoint` to compare against.
   * @return true if this `GeoPoint` is equal to the provided one.
   */
  isEqual(other: R4HGeoPoint): boolean {
    return (
      this.latitude === other.latitude && this.longitude === other.longitude
    );
  }
}
