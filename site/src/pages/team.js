import React from "react"

// components
import SEO from "src/components/seo"
import Layout from "src/components/layout"
import Header from "src/components/header"
import Footer from "src/components/footer"

// sections
import Team from "src/sections/team/team"

function TeamPage() {
  return (
    <Layout>
      <SEO />
      <Header />
      <div className="sections">
        <Team />
      </div>
      <Footer />
    </Layout>
  )
}

export default TeamPage
