import styled from "styled-components"
import { SectionWrapper } from "src/components/sectionLayout/style"

export const Wrapper = styled(SectionWrapper)``

export const ContentWrapper = styled.div`
  margin-top: -3em;
  margin-bottom: 2em;
  max-width: 70em;
  display: flex;
  flex-direction: column;
  /* margin-bottom: 3em; */

  h1 {
    text-decoration: underline;
    text-align: center;
    padding: 0.5em;
  }

  h1,
  h2 {
    margin-top: 1em;
    margin-bottom: 0.5em;
    color: ${p => p.theme.colors.secondary};
  }

  p,
  ul {
    line-height: 1.5em;
    font-size: 1.1em;
  }

  ul {
    margin-top: 0.35em;
    margin-left: 30px;
  }
`
