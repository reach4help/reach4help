import React from "react"
import { Link } from "gatsby"
import { useTranslation } from "react-i18next"

import Button from "src/components/button"
import teamMeetingImg from "src/assets/aboutInfo/teamMeeting.svg"
import { Wrapper, ContentWrapper } from "./style"

function Team() {
  const { t } = useTranslation()
  return (
    <Wrapper id="team">
      <div className="textWrapper">
        <ContentWrapper>
          <h1>{t("HomePage.AboutSection.heading")}</h1>
          <h2>{t("HomePage.AboutSection.subheading")}</h2>
          <p>{t("HomePage.AboutSection.paragraph")}</p>
        </ContentWrapper>

        <Link to="/team">
          <Button backgroundColor="#ff7b02" textColor="white" fontSize="0.95em">
            {t("HomePage.AboutSection.buttons.0")}
          </Button>
        </Link>
      </div>
      <img alt="lol" src={teamMeetingImg} />
    </Wrapper>
  )
}

export default Team
