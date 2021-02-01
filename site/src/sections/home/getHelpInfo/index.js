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
  return (
    <Wrapper>
      <InfoSection>
        <h1>{t("HomePage.GettingHelpSection.heading")}</h1>
        <InfoContainer>
          <HelpInfoCardContainer>
            <h2>{t("HomePage.GettingHelpSection.items.step1.title")}</h2>
            <div>
              <InfoCard>
                <img alt="HelpInfoRequest" src={HelpInfoRequest} />
                <h3>
                  {t("HomePage.GettingHelpSection.items.step1.items.0.title")}
                </h3>
                <p>
                  {t(
                    "HomePage.GettingHelpSection.items.step1.items.0.description",
                  )}
                </p>
              </InfoCard>
              <h4>{t("HomePage.GettingHelpSection.items.step1.items.1.or")}</h4>
              <InfoCard>
                <img alt="HelpInfoOffer" src={HelpInfoOffer} />
                <h3>
                  {t("HomePage.GettingHelpSection.items.step1.items.2.title")}
                </h3>
                <p>
                  {t(
                    "HomePage.GettingHelpSection.items.step1.items.2.description",
                  )}
                </p>
              </InfoCard>
            </div>
          </HelpInfoCardContainer>

          <HelpInfoCardContainer>
            <h2>{t("HomePage.GettingHelpSection.items.step2.title")}</h2>
            <div>
              <InfoCard>
                <img alt="HelpInfoCoordinate" src={HelpInfoCoordinate} />
                <h3>
                  {t("HomePage.GettingHelpSection.items.step2.items.0.title")}
                </h3>
                <p>
                  {t(
                    "HomePage.GettingHelpSection.items.step2.items.0.description",
                  )}
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
