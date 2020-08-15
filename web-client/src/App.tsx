import { enableAllPlugins } from 'immer';
import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';
import SEO from 'src/components/SEO/SEO';
import AuthenticationModal from 'src/pages/modals/AuthenticationModal';

import MasterPage from './pages/MasterPage';
import configureStore from './store';
import { enableLogger, enableMonitoring } from './telemetry';

// Later we can check if we need all immer plugins
enableAllPlugins();
if (process.env.NODE_ENV !== 'development') {
  enableLogger();
  enableMonitoring();
}

const App = (): ReactElement => {
  const store = configureStore();
  return (
    <Provider store={store}>
      <SEO />
      <MasterPage />
      <AuthenticationModal />
    </Provider>
  );
};

export default App;
