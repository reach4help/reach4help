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
        file(relativePath: { eq: "sections/home/hero/image.png" }) {
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
        <h1>{t("HomePage.HeroSection.heading")}</h1>
        <div style={{ maxWidth: "600px" }}>
          <p>{t("HomePage.HeroSection.subheading")}</p>
        </div>
        <ButtonsWrapper>
          <a href="https://app.reach4help.org/gethelp" rel="noopener">
            <Button
              backgroundColor="#ff7b02"
              textColor="white"
              fontSize="0.95em"
            >
              {t("HomePage.HeroSection.buttons.0")}
            </Button>
          </a>
          <a href="https://app.reach4help.org/volunteer" rel="noopener">
            <Button
              backgroundColor="transparent"
              border="2px solid white"
              textColor="white"
              fontSize="0.95em"
            >
              {t("HomePage.HeroSection.buttons.1")}
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
