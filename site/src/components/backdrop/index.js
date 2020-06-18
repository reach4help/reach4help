import React from "react"
import PropTypes from "prop-types"

import { BackdropWrapper } from "./style"

// backdrop for any foreground element
function Backdrop({ show, onClick }) {
  return <BackdropWrapper show={show} onClick={onClick} />
}

Backdrop.propTypes = {
  show: PropTypes.bool, // state of foreground element
  onClick: PropTypes.func, // function that changes ^
}

export default Backdrop
