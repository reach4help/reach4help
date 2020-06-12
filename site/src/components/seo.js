/* eslint-disable no-param-reassign */
import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ description, lang, title }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            headerDescription
            description
            url
            image
          }
        }
      }
    `,
  )

  if (typeof title !== "undefined") {
    title = `${title} | ${site.siteMetadata.title}`
  } else {
    // eslint-disable-next-line prefer-destructuring
    title = site.siteMetadata.title
  }

  description = description || site.siteMetadata.description
  const { url } = site.siteMetadata

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      {/* <meta name="theme-color" content={theme.background} /> */}
      <link rel="canonical" href={url} />

      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={`${url}/images/swarm_banner_main.png`} />

      {/* OpenGraph tags for social media */}
      <meta property="og:site_name" content="Reach4Help" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={`${url}/images/swarm_banner_main.png`}
      />
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />

      <meta property="fb:app_id" content="1626611720838538" />

      {/* Social media tags specific for Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@Reach4HelpOrg" />
      <meta name="twitter:creator" content="@Reach4HelpOrg" />
      <meta
        name="twitter:image"
        content={`${url}/images/swarm_banner_main.png`}
      />
      <meta
        name="twitter:image:src"
        content={`${url}/images/swarm_banner_main.png`}
      />
      <meta
        name="twitter:image:alt"
        content="Reach 4 Help / Unifying help around the world."
      />

      {/* Links */}
      <link rel="shortcut icon" href={`${url}/images/logo32.png`} />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href={`${url}/images/logo180.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${url}/images/logo32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${url}/images/logo16.png`}
      />
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  title: PropTypes.string.isRequired,
}

export default SEO
