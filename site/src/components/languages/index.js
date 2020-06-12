import React from "react"
import PropTypes from "prop-types"
import Select from "react-select"
import { useTranslation } from "react-i18next"

import styled from "styled-components"

const StyledSelect = styled(Select)`
  width: 10em;
`

function Languages({ languages, onChange }) {
  const { i18n } = useTranslation()

  console.log(i18n.language)
  return (
    <StyledSelect
      value={languages.find(lang => lang.value === i18n.language) || null}
      onChange={onChange}
      options={languages}
      isSearchable={false}
    />
  )
}

Languages.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  languages: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Languages
