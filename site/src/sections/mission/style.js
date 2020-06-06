import styled from "styled-components"
import { SectionWrapper } from "src/components/sectionLayout/style"

export const Wrapper = styled(SectionWrapper)`
  padding-bottom: 0;

  ${p => p.theme.breakpoints.medium} {
    flex-wrap: wrap;
  }

  .imageWrapper {
    position: relative;
    top: -20px;
    width: 40%;
    min-width: 300px;
    ${p => p.theme.breakpoints.medium} {
      top: 0;
      width: 60%;
    }
  }

  img {
  }
`

export const ContentWrapper = styled.div`
  max-width: 35em;
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

  p {
    line-height: 1.5em;
  }
`
