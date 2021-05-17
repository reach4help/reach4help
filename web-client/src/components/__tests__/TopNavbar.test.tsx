import userEvent from '@testing-library/user-event';

import React from 'react';
import { render, screen } from 'src/testUtils/customRender';

import TopNavbar from '../TopNavbar/TopNavbar';

const mockedProps = {
  openMenu: jest.fn(),
  unseenOffersCount: 0,
  visible: true,
  toggleMenu: jest.fn(),
};

describe('TopNavbar', () => {
  it.skip('Opens the Menu when the hamburger button is clicked', async () => {
    render(<TopNavbar {...mockedProps} />);

    const hamburgerButton = await screen.findByLabelText('Menu Button');

    userEvent.click(hamburgerButton);

    expect(mockedProps.openMenu).toHaveBeenCalledTimes(1);
  });

  it.skip("Doesn't render anything when visible is not true", () => {
    const modifiedProps = { ...mockedProps, visible: false };
    const { container } = render(<TopNavbar {...modifiedProps} />);

    expect(container.firstChild).toBeNull();
  });
});
