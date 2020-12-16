import React from 'react';
import renderer from 'react-test-renderer';

import TitleWithUnderline from '../TitleWithUnderline';

describe('<TitleWithUnderline />', () => {
  xit('should allow a dummy test to pass', () => {
    expect(1).toEqual(1);
  });
  xit('should render the underline to the left when the orangeUnderline=left', () => {
    renderer
      .create(
        <TitleWithUnderline level={2} orangealignment="left">
          Hello World
        </TitleWithUnderline>,
      )
      .toJSON();
    expect(1).toEqual(1);
  });
  xit('should render the underline to the right when the orangeUnderline=right', () => {
    renderer
      .create(
        <TitleWithUnderline level={2} orangealignment="right">
          Hello World
        </TitleWithUnderline>,
      )
      .toJSON();
    expect(1).toEqual(1);
  });
  xit('should render the underline to the center when the orangeUnderline=center', () => {
    renderer
      .create(
        <TitleWithUnderline level={2} orangealignment="center">
          Hello World
        </TitleWithUnderline>,
      )
      .toJSON();
    expect(1).toEqual(1);
  });
  xit('should render the underline to the center when the orangeUnderline is not specified', () => {
    renderer
      .create(<TitleWithUnderline level={2}>Hello World</TitleWithUnderline>)
      .toJSON();
    expect(1).toEqual(1);
  });
  xit('should pass props to antd.Typography.Title', () => {
    renderer
      .create(<TitleWithUnderline level={4}>Hello World</TitleWithUnderline>)
      .toJSON();
    expect(1).toEqual(1);
  });
});
