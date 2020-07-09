import styled from "styled-components"
import Select from "react-select"

export const LanguageWrapper = styled(Select)`
  width: 10em;
  margin-left: 7px;

  .react-select__control {
    :hover {
      border-color: ${p => p.theme.colors.accent};
    }
  }

  .react-select__control--is-focused {
    box-shadow: 0 0 0 1px ${p => p.theme.colors.accent};
    border-color: ${p => p.theme.colors.accent};
  }

  .react-select__option--is-focused {
    background-color: ${p => `${p.theme.colors.accent}30`};
    /* above is for adding alpha to hex color code */
  }

  .react-select__option--is-selected {
    background-color: ${p => p.theme.colors.accent};
  }
`
