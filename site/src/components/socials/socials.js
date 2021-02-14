/* eslint-disable global-require */
// imports aren't the most efficient here
import {
  FaFacebookSquare,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaRegEnvelope,
} from "react-icons/fa"

export default [
  {
    name: "Facebook", // {t(lang, s => s.social.facebook)}
    logo: FaFacebookSquare,
    link: "https://www.facebook.com/Reach4HelpOrg/",
  },
  {
    name: "Twitter",
    logo: FaTwitter,
    link: "https://twitter.com/Reach4HelpOrg",
  },
  {
    name: "Instagram",
    logo: FaInstagram,
    link: "https://instagram.com/reach4help",
  },
  {
    name: "LinkedIn",
    logo: FaLinkedin,
    link: "https://linkedin.com/company/reach4help/",
  },
  {
    name: "GitHub",
    logo: FaGithub,
    link: "https://github.com/reach4help/reach4help",
  },
  {
    name: "Email",
    logo: FaRegEnvelope,
    link: "mailto:info@reach4help.org",
  },
]
