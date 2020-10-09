import React from 'react';

import logo from '../assets/logo.svg';
import mockupImg from '../assets/mockups.svg';
import peopleTop from '../assets/peopleTop.svg';
import rectTop from '../assets/rectTop.svg';
import Header from '../components/Header/Header';
import {
  Footer,
  FooterLine,
  FooterLogo,
  GetHelpBtn,
  MiddleSection,
  MockupImage,
  PeopleTop,
  RectTop,
  Root,
  TextMiddle,
  TextMiddleContainer,
  TextTop,
  TextTopContainer,
  TopSection,
  VolunteerBtn,
} from './elements';

const HomePage: React.FC = (): JSX.Element => (
  <Root>
    <Header />
    <RectTop src={rectTop} />
    <TopSection>
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

      <PeopleTop src={peopleTop} />
    </TopSection>
    <MiddleSection>
      <MockupImage src={mockupImg} />
      <TextMiddleContainer>
        <TextMiddle>
          <h1>Assistance on the go</h1>
          <p>
            Our map helps guid you to people and resources in your area so that
            you can get the help you need quickly and efficiently.
          </p>
        </TextMiddle>
      </TextMiddleContainer>
    </MiddleSection>
    <Footer>
      <FooterLine />
      <FooterLogo src={logo} />
    </Footer>
  </Root>
);

export default HomePage;
