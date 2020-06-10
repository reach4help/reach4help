import React from "react"
import PropTypes from "prop-types"

import { BackdropWrapper } from "./style"

function Backdrop({ show, onClick }) {
  return <BackdropWrapper show={show} onClick={onClick} />
}

Backdrop.propTypes = {
  show: PropTypes.bool,
  onClick: PropTypes.func,
}

export default Backdrop
