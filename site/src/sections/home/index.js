import React from "react"
// import { graphql, useStaticQuery } from "gatsby"
import { useTranslation } from "react-i18next"

import MockupsImage from "src/assets/mockups.svg"
import Button from "src/components/button"
import Socials from "src/components/socials"
import { Wrapper, ButtonsWrapper } from "./style"

function Home() {
  const { t } = useTranslation()

  return (
    <Wrapper id="home">
      <div className="main">
        <h1>{t("Home.heading")}</h1>
        <div style={{ maxWidth: "600px" }}>
          <p>{t("Home.subheading")}</p>
        </div>
        <ButtonsWrapper>
          <a
            href="https://app.reach4help.org/"
            target="__blank"
            rel="noopener noreferrer"
          >
            <Button
              backgroundColor="#ff7b02"
              textColor="white"
              outlineColor="white"
              fontSize="1.05em"
            >
              {t("Home.buttons.0")}
            </Button>
          </a>
          <a
            href="http://map.reach4help.org/"
            target="__blank"
            rel="noopener noreferrer"
          >
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
      <img className="image" src={MockupsImage} alt="R4H Screenshot" />
    </Wrapper>
  )
}

export default Home
