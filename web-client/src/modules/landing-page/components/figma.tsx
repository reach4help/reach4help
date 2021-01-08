import { MEDIA_QUERIES } from 'src/constants/mediaQueries';
import { COLORS } from 'src/theme/colors';
import styled from 'styled-components';

// Generics

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-evenly;
  justify-content: center;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Button = styled.button`
  height: 44px;
  width: 160px;
  border-radius: 4px;
  margin: 10px;
  cursor: pointer;
`;

const ReasonsCardIcon = styled.img`
  width: 40px;
  height: 40px;
`;

const SocialMediaIcon = styled.img`
  cursor: pointer;
  border-radius: 4px;
`;

// This is the color that was used for legalText prior to importing COLORS #eb7100;
const LegalText = styled.div`
  cursor: pointer;
  &:hover {
    color: ${COLORS.brandOrange};
  }
`;

const InfoSection = styled(Container)`
  align-items: center;
  padding: 40px;

  h3 {
    font-size: 54px;
  }

  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    padding: 58px 16px 38px;
    text-align: left;
    h3 {
      font-size: 28px;
      line-height: 46px;
    }
  }
`;

const InfoContainer = styled(Flex)`
  width: 100%;

  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    flex-direction: column;
  }
`;

const InfoCardContainer = styled(Container)`
  height: 500px;
  margin: 20px;
  box-shadow: 0 0 5px ${COLORS.faded};
  overflow: hidden;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  background: ${COLORS.white};

  h2 {
    font-weight: 700;
    font-size: 30px;
    width: 100%;
    padding: 20px 0;
    text-align: center;
    color: ${COLORS.white};
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 20px;
  }

  h4 {
    font-size: 20px;
    margin: 0 50px;
  }

  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    height: 100%;
    width: 100%;

    div {
      flex-direction: column;

      h4 {
        margin-top: 40px;
        margin-bottom: 60px;
      }
    }
  }
`;

const InfoCard = styled(Container)`
  justify-content: flex-start;
  height: 100%;
  align-items: center;

  h3 {
    font-size: 20px;
    margin: 10px;
  }

  p {
    font-size: 20px;
    width: 300px;
    text-align: center;
  }
`;

// ---------------------------------------------------------------------------------------------------- //

// Principal Components

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 65px;
  position: fixed;
  top: 0;
  background: ${COLORS.white};
  z-index: 5;
`;

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Footer = styled(Container)`
  align-items: center;
  width: 100%;
  padding: 30px 0px;
`;

// ---------------------------------------------------------------------------------------------------- //

// Sections

export const TopSection = styled(Flex)`
  height: 525px;
  width: 100%;
  margin-top: 70px;
  margin-bottom: 150px;

  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    height: 400px;
    margin-top: 0;
    padding-top: 0;
    padding-left: 16px;
    padding-right: 16px;
  }
`;

export const MiddleSection = styled(Flex)`
  width: 100%;
  position: relative;
  margin-bottom: 100px;

  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    flex-direction: column;
    top: 10px;
    margin-bottom: 100px;
    padding-left: 16px;
    padding-right: 16px;
  }
`;

export const ReasonsSection = styled(Container)`
  text-align: center;
  align-items: center;
  margin-bottom: 25px;

  h1 {
    font-size: 54px;
  }

  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    margin-bottom: 25px;
    padding-left: 16px;
    padding-right: 16px;
  }
`;

export const WorldMapSection = styled(Container)`
  width: 90%;
  margin: auto;

  h2 {
    text-align: center;
    font-size: 40px;
    margin: auto;
    margin-bottom: -40px;
    display: flex;
    flex-direction: column;
  }

  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    width: 100%;
    h2 {
      font-size: 28px;
    }
  }
  @media (max-width: ${MEDIA_QUERIES.mobileL}) {
    h2 {
      font-size: 20px;
    }
  }
`;
// Should we add these colors to our colors.js file? current file doesn't have rgba colors
export const HelpInfoSection = styled(InfoSection)`
  background-color: ${COLORS.gettingHelpBackground};
`;

export const VolunteerInfoSection = styled(InfoSection)`
  background: ${COLORS.volunteeringBackground};
`;

export const AboutInfoSection = styled(InfoSection)`
  height: 525px;
  width: 100%;
  flex-direction: column;

  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    height: 100%;
  }
`;

export const SponsorSection = styled(Container)`
  background: ${COLORS.primaryDark};
  height: 473px;
  width: 100%;

  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    height: 100%;
    padding: 58px 0;
  }
`;

export const SocialLinksSection = styled(Flex)`
  width: 450px;
  padding-top: 90px;

  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    width: 250px;
    padding-top: 38px;
    flex-wrap: wrap;
  }
`;

export const LegalSection = styled(Flex)`
  padding-top: 30px;
  width: 350px;
`;

// ---------------------------------------------------------------------------------------------------- //

// Containers

export const LogoContainer = styled.div`
  margin-left: 3vw;
`;

export const ButtonContainer = styled.div`
  margin-right: 3vw;
`;

export const LinkContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
`;

export const TextTopContainer = styled(Container)`
  position: relative;
  top: 40px;
  width: 500px;

  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    top: 20px;
    width: 100%;
  }
`;

export const TextTopBtnContainer = styled.div`
  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const TextMiddleContainer = styled(Container)`
  position: relative;
  top: 40px;
  width: 500px;

  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    width: 100%;
  }
`;

export const ReasonsHeadingContainer = styled(Flex)`
  h1 {
    font-size: 54px;
  }

  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    justify-content: start;
    width: 100%;

    h1 {
      font-size: 28px;
    }
  }
`;

export const ReasonsContainer = styled(Flex)`
  flex-direction: row;
  width: 100%;

  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    flex-direction: column;
  }
`;

export const ReasonsCardIconContainer = styled(Container)`
  align-items: center;
  justify-content: center;
  background-color: ${COLORS.reasonsIconBg};
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

export const HelpInfoContainer = styled(InfoContainer)``;

export const HelpInfoCardContainer = styled(InfoCardContainer)`
  h2 {
    background-color: ${COLORS.brandOrange};
  }
`;

export const HelpInfoHeadingContainer = styled(Flex)`
  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    justify-content: start;
    width: 100%;
  }
`;

export const VolunteerInfoHeadingContainer = styled(Flex)`
  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    justify-content: start;
    width: 100%;
  }
`;

export const AboutInfoSectionContainer = styled(Flex)`
  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    flex-direction: column-reverse;
  }
`;

export const AboutTextContainer = styled(Container)`
  position: relative;
  width: 540px;

  h1 {
    font-size: 30px;
    font-weight: 700;
  }

  h3 {
    font-weight: 500;
    line-height: 60px;
  }

  p {
    size: 18px;
  }

  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    width: 100%;

    h3 {
      line-height: 46px;
    }

    div {
      display: flex;
      justify-content: center;
    }
  }
`;

export const SponsorThankYou = styled(Flex)`
  width: 1114px;
  height: 88px;
  margin-top: -20px;
  margin-bottom: 30px;
  align-self: center;

  h3 {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    color: ${COLORS.white};
    font-size: 30px;
    line-height: 36px;
    text-align: center;
  }

  h3:last-child {
    display: none;
  }

  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    margin-bottom: 0;

    h3:first-child {
      display: none;
    }

    h3:last-child {
      display: block;
    }
  }
`;

export const SponsorLogoMiddle = styled(Flex)`
  padding: 5px;
  margin: 30px 0;

  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    flex-wrap: wrap;
    padding: 0 5px;
    margin: 0;
  }
`;

export const SponsorLogoBottom = styled(Flex)`
  padding: 5px;
  margin: 0px 166px;

  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    flex-wrap: wrap;
    padding: 0 5px;
    margin: 0;
  }
`;

export const VolunteerInfoContainer = styled(InfoContainer)``;

export const VolunteerInfoCardContainer = styled(InfoCardContainer)`
  h2 {
    background: ${COLORS.primaryDark};
  }
`;

// ---------------------------------------------------------------------------------------------------- //

// Child Components

export const Link = styled.a`
  text-decoration: none;
  margin: 0px 15px;
  color: ${COLORS.black};
`;

export const TextTop = styled.div`
  h1 {
    font-size: 50px;
    color: ${COLORS.white};
    line-height: 60px;
  }

  p {
    color: ${COLORS.white};
    font-size: 18px;
    width: 400px;
  }

  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    h1 {
      font-size: 36px;
      line-height: 46px;
    }

    p {
      width: 290px;
    }
  }
`;

export const TextMiddle = styled.div`
  h1 {
    font-size: 50px;
    line-height: 60px;
  }

  p {
    font-size: 18px;
    width: 400px;
  }

  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    h1 {
      font-size: 28px;
      line-height: 46px;
    }

    p {
      width: 320px;
    }
  }
`;

export const FooterLine = styled.div`
  width: 80vw;
  height: 1px;
  margin-bottom: 30px;
  margin-top: 60px;
  background-color: ${COLORS.footerLine};
`;

export const CodeOfConduct = styled(LegalText)``;
export const PrivacyPolicy = styled(LegalText)``;
export const TermsOfUse = styled(LegalText)``;

// ---------------------------------------------------------------------------------------------------- //

// Cards

export const ReasonsCard = styled(Container)`
  margin: 35px;
  /* height: 350px; */
  justify-content: flex-start;
  align-items: center;

  h3 {
    font-weight: 700;
    font-size: 24px;
  }

  p {
    width: 320px;
    text-align: center;
    font-size: 18px;
  }

  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    margin: 20px 0;
    /* height: 256px; */
  }
`;

export const AttributesCard = styled(Container)``;

export const HelpInfoCard = styled(InfoCard)``;

export const VolunteerInfoCard = styled(InfoCard)``;

// ---------------------------------------------------------------------------------------------------- //

// Buttons

export const LogInButton = styled(Button)`
  background: none;
  border: none;
  color: #eb7100;
  transition: all 0.3s ease;

  &:hover {
    border: 1px solid ${COLORS.brandOrange};
  }
`;

export const SignUpButton = styled(Button)`
  border: none;
  color: ${COLORS.white};
  background: ${COLORS.stepBackwardNormal};
`;

export const GetHelpBtn = styled(Button)`
  color: ${COLORS.white};
  background: ${COLORS.stepBackwardNormal};
  border: none;
  margin-left: 0;

  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    margin: 0 9px 0 0;
    flex-grow: 1;
  }
`;

export const VolunteerBtn = styled(Button)`
  color: ${COLORS.white};
  background: none;
  border: 1px solid ${COLORS.white};

  &:hover {
    background: ${COLORS.white};
    color: ${COLORS.black};
  }

  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    margin: 0;
    flex-grow: 1;
  }
`;
export const AboutBtn = styled(Button)`
  color: ${COLORS.brandOrange};
  border: 2px solid ${COLORS.brandOrange};
  width: 130px;
  background: none;
  margin-left: 0;
`;
// ---------------------------------------------------------------------------------------------------- //

// Image Components

export const Logo = styled.img``;

export const BetaFlair = styled.img`
  height: 20px;
  border-radius: 5px;
  margin-left: 10px;
  position: relative;
  bottom: 12px;
  font-size: 14px;
`;

export const RectTop = styled.img`
  position: absolute;
  top: 0;
  z-index: -5;
  width: 100%;

  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    top: -300px;
    left: -12%;
    width: 270%;
  }
`;

export const Shop = styled(ReasonsCardIcon)``;

export const Check = styled(ReasonsCardIcon)``;

export const Card = styled(ReasonsCardIcon)``;

export const PeopleTop = styled.img`
  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    display: none;
  }
`;

export const MockupImage = styled.img`
  max-height: 600px;
  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    width: 100%;
  }
`;

export const HelpInfoRequestImage = styled.img``;

export const HelpInfoOfferImage = styled.img``;

export const HelpInfoCoordinateImage = styled.img``;

export const OfferHelpLogo = styled.img``;

export const ChoseWhoToHelpLogo = styled.img`
  margin-bottom: 10px;
`;

export const CoordinateHelpLogo = styled.img`
  position: relative;
  bottom: 10px;
  margin-bottom: -10px;
`;

export const FooterLogo = styled.img``;

export const TeamMeetingImage = styled.img`
  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

// ---------------------------------------------------------------------------------------------------- //

// Sponsor Logos

export const AirtableLogo = styled.img`
  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    flex-basis: 40%;
    margin-bottom: 25px;
  }
`;

export const AlgoliaLogo = styled.img`
  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    flex-basis: 30%;
    margin-bottom: 15px;
  }
`;

export const CanvaLogo = styled.img`
  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    flex-basis: 30%;
  }
`;

export const DatadogLogo = styled.img`
  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    flex-basis: 40%;
    margin-bottom: 10px;
  }
`;

export const FigmaLogo = styled.img`
  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    margin-bottom: 15px;
  }
`;

export const GatsbyLogo = styled.img`
  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    flex-basis: 40%;
    margin-bottom: 25px;
  }
`;

export const GoogleLogo = styled.img`
  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    flex-basis: 30%;
    margin-bottom: 15px;
  }
`;

export const HelpfulEngineeringLogo = styled.img`
  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    flex-basis: 40%;
    margin-bottom: 25px;
  }
`;

export const NetlifyLogo = styled.img`
  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    flex-basis: 40%;
    margin-bottom: 25px;
  }
`;

export const SlackLogo = styled.img`
  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    flex-basis: 40%;
    margin-bottom: 10px;
  }
`;

export const TwilioLogo = styled.img`
  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    flex-basis: 30%;
  }
`;

export const TypeformLogo = styled.img`
  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    flex-basis: 30%;
  }
`;

// ---------------------------------------------------------------------------------------------------- //

// Social Media Icons

export const EmailIcon = styled(SocialMediaIcon)`
  &:hover {
    filter: invert(43%) sepia(97%) saturate(1408%) hue-rotate(3deg)
      brightness(96%) contrast(99%);
  }

  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    flex-basis: 33%;
    margin-bottom: 30px;
  }
`;

export const FacebookIcon = styled(SocialMediaIcon)`
  &:hover {
    filter: invert(43%) sepia(97%) saturate(1408%) hue-rotate(3deg)
      brightness(96%) contrast(99%);
  }

  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    flex-basis: 33%;
    margin-bottom: 30px;
  }
`;

export const GithubIcon = styled(SocialMediaIcon)`
  &:hover {
    filter: invert(43%) sepia(97%) saturate(1408%) hue-rotate(3deg)
      brightness(96%) contrast(99%);
  }

  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    flex-basis: 33%;
    margin-bottom: 30px;
  }
`;

export const InstagramIcon = styled(SocialMediaIcon)`
  &:hover {
    filter: invert(43%) sepia(97%) saturate(1408%) hue-rotate(3deg)
      brightness(96%) contrast(99%);
  }

  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    flex-basis: 33%;
    margin-bottom: 30px;
  }
`;

export const LinkedInIcon = styled(SocialMediaIcon)`
  &:hover {
    filter: invert(43%) sepia(97%) saturate(1408%) hue-rotate(3deg)
      brightness(96%) contrast(99%);
  }

  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    flex-basis: 33%;
    margin-bottom: 30px;
  }
`;

export const TwitterIcon = styled(SocialMediaIcon)`
  &:hover {
    filter: invert(43%) sepia(97%) saturate(1408%) hue-rotate(3deg)
      brightness(96%) contrast(99%);
  }

  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    flex-basis: 33%;
    margin-bottom: 30px;
  }
`;
