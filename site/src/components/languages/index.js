import React from "react"
import PropTypes from "prop-types"
import { useTranslation } from "react-i18next"

import { LanguageWrapper } from "./style"

function Languages({ languages, onChange }) {
  const { i18n } = useTranslation()

  return (
    <LanguageWrapper
      value={languages.find(lang => lang.value === i18n.language) || null}
      onChange={onChange}
      options={languages}
      isSearchable={false} // remove this as we add more langs
      classNamePrefix="react-select"
      placeholder="Language"
    />
  )
}

Languages.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  languages: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default Languages
