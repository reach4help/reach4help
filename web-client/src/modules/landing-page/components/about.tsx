import styled from 'styled-components';

const Flex = styled.div`
  display: flexbox;
  align-items: space-evenly;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-evenly;
  justify-content: center;
`;

const Button = styled.button`
  height: 35px;
  width: 105px;
  border-radius: 4px;
  margin: 10px;
  cursor: pointer;
`;

// ----------------------------------------------- //

export const TopSection = styled(Container)`
  position: relative;
  top: 65px;
  height: 320px;
  padding-bottom: 80px;
  background: linear-gradient(152.35deg, #f27979 6.01%, #7d00a3 72.34%);
`;

export const TopTextContainer = styled(Container)`
  margin: auto;
  position: relative;
  top: 50px;
  text-align: center;
`;

export const TopText = styled.div`
  h1 {
    color: white;
    font-size: 50px;
    font-family: Roboto;
    font-weight: 500;
  }
`;

// --------------------------------------- //

export const MiddleSection = styled(Container)`
  margin-top: 120px;
  padding-top: 60px;
  padding-left: auto;
  padding-right: auto;
`;

export const MissionContainer = styled(Flex)`
  padding-top: 20px;
  padding-right: 132px;
  width: 524px;
`;

export const MissionText = styled.div`
  h1 {
    color: 00034a;
    font-size: 44px;
  }
  p {
    font-size: 18px;
  }
`;

export const TeamContainer = styled(Flex)`
  padding-top: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 762px;
`;

export const TeamText = styled.div`
  text-align: center;
  h1 {
    color: 0034a;
    font-size: 44px;
  }
  p {
    font-size: 20px;
  }
`;

export const TeamTitle = styled.div`
  text-align: left;
  padding-left: 25px;
  h2 {
    color: #00034a;
    font-size: 20px;
    font-weight: bold;
  }
`;

export const TeamImageContainer = styled(Container)`
  padding: 30px 0;
  width: 100 vh;
  overflow-x: auto;
  @media (max-with: 500px) {
    width: 100vh;
  }
`;

export const JoinContainer = styled(Flex)`
  padding-top: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 762px;
`;

export const JoinText = styled.div`
  text-align: center;
  h3 {
    font-size: 30px;
  }
  p {
    font-size: 20px;
  }
`;

export const ButtonContainer = styled(Container)`
  padding-top: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
`;

export const JoinButton = styled(Button)`
  color: #333333;
  background: white;
  border: 2px solid #333333;

  &:hover {
    background: #333333;
    color: white;
  }
`;

export const SolvingImage = styled.img``;
export const ContributorImage = styled.img`
  border-radius: 50%;
  width: 60px;
  height: 60px;
  margin: 10px;
  @media (max-with: 500px) {
    width: 30px;
    height: 30px;
    margin-left: 10px;
    margin-right: 10px;
  }
  @media (max-with: 1300px) {
    width: 50px;
    height: 50px;
    margin-left: 15px;
    margin-right: 15px;
  }
`;
