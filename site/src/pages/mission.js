import React from "react"

// components
import SEO from "src/components/seo"
import Layout from "src/components/layout"
import Header from "src/components/header"
import Footer from "src/components/footer"

// sections
import Mission from "src/sections/mission/mission"
import Supporters from "src/sections/mission/supporters"

function MissionPage() {
  return (
    <Layout>
      <SEO />
      <Header />
      <div className="sections">
        <Mission />
      </div>
      <div className="extendedFooter">
        <Supporters />
        <Footer transparent />
      </div>
    </Layout>
  )
}

export default MissionPage
