import React from 'react';
import Lottie from 'react-lottie';

import animationData from '../../assets/lotties/loading.json';

interface LoadingIndicator {
  lottieJson?: object;
}

const LoadingIndicator: React.FC<LoadingIndicator> = ({
  lottieJson,
}): React.ReactElement => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lottieJson || animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return <Lottie options={defaultOptions} />;
};

export default LoadingIndicator;
