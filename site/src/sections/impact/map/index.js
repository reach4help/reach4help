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
      <div className="heading">
        <h2>
          <span>{t("ImpactPage.WorldMapSection.description")}</span>
        </h2>
      </div>
      {WorldMap && <WorldMap />}
    </WorldMapWrapper>
  )
}

export default WorldMapSection
