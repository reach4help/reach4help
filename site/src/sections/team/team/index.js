/* eslint-disable no-return-assign */
import React from "react"
import { useTranslation } from "react-i18next"

import Button from "src/components/button"
import teams from "../teams.json"

import defaultProfilePic from "./default_profile.png"

import { Wrapper, ContentWrapper, TeamContainer } from "./style"
// import CountryCodeMap from "./countryCodeMap.json"

function Team() {
  const sectionColors = {
    Management: "#f0ebff",
    Development: "#ddf1f0",
    Design: "#fff8e7",
    Marketing: "#ffebff",
    Product: "#fdebde",
  }

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
          {/* TODO SHAYAN: don't be lazy and split these up into components */}
          <div className="members">
            {team.members.map(member => (
              <a className="member" key={member.id} href={member.contact}>
                <img
                  src={member.avatar_url}
                  alt={member.name}
                  onError={e => (e.target.src = defaultProfilePic)}
                />
                <h3>
                  <b>{member.name}</b>
                </h3>
                <p>{member.title}</p>
                {/* TODO: Uncomment after confirming everyone's countries */}
                {/* <div className="flags">
                  {member.countries?.map(country => (
                    <Flag
                      key={country.id}
                      code={country}
                      title={CountryCodeMap[country]}
                    />
                  ))}
                </div> */}
              </a>
            ))}
          </div>
        </TeamContainer>
      ))}

      <ContentWrapper style={{ maxWidth: "45em" }}>
        <h1>{t("TeamPage.join")}</h1>
        <p>{t("TeamPage.description.1")}</p>
        <a href="https://github.com/reach4help/reach4help/wiki#onboading-steps">
          <Button textColor="white" backgroundColor="#ff7b02" fontSize="1em">
            {t("TeamPage.buttons.0")}
          </Button>
        </a>
      </ContentWrapper>
    </Wrapper>
  )
}

export default Team
