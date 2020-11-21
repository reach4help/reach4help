import React from 'react';

import logo from '../assets/logo.svg';
import problemSolve from '../assets/problem_solving.svg';
import {
  MiddleSection,
  MissionContainer,
  MissionText,
  SolvingImage,
  TopSection,
  TopText,
  TopTextContainer,
} from '../components/about';
import { Footer, FooterLine, FooterLogo, Root } from '../components/figma';
import Header from '../components/Header';

const AboutPage: React.FC = (): JSX.Element => (
  <Root>
    <Header />
    <TopSection>
      <TopTextContainer>
        <TopText>
          <h1>
            We&#39;re a group of volunteers <br /> driven to unify help
            worldwide
          </h1>
        </TopText>
      </TopTextContainer>
    </TopSection>
    <MiddleSection>
      <MissionContainer>
        <MissionText>
          <h1>Our Mission</h1>
          <p>
            We&#39;re a nonprofit organization dedicated to unifying access to
            volunteer help worldwide. We believe that you should always have
            quick and easy access to help and resources in your area. Through
            technology, we’re also enabling local organizations to join forces
            to better help all who need it.
          </p>
          <p>
            With over 200 volunteers in 25 countries and 6 continents, we&#39;re
            connecting communities in need to food banks, charity events, and
            day-to-day services worldwide. Together, we&#39;re building a
            network of help to keep us stronger and more connected through
            COVID-19 and beyond.
          </p>
        </MissionText>
      </MissionContainer>
      <SolvingImage src={problemSolve} /> <br />
    </MiddleSection>
    <Footer>
      <FooterLine />
      <FooterLogo src={logo} />
    </Footer>
  </Root>
);

export default AboutPage;
