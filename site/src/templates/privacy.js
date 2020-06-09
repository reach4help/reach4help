/* eslint-disable react/prop-types */
import React from "react"
import { graphql } from "gatsby"

import SEO from "src/components/seo"
import Layout from "src/components/layout"
import Header from "src/components/header"
import Footer from "src/components/footer"

import Privacy from "src/sections/privacy"

const navSections = [
  { title: "Home", link: "/" },
  { title: "Map", link: "/#mission" },
]

function PrivacyPage({
  data: {
    markdownRemark: { html },
  },
}) {
  return (
    <Layout>
      <SEO title="Privacy Policy" />
      <Header navSections={navSections} />
      <div className="sections">
        <Privacy html={html} />
      </div>
      <Footer />
    </Layout>
  )
}

export default PrivacyPage

export const query = graphql`
  query PrivacyContent($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
    }
  }
`
