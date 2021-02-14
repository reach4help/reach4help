import styled from "styled-components"
import { SectionWrapper } from "src/components/sectionLayout/style"

export const Wrapper = styled(SectionWrapper)`
  margin: 1em;
  ${p => p.theme.breakpoints.medium} {
    flex-wrap: wrap-reverse;
  }

  .button {
    margin-top: 1em;
    width: 100%;
    padding: 10px;
  }

  .textWrapper {
    max-width: 450px;
    margin-right: 2em;

    ${p => p.theme.breakpoints.medium} {
      margin-right: 0;
    }
  }

  img {
    width: 40%;
    min-width: 300px;
    margin-left: 3em;

    ${p => p.theme.breakpoints.medium} {
      margin-top: 2em;
      margin-left: 0;
      width: 60%;
    }
  }
`

export const ContentWrapper = styled.div`
  max-width: 40em;
  display: flex;
  flex-direction: column;

  h2 {
    margin-bottom: 0.75em;
  }
`
