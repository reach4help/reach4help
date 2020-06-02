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
  /* margin-bottom: 3em; */

  p {
    line-height: 1.5em;
    font-size: 1.1em;
    font-weight: bold;
  }
`

export const LogosWrapper = styled.div`
  padding: 2em 3em;
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

    :hover {
      opacity: 1;
    }
  }
`
