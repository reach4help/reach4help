import React from "react"
import { Link } from "gatsby"
import { useTranslation } from "react-i18next"

import { Wrapper, ContentWrapper } from "./style"

function Error() {
  const { t } = useTranslation()

  return (
    <Wrapper id="error">
      <div>
        <ContentWrapper>
          <h1>{t("404.heading")}</h1>
          <br />
          <p>{t("404.description.0")}</p>
          <p>{t("404.description.1")}</p>
          <br />
          <Link to="/">{t("404.linkBackToHome")}</Link>
        </ContentWrapper>
      </div>
    </Wrapper>
  )
}

export default Error
