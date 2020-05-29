import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Wrapper, ContentWrapper } from "./style"

// import Button from "src/components/button"

function Error() {
  const data = useStaticQuery(
    graphql`
      {
        markdownRemark(frontmatter: { title: { eq: "Error" } }) {
          html
        }
      }
    `,
  )

  return (
    <Wrapper id="error">
      <div>
        <ContentWrapper
          dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
        />
      </div>
    </Wrapper>
  )
}

export default Error
