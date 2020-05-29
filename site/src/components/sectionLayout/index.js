import React from "react"
import PropTypes from "prop-types"

import { SectionWrapper } from "./style"

function SectionLayout({ children }) {
  return <SectionWrapper>{children}</SectionWrapper>
}

SectionLayout.propTypes = {
  children: PropTypes.node,
}

export default SectionLayout
