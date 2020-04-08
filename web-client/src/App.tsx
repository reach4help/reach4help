import { enableAllPlugins } from 'immer';
import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';

import MasterPage from './pages/MasterPage';
import configureStore from './store';

// Later we can check if we need all immer plugins
enableAllPlugins();

const App = (): ReactElement => {
  const store = configureStore();
  return (
    <Provider store={store}>
      <MasterPage />
    </Provider>
  );
};

export default App;
