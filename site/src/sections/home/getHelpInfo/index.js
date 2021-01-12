import React from "react"
import { useTranslation } from "react-i18next"

import HelpInfoRequest from "src/assets/getHelpInfo/requestHelpLogo.svg"
import HelpInfoOffer from "src/assets/getHelpInfo/chooseVolunteerOffer.svg"
import HelpInfoCoordinate from "src/assets/getHelpInfo/coordinateGettingHelp.svg"

import {
  Wrapper,
  HelpInfoCardContainer,
  InfoSection,
  InfoContainer,
  InfoCard,
} from "./style"

function GetHelpInfo() {
  const { t } = useTranslation()
  // Use above for fetching translated strings instead of hardcoding English

  return (
    <Wrapper>
      <InfoSection>
        <h1>How getting help works</h1>
        <InfoContainer>
          <HelpInfoCardContainer>
            <h2>Step 1</h2>
            <div>
              <InfoCard>
                <img alt="HelpInfoRequest" src={HelpInfoRequest} />
                <h3>Request Help</h3>
                <p>
                  Let us know what you need and we`&apos;`ll send your request
                  to local volunteers and organizations.
                </p>
              </InfoCard>
              <h4>OR</h4>
              <InfoCard>
                <img alt="HelpInfoOffer" src={HelpInfoOffer} />
                <h3>Choose volunteer offer</h3>
                <p>Pick an offer of help from volunteers in your area</p>
              </InfoCard>
            </div>
          </HelpInfoCardContainer>

          <HelpInfoCardContainer>
            <h2>Step 2</h2>
            <div>
              <InfoCard>
                <img alt="HelpInfoCoordinate" src={HelpInfoCoordinate} />
                <h3>Coordinate getting help</h3>
                <p>
                  A volunteer will reach out to you to schedule delivery of your
                  requested items.
                </p>
              </InfoCard>
            </div>
          </HelpInfoCardContainer>
        </InfoContainer>
      </InfoSection>
    </Wrapper>
  )
}

export default GetHelpInfo
