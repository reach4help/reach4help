import React from "react"
import PropTypes from "prop-types"
import { ThemeProvider } from "styled-components"
import { LayoutWrapper } from "./style"

import Theme from "../../styles/theme"
import GlobalStyles from "../../styles/global"

if (typeof window !== "undefined") {
  // eslint-disable-next-line global-require
  require("smooth-scroll")('a[href*="#"]', {
    header: "header",
    easing: "easeInOutCubic",
  })
}

function Layout({ children }) {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyles />
      <LayoutWrapper>{children}</LayoutWrapper>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node,
}

export default Layout
