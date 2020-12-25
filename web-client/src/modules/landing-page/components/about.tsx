import { MEDIA_QUERIES } from 'src/constants/mediaQueries';
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

  @media (max-width: ${MEDIA_QUERIES.mobileL}) {
    top: 0;
    padding-bottom: 0;
  }
`;

export const TopTextContainer = styled(Container)`
  margin: auto;
  position: relative;
  top: 50px;
  text-align: center;

  @media (max-width: ${MEDIA_QUERIES.mobileL}) {
    top: 0;
  }
`;

export const TopText = styled.div`
  h1 {
    color: white;
    font-size: 50px;
    font-family: Roboto;
    font-weight: 500;
  }

  @media (max-width: ${MEDIA_QUERIES.mobileL}) {
    h1 {
      font-size: 36px;
      line-height: 46px;
      margin-bottom: 0;
    }
  }
`;

// --------------------------------------- //

export const MiddleSection = styled(Container)`
  margin-top: 120px;
  padding-top: 60px;
  padding-left: auto;
  padding-right: auto;

  @media (max-width: ${MEDIA_QUERIES.mobileL}) {
    margin-top: 20px;
    padding-top: 20px;
    padding-left: 16px;
    padding-right: 16px;
    flex-direction: column-reverse;
  }
`;

export const MissionContainer = styled(Flex)`
  padding-top: 20px;
  padding-right: 132px;
  width: 524px;

  @media (max-width: ${MEDIA_QUERIES.mobileL}) {
    padding-right: 0;
    width: 100%;
  }
`;

export const MissionText = styled.div`
  h1 {
    color: 00034a;
    font-size: 44px;
  }

  p {
    font-size: 18px;
  }

  @media (max-width: ${MEDIA_QUERIES.mobileL}) {
    width: 340px;

    h1 {
      font-size: 36px;
    }
  }
`;

export const TeamContainer = styled(Flex)`
  padding-top: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 762px;

  @media (max-width: ${MEDIA_QUERIES.mobileL}) {
    padding-top: 0;
    width: 100%;
  }
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

  @media (max-width: ${MEDIA_QUERIES.mobileL}) {
    width: 340px;

    h1 {
      font-size: 36px;
    }

    p {
      font-size: 18px;
      margin-bottom: 50px;
    }
  }
`;

export const TeamImageContainer = styled(Container)`
  width: 90%;
  padding: 50px 0;

  @media (max-width: ${MEDIA_QUERIES.mobileL}) {
    width: 100%;
    padding: 5px 0;
    flex-wrap: wrap;
  }
`;

export const JoinContainer = styled(Flex)`
  padding-top: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 762px;

  @media (max-width: ${MEDIA_QUERIES.mobileL}) {
    padding-top: 0;
    width: 340px;
  }
`;

export const JoinText = styled.div`
  text-align: center;

  h3 {
    font-size: 30px;
  }

  p {
    font-size: 20px;
  }

  @media (max-width: ${MEDIA_QUERIES.mobileL}) {
    h3 {
      font-size: 28px;
    }

    p {
      font-size: 18px;
    }
  }
`;

export const ButtonContainer = styled(Container)`
  padding-top: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;

  @media (max-width: ${MEDIA_QUERIES.mobileL}) {
    margin-bottom: 0;
  }
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

export const SolvingImage = styled.img`
  @media (max-width: ${MEDIA_QUERIES.mobileL}) {
    width: 100%;
  }
`;
export const ContributorImage = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  margin-left: 50px;
  margin-right: 50px;

  @media (max-width: ${MEDIA_QUERIES.mobileL}) {
    width: 42px;
    height: 42px;
    margin-left: 1px;
    margin-right: 1px;
  }
`;
