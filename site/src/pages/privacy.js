import React from "react"

import SEO from "src/components/seo"
import Layout from "src/components/layout"
import Header from "src/components/header"
import Footer from "src/components/footer"

import Privacy from "src/sections/privacy"

const navSections = [
  { title: "Home", link: "/" },
  { title: "Map", link: "/#mission" },
]

function PrivacyPage() {
  return (
    <Layout>
      <SEO title="Privacy Policy" />
      <Header navSections={navSections} />
      <div className="sections">
        <Privacy />
      </div>
      <Footer />
    </Layout>
  )
}

export default PrivacyPage
