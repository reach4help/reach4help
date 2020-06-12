/* eslint-disable react/prop-types */
import React, { useEffect } from "react"
import { graphql, navigate } from "gatsby"
import { useTranslation } from "react-i18next"

import SEO from "src/components/seo"
import Layout from "src/components/layout"
import Header from "src/components/header"
import Footer from "src/components/footer"

import Privacy from "src/sections/privacy"

function PrivacyPage({
  data: {
    markdownRemark: { html },
  },
}) {
  const { t, i18n } = useTranslation()

  // This exists to change the route when the language changes and user is in the privacy policy page
  useEffect(() => {
    navigate(t("Footer.sections.0.link"))
  }, [i18n.language])

  return (
    <Layout>
      <SEO title="Privacy Policy" />
      <Header
        navSections={t("Navigation.PrivacyPage", { returnObjects: true })}
      />
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
