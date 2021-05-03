import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
} from '@testing-library/react';
import ProgramListComponent from '../components/program/ProgramListComponent';

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

it('Program List - add program', async () => {
  const { getByText, getByDisplayValue, getByLabelText } = render(
    <ProgramListComponent />,
  );
  const button = getByText(/add item/i);
  const input = getByLabelText('Value for new program');
  fireEvent.change(input, { target: { value: 'dogsxyz' } });
  fireEvent.click(button);
  // fireEvent.change(input, { target: { value: '' } });

  expect(getByDisplayValue(/dogsxyz/i)).toBeTruthy();
});
