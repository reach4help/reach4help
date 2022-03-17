import React, { useState } from "react"
import { Link } from "gatsby"

import { useTranslation } from "react-i18next"

import Logo from "src/assets/logo.svg"
import LogoType from "src/assets/logo-type"
import { LANGUAGES } from "src/locales/i18n"
import { HeaderWrapper, TopWrapper, DrawerWrapper, ActionsLi } from "./style"
import Hamburger from "../hamburger"
import Backdrop from "../backdrop"
import Button from "../button"

import Languages from "../languages"

function Header() {
  // I changed to drawerClose because I think there is a bug in the way the CSS is being handled in the menu that shows when we click the Hamburger and this is more semantic
  // In this case, in this file (without looking to the CSS)
  const [drawerClose, setDrawerClose] = useState(true)
  const { i18n, t } = useTranslation()

  const buttonLinks = [
    { title: t("Navigation.buttons.map"), link: "https://map.reach4help.org" },
    {
      title: t("Navigation.buttons.signIn"),
      link: "https://app.reach4help.org",
    },
  ]

  const navLinks = [
    { title: t("Navigation.pages.home"), link: "/" },
    { title: t("Navigation.pages.mission"), link: "/mission" },
    { title: t("Navigation.pages.impact"), link: "/impact" },
    { title: t("Navigation.pages.team"), link: "/team" },
  ]

  const drawerToggler = () => {
    setDrawerClose(!drawerClose)
  }

  const onLanguageChange = selectedLang => {
    i18n.changeLanguage(selectedLang.value)
    setDrawerClose(true)
  }

  return (
    <HeaderWrapper>
      <TopWrapper>
        <Link to="/">
          <div className="logo">
            <img src={Logo} alt="Reach4Help Logo" />
            <LogoType className="logo-type" />
          </div>
        </Link>

        <div className="actions">
          <Languages languages={LANGUAGES} onChange={onLanguageChange} />
          {/* Sign Up */}
          <a href={buttonLinks[0].link} rel="noopener">
            <Button
              backgroundColor="transparent"
              border="2px solid #ff7b02"
              textColor="#ff7b02"
              fontSize="0.95em"
            >
              {buttonLinks[0].title}
            </Button>
          </a>
          {/* <a href={buttonLinks[1].link} rel="noopener">
            <Button
              backgroundColor="#ff7b02"
              textColor="white"
              fontSize="0.95em"
            >
              {buttonLinks[1].title}
            </Button>
          </a> */}
        </div>

        <Hamburger show={drawerClose} onClick={drawerToggler} />
      </TopWrapper>

      <DrawerWrapper show={drawerClose}>
        <nav>
          <ul>
            {navLinks.map(linkItem => (
              <li key={`${linkItem.title}`}>
                <Link
                  to={linkItem.link}
                  onClick={() => setDrawerClose(true)}
                  activeClassName="active"
                >
                  <p>{linkItem.title}</p>
                </Link>
              </li>
            ))}

            {/* Displays on mobile */}
            <ActionsLi show={drawerClose}>
              <a href={buttonLinks[0].link} rel="noopener">
                <Button
                  backgroundColor="transparent"
                  border="2px solid #ff7b02"
                  textColor="#ff7b02"
                  fontSize="0.95em"
                >
                  {buttonLinks[0].title}
                </Button>
              </a>
              <a href={buttonLinks[1].link} rel="noopener">
                <Button
                  backgroundColor="#ff7b02"
                  textColor="white"
                  fontSize="0.95em"
                >
                  {buttonLinks[1].title}
                </Button>
              </a>

              <Languages languages={LANGUAGES} onChange={onLanguageChange} />
            </ActionsLi>
          </ul>
        </nav>
      </DrawerWrapper>
      <Backdrop
        show={drawerClose}
        onClick={() => setDrawerClose(!drawerClose)}
      />
    </HeaderWrapper>
  )
}

export default Header
