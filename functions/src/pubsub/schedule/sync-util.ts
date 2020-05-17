/**
 * Return an object to collect statistics for the handling of external data
 */
export const beginningStats = () => ({
  /**
   * existing entry that is unchanged
   */
  existing: 0,
  /**
   * newly created entry
   */
  created: 0,
  /**
   * existing entry that has been updated
   */
  updated: 0,
  /**
   * existing entry that has now been hidden
   */
  hidden: 0,
  /**
   * existing entry that has (already) been hidden
   */
  alreadyHidden: 0,
  /**
   * encountered invalid data that we were unable to handle
   */
  invalid: 0,
  /**
   * Encountered multiple markers with the same source id,
   * and deleted them.
   */
  duplicatesRemoved: 0,
});
