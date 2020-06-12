import React from "react"
// import { graphql, useStaticQuery } from "gatsby"
import { useTranslation } from "react-i18next"

import Logo from "src/assets/logo.svg"
import Button from "src/components/button"
import Socials from "src/components/socials"
import Countdown from "src/components/countdown"
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
      <Countdown date="2020-06-13" />
      <ButtonsWrapper>
        <a
          href="http://map.reach4help.org/"
          target="__blank"
          rel="noopener noreferrer"
        >
          <Button>{t("Home.buttons.0")}</Button>
        </a>
        <a
          href="https://app.reach4help.org/"
          target="__blank"
          rel="noopener noreferrer"
        >
          <Button>{t("Home.buttons.1")}</Button>
        </a>
      </ButtonsWrapper>
      <Socials />
    </Wrapper>
  )
}

export default Home
