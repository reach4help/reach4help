import React from "react"
import PropTypes from "prop-types"

import { ButtonWrapper } from "./style"

// button component with consistent styling
function Button({
  textColor,
  backgroundColor,
  onClick,
  children,
  fontSize,
  border,
}) {
  return (
    <ButtonWrapper
      className="button"
      onClick={onClick}
      textColor={textColor}
      backgroundColor={backgroundColor}
      border={border}
      fontSize={fontSize}
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
  fontSize: PropTypes.string,
  border: PropTypes.string,
}

export default Button
