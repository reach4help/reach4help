import userEvent from '@testing-library/user-event';

import React from 'react';
import { render, screen } from 'src/testUtils/customRender';

import TopNavbar from '../TopNavbar/TopNavbar';

const mockedProps = {
  openMenu: jest.fn(),
  openNotifications: jest.fn(),
  isCav: true,
  unseenOffersCount: 0,
  visible: true,
};

describe('TopNavbar', () => {
  it('Opens the Menu when the hamburger button is clicked', async () => {
    render(<TopNavbar {...mockedProps} />);

    const hamburgerButton = await screen.findByLabelText('Menu Button');

    userEvent.click(hamburgerButton);

    expect(mockedProps.openMenu).toHaveBeenCalledTimes(1);
  });

  it.skip('Shows a red icon when there are notifications to be seen', async () => {
    const modifiedProps = { ...mockedProps, unseenOffersCount: 2 };
    render(<TopNavbar {...modifiedProps} />);

    const notificationsButton = await screen.findByLabelText(
      'Notifications Button',
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    expect(notificationsButton.firstChild.style.color).toBe('red');
  });

  it.skip('Opens the Notifications Page when the bell button is clicked', async () => {
    render(<TopNavbar {...mockedProps} />);

    const notificationsButton = await screen.findByLabelText(
      'Notifications Button',
    );

    userEvent.click(notificationsButton);

    expect(mockedProps.openNotifications).toHaveBeenCalledTimes(1);
  });

  it("Doesn't render anything when visible is not true", () => {
    const modifiedProps = { ...mockedProps, visible: false };
    const { container } = render(<TopNavbar {...modifiedProps} />);

    expect(container.firstChild).toBeNull();
  });
});
