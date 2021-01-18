import React from "react"
import { useTranslation } from "react-i18next"

import offerHelpLogo from "src/assets/giveHelpInfo/offerHelpLogo.svg"
import chooseWhoToHelp from "src/assets/giveHelpInfo/chooseWhoToHelp.svg"
import coordinateHelpLogo from "src/assets/giveHelpInfo/coordinateHelping.svg"

import { InfoSection, InfoContainer, InfoCard } from "../getHelpInfo/style"
import { Wrapper, VolunteerInfoCardContainer } from "./style"

function GiveHelpInfo() {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <InfoSection>
        <h1>{t("HomePage.VolunteeringSection.heading")}</h1>
        <InfoContainer>
          <VolunteerInfoCardContainer>
            <h2>{t("HomePage.VolunteeringSection.items.step1.title")}</h2>
            <div>
              <InfoCard>
                <img alt="offerHelpLogo" src={offerHelpLogo} />
                <h3>
                  {t("HomePage.VolunteeringSection.items.step1.items.0.title")}
                </h3>
                <p>
                  {t(
                    "HomePage.VolunteeringSection.items.step1.items.0.description",
                  )}
                </p>
              </InfoCard>
              <h4>{t("HomePage.GettingHelpSection.items.step1.items.1.or")}</h4>
              <InfoCard>
                <img alt="chooseWhoToHelp" src={chooseWhoToHelp} />
                <h3>
                  {t("HomePage.VolunteeringSection.items.step1.items.2.title")}
                </h3>
                <p>
                  {t(
                    "HomePage.VolunteeringSection.items.step1.items.2.description",
                  )}
                </p>
              </InfoCard>
            </div>
          </VolunteerInfoCardContainer>

          <VolunteerInfoCardContainer>
            <h2>{t("HomePage.VolunteeringSection.items.step2.title")}</h2>
            <div>
              <InfoCard>
                <img alt="coordinateHelpLogo" src={coordinateHelpLogo} />
                <h3>
                  {t("HomePage.VolunteeringSection.items.step2.items.0.title")}
                </h3>
                <p>
                  {t(
                    "HomePage.VolunteeringSection.items.step2.items.0.description",
                  )}
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
