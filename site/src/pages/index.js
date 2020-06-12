import React from "react"
import { useTranslation } from "react-i18next"

// components
import SEO from "src/components/seo"
import Layout from "src/components/layout"
import Header from "src/components/header"
import Footer from "src/components/footer"

// sections
import Home from "src/sections/home"
import Mission from "src/sections/mission"
import Team from "src/sections/team"
import Partners from "src/sections/partners"

function IndexPage() {
  const { t } = useTranslation()

  return (
    <Layout>
      <SEO />
      <Header
        navSections={t("Navigation.IndexPage", { returnObjects: true })}
      />
      <div className="sections">
        <Home />
        <Mission />
        <Team />
      </div>
      <div className="extendedFooter">
        <Partners />
        <Footer transparent />
      </div>
    </Layout>
  )
}

export default IndexPage

// When making folders for each page
// import index from './index/index';
// export default index;
