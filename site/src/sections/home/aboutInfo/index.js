import React from "react"
import { Link } from "gatsby"
import { useTranslation } from "react-i18next"

import Button from "src/components/button"
import teamMeetingImg from "src/assets/aboutInfo/teamMeeting.svg"
import { Wrapper, ContentWrapper } from "./style"

function Team() {
  return (
    <Wrapper id="team">
      <div className="textWrapper">
        <ContentWrapper>
          <h1>About</h1>
          <h2>We’re a group of volunteers driven to unify help worldwide</h2>
          <p>Meet the minds behind this initiative and join us!</p>
        </ContentWrapper>

        <Link to="/team">
          <Button
            textColor="white"
            backgroundColor="#ff7b02"
            outlineColor="#7d00a3"
            fontSize="1em"
          >
            More About Us
          </Button>
        </Link>
      </div>
      <img alt="lol" src={teamMeetingImg} />
    </Wrapper>
  )
}

export default Team
