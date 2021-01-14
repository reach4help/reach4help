import styled from "styled-components"

export const WorldMapWrapper = styled.div`
  width: 95%;
  margin: auto;
  h2 {
    text-align: center;
    font-size: 40px;
    margin: auto;
    margin-bottom: -40px;
    display: flex;
    flex-direction: column;
    padding-top: 25px;
  }
  ${p => p.theme.breakpoints.medium} {
    width: 100%;
    h2 {
      font-size: 28px;
    }
  }
  ${p => p.theme.breakpoints.small} {
    width: 100%;
    h2 {
      font-size: 20px;
      margin-bottom: -10px;
    }
  }
`
