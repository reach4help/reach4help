import userEvent from '@testing-library/user-event';

import React from 'react';
import { render, screen } from 'src/testUtils/customRender';

import LoginRoute from '../pages/routes/LoginRoute/LoginRoute';

describe('LoginRoute', () => {
  // Here we are going to render the main parent component of the login functionality. This will allow us to test the integration of all
  // it's child components in one test. This is the meat of the testing-library philosophy. We only test based on how a user will interact.
  // with the component.
  it('User has option to login with facebook, google and email', () => {
    // Render the component
    render(<LoginRoute />);

    // First let's check for some text to make sure the component loaded.
    // We will use one of the 'getBy' queries. Some queries such as this will throw
    // an exception when they do not fine anything, therefore they fail the test without explicitly asserting.
    screen.getByText(/Welcome to Reach4Help!/i);

    // Save the continue button element to a variable so that we can reference it later.
    const continueButton = screen.getByText(/continue/i);
    // Use the 'userEvent' library to simulate user actions.
    userEvent.click(continueButton);

    // Check to see if we landed on the sign in page
    screen.getByText(/Please sign up with one of the providers below/i);

    // Lets make sure the login providers all rendered.
    screen.getByText(/Continue with Google/i);
    screen.getByText(/Continue with Facebook/i);
    screen.getByText(/Continue with email/i);
  });
});
