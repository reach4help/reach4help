module.exports = {
  title: "Reach4Help",
  subtitle: "Unifying Help Worldwide",
  description:
    "We are a global volunteer-run initiative connecting global mutual aid movements to people in need through the COVID-19 pandemic and beyond.",
  siteURL:
    process.env.GATSBY_SITE_URL ||
    process.env.DEPLOY_PRIME_URL ||
    "https://reach4help.org", // No trailing slash allowed!
  image: "/images/swarm_banner_main.png", // Path to your image you placed in the 'static' folder
  socialLinks: [
    {
      name: "GitHub",
      title: "Check out our code!",
      icon: "FaGithub",
      url: "https://github.com/reach4help/reach4help",
    },
    {
      name: "Twitter",
      title: "Follow us on Twitter!",
      icon: "FaTwitter",
      url: "https://twitter.com/reach4helporg",
    },
    {
      name: "Instagram",
      title: "Follow us on Instagram!",
      icon: "FaInstagram",
      url: "https://www.instagram.com/reach4help/",
    },
    {
      name: "facebook",
      title: "Like our Facebook page!",
      icon: "FaFacebook",
      url: "https://www.facebook.com/Reach4HelpOrg/",
    },
    {
      name: "LinkedIn",
      title: "Follow us on LinkedIn!",
      icon: "FaLinkedin",
      url: "https://www.linkedin.com/company/reach4help-org/",
    },
    {
      name: "Mail",
      title: "Send us an email!",
      icon: "FaEnvelope",
      url: "mailto:info@reach4help.org",
    },
  ],
}
