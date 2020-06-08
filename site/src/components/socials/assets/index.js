/* eslint-disable global-require */
// imports aren't the most efficient here
export default [
  {
    name: "Facebook", // {t(lang, s => s.social.facebook)}
    logo: require("./icon-facebook.js").default,
    link: "https://www.facebook.com/Reach4HelpOrg/",
  },
  {
    name: "Twitter",
    logo: require("./icon-twitter.js").default,
    link: "https://twitter.com/reach4helporg",
  },
  {
    name: "GitHub",
    logo: require("./icon-github.js").default,
    link: "https://github.com/reach4help/reach4help",
  },

  {
    name: "Email",
    logo: require("./icon-email.js").default,
    link: "mailto:info@reach4help.org",
  },
]
