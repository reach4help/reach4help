import styled from "styled-components"

export const WorldMapWrapper = styled.div`
  width: 100%;
  margin: auto;
  margin-bottom: -90px;

  h2 {
    text-align: center;
    font-size: 40px;
    margin: auto;
    margin-bottom: -85px;
    display: flex;
    flex-direction: column;
    padding-top: 15px;
  }

  ${p => p.theme.breakpoints.medium} {
    margin-bottom: -60px;

    h2 {
      font-size: 28px;
      margin-bottom: -50px;
    }
  }

  ${p => p.theme.breakpoints.small} {
    margin-bottom: -30px;

    h2 {
      font-size: 20px;
      margin-bottom: -20px;
    }
  }
`
