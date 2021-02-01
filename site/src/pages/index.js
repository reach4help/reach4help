import React from "react"

// components
import SEO from "src/components/seo"
import Layout from "src/components/layout"
import Header from "src/components/header"
import Footer from "src/components/footer"

// sections
import Hero from "src/sections/home/hero"
import Reasons from "src/sections/home/reasons"
import GetHelpInfo from "src/sections/home/getHelpInfo"
import GiveHelpInfo from "src/sections/home/giveHelpInfo"
import AboutInfo from "src/sections/home/aboutInfo"
import Supporters from "src/sections/home/supporters"

function HomePage() {
  return (
    <Layout>
      <SEO />
      <Header />
      <div className="sections">
        <Hero />
        <Reasons />
        <GetHelpInfo />
        <GiveHelpInfo />
        <AboutInfo />
      </div>
      <div className="extendedFooter">
        <Supporters />
        <Footer transparent />
      </div>
    </Layout>
  )
}

export default HomePage
