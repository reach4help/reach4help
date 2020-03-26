const manifestConfig = require('./manifest-config');
require('dotenv').config();

const { ANALYTICS_ID, DETERMINISTIC } = process.env;

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
        fontAwesomeIcon: 'github',
        id: '1268ee25-408e-5358-b8d4-510ac106e5a0',
        name: 'Github',
        url: 'https://github.com/reach4help/reach4help',
      },
      {
        fontAwesomeIcon: 'envelope',
        id: '265755e6-9146-55ba-9916-5175bfd799b8',
        name: 'Email us',
        url: 'mailto:info@reach4help.org',
      },
      {
        fontAwesomeIcon: 'instagram',
        name: 'Follow us on instagram',
        url: 'https://www.instagram.com/reach4helporg/',
      },
      {
        fontAwesomeIcon: 'twitter',
        name: 'Follow us on twitter',
        url: 'https://twitter.com/reach4helporg',
      },
      {
        fontAwesomeIcon: 'facebook',
        name: 'Like our facebook page',
        url: 'https://www.facebook.com/Reach4HelpOrg/',
      },
    ],
    deterministicBehaviour: !!DETERMINISTIC,
  },
  plugins,
};
