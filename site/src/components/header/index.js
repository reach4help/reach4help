import React, { useState } from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import { useTranslation } from "react-i18next"

import Logo from "src/assets/logo.svg"
import LogoType from "src/assets/logo-type"
import { LANGUAGES } from "src/locales/i18n"
import { HeaderWrapper, TopWrapper, DrawerWrapper } from "./style"
import Hamburger from "../hamburger"
import Backdrop from "../backdrop"

import Languages from "../languages"

function Header({ navSections }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { i18n } = useTranslation()

  const drawerToggler = () => {
    setDrawerOpen(!drawerOpen)
  }

  const onLanguageChange = selectedLang => {
    i18n.changeLanguage(selectedLang.value)
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
        </div>

        <Hamburger show={drawerOpen} onClick={drawerToggler} />
      </TopWrapper>

      <DrawerWrapper show={drawerOpen}>
        <nav>
          <ul>
            {navSections.map(section => (
              <li key={section.id}>
                <Link
                  to={section.link}
                  onClick={drawerToggler}
                  activeClassName="active"
                >
                  <p>{section.title}</p>
                </Link>
              </li>
            ))}
            {/* <Languages languages={LANGUAGES} onChange={onLanguageChange} /> */}
          </ul>
        </nav>
      </DrawerWrapper>
      <Backdrop show={drawerOpen} onClick={drawerToggler} />
    </HeaderWrapper>
  )
}

Header.propTypes = {
  navSections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      link: PropTypes.string,
    }),
  ),
}

export default Header
