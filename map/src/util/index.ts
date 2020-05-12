import { Dictionary } from 'lodash';
import isEqual from 'lodash/isEqual';
import transform from 'lodash/transform';

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export const isDefined = <T extends unknown>(
  val: T | undefined | null,
): val is T => val !== undefined && val !== null;

export const isReferrerFromBaseSite = (): boolean => {
  let referrerUrl: URL;
  try {
    referrerUrl = new URL(document.referrer);
  } catch (_) {
    return false;
  }
  return referrerUrl.origin === 'https://reach4help.org';
};

/**
 * Return true if the webpage is currently within an iframe
 */
export const isInFrame = (): boolean => {
  try {
    return window.self !== window.top;
  } catch (_) {
    return true;
  }
};

/**
 * Deep diff between two object, using lodash
 * @param  {Object} object Object compared
 * @param  {Object} base   Object to compare with
 * @return {Object}        Return a new object who represent the diff
 */
export const difference = <
  B extends Dictionary<unknown>,
  T extends RecursivePartial<B>
>(
  object: B,
  base: T,
): RecursivePartial<T> =>
  transform(object, (result, value, key) => {
    if (!isEqual(value, base[key])) {
      // eslint-disable-next-line no-param-reassign
      (result as any)[key] =
        typeof value === 'object' && typeof base[key] === 'object'
          ? difference<any, any>(value, base[key])
          : value;
    }
  });
