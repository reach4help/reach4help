import React from "react"

import IconEmail from "src/assets/icon-email"
import IconFacebook from "src/assets/icon-facebook"
import IconGitHub from "src/assets/icon-github"
import IconTwitter from "src/assets/icon-twitter"

import { SocialsWrapper } from "./style"

function Socials() {
  return (
    <SocialsWrapper>
      <a
        href="https://www.facebook.com/Reach4HelpOrg/"
        title="Facebook"
        // {t(lang, s => s.social.facebook)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconFacebook />
      </a>
      <a
        href="https://twitter.com/reach4helporg"
        title="Twitter"
        // {t(lang, s => s.social.twitter)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconTwitter />
      </a>
      <a
        href="https://github.com/reach4help/reach4help"
        title="GitHub"
        // {t(lang, s => s.social.github)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconGitHub />
      </a>
      <a
        href="mailto:info@reach4help.org"
        title="Email"
        // {t(lang, s => s.social.email)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <IconEmail />
      </a>
    </SocialsWrapper>
  )
}

export default Socials
