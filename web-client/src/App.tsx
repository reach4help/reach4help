import { enableAllPlugins } from 'immer'
;
import React, { ReactElement } from 'react';
import { Provider } from 'react-redux';

import ExampleContainer from './containers/exampleContainer';
import configureStore from './store';

// Later we can check if we need all immer plugins
enableAllPlugins();

function App(): ReactElement {
  const store = configureStore();
  return (
    <Provider store={store}>
      <div className="App">
        Reach4Help
        <ExampleContainer />
      </div>
    </Provider>
  );
}

export default App;
