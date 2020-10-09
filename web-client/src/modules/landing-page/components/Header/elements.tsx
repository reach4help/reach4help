import styled from 'styled-components';

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

export const Logo = styled.img``;

export const BetaFlair = styled.img`
  height: 20px;
  border-radius: 5px;
  margin-left: 10px;
  position: relative;
  bottom: 12px;
  font-size: 14px;
`;

export const LogoContainer = styled.div`
  margin-left: 3vw;
`;

export const ButtonContainer = styled.div`
  margin-right: 3vw;
`;

const Button = styled.button`
  height: 35px;
  width: 105px;
  border-radius: 4px;
  margin: 2px;
  cursor: pointer;
`;

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

export const LinkContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
`;

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
