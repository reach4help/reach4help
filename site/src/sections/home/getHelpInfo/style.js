import styled from "styled-components"
import { SectionWrapper } from "src/components/sectionLayout/style"

export const Wrapper = styled(SectionWrapper)`
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 123, 2, 0.05);
`

// LOL

const Flex = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-evenly;
  justify-content: center;
`

export const InfoSection = styled(Container)`
  align-items: center;
  text-align: center;

  h3 {
    margin: 5px 0;
  }
`

export const InfoContainer = styled(Flex)`
  width: 100%;

  ${p => p.theme.breakpoints.medium} {
    flex-wrap: wrap;
  }
`

export const InfoCard = styled(Container)`
  justify-content: flex-start;
  height: 100%;
  align-items: center;
`

export const InfoCardContainer = styled(Container)`
  height: 450px;
  margin: 20px;
  box-shadow: 0 0 5px #767676;
  overflow: hidden;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  background: white;

  h2 {
    font-weight: 700;
    font-size: 25px;
    width: 100%;
    padding: 15px 0;
    text-align: center;
    color: white;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 20px;
  }

  h4 {
    font-size: 20px;
    margin: 0 25px;
  }

  ${p => p.theme.breakpoints.medium} {
    height: 100%;
    width: 100%;

    div {
      flex-direction: column;
    }
  }
`

export const HelpInfoCardContainer = styled(InfoCardContainer)`
  h2 {
    background-color: ${p => p.theme.colors.accent};
  }
`
