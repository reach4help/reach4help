import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

import { Wrapper, ContentWrapper } from "./style"

function Mission() {
  const data = useStaticQuery(
    graphql`
      query {
        markdownRemark(frontmatter: { title: { eq: "Mission" } }) {
          html
        }
        file(relativePath: { eq: "sections/mission/image.png" }) {
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
        <Img fluid={data.file.childImageSharp.fluid} alt="" />
      </div>
      <ContentWrapper
        dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
      />
    </Wrapper>
  )
}

export default Mission
