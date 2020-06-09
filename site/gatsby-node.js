const fs = require("fs-extra")
const path = require("path")

// https://www.gatsbyjs.org/blog/2017-10-17-building-i18n-with-gatsby/
// This hook is necessary for i18n to work
exports.onPostBuild = () => {
  console.log("Copying locales")
  fs.copySync(
    path.join(__dirname, "/src/locales"),
    path.join(__dirname, "/public/locales"),
  )
}
