import React from 'react';

import logo from '../assets/logo.svg';
import problemSolve from '../assets/problem_solving.svg';
import {
  ButtonContainer,
  ContributorImage,
  JoinButton,
  JoinContainer,
  JoinText,
  MiddleSection,
  MissionContainer,
  MissionText,
  SolvingImage,
  TeamContainer,
  TeamImageContainer,
  TeamText,
  TopSection,
  TopText,
  TopTextContainer,
} from '../components/about';
import * as contributors from '../components/contributors';
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
    <MiddleSection>
      <TeamContainer>
        <TeamText>
          <h1> Meet Our Team </h1>
          <br />
          <p>
            Hailing from LA to Morocco to Portugal to Bangladesh, we’re an
            international collective of volunteers from all walks of life,
            united to ensure that everyone, everywhere can Reach4Help.
          </p>
        </TeamText>
      </TeamContainer>
    </MiddleSection>
    <TeamImageContainer>
      <ContributorImage src={contributors.AlexVanino.imgSrc} />
      <ContributorImage src={contributors.BurhanTuerker.imgSrc} />
      <ContributorImage src={contributors.Cinthyaejh.imgSrc} />
      <ContributorImage src={contributors.DanSabin.imgSrc} />
      <ContributorImage src={contributors.DilpreetJohal.imgSrc} />
      <ContributorImage src={contributors.EstherMalouin.imgSrc} />
      <ContributorImage src={contributors.EthanStrominger.imgSrc} />
      <ContributorImage src={contributors.StephenSharp.imgSrc} />
    </TeamImageContainer>{' '}
    <br />
    <TeamImageContainer>
      <ContributorImage src={contributors.Gorostiaga.imgSrc} />
      <ContributorImage src={contributors.JoaoMarques.imgSrc} />
      <ContributorImage src={contributors.JosephKottapurath.imgSrc} />
      <ContributorImage src={contributors.JuozasGaigalas.imgSrc} />
      <ContributorImage src={contributors.LuisFilipe.imgSrc} />
      <ContributorImage src={contributors.MicaelRodrigues.imgSrc} />
      <ContributorImage src={contributors.MitchellVerter.imgSrc} />
    </TeamImageContainer>{' '}
    <br />
    <TeamImageContainer>
      <ContributorImage src={contributors.NunoAlexandre.imgSrc} />
      <ContributorImage src={contributors.PatriciaMiranda.imgSrc} />
      <ContributorImage src={contributors.PedroFilipe.imgSrc} />
      <ContributorImage src={contributors.RitaSerra.imgSrc} />
      <ContributorImage src={contributors.RubenGoncalves.imgSrc} />
      <ContributorImage src={contributors.Sharmmad.imgSrc} />
      <ContributorImage src={contributors.ShayanChowdhury.imgSrc} />
      <ContributorImage src={contributors.Skspade.imgSrc} />
    </TeamImageContainer>{' '}
    <br />
    <TeamImageContainer>
      <ContributorImage src={contributors.TelmoDias.imgSrc} />
      <ContributorImage src={contributors.ThomasHuynh.imgSrc} />
      <ContributorImage src={contributors.WilsonRodrigues.imgSrc} />
      <ContributorImage src={contributors.WinggoTse.imgSrc} />
      <ContributorImage src={contributors.SamLanning.imgSrc} />
      <ContributorImage src={contributors.DavidAlecrim.imgSrc} />
    </TeamImageContainer>{' '}
    <br />
    <MiddleSection>
      <JoinContainer>
        <JoinText>
          <h3>Interested in joining us?</h3> <br />
          <p>
            We’re looking for volunteer ReactJS developers, marketing/PR
            strategists and UI/UX designers to help ramp up our efforts fighting
            the US West Coast wildfires and the incoming second wave of
            COVID-19.
          </p>
        </JoinText>
      </JoinContainer>{' '}
      <br />
    </MiddleSection>
    <ButtonContainer>
      <a href="https://github.com/reach4help/reach4help">
        <JoinButton>Join our team</JoinButton>
      </a>
    </ButtonContainer>
    <Footer>
      <FooterLine />
      <FooterLogo src={logo} />
    </Footer>
  </Root>
);

export default AboutPage;
