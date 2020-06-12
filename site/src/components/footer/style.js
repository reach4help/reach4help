import styled from "styled-components"

export const FooterWrapper = styled.footer`
  color: white;
  padding: 10px;

  display: flex;

  justify-content: space-between;
  align-items: center;

  background: ${p =>
    p.transparent
      ? "transparent"
      : `linear-gradient(138.25deg, ${p.theme.colors.primary} 0.9%, ${p.theme.colors.secondary} 100.19%)`};

  a {
    color: white;
    opacity: 0.7;

    :hover {
      opacity: 1;
    }
  }
`
