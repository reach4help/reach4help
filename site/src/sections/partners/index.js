import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Wrapper, ContentWrapper, LogosWrapper } from "./style"
import Logos from "./assets"

function Partners() {
  const data = useStaticQuery(
    graphql`
      {
        markdownRemark(frontmatter: { title: { eq: "Partners" } }) {
          html
        }
      }
    `,
  )

  return (
    <Wrapper id="partners">
      <ContentWrapper
        dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
      />
      <LogosWrapper>
        {Logos.map(logo => (
          <a
            title={logo.name}
            href={logo.link}
            key={logo.id}
            target="__blank"
            rel="noopener noreferrer"
          >
            <img
              src={logo.logo}
              alt={`${logo.name} Logo`}
              maxWidth={logo.maxWidth}
            />
          </a>
        ))}
      </LogosWrapper>
    </Wrapper>
  )
}

export default Partners
