import React from 'react';
import { render } from 'src/testUtils/customRender';

import { AddressDisplay } from '../DisplayElements';

describe('AddressDisplay', () => {
  it('renders', () => {
    const mockedProps = {
      location: {
        address1: '10 Space Place',
        address2: 'Apartment Delicadosi',
        city: 'Big City',
        state: 'Huge State',
        country: 'tanzania',
        postalCode: '1234567',
      },
    };

    const htmlElement = render(
      <AddressDisplay prefix="Offer" {...mockedProps} />,
    ).getByRole('heading');

    expect(htmlElement).toBeInTheDocument();
  });
});
