import React from "react"

import SEO from "src/components/seo"
import Layout from "src/components/layout"
import Header from "src/components/header"
import Footer from "src/components/footer"

import Error from "src/sections/error"

const navSections = [
  { title: "Home", link: "/#home" },
  { title: "Map", link: "/#mission" },
]

function ErrorPage() {
  return (
    <Layout>
      <SEO title="404 Not Found" />
      <Header navSections={navSections} />
      <div className="sections">
        <Error />
      </div>
      <Footer />
    </Layout>
  )
}

export default ErrorPage
