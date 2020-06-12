const fs = require("fs-extra")
const path = require("path")

// https://www.gatsbyjs.org/blog/2017-10-17-building-i18n-with-gatsby/
// This hook is necessary for i18n to work
exports.onPostBuild = () => {
  // eslint-disable-next-line no-console
  console.log("Copying locales")
  fs.copySync(
    path.join(__dirname, "/src/locales"),
    path.join(__dirname, "/public/locales"),
  )
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const privacyTemplate = path.resolve(`src/templates/privacy.js`)

  const privacyContentPaths = await graphql(`
    query MyQuery {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/privacy/" } }) {
        nodes {
          id
          frontmatter {
            slug
          }
        }
      }
    }
  `)

  privacyContentPaths.data.allMarkdownRemark.nodes.forEach(
    ({ frontmatter, id }) => {
      createPage({
        // Path for this page — required
        path: `${frontmatter.slug}`,
        component: privacyTemplate,
        context: {
          id,
        },
      })
    },
  )
}
