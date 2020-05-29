import React from "react"
import PropTypes from "prop-types"

import { ButtonWrapper } from "./style"

function Button({ textColor, backgroundColor, onClick, children }) {
  return (
    <ButtonWrapper
      className="button"
      onClick={onClick}
      textColor={textColor}
      backgroundColor={backgroundColor}
    >
      {children}
    </ButtonWrapper>
  )
}

Button.propTypes = {
  textColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
}

export default Button
