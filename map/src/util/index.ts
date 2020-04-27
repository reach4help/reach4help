export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export const isDefined = <T extends unknown>(
  val: T | undefined | null,
): val is T => val !== undefined && val !== null;
