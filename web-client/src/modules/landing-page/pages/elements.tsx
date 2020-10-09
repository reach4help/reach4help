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
  width: 130px;
  border-radius: 4px;
  margin: 10px;
  cursor: pointer;
`;

// ---------------------------------------------------------------------------------------------------- //

// Principal Components

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

export const RectTop = styled.img`
  position: absolute;
  top: 0;
  z-index: -5;
  width: 100%;
`;

export const PeopleTop = styled.img``;

export const MockupImage = styled.img``;

export const FooterLogo = styled.img``;
