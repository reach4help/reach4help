import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
  align-items: space-evenly;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: space-evenly;
  justify-content: center;
`;

// ----------------------------------------------- //

export const TopSection = styled(Container)`
  position: relative;
  top: 65px;
  height: 320px;
  padding-bottom: 80px;
  background: linear-gradient(72.65deg, #f27979 6.01%, #7d00a3 72.34%);
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

export const SolvingImage = styled.img``;
