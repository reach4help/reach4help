import styled from "styled-components"
import { SectionWrapper } from "src/components/sectionLayout/style"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
  align-items: center;

  p {
    line-height: 1.5em;
  }

  .button {
    margin-top: 1em;
    width: 100%;
    padding: 10px;
  }
`

export const ContentWrapper = styled(SectionWrapper)`
  max-width: 40em;
  display: flex;
  flex-direction: column;
  text-align: center;

  h1 {
    margin-bottom: 0.5em;
    color: #00034a;
  }
`

export const TeamContainer = styled.div`
  background-color: ${p => p.color};
  padding: 20px;
  width: 100%;

  h2 {
    font-size: 28px;
    text-transform: uppercase;
    margin-bottom: 15px;
  }

  .members {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2.5em;

    ${p => p.theme.breakpoints.medium} {
      gap: 1em;
    }

    .member {
      text-decoration: none;
      color: black;
      width: 175px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      img {
        width: 175px;
        height: 175px;
        object-fit: cover;
        object-position: 50% 0%;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }

      transition: box-shadow 0.3s ease;
      :hover {
        box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.2);
      }

      background-color: white;
      border: 1px;
      padding-bottom: 5px;
      border-radius: 4px;

      h3,
      p {
        padding: 5px 10px;
      }

      .flags {
        display: flex;
        justify-content: center;
        margin-bottom: 5px;

        img {
          border-radius: 0px;
          margin: 5px;
          height: 25px;
          width: auto;
        }
      }
    }
  }
`
