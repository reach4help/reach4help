/* eslint-disable no-param-reassign */
import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

import theme from "src/styles/theme"

// configures SEO for each page
function SEO({ description, lang, title, location }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            subtitle
            description
            siteURL
            image
          }
        }
      }
    `,
  )

  const { siteURL, image } = site.siteMetadata

  // if title is given, prepend it to site title
  // else use just site title
  if (typeof title !== "undefined") {
    title = `${title} | ${site.siteMetadata.title}`
  } else {
    title = `${site.siteMetadata.title} | ${site.siteMetadata.subtitle}`
  }

  // if description is given, use that
  // else use site description
  description = description || site.siteMetadata.description

  // if current page location is given, append it to site URL
  // else just use the site URL
  const url =
    typeof location !== "undefined" ? `${siteURL}${location}` : siteURL

  return (
    <Helmet>
      {/* <!-- Primary Meta Tags --> */}
      <html lang={lang} />
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta name="theme-color" content={theme.colors.primary} />

      {/* <!-- Schema.org Microdata --> */}
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={siteURL + image} />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={siteURL + image} />
      <meta property="og:url" content="https://reach4help.org/" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Reach4Help" />
      <meta property="fb:app_id" content="1626611720838538" />

      {/* TO-DO: Make dynamic after adding localization */}
      <meta property="og:locale" content="en_US" />

      {/* <!-- Twitter --> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@Reach4HelpOrg" />
      <meta name="twitter:creator" content="@Reach4HelpOrg" />
      <meta name="twitter:image" content={siteURL + image} />
      <meta name="twitter:image:src" content={siteURL + image} />
      <meta name="twitter:image:alt" content={title} />

      {/* <!-- Icons --> */}
      <link rel="shortcut icon" href={`${siteURL}/images/logo32.png`} />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${siteURL}/images/logo180.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${siteURL}/images/logo32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${siteURL}/images/logo16.png`}
      />
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  description: ``,
}

SEO.propTypes = {
  title: PropTypes.string, // page title (Title | Reach4Help)
  location: PropTypes.string, // page location (reach4help.org/location)
  lang: PropTypes.string, // page language (en-US)
  description: PropTypes.string, // page description (this is cool)
}

export default SEO
