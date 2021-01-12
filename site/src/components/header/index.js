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

  const navSections = t("Navigation.IndexPage", { returnObjects: true })

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
          <a href="https://map.reach4help.org/" rel="noopener">
            <Button
              backgroundColor="transparent"
              border="2px solid #ff7b02"
              textColor="#ff7b02"
              outlineColor="white"
              fontSize="0.95em"
            >
              {t("Navigation.Header.buttons.0.title")}
            </Button>
          </a>
          <a href="https://app.reach4help.org/" rel="noopener">
            <Button
              backgroundColor="#ff7b02"
              textColor="white"
              outlineColor="white"
              fontSize="0.95em"
            >
              {t("Navigation.Header.buttons.1.title")}
            </Button>
          </a>
        </div>

        <Hamburger show={drawerClose} onClick={drawerToggler} />
      </TopWrapper>

      <DrawerWrapper show={drawerClose}>
        <nav>
          <ul>
            {navSections.map(section => (
              <li key={section.id}>
                <Link
                  to={section.link}
                  onClick={() => setDrawerClose(true)}
                  activeClassName="active"
                >
                  <p>{section.title}</p>
                </Link>
              </li>
            ))}
            <ActionsLi show={drawerClose}>
              <a href="https://app.reach4help.org/" rel="noopener">
                <Button
                  onClick={() => {
                    window.location.href = "https://app.reach4help.org/"
                  }}
                  backgroundColor="#ff7b02"
                  textColor="white"
                  outlineColor="white"
                  fontSize="0.95em"
                >
                  {t("Navigation.Header.buttons.1.title")}
                </Button>
              </a>
              <a href="https://map.reach4help.org/" rel="noopener">
                <Button
                  backgroundColor="transparent"
                  border="2px solid #ff7b02"
                  textColor="#ff7b02"
                  outlineColor="white"
                  fontSize="0.95em"
                >
                  {t("Navigation.Header.buttons.0.title")}
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
