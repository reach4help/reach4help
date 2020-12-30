import configureStore from '..';

describe('store', () => {
  it('can be created', /* async */ () => {
    const store = configureStore();
    expect(store).toBeDefined();
    // store.dispatch();
    // store.getState
  });
});
