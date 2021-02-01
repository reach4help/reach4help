/* eslint-disable no-return-assign */
// import { Divider } from 'antd';
import { Card } from 'antd';
import React from 'react';
import teams from 'src/modules/landing-page/contributors.json';

import defaultProfilePic from '../assets/default_profile.png';
import logo from '../assets/logo.svg';
import problemSolve from '../assets/problem_solving.svg';
import {
  ButtonContainer,
  JoinButton,
  JoinContainer,
  MiddleSection,
  MissionContainer,
  MissionText,
  SolvingImage,
  TeamContainer,
  TeamImageContainer,
  TeamTitle,
  TopSection,
} from '../components/about';
import { Footer, FooterLine, FooterLogo, Root } from '../components/figma';

const dynamicColor = (teamName: string) => {
  let color = '#f0ebff';

  if (teamName === 'Core') {
    color = '#f0ebff';
  } else if (teamName === 'Development') {
    color = '#ddf1f0';
  } else if (teamName === 'Design') {
    color = '#fff8e7';
  } else if (teamName === 'Marketing') {
    color = '#ffebff';
  }

  return color;
};

const fetchingteams = () => {
  const data = teams;

  const { Meta } = Card;

  return data.teams.map(t => (
    <div
      key={t.title}
      style={{
        backgroundColor: dynamicColor(t.title),
        width: '100%',
        justifyContent: 'center',
      }}
    >
      <TeamTitle>
        <h2>{`${t.title.toUpperCase()} TEAM`}</h2>{' '}
      </TeamTitle>

      <TeamImageContainer>
        {t.contributors.map(c => (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          // <div key={c.name}>
          //   <ContributorImage key={c.name} src={c.avatar_url} />
          //   <a href={c.contact} title={`${`${c.name}, ${c.title}`}`}>
          //     <em>{`${c.name}`} </em>
          //   </a>
          // </div>
          <Card
            key={c.name}
            // hoverable
            style={{ width: 200 }}
            cover={
              <img
                src={c.avatar_url}
                alt={defaultProfilePic}
                // eslint-disable-next-line no-param-reassign
                onError={e => (e.target.src = defaultProfilePic)}
              />
            }
          >
            <Meta title={c.name} description={c.title} />
            <a href={c.contact}>Contact</a>
          </Card>
        ))}
      </TeamImageContainer>
    </div>
  ));
};

const AboutPage: React.FC = (): JSX.Element => (
  <Root>
    <TopSection>
      <h1>
        We&#39;re a group of volunteers <br /> driven to unify help worldwide
      </h1>
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
      <SolvingImage src={problemSolve} />
    </MiddleSection>
    <MiddleSection>
      <TeamContainer>
        <h1>Meet Our Team</h1>
        <p>
          Hailing from LA to Morocco to Portugal to Bangladesh, we’re an
          international collective of volunteers from all walks of life, united
          to ensure that everyone, everywhere can Reach4Help.
        </p>
      </TeamContainer>
    </MiddleSection>
    {fetchingteams()}
    {/* <TeamImageContainer>
      <h1>Development</h1>
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
    </TeamImageContainer>{' '} */}
    <br />
    <MiddleSection>
      <JoinContainer>
        <h3>Interested in joining us?</h3> <br />
        <p>
          We’re looking for volunteer ReactJS developers, marketing/PR
          strategists and UI/UX designers to help ramp up our efforts fighting
          the US West Coast wildfires and the incoming second wave of COVID-19.
        </p>
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
