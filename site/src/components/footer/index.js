import React from "react"
import PropTypes from "prop-types"
import { useTranslation } from "react-i18next"

import { Link, graphql, useStaticQuery } from "gatsby"

import Socials from "src/components/socials"
import { FooterWrapper } from "./style"

function Footer({ transparent }) {
  const { t } = useTranslation()
  const data = useStaticQuery(graphql`
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
        {data.site.siteMetadata.title} © {new Date().getFullYear()} {` | `}
        <Link to={t("Footer.sections.0", { returnObjects: true }).link}>
          {t("Footer.sections.0", { returnObjects: true }).title}
        </Link>{" "}
        {` | `}
        <a
          href={t("Footer.sections.1", { returnObjects: true }).link}
          target="__blank"
          rel="noopener noreferrer"
        >
          {t("Footer.sections.1", { returnObjects: true }).title}
        </a>
      </p>
      <Socials />
    </FooterWrapper>
  )
}

Footer.propTypes = {
  transparent: PropTypes.bool,
}

export default Footer
