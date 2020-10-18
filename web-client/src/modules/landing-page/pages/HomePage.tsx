import React from 'react';

import card from '../assets/card.svg';
import check from '../assets/check.svg';
import helpfulLogo from '../assets/helpfulLogo.svg';
import logo from '../assets/logo.svg';
import mockupImg from '../assets/mockups.svg';
import peopleTop from '../assets/peopleTop.svg';
import rectTop from '../assets/rectTop.svg';
import shop from '../assets/shop.svg';
import {
  AboutInfoSection,
  Card,
  Check,
  Footer,
  FooterLine,
  FooterLogo,
  GetHelpBtn,
  HelpfulEngineeringLogo,
  HowToSection,
  MiddleSection,
  MockupImage,
  PeopleTop,
  ReasonsCard,
  ReasonsCardIconContainer,
  ReasonsContainer,
  ReasonsSection,
  RectTop,
  Root,
  Shop,
  SocialLinksSection,
  TextMiddle,
  TextMiddleContainer,
  TextTop,
  TextTopContainer,
  TopSection,
  VolunteerBtn,
} from '../components/figma';
import Header from '../components/Header';

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
    <ReasonsSection>
      <h1>Why use Reach4Help</h1>
      <ReasonsContainer>
        <ReasonsCard>
          <ReasonsCardIconContainer>
            <Shop src={shop} />
          </ReasonsCardIconContainer>
          <h3>One-stop Shop</h3>
          <p>
            No need to spend hours searching. Our database of local volunteers
            and organizations gets you your needs quickly.
          </p>
        </ReasonsCard>
        <ReasonsCard>
          <ReasonsCardIconContainer>
            <Check src={check} />
          </ReasonsCardIconContainer>
          <h3>Easily Available</h3>
          <p>
            Use our app on the go from any mobile device, tablet, or desktop.
          </p>
        </ReasonsCard>
        <ReasonsCard>
          <ReasonsCardIconContainer>
            <Card src={card} />
          </ReasonsCardIconContainer>
          <h3>Completely Free</h3>
          <p>
            No subscriptions or hidden fees. Our platform is free for
            individuals in need and individual volunteers.
          </p>
        </ReasonsCard>
      </ReasonsContainer>
    </ReasonsSection>
    <HowToSection>
      <h1>How getting help works</h1>
    </HowToSection>
    <AboutInfoSection>
      <h3>About</h3>
    </AboutInfoSection>
    <SocialLinksSection>
      <HelpfulEngineeringLogo src={helpfulLogo} />
    </SocialLinksSection>
    <Footer>
      <FooterLine />
      <FooterLogo src={logo} />
    </Footer>
  </Root>
);

export default HomePage;
