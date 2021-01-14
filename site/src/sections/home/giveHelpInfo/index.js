import React from "react"

import offerHelpLogo from "src/assets/giveHelpInfo/offerHelpLogo.svg"
import chooseWhoToHelp from "src/assets/giveHelpInfo/chooseWhoToHelp.svg"
import coordinateHelpLogo from "src/assets/giveHelpInfo/coordinateHelping.svg"

import { InfoSection, InfoContainer, InfoCard } from "../getHelpInfo/style"
import { Wrapper, VolunteerInfoCardContainer } from "./style"

function GiveHelpInfo() {
  return (
    <Wrapper>
      <InfoSection>
        <h1>How volunteering works</h1>
        <InfoContainer>
          <VolunteerInfoCardContainer>
            <h2>Step 1</h2>
            <div>
              <InfoCard>
                <img alt="offerHelpLogo" src={offerHelpLogo} />
                <h3>Offer Help</h3>
                <p>
                  Let us know what you can help with, and we`&apos;`ll connect
                  you to someone who needs it.
                </p>
              </InfoCard>
              <h4>OR</h4>
              <InfoCard>
                <img alt="chooseWhoToHelp" src={chooseWhoToHelp} />
                <h3>Choose who to help</h3>
                <p>
                  Select one or more people in need whose requests you can
                  fulfill.
                </p>
              </InfoCard>
            </div>
          </VolunteerInfoCardContainer>

          <VolunteerInfoCardContainer>
            <h2>Step 2</h2>
            <div>
              <InfoCard>
                <img alt="coordinateHelpLogo" src={coordinateHelpLogo} />
                <h3>Coordinate helping</h3>
                <p>
                  Reach out and coordinate a pickup or delivery of the requested
                  items.
                </p>
              </InfoCard>
            </div>
          </VolunteerInfoCardContainer>
        </InfoContainer>
      </InfoSection>
    </Wrapper>
  )
}

export default GiveHelpInfo
