import React from "react"
import PropTypes from "prop-types"

import { HamburgerWrapper } from "./style"

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
  show: PropTypes.bool,
  onClick: PropTypes.func,
}

export default Hamburger
