import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import { useTranslation } from "react-i18next"

import Button from "src/components/button"
import { Wrapper, ContentWrapper } from "./style"

const people = [
  {
    title: "Executive Director",
    name: "Shayan Chowdhury",
    contact: "mailto:shayan@reach4help.org",
  },
  {
    title: "Technical Lead",
    name: "Joseph Ashwin Kottapurath",
    contact: "mailto:joseph@reach4help.org",
  },
  {
    title: "Design Lead",
    name: "Samantha Uebel",
    contact: "mailto:samantha@reach4help.org",
  },
  {
    title: "Marketing Lead",
    name: "Yi Zhou",
    contact: "mailto:yi@reach4help.org",
  },
]

// TODO: Still need to finish up this section
function Team() {
  const data = useStaticQuery(
    graphql`
      {
        file(relativePath: { eq: "sections/team/team/image.png" }) {
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
          <h2>{t("TeamPage.heading")}</h2>
          <p>{t("TeamPage.description.0")}</p>
          <br />
          <p>
            <b>{t("TeamPage.members.heading")}</b>
            {people.map(person => (
              <li key={person.id}>
                <b>{person.title}: </b>
                <a href={person.contact}>{person.name}</a>
              </li>
            ))}
          </p>
          <br />
          <p>{t("TeamPage.description.1")}</p>
          <br />

          <h3>{t("TeamPage.subheading")}</h3>
        </ContentWrapper>
        <a href="https://github.com/reach4help/reach4help/wiki#onboading-steps">
          <Button
            textColor="white"
            backgroundColor="#ff7b02"
            outlineColor="#7d00a3"
            fontSize="1em"
          >
            {t("TeamPage.buttons.0")}
          </Button>
        </a>
      </div>
      <div className="imageWrapper">
        <Img fluid={data.file.childImageSharp.fluid} alt="R4H Team" />
      </div>
    </Wrapper>
  )
}

export default Team
