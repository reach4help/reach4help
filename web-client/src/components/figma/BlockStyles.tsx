/* Common layout patterns used by Figma */
import { Collapse, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import { COLORS } from '../../theme/colors';

const { Text } = Typography;
const { Panel } = Collapse;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 30px;
`;

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
`;

const FormWrapper = styled.div`
  .ant-form-item {
    margin-bottom: 12px;

    .ant-form-item-label {
      label {
        height: auto;
      }
    }
  }
`;

const FormLabel = styled.div`
  display: flex;
  justify-content: spa ce-around;
  text-align: center;
`;

const Explanation = styled.div`
  display: flex;
  padding: 25px;
  max-width: 550px;
  justify-content: space-around;
  text-align: center;
`;

const LoginButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  justify-items: center;
  margin-bottom: 25px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  justify-content: space-around;
`;

const Splitter = styled.div`
  height: 0;
  margin: 50 0;
  border: 1px solid rgba(0, 0, 0, 0.35);
  width: 38%;
`;

const OrDividerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  color: rgba(0, 0, 0, 0.35);
  /* margin: 50px; */
`;

const OrWordWrapper = styled.div`
  position: relative;
  bottom: 10px;
`;

const OrDivider = () => {
  const { t } = useTranslation();
  return (
    <OrDividerWrapper>
      <Splitter /> <OrWordWrapper>{t('or')}</OrWordWrapper> <Splitter />
    </OrDividerWrapper>
  );
};

const SettingsListWrapper = styled.div`
  padding: 10px;
  background-color: ${COLORS.greyBackground};
  height: 100vh;
`;

const SettingsCollapsePanelHeaderContent = styled.span`
  padding-left: 7px;
`;

const SettingsListCollapsePanel = styled(Panel)`
  background: ${COLORS.white};
`;

const SettingsTopPanelWrapper = styled.div`
  width: 100%;
  background: linear-gradient(
    142.67deg,
    ${COLORS.backgroundAlternative} 2.64%,
    ${COLORS.link} 97.36%
  );
  border-radius: 0px 0px 4px 4px;
  padding: 1rem;
  color: white;

  .ant-typography {
    color: #f0f0f0;
  }

  span,
  img {
    user-select: none;
  }
`;

const SettingsTopPanelNavRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SettingsTopPanelHeadingRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 0.5rem;
  margin: 0.5rem 0;
  font-size: 1rem;
  color: #f0f0f0;
  font-size: 30px;
  line-height: 36px;
`;

const SettingsTopPanelUserRow = styled.div`
  display: flex;
  align-items: left;
  width: 100%;
  padding-bottom: 0.5rem;
  margin: 0.5rem 0;
`;

const SettingsTopPanelDisplayPhoto = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50%;
`;

const SettingsTopPanelEmptyPhoto = styled.div`
  background: linear-gradient(180deg, #ffffff 0%, #dddddd 100%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

const SettingsTopPanelDisplayName = styled(Text)`
  color: #f0f0f0;
  display: flex;
  align-items: center;
  font-size: 20px;
  line-height: 28px;
`;

export {
  ButtonWrapper,
  Explanation,
  FormWrapper,
  FormLabel,
  LoginButtonsWrapper,
  LogoWrapper,
  OrDivider,
  StepWrapper,
  SettingsListWrapper,
  SettingsCollapsePanelHeaderContent,
  SettingsListCollapsePanel,
  SettingsTopPanelWrapper,
  SettingsTopPanelNavRow,
  SettingsTopPanelHeadingRow,
  SettingsTopPanelUserRow,
  SettingsTopPanelDisplayPhoto,
  SettingsTopPanelEmptyPhoto,
  SettingsTopPanelDisplayName,
};
