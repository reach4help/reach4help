import React from "react"
import PropTypes from "prop-types"

import { HamburgerWrapper } from "./style"

// hamburger menu for mobile usage
function Hamburger({ show, onClick }) {
  return (
    <HamburgerWrapper onClick={onClick} show={show}>
      <span />
      <span />
      <span />
    </HamburgerWrapper>
  )
}

Hamburger.propTypes = {
  show: PropTypes.bool, // state of header drawer
  onClick: PropTypes.func, // function that changes ^
}

export default Hamburger
