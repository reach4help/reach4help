import styled from "styled-components"

export const LayoutWrapper = styled.div`
  /* margin: 0 auto;
  max-width: 750px;
  padding: 1rem;
*/

  display: flex;
  flex-direction: column;
  min-height: 100vh;

  .sections {
    flex-grow: 1;
    margin-top: ${p =>
      p.theme.measurements.headerHeight + p.theme.measurements.drawerHeight}px;

    ${p => p.theme.breakpoints.small} {
      margin-top: ${p => p.theme.measurements.headerHeight}px;
    }
  }

  .partners {
    background: linear-gradient(
      138.25deg,
      ${p => p.theme.colors.primary} 0.9%,
      ${p => p.theme.colors.secondary} 100.19%
    );
  }
`
