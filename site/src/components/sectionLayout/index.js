import React from "react"
import PropTypes from "prop-types"

import { SectionWrapper } from "./style"

// general layout component for specific sections within a page
// primarily used for styling
function SectionLayout({ children }) {
  return <SectionWrapper>{children}</SectionWrapper>
}

SectionLayout.propTypes = {
  children: PropTypes.node,
}

export default SectionLayout
