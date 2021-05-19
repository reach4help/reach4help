import React from 'react';
import { Helmet } from 'react-helmet';

// to be moved to its own file
const metadata = {
  title: 'Reach4Help',
  description:
    // eslint-disable-next-line max-len
    'Reach4Help is global volunteer-run initiative connecting global mutual aid movements to people in need through the COVID-19 pandemic and beyond.',
  url: 'https://app.reach4help.org/',
  siteURL: 'https://reach4help.org',
  image: '/images/swarm_banner_main.png',
};

const { title, description, url, siteURL, image } = metadata;

const SEO = () => (
  <Helmet>
    {/* <!-- Primary Meta Tags --> */}
    <title>{title}</title>
    <meta name="title" content={title} />
    <meta name="description" content={description} />
    <link rel="canonical" href={url} />
    <meta name="theme-color" content="#250031" />

    {/* <!-- Schema.org Microdata --> */}
    <meta itemProp="name" content={title} />
    <meta itemProp="description" content={description} />
    <meta itemProp="image" content={siteURL + image} />

    {/* <!-- Open Graph / Facebook --> */}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={siteURL + image} />
    <meta property="og:url" content={url} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Reach4Help" />
    <meta property="fb:app_id" content="1626611720838538" />

    {/* TO-DO: Make dynamic after adding localization */}
    {/* <html lang={lang} /> */}
    {/* <meta property="og:locale" content="en_US" /> */}

    {/* <!-- Twitter --> */}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@Reach4HelpOrg" />
    <meta name="twitter:creator" content="@Reach4HelpOrg" />
    <meta name="twitter:image" content={siteURL + image} />
    <meta name="twitter:image:src" content={siteURL + image} />
    <meta name="twitter:image:alt" content={title} />

    {/* <!-- Icons --> */}
    <link rel="shortcut icon" href={`${siteURL}/images/logo32.png`} />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href={`${siteURL}/images/logo180.png`}
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href={`${siteURL}/images/logo32.png`}
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href={`${siteURL}/images/logo16.png`}
    />
  </Helmet>
);

export default SEO;
