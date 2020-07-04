import React from "react"
// import { graphql, useStaticQuery } from "gatsby"
import { useTranslation } from "react-i18next"

import Logo from "src/assets/logo.svg"
import Button from "src/components/button"
import Socials from "src/components/socials"
import LogoType from "src/assets/logo-type"
import {
  Wrapper,
  LogoWrapper,
  // ContentWrapper,
  ButtonsWrapper,
} from "./style"

function Home() {
  const { t } = useTranslation()

  return (
    <Wrapper id="home">
      <LogoWrapper>
        <img src={Logo} alt="Reach4Help Logo" />
        <LogoType className="logo-type" />
      </LogoWrapper>
      <h2>{t("Home.heading")}</h2>
      <h3>{t("Home.subheading")}</h3>
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
            {t("Home.buttons.1")}
          </Button>
        </a>
        <a
          href="http://map.reach4help.org/"
          target="__blank"
          rel="noopener noreferrer"
        >
          <Button fontSize="1.05em">{t("Home.buttons.0")}</Button>
        </a>
      </ButtonsWrapper>
      <Socials />
    </Wrapper>
  )
}

export default Home
