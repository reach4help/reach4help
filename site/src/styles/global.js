import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
  * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
  }
  body {
    font-family: ${p => p.theme.fonts.main};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  h1 {
    font-size: 42px;
    ${p => p.theme.breakpoints.medium} {
      font-size: 28px;
    }
  }
  h3 {
    font-size: 24px;
    ${p => p.theme.breakpoints.medium} {
      font-size: 18px;
    }
  }
  p {
    font-size: 18px;
    ${p => p.theme.breakpoints.medium} {
      font-size: 16px;
    }
  }
`
