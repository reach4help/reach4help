/* eslint-disable global-require */
import React from "react"
import { useTranslation } from "react-i18next"

import { WorldMapWrapper } from "./style"

function WorldMapSection() {
  const { t } = useTranslation()

  // Conditionally importing WorldMap if window exists
  // to not conflict with Gatsby's server side rendering
  let WorldMap
  if (typeof window !== `undefined`) {
    WorldMap = require("../../../components/worldMap/index.js").default
  }

  return (
    <WorldMapWrapper>
      <h2>
        <span>{t("ImpactPage.WorldMapSection.heading.0")}</span>
        <span>{t("ImpactPage.WorldMapSection.heading.1")}</span>
      </h2>
      {WorldMap && <WorldMap />}
    </WorldMapWrapper>
  )
}

export default WorldMapSection
