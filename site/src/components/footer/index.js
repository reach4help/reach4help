import React from "react"
import PropTypes from "prop-types"

import { Link, graphql, useStaticQuery } from "gatsby"

import Socials from "src/components/socials"
import { FooterWrapper } from "./style"

// site-wide footer component
function Footer({ transparent }) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <FooterWrapper transparent={transparent}>
      <p>
        {site.siteMetadata.title} © {new Date().getFullYear()} {` | `}
        <Link to="/privacy">Privacy Policy</Link> {` | `}
        <a
          href="https://github.com/reach4help/reach4help/blob/master/CODE_OF_CONDUCT.md"
          target="__blank"
          rel="noopener noreferrer"
        >
          Code of Conduct
        </a>
      </p>
      <Socials />
    </FooterWrapper>
  )
}

Footer.propTypes = {
  transparent: PropTypes.bool, // makes background transparent (used in index)
}

export default Footer
