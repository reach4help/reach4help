import styled from "styled-components"

export const FooterWrapper = styled.footer`
  color: white;
  padding: 10px;

  display: flex;

  justify-content: space-between;
  align-items: center;

  background: ${p =>
    p.background
      ? p.background
      : `linear-gradient(138.25deg, ${p.theme.colors.primary} 0.9%, ${p.theme.colors.secondary} 100.19%)`};

  a {
    color: white;
    opacity: 0.7;
    text-decoration: none;
    transition: all 0.3s ease;

    :hover {
      opacity: 1;
      text-decoration: underline;
    }
  }
`
