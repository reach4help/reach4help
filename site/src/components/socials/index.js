import React from "react"

import Logos from "./assets"

import { SocialsWrapper } from "./style"

// component for social icons/links
function Socials() {
  return (
    <SocialsWrapper>
      {Logos.map(logo => {
        const LogoIcon = logo.logo
        return (
          <a
            title={logo.name}
            href={logo.link}
            key={logo.name}
            target="__blank"
            rel="noopener noreferrer"
          >
            <LogoIcon />
          </a>
        )
      })}
    </SocialsWrapper>
  )
}

export default Socials
