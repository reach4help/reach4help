import React from "react"

// components
import SEO from "src/components/seo"
import Layout from "src/components/layout"
import Header from "src/components/header"
import Footer from "src/components/footer"

// sections
import Home from "src/sections/impact/map"
import Partners from "src/sections/impact/partners"

function HomePage() {
  return (
    <Layout>
      <SEO />
      <Header />
      <div className="sections">
        <Home />
      </div>
      <div className="extendedFooter">
        <Partners />
        <Footer transparent />
      </div>
    </Layout>
  )
}

export default HomePage
