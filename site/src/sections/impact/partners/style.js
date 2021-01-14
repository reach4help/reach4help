import styled from "styled-components"
import { SectionWrapper } from "src/components/sectionLayout/style"

export const Wrapper = styled(SectionWrapper)`
  background: transparent;
  color: white;
  flex-wrap: wrap;
  text-align: center;
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  p {
    line-height: 1.5em;
    font-size: 1.1em;
    font-weight: bold;
  }
`

export const LogosWrapper = styled.div`
  padding: 1.5em 3em;
  padding-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  ${p => p.theme.breakpoints.small} {
    padding-right: 2em;
  }

  img {
    padding-right: 2em;
    opacity: 0.8;
    transition: opacity 0.3s ease;
    margin-bottom: 5px;
    width: 10rem;
    max-width: 10rem;
    max-height: 3rem;

    :hover {
      opacity: 1;
    }

    ${p => p.theme.breakpoints.small} {
      padding-bottom: 0.5em;
    }
  }
`
