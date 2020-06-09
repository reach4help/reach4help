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

  console.log(t("Home.heading"))

  return (
    <Wrapper id="home">
      <LogoWrapper>
        <img src={Logo} alt="Reach4Help Logo" />
        <LogoType className="logo-type" />
      </LogoWrapper>
      <h2>{t("Home.heading")}</h2>
      <h3>{t("Home.subheading")}</h3>
      <Countdown date="2020-06-13" />
      {/* <ContentWrapper
        dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
      /> */}
      <ButtonsWrapper>
        <a
          href="http://map.reach4help.org/"
          target="__blank"
          rel="noopener noreferrer"
        >
          <Button>Mutual Aid Map</Button>
        </a>
        <a
          href="https://reach4help-webclient.web.app/"
          target="__blank"
          rel="noopener noreferrer"
        >
          <Button>BETA Sign Up</Button>
        </a>
      </ButtonsWrapper>
      <Socials />
    </Wrapper>
  )
}

// const data = useStaticQuery(
//   graphql`
//     {
//       markdownRemark(frontmatter: { title: { eq: "Home" } }) {
//         html
//       }
//     }
//   `
// )

export default Home
