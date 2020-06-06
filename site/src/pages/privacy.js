import React from "react"
import PropTypes from "prop-types"

// components
import SEO from "src/components/seo"
import Layout from "src/components/layout"
import Header from "src/components/header"
import Footer from "src/components/footer"

// sections
import Privacy from "src/sections/privacy"

// page-wide nav sections in drawer
const navSections = [
  { title: "Home", link: "/" },
  { title: "Map", link: "/#mission" },
]

function PrivacyPage({ location }) {
  return (
    <Layout>
      <SEO title="Privacy Policy" location={location.pathname} />
      <Header navSections={navSections} />
      <div className="sections">
        <Privacy />
      </div>
      <Footer />
    </Layout>
  )
}

PrivacyPage.propTypes = {
  location: PropTypes.shape({ pathname: PropTypes.string }),
}

export default PrivacyPage
