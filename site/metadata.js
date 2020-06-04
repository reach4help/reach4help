require("dotenv").config()

module.exports = {
  title: "Reach4Help",
  headerDescription: "Unifying help around the world.",
  description:
    "Reach4Help is an open project that is completely run by volunteers, and is part of Helpful Engineering, a collective of volunteers who have congregated to come up with solutions in the COVID-19 Coronavirus Pandemic, without any commercial goals. We’re looking for more people to join our teams, if you’d like to join, please take a look at the instructions for getting involved.",
  url:
    process.env.GATSBY_SITE_URL ||
    process.env.DEPLOY_PRIME_URL ||
    "https://reach4help.org", // No trailing slash allowed!
  image: "/images/swarm_banner_main.png", // Path to your image you placed in the 'static' folder

  socialLinks: [
    {
      id: "github",
      fontAwesomeIcon: "github",
      name: "Github",
      url: "https://github.com/reach4help/reach4help",
    },
    {
      id: "mail",
      fontAwesomeIcon: "envelope",
      name: "Email us",
      url: "mailto:info@reach4help.org",
    },
    {
      id: "instagram",
      fontAwesomeIcon: "instagram",
      name: "Follow us on instagram",
      url: "https://www.instagram.com/reach4help/",
    },
    {
      id: "twitter",
      fontAwesomeIcon: "twitter",
      name: "Follow us on twitter",
      url: "https://twitter.com/reach4helporg",
    },
    {
      id: "facebook",
      fontAwesomeIcon: "facebook",
      name: "Like our facebook page",
      url: "https://www.facebook.com/Reach4HelpOrg/",
    },
    {
      id: "linkedin",
      fontAwesomeIcon: "linkedin",
      name: "Follow us on LinkedIn",
      url: "https://www.linkedin.com/company/reach4help-org/",
    },
  ],
}
