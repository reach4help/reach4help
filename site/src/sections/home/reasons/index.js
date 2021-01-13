import React from "react"

import shop from "src/assets/reasons/shop.svg"
import check from "src/assets/reasons/check.svg"
import card from "src/assets/reasons/card.svg"

import {
  Wrapper,
  ReasonsSection,
  ReasonsCardIconContainer,
  ReasonsContainer,
  ReasonsCard,
} from "./style"

function Mission() {
  return (
    <Wrapper>
      <ReasonsSection>
        <h1>Why use Reach4Help</h1>
        <ReasonsContainer>
          <ReasonsCard>
            <ReasonsCardIconContainer>
              <img alt="Shop" src={shop} />
            </ReasonsCardIconContainer>
            <h3>One-stop Shop</h3>
            <p>
              Don’t waste hours searching. Get help fast with our database of
              volunteers.
            </p>
          </ReasonsCard>
          <ReasonsCard>
            <ReasonsCardIconContainer>
              <img alt="Check" src={check} />
            </ReasonsCardIconContainer>
            <h3>Easily Available</h3>
            <p>
              Use our app on the go from any mobile device, tablet, or desktop.
            </p>
          </ReasonsCard>
          <ReasonsCard>
            <ReasonsCardIconContainer>
              <img alt="Card" src={card} />
            </ReasonsCardIconContainer>
            <h3>Completely Free</h3>
            <p>
              No subscriptions or hidden fees. You can browse and post for free.
            </p>
          </ReasonsCard>
        </ReasonsContainer>
      </ReasonsSection>
    </Wrapper>
  )
}

export default Mission
