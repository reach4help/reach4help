const manifestConfig = require("./manifest-config")
const metadata = require("./metadata")

module.exports = {
  siteMetadata: metadata,
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-root-import",
    "gatsby-plugin-styled-components",
    "gatsby-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-transformer-remark",
    {
      resolve: "gatsby-plugin-manifest",
      options: manifestConfig,
    },
    "gatsby-plugin-offline",
    {
      resolve: "gatsby-source-filesystem",
      options: { name: "src", path: `${__dirname}/src/` },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Roboto`,
            variants: [`400`, `500`, `700`],
          },
        ],
      },
    },
  ],
}
