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
  height: 35px;
  width: 105px;
  border-radius: 4px;
  margin: 10px;
  cursor: pointer;
`;

const ReasonsCardIcon = styled.img`
  width: 40px;
  height: 40px;
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
  background: white;
  z-index: 5;
`;

export const Root = styled.div`
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
  margin-top: 65px;
  padding-top: 70px;
`;

export const MiddleSection = styled(Flex)`
  width: 100%;
  position: relative;
  top: 250px;
  margin-bottom: 250px;
`;

export const ReasonsSection = styled(Container)`
  text-align: center;
  align-items: center;
  margin-top: 400px;

  h1 {
    font-size: 54px;
  }
`;

export const HelpInfoSection = styled(Container)`
  background-color: rgba(255, 123, 2, 0.05);
  height: 755px;
  text-align: center;

  h1 {
    font-size: 54px;
  }
`;

export const VolunteerInfoSection = styled(Container)`
  align-items: center;
  padding: 40px;
  background: rgba(129, 30, 120, 0.05);
  h3 {
    font-size: 54px;
  }
`;

export const AboutInfoSection = styled(Flex)`
  height: 525px;
  width: 100%;
`;

export const SponsorSection = styled(Container)`
  background: #811e78;
  height: 473px;
  width: 100%;
`;

export const SocialLinksSection = styled(Flex)``;

export const LegalSection = styled(Flex)``;

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
`;

export const TextMiddleContainer = styled(Container)`
  position: relative;
  top: 40px;
  width: 500px;
`;

export const ReasonsContainer = styled(Flex)`
  flex-direction: row;
  width: 100%;
`;

export const ReasonsCardIconContainer = styled(Container)`
  align-items: center;
  justify-content: center;
  background-color: #f9f9ff;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 50px;
`;

export const HelpInfoContainer = styled(Flex)`
  align-items: flex-start;
  margin-top: 50px;
`;

export const AboutTextContainer = styled(Container)`
  position: relative;
  width: 540px;
  h1 {
    font-size: 30px;
    font-weight: 700;
  }
  h3 {
    font-size: 54px;
    font-weight: 500;
    line-height: 60px;
  }
  p {
    size: 18px;
  }
`;

export const SponsorThankYou = styled(Flex)`
  width: 1114px;
  height: 88px;
  margin-bottom: 30px;
  align-self: center;

  h3 {
    font-family: Roboto;
    color: #ffffff;
    font-size: 30px;
    line-height: 36px;
    text-align: center;
  }
`;

export const SponsorLogoMiddle = styled(Flex)`
  margin: 30px 20px;
`;

export const SponsorLogoBottom = styled(Flex)`
  margin: 0px 30px;
`;

export const VolunteerInfoContainer = styled(Flex)`
  width: 100%;
`;

export const VolunteerInfoCardContainer = styled(Container)`
  height: 500px;
  margin: 20px;
  box-shadow: 0 0 5px gray;
  overflow: hidden;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  background: white;

  h2 {
    background: #811e78;
    font-weight: 700;
    font-size: 30px;
    width: 100%;
    padding: 20px 0;
    text-align: center;
    color: white;
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
`;

// ---------------------------------------------------------------------------------------------------- //

// Child Components

export const Link = styled.a`
  text-decoration: none;
  margin: 0px 15px;
  color: black;
`;

export const TextTop = styled.div`
  h1 {
    font-size: 50px;
    color: white;
    line-height: 60px;
  }

  p {
    color: white;
    font-size: 18px;
    width: 400px;
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
`;

export const HelpInfoLeft = styled.div`
  width: 774px;
  height: 493px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 0px 15px 0px #000000 15%;

  h3 {
    font-size: 30px;
    font-weight: 700;
    color: #ffffff;
    background-color: #eb7100;
    padding: 14px 0;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
`;

export const HelpInfoLeftWrapper = styled(Flex)`
  padding: 50px 30px;

  div {
    width: 30%;
  }

  h4 {
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
    padding: 24px 0;
  }

  p {
    font-size: 18px;
    font-weight: 400;
  }
`;

export const HelpInfoRight = styled.div`
  width: 323px;
  height: 493px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 0px 15px 0px #000000 15%;

  h3 {
    font-size: 30px;
    font-weight: 700;
    color: #ffffff;
    background-color: #eb7100;
    padding: 14px 0;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  div {
    padding: 50px 30px;
  }

  h4 {
    font-size: 20px;
    font-weight: 500;
    line-height: 28px;
    padding: 24px 0;
  }

  p {
    font-size: 18px;
    font-weight: 400;
  }
`;

export const FooterLine = styled.div`
  width: 80vw;
  height: 1px;
  margin-bottom: 30px;
  background-color: #c4c4c4;
`;

// ---------------------------------------------------------------------------------------------------- //

// Cards

export const ReasonsCard = styled(Container)`
  margin: 65px 35px;
  height: 350px;
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
`;

export const AttributesCard = styled(Container)``;

export const HelpInfoCard = styled(Container)``;

export const VolunteerInfoCard = styled(Container)`
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

// Buttons

export const LogInButton = styled(Button)`
  background: none;
  border: none;
  color: #eb7100;
  transition: all 0.3s ease;

  &:hover {
    border: 1px solid #eb7100;
  }
`;

export const SignUpButton = styled(Button)`
  border: none;
  color: white;
  background: #ff7b02;
`;

export const GetHelpBtn = styled(Button)`
  color: white;
  background: #ff7b02;
  border: none;
  margin-left: 0;
`;

export const VolunteerBtn = styled(Button)`
  color: white;
  background: none;
  border: 1px solid white;

  &:hover {
    background: white;
    color: black;
  }
`;
export const AboutBtn = styled(Button)`
  color: #eb7100;
  border: 2px solid #eb7100;
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
`;

export const Shop = styled(ReasonsCardIcon)``;

export const Check = styled(ReasonsCardIcon)``;

export const Card = styled(ReasonsCardIcon)``;

export const PeopleTop = styled.img``;

export const MockupImage = styled.img``;

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

export const TeamMeetingImage = styled.img``;

// ---------------------------------------------------------------------------------------------------- //

// Sponsor Logos

export const AirtableLogo = styled.img``;

export const AlgoliaLogo = styled.img``;

export const CanvaLogo = styled.img``;

export const DatadogLogo = styled.img``;

export const FigmaLogo = styled.img``;

export const GatsbyLogo = styled.img``;

export const GoogleLogo = styled.img``;

export const HelpfulEngineeringLogo = styled.img``;

export const NetlifyLogo = styled.img``;

export const SlackLogo = styled.img``;

export const TwilioLogo = styled.img``;

export const TypeformLogo = styled.img``;
