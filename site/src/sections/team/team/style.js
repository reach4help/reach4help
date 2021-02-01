import styled from "styled-components"
import { SectionWrapper } from "src/components/sectionLayout/style"

export const Wrapper = styled(SectionWrapper)`
  ${p => p.theme.breakpoints.medium} {
    flex-wrap: wrap;
  }

  .button {
    margin-top: 2em;
    width: 100%;
    padding: 10px;
  }

  .imageWrapper {
    position: relative;
    width: 40%;
    min-width: 300px;
    margin-left: 3em;

    ${p => p.theme.breakpoints.medium} {
      top: 0;
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
  /* margin-bottom: 3em; */

  h2 {
    margin-bottom: 0.75em;
    color: ${p => p.theme.colors.accent};

    ::after {
      margin-top: 7px;
      margin-left: 2px;
      display: block;
      content: "";
      width: 20px;
      height: 5px;
      background-color: ${p => p.theme.colors.secondary};
    }
  }

  h3 {
    color: ${p => p.theme.colors.accent};
  }

  p {
    line-height: 1.5em;
  }
`
