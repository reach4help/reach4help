import * as React from 'react';
import { getLanguage, Language } from 'src/i18n';

interface Context {
  lang: Language;
}

export const AppContext = React.createContext<Context>({
  lang: getLanguage(),
});
