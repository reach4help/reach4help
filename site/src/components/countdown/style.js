import styled from "styled-components"

export const CountdownWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin: 10px auto;
  padding-bottom: 20px;

  grid-gap: 10px 20px;

  ${p => p.theme.breakpoints.small} {
    grid-template-columns: repeat(2, 1fr);
  }

  .col {
    display: inline-block;
  }

  .col-element {
    display: flex;
    flex-direction: column;
    text-align: center;
  }

  .col-element strong {
    font-size: 50px;
  }
`
