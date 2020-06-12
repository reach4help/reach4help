import React from "react"
import Select from "react-select"
import { useTranslation } from "react-i18next"

import styled from "styled-components"

const StyledSelect = styled(Select)`
  width: 10em;
`

function Languages({ languages, onChange }) {
  const { i18n } = useTranslation()

  return (
    <StyledSelect
      value={languages.find(lang => lang.value === i18n.language) || null}
      onChange={onChange}
      options={languages}
      isSearchable={false}
    />
  )
}

export default Languages
