import styled from "styled-components"

export const WorldMapWrapper = styled.div`
  width: 100%;
  margin: auto;
  margin-bottom: -90px;

  .heading {
    width: 80%;
    margin: auto;

    ${p => p.theme.breakpoints.medium} {
      width: 90%;
    }
  }

  h2 {
    text-align: center;
    font-size: 1.75em;
    margin: auto;
    margin-bottom: -85px;
    display: flex;
    flex-direction: column;
    padding: 15px;
  }

  ${p => p.theme.breakpoints.medium} {
    margin-bottom: -60px;

    h2 {
      font-size: 1em;
      margin-bottom: -50px;
    }
  }

  ${p => p.theme.breakpoints.small} {
    margin-bottom: -30px;

    h2 {
      font-size: 1em;
      margin-bottom: -20px;
    }
  }
`
