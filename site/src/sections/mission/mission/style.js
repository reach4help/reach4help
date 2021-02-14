import styled from "styled-components"
import { SectionWrapper } from "src/components/sectionLayout/style"

export const Wrapper = styled(SectionWrapper)`
  align-items: center;
  display: flex;
  align-content: center;

  padding-bottom: 0;
  padding: 0;

  ${p => p.theme.breakpoints.medium} {
    flex-wrap: wrap;
  }

  .imageWrapper {
    position: relative;
    /* top: -20px; */
    width: 30%;
    min-width: 250px;
    ${p => p.theme.breakpoints.medium} {
      top: 0;
      width: 60%;
    }
  }
`

export const TopSection = styled.div`
  background: linear-gradient(152.35deg, #f27979 6.01%, #7d00a3 72.34%);
  padding: 30px;
  width: 100%;

  text-align: center;
  vertical-align: middle;

  color: white;

  h1 {
    max-width: 600px;
    margin-left: auto;
    margin-right auto;

    ${p => p.theme.breakpoints.medium} {
      max-width: 400px;
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

  p {
    line-height: 1.5em;
  }
`
