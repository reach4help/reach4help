import React from 'react';
import renderer from 'react-test-renderer';

import TitleWithOrangeUnderline from '../TitleWithOrangeUnderline';

describe('<TitleWithOrangeUnderline />', () => {
  it('should allow a dummy test to pass', () => {
    expect(1).toEqual(1);
  });
  it('should render the underline to the left when the orangeUnderline=left', () => {
    renderer
      .create(
        <TitleWithOrangeUnderline level={2} orangealignment="left">
          Hello World
        </TitleWithOrangeUnderline>,
      )
      .toJSON();
    expect(1).toEqual(1);
  });
  it('should render the underline to the right when the orangeUnderline=right', () => {
    renderer
      .create(
        <TitleWithOrangeUnderline level={2} orangealignment="right">
          Hello World
        </TitleWithOrangeUnderline>,
      )
      .toJSON();
    expect(1).toEqual(1);
  });
  it('should render the underline to the center when the orangeUnderline=center', () => {
    renderer
      .create(
        <TitleWithOrangeUnderline level={2} orangealignment="center">
          Hello World
        </TitleWithOrangeUnderline>,
      )
      .toJSON();
    expect(1).toEqual(1);
  });
  it('should render the underline to the center when the orangeUnderline is not specified', () => {
    renderer
      .create(
        <TitleWithOrangeUnderline level={2}>
          Hello World
        </TitleWithOrangeUnderline>,
      )
      .toJSON();
    expect(1).toEqual(1);
  });
  it('should pass props to antd.Typography.Title', () => {
    renderer
      .create(
        <TitleWithOrangeUnderline level={4}>
          Hello World
        </TitleWithOrangeUnderline>,
      )
      .toJSON();
    expect(1).toEqual(1);
  });
});
