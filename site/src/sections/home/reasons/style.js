import styled from "styled-components"
import { SectionWrapper } from "src/components/sectionLayout/style"

export const Wrapper = styled(SectionWrapper)`
  display: flex;
  flex-direction: column;
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

export const ReasonsSection = styled(Container)`
  text-align: center;
  align-items: center;
  margin: 25px;

  ${p => p.theme.breakpoints.medium} {
    margin-bottom: 25px;
    padding-left: 16px;
    padding-right: 16px;
  }
`

export const ReasonsContainer = styled(Flex)`
  gap: 5%;
  width: 100%;

  ${p => p.theme.breakpoints.medium} {
    flex-wrap: wrap;
  }
`

export const ReasonsCardIconContainer = styled(Container)`
  align-items: center;
  justify-content: center;
  background-color: #f9f9ff;
  width: 80px;
  height: 80px;
  border-radius: 50%;

  img {
    width: 40px;
    height: 40px;
  }
`

export const ReasonsCard = styled(Container)`
  margin-top: 30px;
  justify-content: flex-start;
  align-items: center;

  h3 {
    font-weight: 700;
    margin-bottom: 10px;
  }

  ${p => p.theme.breakpoints.medium} {
    margin: 20px 0;
  }
`
