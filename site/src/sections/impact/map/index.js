import React from "react"

import WorldMap from "src/components/worldMap"
import { WorldMapWrapper } from "./style"

function WorldMapSection() {
  return (
    <WorldMapWrapper>
      <h2>
        <span>We&apos;re already helping</span>
        <span>600+ people across 38 countries!</span>
      </h2>
      <WorldMap />
    </WorldMapWrapper>
  )
}

export default WorldMapSection
