import { MEDIA_QUERIES } from 'src/constants/mediaQueries';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  /* flex-wrap: wrap; */
  align-items: space-evenly;
  justify-content: center;
  max-width: ${MEDIA_QUERIES.laptopL};

  margin: 60px;
  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    margin: 20px;
  }
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
  height: 300px;
  width: 100%;
  background: linear-gradient(152.35deg, #f27979 6.01%, #7d00a3 72.34%);
  margin: 0;

  text-align: center;
  vertical-align: middle;

  h1 {
    margin: auto;
    color: white;
    font-size: 50px;
    font-weight: 500;

    @media (max-width: ${MEDIA_QUERIES.tablet}) {
      font-size: 36px;
      line-height: 46px;
    }
  }
`;

// --------------------------------------- //

export const MiddleSection = styled(Container)`
  margin: 60px 60px 0;

  img {
    width: 50%;
  }

  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    margin: 20px 20px 0;
    flex-wrap: wrap-reverse;
  }

  h1 {
    color: #00034a;
    font-size: 44px;
  }

  p {
    font-size: 18px;
  }
`;

export const MissionContainer = styled(Container)`
  margin: 0;
`;

export const MissionText = styled.div``;

export const TeamContainer = styled(Container)`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 80%;
  max-width: 762px;

  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    padding-top: 0;
    width: 100%;
  }
`;

export const TeamTitle = styled.div`
  display: block;
  text-align: center;
  padding: 25px;
  h2 {
    color: #00034a;
    font-size: 28px;
    font-weight: bold;
  }
`;

export const TeamImageContainer = styled(Container)`
  margin-top: 0;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-wrap: wrap;
  gap: 1.5em;

  .ant-card {
    min-width: 0%;
  }
`;

export const JoinContainer = styled(TeamContainer)`
  margin: auto;

  h3 {
    font-size: 30px;
  }

  p {
    font-size: 20px;
  }

  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    h3 {
      font-size: 28px;
    }

    p {
      font-size: 18px;
    }
  }
`;

export const ButtonContainer = styled(Container)`
  margin: 0;
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
  @media (max-width: ${MEDIA_QUERIES.tablet}) {
    width: 100%;
  }
`;
