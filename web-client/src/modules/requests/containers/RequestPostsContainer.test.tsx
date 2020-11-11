import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from 'src/testUtils/customRender';

import RequestPostsContainer from './RequestPostsContainer';

jest.mock('src/ducks/requests/actions');
describe('RequestPostContainer', () => {
  it('Renders', () => {
    const store = createStore(() => ({}));
    const TestProvider = () => <Provider store={store} />;
    const renderElement = render(<RequestPostsContainer />, {
      wrapper: TestProvider,
    });
    expect(renderElement.container).not.toBeNull();
  });
});
