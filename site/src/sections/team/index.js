import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import { useTranslation } from "react-i18next"

import Button from "src/components/button"
import { Wrapper, ContentWrapper } from "./style"

// TODO: Still need to finish up this section
function Team() {
  const data = useStaticQuery(
    graphql`
      {
        file(relativePath: { eq: "sections/team/image.png" }) {
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

  const { t } = useTranslation()

  return (
    <Wrapper id="team">
      <div>
        <ContentWrapper>
          <h2>{t("Team.heading")}</h2>
          <p>{t("Team.description.0")}</p>
          <br />
          <p>{t("Team.description.1")}</p>
          <br />
          <h3>{t("Team.subheading")}</h3>
        </ContentWrapper>
        <a href="https://github.com/reach4help/reach4help/wiki#onboading-steps">
          <Button
            textColor="white"
            backgroundColor="#ff7b02"
            outlineColor="#7d00a3"
            fontSize="1em"
          >
            {t("Team.buttons.0")}
          </Button>
        </a>
      </div>
      <div className="imageWrapper">
        <Img fluid={data.file.childImageSharp.fluid} alt="" />
      </div>
    </Wrapper>
  )
}

export default Team
