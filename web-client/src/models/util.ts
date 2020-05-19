/**
 * Make the properties K optional in type T
 */
export type MakePartial<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>> &
  Partial<Pick<T, K>>;
