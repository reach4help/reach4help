import styled from "styled-components"

export const BackdropWrapper = styled.div`
  ${p => p.theme.breakpoints.small} {
    opacity: ${props => (props.show ? "0" : "0.5")};
    visibility: ${props => (props.show ? "hidden" : "visible")};
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0);
    z-index: 10;

    transition: visibility 0.3s, opacity 0.3s ease-in-out;
  }
`
