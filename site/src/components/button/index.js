import React from "react"
import PropTypes from "prop-types"

import { ButtonWrapper } from "./style"

function Button({
  textColor,
  backgroundColor,
  outlineColor,
  onClick,
  children,
}) {
  return (
    <ButtonWrapper
      className="button"
      onClick={onClick}
      textColor={textColor}
      backgroundColor={backgroundColor}
      outlineColor={outlineColor}
    >
      {children}
    </ButtonWrapper>
  )
}

Button.propTypes = {
  textColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  outlineColor: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node,
}

export default Button
