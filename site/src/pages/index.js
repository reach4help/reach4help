import React from "react"

import SEO from "src/components/seo"
import Layout from "src/components/layout"
import Header from "src/components/header"
import Footer from "src/components/footer"

import Home from "src/sections/home"
import Mission from "src/sections/mission"
import Team from "src/sections/team"
import Partners from "src/sections/partners"

const navSections = [
  { title: "Home", link: "/#home" },
  { title: "Our Mission", link: "/#mission" },
  { title: "Team", link: "/#team" },
  { title: "Partners", link: "/#partners" },
]

function IndexPage() {
  return (
    <Layout>
      <SEO />
      <Header navSections={navSections} />
      <div className="sections">
        <Home />
        <Mission />
        <Team />
      </div>
      <div className="partners">
        <Partners />
        <Footer background="transparent" />
      </div>
    </Layout>
  )
}

export default IndexPage

// When making folders for each page
// import index from './index/index';
// export default index;
