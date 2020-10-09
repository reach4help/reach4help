import React from 'react';

import peopleTop from '../assets/peopleTop.svg';
import rectTop from '../assets/rectTop.svg';
import Header from '../components/Header/Header';
import {
  GetHelpBtn,
  PeopleTop,
  RectTop,
  Root,
  TextTop,
  TextTopContainer,
  VolunteerBtn,
} from './elements';

const HomePage: React.FC = (): JSX.Element => (
  <Root>
    <PeopleTop src={peopleTop} />
    <TextTopContainer>
      <TextTop>
        <h1>Connecting people in need with people who can help.</h1>
        <p>
          We connect you with local volunteers and help organizations when you
          need it the most.
        </p>
      </TextTop>
      <div>
        <GetHelpBtn>Get Help</GetHelpBtn>
        <VolunteerBtn>Volunteer</VolunteerBtn>
      </div>
    </TextTopContainer>
    <RectTop src={rectTop} />
    <Header />
  </Root>
);

export default HomePage;
