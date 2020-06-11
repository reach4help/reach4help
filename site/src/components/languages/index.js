import React from "react"
import PropTypes from "prop-types"
import Select from "react-select"
import { useTranslation } from "react-i18next"

function Languages({ languages, onChange }) {
  const { i18n } = useTranslation()

  console.log(languages, i18n.language)

  return (
    <Select
      value={languages.find(lang => lang === i18n.language) || null}
      onChange={onChange}
      options={languages}
      isSearchable={false}
      //   components={{
      //     ValueContainer: props => (
      //       <div className="value-container">{props.children}</div>
      //     ),
      //     SingleValue: props => (
      //       <div className="single-value">{props.children}</div>
      //     ),
      //     DropdownIndicator: () => <Chevron className="chevron" />,
      //     IndicatorSeparator: () => null,
      //   }}
    />
  )
}

export default Languages
