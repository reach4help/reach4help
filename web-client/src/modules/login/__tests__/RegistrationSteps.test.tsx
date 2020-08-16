import userEvent from '@testing-library/user-event';

import React, { useState } from 'react';
import { render, screen, waitFor } from 'src/testUtils/customRender';

import RegistrationSteps from '../components/RegistrationSteps/RegistrationSteps';

const mockedProps = {
  currentStep: 0,
  setCurrentStep: jest.fn(),
  onLoginGoogle: jest.fn(),
  onLoginFacebook: jest.fn(),
  onEmailSignIn: jest.fn(),
  onEmailSignUp: jest.fn(),
};

const steps = {
  login: 0,
  emailSignIn: 1,
  emailSignUp: 2,
};

// Since in the RegistrationSteps component relies on state from the parent.
// I will wrap it in a fake component to handle the state for testing.
const RegistrationStepsWithState = ({
  initialStep,
}: {
  initialStep: number;
}) => {
  const [currentStep, setCurrentStep] = useState<number>(initialStep);

  return (
    <div>
      <RegistrationSteps
        {...mockedProps}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
      />
    </div>
  );
};

describe('RegistrationSteps', () => {
  it('User has option to login with facebook, google and email', () => {
    render(<RegistrationStepsWithState initialStep={steps.login} />);

    // Check to see if we landed on the sign in page
    screen.getByText(/Please sign up with one of the providers below/i);

    // Lets make sure the login providers all rendered.
    screen.getByText(/Continue with Google/i);
    screen.getByText(/Continue with Facebook/i);
    screen.getByText(/Continue with email/i);
  });
  it('Can register with google', () => {
    render(<RegistrationSteps {...mockedProps} currentStep={steps.login} />);
    const googleButton = screen.getByText(/Continue with Google/i);

    userEvent.click(googleButton);

    expect(mockedProps.onLoginGoogle).toBeCalled();
  });
  it('Can register with facebook', () => {
    render(<RegistrationSteps {...mockedProps} currentStep={steps.login} />);

    const facebookButton = screen.getByText(/Continue with Facebook/i);

    userEvent.click(facebookButton);

    expect(mockedProps.onLoginFacebook).toBeCalled();
  });
  it('Can login with email', async () => {
    const email = 'testingFan101@email.com';
    const password = 'Securepassword1';
    // Since in the RegistrationSteps component relies on state from the parent.
    // I will wrap it in a fake component to handle the state for testing.
    render(<RegistrationStepsWithState initialStep={steps.login} />);

    const emailButton = screen.getByText(/Continue with email/i);

    userEvent.click(emailButton);

    screen.getByText(/Login with email/i);

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText(/Password/i);

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);

    // Since the text "Login" appears many times on this page, we can use a more specific
    // query. Here we use "getByRole", this allows us to select buttons my their name attribute.
    const loginButton = screen.getByRole('button', {
      name: 'arrow-right Login',
    });

    userEvent.click(loginButton);
    // Since the form submission is async and our tests are synchronous, we need to
    // wrap our expect in a waitFor
    await waitFor(() =>
      expect(mockedProps.onEmailSignIn).toBeCalledWith(email, password),
    );
  });
  it('Can register with email', async () => {
    const email = 'testingFan101@email.com';
    const password = 'Securepassword1';

    render(<RegistrationStepsWithState initialStep={steps.login} />);

    const emailButton = screen.getByText(/Continue with email/i);

    userEvent.click(emailButton);

    screen.getByText(/Login with email/i);

    userEvent.click(screen.getByText(/New User/i));

    const emailInput = screen.getByLabelText(/Email/i);
    const passwordInput = screen.getByLabelText('Password');
    const confirmPasswordInput = screen.getByLabelText(/Confirm Password/i);

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);
    userEvent.type(confirmPasswordInput, password);

    const createAccountButton = screen.getByRole('button', {
      name: 'arrow-right Create Account',
    });

    userEvent.click(createAccountButton);

    // Since the form submission is async and our tests are synchronous, we need to
    // wrap our expect in a waitFor
    await waitFor(() =>
      expect(mockedProps.onEmailSignUp).toBeCalledWith(email, password),
    );
  });
});
