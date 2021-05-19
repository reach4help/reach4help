const r4hDomainPrefix = 'org.reach4help.app';
const LANGUAGE_PREFERENCE_PREFIX = `${r4hDomainPrefix}.PREFERRED_LANGUAGE`;

const makeLocalStorageKey = ({ prefix, userId }) =>
  userId ? `${prefix}.${userId}` : prefix;

export const LANGUAGE_PREFERENCE_LOCALSTORAGE_KEY = makeLocalStorageKey({
  prefix: LANGUAGE_PREFERENCE_PREFIX,
  userId: null,
});
