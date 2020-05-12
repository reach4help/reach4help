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

export const isInFrame = (): boolean => {
  try {
    return window.self !== window.top;
  } catch (_) {
    return true;
  }
};
