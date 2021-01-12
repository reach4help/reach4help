import React from "react"
// import { graphql, useStaticQuery } from "gatsby"
import { useTranslation } from "react-i18next"

import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

import Button from "src/components/button"
import Socials from "src/components/socials"
import { Wrapper, ButtonsWrapper } from "./style"

function Home() {
  const { t } = useTranslation()
  const data = useStaticQuery(
    graphql`
      query {
        file(relativePath: { eq: "sections/impact/map/image.png" }) {
          childImageSharp {
            fluid(maxWidth: 500, quality: 75) {
              base64
              aspectRatio
              src
              srcSet
              sizes
            }
          }
        }
      }
    `,
  )

  return (
    <Wrapper id="home">
      <div className="main">
        <h1>{t("Home.heading")}</h1>
        <div style={{ maxWidth: "600px" }}>
          <p>{t("Home.subheading")}</p>
        </div>
        <ButtonsWrapper>
          <a href="https://app.reach4help.org/gethelp" rel="noopener">
            <Button
              backgroundColor="#ff7b02"
              textColor="white"
              outlineColor="white"
              fontSize="1.05em"
            >
              {t("Home.buttons.0")}
            </Button>
          </a>
          <a href="https://app.reach4help.org/volunteer" rel="noopener">
            <Button
              fontSize="1.05em"
              backgroundColor="transparent"
              textColor="white"
              outlineColor="white"
              border="2px solid white" // stupidity 100
            >
              {t("Home.buttons.1")}
            </Button>
          </a>
        </ButtonsWrapper>
        <Socials />
      </div>
      <Img
        fluid={data.file.childImageSharp.fluid}
        alt="R4H App"
        className="image"
      />
    </Wrapper>
  )
}

export default Home
