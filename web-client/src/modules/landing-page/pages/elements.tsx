import styled from 'styled-components';

export const Root = styled.div`
  width: 100vw;
  overflow-y: hidden;
`;

export const RectTop = styled.img`
  position: absolute;
  top: 0;
  z-index: -5;
  width: 99.19vw;
`;

export const PeopleTop = styled.img`
  position: absolute;
  top: 150px;
  right: 100px;
`;

const Container = styled.div``;

export const TextTopContainer = styled(Container)`
  position: absolute;
  top: 200px;
  left: 100px;
  width: 500px;
`;

export const TextTop = styled.div`
  h1 {
    font-size: 50px;
    color: white;
    line-height: 63px;
  }

  p {
    color: white;
    font-size: 18px;
    width: 400px;
  }
`;

const Button = styled.button`
  height: 35px;
  width: 130px;
  border-radius: 4px;
  margin: 10px;
  cursor: pointer;
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
  border: 1 px solid white;
`;
