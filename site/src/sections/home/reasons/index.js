import React from "react"
import { useTranslation } from "react-i18next"

import shop from "src/assets/reasons/shop.svg"
import check from "src/assets/reasons/check.svg"
import card from "src/assets/reasons/card.svg"

import {
  Wrapper,
  ReasonsSection,
  ReasonsCardIconContainer,
  ReasonsContainer,
  ReasonsCard,
} from "./style"

function Mission() {
  const { t } = useTranslation()

  return (
    <Wrapper>
      <ReasonsSection>
        <h1>{t("HomePage.ReasonsSection.heading")}</h1>
        <ReasonsContainer>
          <ReasonsCard>
            <ReasonsCardIconContainer>
              <img alt="Shop" src={shop} />
            </ReasonsCardIconContainer>
            <h3>{t("HomePage.ReasonsSection.items.0.title")}</h3>
            <p>{t("HomePage.ReasonsSection.items.0.description")}</p>
          </ReasonsCard>
          <ReasonsCard>
            <ReasonsCardIconContainer>
              <img alt="Check" src={check} />
            </ReasonsCardIconContainer>
            <h3>{t("HomePage.ReasonsSection.items.1.title")}</h3>
            <p>{t("HomePage.ReasonsSection.items.1.description")}</p>
          </ReasonsCard>
          <ReasonsCard>
            <ReasonsCardIconContainer>
              <img alt="Card" src={card} />
            </ReasonsCardIconContainer>
            <h3>{t("HomePage.ReasonsSection.items.2.title")}</h3>
            <p>{t("HomePage.ReasonsSection.items.2.description")}</p>
          </ReasonsCard>
        </ReasonsContainer>
      </ReasonsSection>
    </Wrapper>
  )
}

export default Mission
