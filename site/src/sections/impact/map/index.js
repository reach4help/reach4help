import React from "react"
import { useTranslation } from "react-i18next"

import WorldMap from "src/components/worldMap"
import { WorldMapWrapper } from "./style"

function WorldMapSection() {
  const { t } = useTranslation()
  return (
    <WorldMapWrapper>
      <h2>
        <span>{t("WorldMap.headingFirstLine")}</span>
        <span>{t("WorldMap.headingSecondLine")}</span>
      </h2>
      <WorldMap />
    </WorldMapWrapper>
  )
}

export default WorldMapSection
