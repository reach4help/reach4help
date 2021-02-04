import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { useTranslation } from "react-i18next"

import Button from "src/components/button"
import teams from "../teams.json"

import defaultProfilePic from "./default_profile.png"

import { Wrapper, ContentWrapper, TeamContainer } from "./style"

function Team() {
  const sectionColors = {
    Core: "#f0ebff",
    Development: "#ddf1f0",
    Design: "#fff8e7",
    Marketing: "#ffebff",
    Product: "#fdebde",
  }

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
      <ContentWrapper>
        <h1>{t("TeamPage.heading")}</h1>
        <p>{t("TeamPage.description.0")}</p>
      </ContentWrapper>

      {/* For every member in each team */}
      {teams.map(team => (
        <TeamContainer color={sectionColors[team.title]} key={team.id}>
          <h2>{team.title} Team</h2>
          <div className="members">
            {team.members.map(member => (
              <a className="member" key={member.id} href={member.contact}>
                <img
                  src={member.avatar_url}
                  alt={member.name}
                  // eslint-disable-next-line no-return-assign
                  onError={e => (e.target.src = defaultProfilePic)}
                />
                <h3>
                  <b>{member.name}</b>
                </h3>
                <p>{member.title}</p>
              </a>
            ))}
          </div>
        </TeamContainer>
      ))}

      <ContentWrapper>
        <h1>{t("TeamPage.join")}</h1>
        <p>{t("TeamPage.description.1")}</p>
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
      </ContentWrapper>

      {/* <div className="imageWrapper">
        <Img fluid={data.file.childImageSharp.fluid} alt="R4H Team" />
      </div> */}
    </Wrapper>
  )
}

export default Team
