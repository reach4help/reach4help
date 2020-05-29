import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

import Button from "src/components/button"
import { Wrapper, ContentWrapper } from "./style"

function Team() {
  const data = useStaticQuery(
    graphql`
      {
        markdownRemark(frontmatter: { title: { eq: "Team" } }) {
          html
        }
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

  return (
    <Wrapper id="team">
      <div>
        <ContentWrapper
          dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
        />
        <Button textColor="white" backgroundColor="accent">
          You&apos;re the help next door. Join us!
        </Button>
      </div>
      <div className="imageWrapper">
        <Img fluid={data.file.childImageSharp.fluid} alt="" />
      </div>
    </Wrapper>
  )
}

export default Team
