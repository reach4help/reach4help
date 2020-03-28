require('dotenv').config();
const manifestConfig = require('./manifest-config');

const { ANALYTICS_ID } = process.env;

const plugins = [
  'gatsby-plugin-react-helmet',
  'gatsby-plugin-netlify-cms',
  'gatsby-plugin-netlify-identity-widget',
  {
    resolve: 'gatsby-plugin-web-font-loader',
    options: {
      google: {
        families: ['Cabin', 'Open Sans'],
      },
    },
  },
  {
    resolve: 'gatsby-plugin-manifest',
    options: manifestConfig,
  },
  'gatsby-plugin-styled-components',
  'gatsby-transformer-remark',
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'content',
      path: `${__dirname}/src/content`,
    },
  },
  'gatsby-plugin-offline',
];

if (ANALYTICS_ID) {
  plugins.push({
    resolve: 'gatsby-plugin-google-analytics',
    options: {
      trackingId: ANALYTICS_ID,
    },
  });
}

module.exports = {
  siteMetadata: {
    title: 'Reach4Help',
    siteUrl:
      process.env.GATSBY_SITE_URL ||
      process.env.DEPLOY_PRIME_URL ||
      'https://reach4help.org',
    description: 'Unifying help around the world.',
    socialLinks: [
      {
        id: 'github',
        fontAwesomeIcon: 'github',
        name: 'Github',
        url: 'https://github.com/reach4help/reach4help',
      },
      {
        id: 'mail',
        fontAwesomeIcon: 'envelope',
        name: 'Email us',
        url: 'mailto:info@reach4help.org',
      },
      {
        id: 'instagram',
        fontAwesomeIcon: 'instagram',
        name: 'Follow us on instagram',
        url: 'https://www.instagram.com/reach4helporg/',
      },
      {
        id: 'twitter',
        fontAwesomeIcon: 'twitter',
        name: 'Follow us on twitter',
        url: 'https://twitter.com/reach4helporg',
      },
      {
        id: 'facebook',
        fontAwesomeIcon: 'facebook',
        name: 'Like our facebook page',
        url: 'https://www.facebook.com/Reach4HelpOrg/',
      },
    ],
  },
  plugins,
};
