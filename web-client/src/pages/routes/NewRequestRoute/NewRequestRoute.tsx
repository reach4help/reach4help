import React, { ReactElement } from "react";

import CenteredCard from "../../../components/CenteredCard/CenteredCard";
import GradientBackground from "../../../components/GradientBackground/GradientBackground";
import NewRequestContainer from "../../../containers/NewRequestContainer/NewRequestContainer";

const NewRequestRoute: React.FC = (): ReactElement => (
  <GradientBackground>
    <CenteredCard>
      <NewRequestContainer />
    </CenteredCard>
  </GradientBackground>
);
export default NewRequestRoute;
