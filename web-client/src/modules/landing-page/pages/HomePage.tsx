import React from 'react';

// import DashboardLayout from '../../../components/DashboardLayout/DashboardLayout';
import airtableLogo from '../assets/airtableLogo.svg';
import algoliaLogo from '../assets/algoliaLogo.svg';
import canvaLogo from '../assets/canvaLogo.svg';
import card from '../assets/card.svg';
import check from '../assets/check.svg';
import HelpInfoOffer from '../assets/chooseVolunteerOffer.svg';
import chooseWhoToHelp from '../assets/chooseWhoToHelp.svg';
import HelpInfoCoordinate from '../assets/coordinateGettingHelp.svg';
import coordinateHelpLogo from '../assets/coordinateHelping.svg';
import datadogLogo from '../assets/datadogLogo.svg';
import emailIcon from '../assets/emailIcon.svg';
import facebookIcon from '../assets/facebookIcon.svg';
import figmaLogo from '../assets/figmaLogo.svg';
import gatsbyLogo from '../assets/gatsbyLogo.svg';
import githubIcon from '../assets/githubIcon.svg';
import googleLogo from '../assets/googleLogo.svg';
import helpfulLogo from '../assets/helpfulLogo.svg';
import instagramIcon from '../assets/instagramIcon.svg';
import linkedInIcon from '../assets/linkedInIcon.svg';
import logo from '../assets/logo.svg';
import mockupImg from '../assets/mockups.svg';
import netlifyLogo from '../assets/netlifyLogo.svg';
import offerHelpLogo from '../assets/offerHelpLogo.svg';
import peopleTop from '../assets/peopleTop.svg';
import rectTop from '../assets/rectTop.svg';
import HelpInfoRequest from '../assets/requestHelpLogo.svg';
import shop from '../assets/shop.svg';
import slackLogo from '../assets/slackLogo.svg';
import teamMeetingImg from '../assets/teamMeeting.svg';
import twilioLogo from '../assets/twilioLogo.svg';
import twitterIcon from '../assets/twitterIcon.svg';
import typeFormLogo from '../assets/typeFormLogo.svg';
import {
  AboutBtn,
  AboutInfoSection,
  AboutTextContainer,
  AirtableLogo,
  AlgoliaLogo,
  CanvaLogo,
  Card,
  Check,
  ChoseWhoToHelpLogo,
  CodeOfConduct,
  CoordinateHelpLogo,
  DatadogLogo,
  EmailIcon,
  FacebookIcon,
  FigmaLogo,
  Footer,
  FooterLine,
  FooterLogo,
  GatsbyLogo,
  GetHelpBtn,
  GithubIcon,
  GoogleLogo,
  HelpfulEngineeringLogo,
  HelpInfoCard,
  HelpInfoCardContainer,
  HelpInfoContainer,
  HelpInfoCoordinateImage,
  HelpInfoOfferImage,
  HelpInfoRequestImage,
  HelpInfoSection,
  InstagramIcon,
  LegalSection,
  LinkedInIcon,
  MiddleSection,
  MockupImage,
  NetlifyLogo,
  OfferHelpLogo,
  PeopleTop,
  PrivacyPolicy,
  ReasonsCard,
  ReasonsCardIconContainer,
  ReasonsContainer,
  ReasonsSection,
  RectTop,
  Root,
  Shop,
  SlackLogo,
  SocialLinksSection,
  SponsorLogoBottom,
  SponsorLogoMiddle,
  SponsorSection,
  SponsorThankYou,
  TeamMeetingImage,
  TermsOfUse,
  TextMiddle,
  TextMiddleContainer,
  TextTop,
  TextTopContainer,
  TopSection,
  TwilioLogo,
  TwitterIcon,
  TypeformLogo,
  VolunteerBtn,
  VolunteerInfoCard,
  VolunteerInfoCardContainer,
  VolunteerInfoContainer,
  VolunteerInfoSection,
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
            Don’t waste hours searching. Get help fast with our database of
            volunteers.
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
            No subscriptions or hidden fees. You can browse and post for free.
          </p>
        </ReasonsCard>
      </ReasonsContainer>
    </ReasonsSection>
    <HelpInfoSection>
      <h3>How getting help works</h3>
      <HelpInfoContainer>
        <HelpInfoCardContainer>
          <h2>Step 1</h2>
          <div>
            <HelpInfoCard>
              <HelpInfoRequestImage src={HelpInfoRequest} />
              <h3>Request Help</h3>
              <p>
                Let us know what you need and we’ll send your request to local
                volunteers and organizations.
              </p>
            </HelpInfoCard>
            <h4>-OR-</h4>
            <HelpInfoCard>
              <HelpInfoOfferImage src={HelpInfoOffer} />
              <h3>Choose who to help</h3>
              <p>Pick an offer of help from volunteers in your area</p>
            </HelpInfoCard>
          </div>
        </HelpInfoCardContainer>

        <HelpInfoCardContainer>
          <h2>Step 2</h2>
          <div>
            <HelpInfoCard>
              <HelpInfoCoordinateImage src={HelpInfoCoordinate} />
              <h3>Coordinate getting help</h3>
              <p>
                A volunteer will reach out to you to schedule delievery of your
                requested items.
              </p>
            </HelpInfoCard>
          </div>
        </HelpInfoCardContainer>
      </HelpInfoContainer>
    </HelpInfoSection>

    <VolunteerInfoSection>
      <h3>How volunteering works</h3>
      <VolunteerInfoContainer>
        <VolunteerInfoCardContainer>
          <h2>Step 1</h2>
          <div>
            <VolunteerInfoCard>
              <OfferHelpLogo src={offerHelpLogo} />
              <h3>Offer Help</h3>
              <p>
                Let us know what you can help with, and we will connect you to
                someone who needs it.
              </p>
            </VolunteerInfoCard>
            <h4>-OR-</h4>
            <VolunteerInfoCard>
              <ChoseWhoToHelpLogo src={chooseWhoToHelp} />
              <h3>Choose who to help</h3>
              <p>
                Select one or more people in need whose requests you can
                fulfill.
              </p>
            </VolunteerInfoCard>
          </div>
        </VolunteerInfoCardContainer>

        <VolunteerInfoCardContainer>
          <h2>Step 2</h2>
          <div>
            <VolunteerInfoCard>
              <CoordinateHelpLogo src={coordinateHelpLogo} />
              <h3>Coordinate helping</h3>
              <p>
                Reach out and coordinate a pickup or delivery of the requested
                items.
              </p>
            </VolunteerInfoCard>
          </div>
        </VolunteerInfoCardContainer>
      </VolunteerInfoContainer>
    </VolunteerInfoSection>

    <AboutInfoSection>
      <AboutTextContainer>
        <h1>About</h1>
        <h3>We’re a group of volunteers driven to unify help worldwide</h3>
        <p>Meet the minds behind this initiative and join us! </p>
        <AboutBtn>More About Us</AboutBtn>
      </AboutTextContainer>
      <TeamMeetingImage src={teamMeetingImg} />
    </AboutInfoSection>
    <SponsorSection>
      <SponsorThankYou>
        <h3>
          We want to thank all the brands, companies, and community supporters
          that have helped us on our mission.
        </h3>
      </SponsorThankYou>
      <SponsorLogoMiddle>
        <HelpfulEngineeringLogo src={helpfulLogo} />
        <NetlifyLogo src={netlifyLogo} />
        <GatsbyLogo src={gatsbyLogo} />
        <AirtableLogo src={airtableLogo} />
        <DatadogLogo src={datadogLogo} />
        <SlackLogo src={slackLogo} />
      </SponsorLogoMiddle>
      <SponsorLogoBottom>
        <FigmaLogo src={figmaLogo} />
        <GoogleLogo src={googleLogo} />
        <AlgoliaLogo src={algoliaLogo} />
        <TwilioLogo src={twilioLogo} />
        <TypeformLogo src={typeFormLogo} />
        <CanvaLogo src={canvaLogo} />
      </SponsorLogoBottom>
    </SponsorSection>
    <Footer>
      <SocialLinksSection>
        <FacebookIcon src={facebookIcon} />
        <GithubIcon src={githubIcon} />
        <TwitterIcon src={twitterIcon} />
        <LinkedInIcon src={linkedInIcon} />
        <InstagramIcon src={instagramIcon} />
        <EmailIcon src={emailIcon} />
      </SocialLinksSection>
      <LegalSection>
        <CodeOfConduct>Code of Conduct</CodeOfConduct>
        <span>|</span>
        <PrivacyPolicy>Privacy Policy</PrivacyPolicy>
        <span>|</span>
        <TermsOfUse>Terms of Use</TermsOfUse>
      </LegalSection>
      <FooterLine />
      <FooterLogo src={logo} />
    </Footer>
  </Root>
);

export default HomePage;
