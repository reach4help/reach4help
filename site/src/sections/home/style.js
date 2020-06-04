import styled from "styled-components"
import { SectionWrapper } from "src/components/sectionLayout/style"

export const Wrapper = styled(SectionWrapper)`
  flex-direction: column;
  text-align: center;
  color: white;

  ${p => p.theme.breakpoints.extraLarge} {
    padding: 4em 40px;
  }

  ${p => p.theme.breakpoints.medium} {
    padding: 2em 40px;
  }

  h2 {
    margin-bottom: 1em;
  }

  background: linear-gradient(139.14deg, #f27979 2.64%, #7d00a3 97.36%);
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 1em;

  h3 {
    margin: 10px;
  }

  p {
    line-height: 1.5em;
  }
`

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 2em;

  img {
    width: 108px;

    ${p => p.theme.breakpoints.small} {
    /* width: 80px; */
    width: 25%;
  }
  }

  .logo-type {
    margin-left: 22px;
    margin-right: 8px;
    margin-top: 2px;
    width: 100%;
    height: auto;
    min-width: 100px;
    max-width: 285px;

    .text {
      fill: white;
    }
    .accent {
      fill: ${p => p.theme.colors.accent};
    }
  }

  /* ${p => p.theme.breakpoints.small} {
    flex-grow: 0;
    img {
      width: 30px;
    }
    .logo-type {
      display: none;
    }
  } */
`

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 1em;
  height: 50px;
  width: 90%;
  margin-bottom: 2em;

  ${p => p.theme.breakpoints.small} {
    flex-wrap: wrap;
    height: 100px;
  }

  .button {
    height: 75%;
    width: 320px;
    margin: 5px;

    ${p => p.theme.breakpoints.small} {
      flex-basis: 100%;
    }
  }
`
