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

  h2 {
    font-size: 30px;
    margin-bottom: 5px;
  }

  h3 {
    max-width: 900px;
  }

  p {
    line-height: 1.5em;
    font-size: 1.1em;
    font-weight: bold;
  }
`

export const LogosWrapper = styled.div`
  gap: 1em 2em;
  padding: 1.5em 3em;
  padding-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  ${p => p.theme.breakpoints.small} {
    gap: 0.5em;
  }

  img {
    filter: grayscale();
    opacity: 0.8;
    transition: opacity 0.3s ease, filter 0.3s ease;

    :hover {
      filter: none;
      opacity: 1;
    }
  }
`
