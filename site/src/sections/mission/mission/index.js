import React from "react"
import { useTranslation, Trans } from "react-i18next"

import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

import { Wrapper, ContentWrapper } from "./style"

function Mission() {
  const { t } = useTranslation()
  const data = useStaticQuery(
    graphql`
      query {
        markdownRemark(frontmatter: { title: { eq: "Mission" } }) {
          html
        }
        file(relativePath: { eq: "sections/home/mission/image.png" }) {
          childImageSharp {
            fluid(maxWidth: 500, quality: 75) {
              base64
              aspectRatio
              src
              srcSet
              sizes
            }
          }
        }
      }
    `,
  )

  return (
    <Wrapper id="mission">
      <div className="imageWrapper">
        <Img fluid={data.file.childImageSharp.fluid} alt="R4H Mission" />
      </div>
      <ContentWrapper>
        <h2>{t("Mission.heading")}</h2>
        <p>{t("Mission.description.0")}</p>
        <br />
        <Trans transSupportBasicHtmlNodes>
          <p>{t("Mission.description.1")}</p>
        </Trans>
      </ContentWrapper>
    </Wrapper>
  )
}

export default Mission
