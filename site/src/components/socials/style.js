import styled from "styled-components"

const PADDING_HORIZONTAL = "50px"

export const SocialsWrapper = styled.div`
  color: #fff;
  /* right: ${PADDING_HORIZONTAL}; */
  /* top: 0;
  bottom: 0; */
  display: flex;
  align-items: center;
  justify-content: center;

  /* .social-icons {
        color: ${p => p.theme.colors.primaryDark1};
        position: initial;
        justify-content: center;
        margin-top: 20px;
        margin-bottom: 20px;
      } */

  /* [dir="rtl"] & {
    right: initial;
    left: ${PADDING_HORIZONTAL};
  } */

  a {
    color: inherit !important;
    opacity: 0.85;
    padding: 0 9px;

    transition: opacity 0.25s ease;

    svg {
      width: 30px;
    }

    :hover {
      opacity: 1;
      text-shadow: 0px 4px 10px rgba(31, 0, 41, 0.15);
    }
  }
`
