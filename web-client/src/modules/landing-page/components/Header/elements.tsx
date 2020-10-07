import styled from 'styled-components';

export const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  height: 10vh;
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
  margin-left: 5vw;
`;

export const ButtonContainer = styled.div``;

const Button = styled.button`
  height: 35px;
  width: 105px;
  border-radius: 4px;
  margin: 2px;
`;

export const LogInButton = styled(Button)`
  background: none;
  border: none;
  color: #eb7100;
  transition: all 0.3s ease;
`;
export const SignUpButton = styled(Button)`
  border: none;
  color: white;
  background: #ff7b02;
  margin-right: 5vw;
  transition: all 0.3s ease;
`;
