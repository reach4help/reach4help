import { render } from '@testing-library/react';

import React from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';

import i18n from '../translations/i18n';
// We are overriding the default render method from 'testing-library', which allows us to mock out
// redux and other required providers
const customRender = (ui, options?) => {
  const AllProviders = ({ children }) => (
    <MemoryRouter>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </MemoryRouter>
  );
  return render(ui, { wrapper: AllProviders, ...options });
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
