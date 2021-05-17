// __tests__/CheckboxWithLabel-test.js
import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import CheckboxWithLabel from '../scratch/CheckboxWithLabel';

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it('CheckboxWithLabel changes the text after click', () => {
  const { getByLabelText }: { getByLabelText: (value: RegExp) => HTMLElement } = render(
    <CheckboxWithLabel labelOn="On" labelOff="Off" />,
  );

  expect(getByLabelText(/off/i)).toBeTruthy();

  fireEvent.click(getByLabelText(/off/i));

  expect(getByLabelText(/on/i)).toBeTruthy();
});
