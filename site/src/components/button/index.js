import React from "react"
import PropTypes from "prop-types"

import { ButtonWrapper } from "./style"

// button component with consistent styling
function Button({
  textColor,
  backgroundColor,
  outlineColor,
  onClick,
  // children is a ReactProp which is the children of the element that calls this component
  children,
  fontSize,
}) {
  return (
    <ButtonWrapper
      className="button"
      onClick={onClick}
      textColor={textColor}
      backgroundColor={backgroundColor}
      outlineColor={outlineColor}
      fontSize={fontSize}
    >
      {children}
    </ButtonWrapper>
  )
}

Button.propTypes = {
  textColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  outlineColor: PropTypes.string, // border color on hover
  onClick: PropTypes.func,
  children: PropTypes.node,
  fontSize: PropTypes.string,
}

export default Button
