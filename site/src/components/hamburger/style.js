import styled from "styled-components"

export const HamburgerWrapper = styled.div`
  display: none;
  cursor: pointer;

  ${p => p.theme.breakpoints.small} {
    display: block;
  }

  height: 24px;
  width: 30px;
  background: transparent;
  border: none;

  :focus {
    outline: none;
  }

  /* TODO: change the hamburger icon to cross based on props.show */

  span {
    width: 100%;
    background: ${props => props.theme.colors.accent};

    top: 2px;
    display: block;

    height: 4px;
    margin-bottom: 5px;
    position: relative;

    border-radius: 2px;
    z-index: 1;

    transform-origin: 4px 0px;

    transition: all 0.5s cubic-bezier(0.77, 0.2, 0.05, 1);
  }
`
