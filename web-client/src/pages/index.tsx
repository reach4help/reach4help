import React from 'react';
import { useTranslation } from 'react-i18next';

import ExampleContainer from '../containers/exampleContainer';

const Index: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <h3>{t('welcome')}</h3>
      <div>
        Reach4Help
        <ExampleContainer />
      </div>
    </>
  );
};

export default Index;
