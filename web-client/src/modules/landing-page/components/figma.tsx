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

export const AttributesSection = styled(Container)``;

export const HelpInfoSection = styled(Container)``;

export const SponsorSection = styled(Container)``;

export const VolunteerInfoSection = styled(Container)``;
export const AboutInfoSection = styled(Container)``;
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

export const AboutTextContainer = styled(Container)``;

// ---------------------------------------------------------------------------------------------------- //

// Child Components

export const Link = styled.a`
  text-decoration: none;
  margin: 0px 15px;
  color: black;
`;

export const Dropdown = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 5px;
  padding-right: 0;

  ul {
    list-style: none;
    padding-left: 2px;
    height: 25px;
    overflow: hidden;
    position: relative;
    top: 5px;
    width: 80px;
    background: white;
    border-radius: 5px;

    &: hover {
      position: relative;
      top: 40px;
      height: 95px;
    }

    li {
      cursor: pointer;
      border-radius: 5px;
      padding: 4px;
      margin-right: 2px;
      &: hover {
        color: white;
        background: #ffcb52;
      }
    }
  }
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

export const PeopleTop = styled.img``;

export const MockupImage = styled.img``;

export const FooterLogo = styled.img``;
