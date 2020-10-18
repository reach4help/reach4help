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

export const HowToSection = styled(Container)`
  background-color: rgba(255, 123, 2, 0.05);
  height: 755px;
  text-align: center;
`;

export const SponsorSection = styled(Container)``;
export const HelpInfoSection = styled(Container)``;
export const VolunteerInfoSection = styled(Container)``;
export const AboutInfoSection = styled(Container)`
  background-color: rgba(255, 123, 2, 0.05);
  height: 755px;
  text-align: center;
`;

export const SocialLinksSection = styled(Flex)`
  background: #811e78;
`;

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

// Danai work in progress
export const HowToContainer = styled(Container)`
  border: 1px solid hotpink;
`;
export const AboutTextContainer = styled(Container)``;

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
    width: 250px;
    text-align: left;
    font-size: 18px;
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

export const AttributesCard = styled(Container)``;

export const HelpInfoCard = styled(Container)``;

export const VolunteerInfoCard = styled(Container)``;

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

export const FooterLogo = styled.img``;

export const HelpfulEngineeringLogo = styled.img``;
