import styled from "styled-components"
import { SectionWrapper } from "src/components/sectionLayout/style"
import Button from "src/components/button"

export const Wrapper = styled(SectionWrapper)`
  flex-direction: row;
  flex-wrap: wrap;
  text-align: center;
  color: white;
  justify-content: space-around;

  ${p => p.theme.breakpoints.extraLarge} {
    padding: 4em 40px;
  }

  ${p => p.theme.breakpoints.small} {
    flex-direction: row-reverse;
  }

  background: linear-gradient(259.14deg, #f27979 2.64%, #7d00a3 97.36%);

  .main {
    display: flex;
    flex-direction: column;
    width: 40%;
    text-align: left;

    ${p => p.theme.breakpoints.small} {
      width: 90%;
    }

    h1 {
      margin-bottom: 0.5em;
    }
  }

  .image {
    ${p => p.theme.breakpoints.small} {
      margin-top: 1em;
      width: 100%;
    }

    width: 45%;
    margin-left: 20px;
  }
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
  justify-content: space-evenly;
  margin: 2em 0;
  height: 50px;
  /* width: 80%; */

  a {
    width: 45%;

    button {
      height: 75%;
      width: 100%;

      margin: 0 5px;

      ${p => p.theme.breakpoints.small} {
        flex-basis: 100%;
      }
    }
  }
`

export const MainCTA = styled(Button)`
  font-size: 58px;
`
