import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Wrapper, ContentWrapper } from "./style"

function Privacy() {
  const data = useStaticQuery(
    graphql`
      {
        markdownRemark(frontmatter: { title: { eq: "Privacy" } }) {
          html
        }
      }
    `,
  )

  return (
    <Wrapper id="privacy">
      <div>
        <ContentWrapper
          dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
        />
      </div>
      {/* <img src={photo} alt="" /> */}
    </Wrapper>
  )
}

export default Privacy
