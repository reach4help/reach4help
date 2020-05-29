import styled from "styled-components"

export const ButtonWrapper = styled.button`
  color: ${p => (p.textColor ? p.textColor : p.theme.colors.accent)};
  background: ${p => (p.backgroundColor ? p.textColor : "white")};
  background: ${p =>
    p.backgroundColor === "accent" ? p.theme.colors.accent : "white"};
  border: none;
  border-radius: 4px;
  padding: 0.25em;
  font-weight: bold;

  transition: all 0.3s ease;

  :focus {
    outline: none;
    box-shadow: 0 0 0 3px ${p => p.theme.colors.accent};
  }
`
