import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Wrapper, ContentWrapper, LogosWrapper } from "./style"
import PartnerInfo from "./images"

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
        {PartnerInfo.map(partner => (
          <a href={partner.link} key={partner.id}>
            <img src={partner.logo} alt={partner.name} />
          </a>
        ))}
      </LogosWrapper>
    </Wrapper>
  )
}

export default Partners
