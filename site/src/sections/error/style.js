import styled from "styled-components"
import { SectionWrapper } from "src/components/sectionLayout/style"

export const Wrapper = styled(SectionWrapper)``

export const ContentWrapper = styled.div`
  max-width: 40em;
  display: flex;
  flex-direction: column;
  /* margin-bottom: 3em; */

  h1 {
    font-size: 3em;
  }

  p {
    line-height: 1.5em;
  }
`
