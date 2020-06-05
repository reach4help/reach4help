import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

import Logo from "src/assets/logo.svg"
import LogoType from "src/assets/logo-type"
import { HeaderWrapper, TopWrapper, DrawerWrapper } from "./style"
import Hamburger from "../hamburger"
import Backdrop from "../backdrop"

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      drawerOpen: true,
    }
  }

  drawerToggler = () => {
    this.setState(prevState => {
      return { drawerOpen: !prevState.drawerOpen }
    })
  }

  render() {
    const { drawerOpen } = this.state
    const { navSections } = this.props
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
            {/* Language */}
            {/* Sign Up */}
          </div>

          <Hamburger show={drawerOpen} onClick={this.drawerToggler} />
        </TopWrapper>

        <DrawerWrapper show={drawerOpen}>
          <nav>
            <ul>
              {navSections.map(section => (
                <li key={section.id}>
                  <Link
                    to={section.link}
                    onClick={this.drawerToggler}
                    activeClassName="active"
                  >
                    <p>{section.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </DrawerWrapper>
        <Backdrop show={drawerOpen} onClick={this.drawerToggler} />
      </HeaderWrapper>
    )
  }
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
