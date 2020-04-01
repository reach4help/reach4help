import { AlertTwoTone, HeartTwoTone } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

import cav from '../../assets/role_cav.png';
import pin from '../../assets/role_pin.png';
import TitleWithAddon from '../TitleWithAddon/TitleWithAddon';

const StyledIntro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 50px;
`;

const Container = styled.div`
  margin-top: 40px;
`;

const Box = styled.div`
  background: #ffffff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 310px;
  height: 290px;
`;

const Pin = styled.img``;
const Cav = styled.img``;

const LoginIntro: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();
  // i18n.changeLanguage('pt-PT');
  return (
    <StyledIntro>
      <TitleWithAddon level={2}>{t('roleinfo.sub_title')}</TitleWithAddon>
      <Container>
        <Row>
          <Col span={12}>
            <Box>
              <Pin src={pin} />

              <p>{t('roleinfo.info_pin')}</p>

              <Button
                type="default"
                shape="round"
                icon={<AlertTwoTone twoToneColor="#FF7B02" />}
              >
                {t('roleinfo.c2a_pin')}
              </Button>
            </Box>
          </Col>
          <Col span={12}>
            <Box>
              <Cav src={cav} />
              <p>{t('roleinfo.info_cav')}</p>

              <Button
                type="default"
                shape="round"
                icon={<HeartTwoTone twoToneColor="#C0458A" />}
              >
                {t('roleinfo.c2a_cav')}
              </Button>
            </Box>
          </Col>
        </Row>
      </Container>
    </StyledIntro>
  );
};

export default LoginIntro;
