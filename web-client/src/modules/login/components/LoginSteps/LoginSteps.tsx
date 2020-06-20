import { Button, message, Steps, Typography } from 'antd';
import React, { useState } from 'react';
import styled from 'styled-components';

const { /* Title, */ Text } = Typography;
const { Step } = Steps;

const LoginSteps: React.FC = (): React.ReactElement => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const incrementStep = () => setCurrentStep(currentStep + 1);
  const decrementStep = () => setCurrentStep(currentStep - 1);

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const steps = getSteps();
  return (
    <div>
      <div className="steps-content">{steps[currentStep].content}</div>

      <div className="steps-action">
        {currentStep < steps.length - 1 && (
          <Button type="primary" onClick={incrementStep}>
            Next
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success('Processing complete!')}
          >
            Done
          </Button>
        )}
        {currentStep > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={decrementStep}>
            Previous
          </Button>
        )}
        <Steps current={currentStep}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
      </div>
    </div>
  );
};

const Info = styled(Text)`
  margin-top: 40px;
  text-align: center;
`;

const getSteps = () => [
  {
    title: 'First',
    content: <Info>hello world</Info>,
  },
  {
    title: 'Second',
    content: <Info>goodbye cruel world</Info>,
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
];
export default LoginSteps;

/* 
import allLanguages from 'languages-list';
import * as i18n from 'i18next';
import Select form 'antd';

const updateLanguage = (newLang:  i18n.Language) => {
  i18next.changeLanguage(newLang)
  .then(t=>
    console.log(t('hello world'))
  )
  .catch(err=>
    console.error('Error in ChangeLanguage', err);
  );
}

const { Option } = Select;
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder={t('i.need.to.add.this')}
          optionFilterProp="children"
          filterOption={(input, option) =>
            option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          onChange={v => changeLanguage(v.toString())}
        >
          {// not correct. check contents of allLanguages array for options 
            allLanguages.map(l => (
            <Option key={l} value={l}>
              {l}
            </Option>
          ))}
        </Select>
*/
