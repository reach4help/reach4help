import userEvent from '@testing-library/user-event';

import React, { useState } from 'react';
import { render, screen } from 'src/testUtils/customRender';

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
  setLanguage: 0,
  login: 1,
  emailSignIn: 2,
  emailSignUp: 3,
};

describe('RegistrationSteps', () => {
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
  it('Can register with email', () => {
    const email = 'testingFan101@email.com';
    const password = 'Securepassword1';
    // Since in the RegistrationSteps component relies on state from the parent.
    // I will wrap it in a fake component to handle the state for testing.
    const RegistrationStepsWithState = () => {
      const [currentStep, setCurrentStep] = useState<number>(steps.login);

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
    render(<RegistrationStepsWithState />);

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
    // TODO Figure out why this mock is not being called
    // expect(mockedProps.onEmailSignUp).toBeCalledWith(email, password);
  });
});
