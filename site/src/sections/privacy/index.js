import React from "react"
import PropTypes from "prop-types"
import { Wrapper, ContentWrapper } from "./style"

function Privacy({ html }) {
  return (
    <Wrapper id="privacy">
      <div>
        <ContentWrapper dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Wrapper>
  )
}

Privacy.propTypes = {
  html: PropTypes.string.isRequired,
}

export default Privacy
