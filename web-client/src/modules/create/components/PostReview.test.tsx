import React from 'react';
import { render } from 'src/testUtils/customRender';

import PostReview from './PostReview';

describe('PostReview', () => {
  it('renders', () => {
    const mockedProps = {
      isSubmitting: false,
      request: {
        type: 'type',
        other: 'other',
        description: 'description',
        streetAddress: 'streetAddress',
      },
      saveRequest: jest.fn(),
      goBack: jest.fn(),
    };

    const htmlElement = render(<PostReview {...mockedProps} />).getByText(
      'streetAddress',
    );

    expect(htmlElement).toBeInTheDocument();
  });
});
