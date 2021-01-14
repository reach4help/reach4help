import styled from "styled-components"

export const SectionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;

  ${p => p.theme.breakpoints.extraLarge} {
    padding: 2em 40px;
  }

  ${p => p.theme.breakpoints.medium} {
    padding: 1em 20px;
  }

  background: white;
`
