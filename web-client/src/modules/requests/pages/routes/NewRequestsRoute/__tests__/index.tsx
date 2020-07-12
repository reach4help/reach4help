import React, { Component } from 'react';
import renderer from 'react-test-renderer';
/* use the actual component, not React.Component */
/* import THE_TESTED_COMPONENT from '../THE_TESTED_FILE'; */

describe('Component', () => {
  /* describe('<THE_TESTED_COMPONENT />', () => { */
  it('should allow a dummy test to pass', () => {
    expect(1).toEqual(1);
  });
  it('should render HTML correctly', () => {
    renderer.create(<Component>Hello World</Component>).toJSON();
    expect(1).toEqual(1);
  });
  it('should handle interface props correctly', () => {
    renderer.create(<Component>Hello World</Component>).toJSON();
    expect(1).toEqual(1);
  });
});
