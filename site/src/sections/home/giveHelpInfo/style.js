import styled from "styled-components"
import {
  Wrapper as GetHelpInfoWrapper,
  InfoCardContainer,
} from "../getHelpInfo/style"

export const Wrapper = styled(GetHelpInfoWrapper)`
  background-color: rgba(129, 30, 120, 0.05);
`

export const VolunteerInfoCardContainer = styled(InfoCardContainer)`
  h2 {
    background-color: ${p => p.theme.colors.secondary};
  }
`
