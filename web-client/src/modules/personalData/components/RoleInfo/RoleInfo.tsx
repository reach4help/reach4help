import { AlertTwoTone, HeartTwoTone } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import TitleWithAddon from 'src/components/TitleWithAddon/TitleWithAddon';
import { ApplicationPreference } from 'src/models/users';
import styled from 'styled-components';

import cav from '../../assets/role_cav.png';
import pin from '../../assets/role_pin.png';

const StyledIntro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 576px) {
    padding: 50px 50px;
  }
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
  @media (min-width: 480px) {
    width: 310px;
  }
  min-width: 270px;
  height: 290px;
`;

const Pin = styled.img``;
const Cav = styled.img``;

interface RoleInfoProps {
  chooseApplicationPreference: Function;
}

const RoleInfo: React.FC<RoleInfoProps> = ({
  chooseApplicationPreference,
}): React.ReactElement => {
  const { t } = useTranslation();
  // i18n.changeLanguage('pt-PT');
  return (
    <StyledIntro className="withContentPaddingDesktop">
      <TitleWithAddon level={2}>{t('roleinfo.sub_title')}</TitleWithAddon>
      <Container>
        <Row gutter={12}>
          <Col
            style={{ display: 'flex', justifyContent: 'center' }}
            span={12}
            xs={24}
            sm={24}
            md={12}
          >
            <Box>
              <Pin src={pin} />

              <p>{t('roleinfo.info_pin')}</p>

              <Button
                type="default"
                shape="round"
                icon={<AlertTwoTone twoToneColor="#FF7B02" />}
                onClick={() =>
                  chooseApplicationPreference(ApplicationPreference.pin)
                }
              >
                {t('roleinfo.c2a_pin')}
              </Button>
            </Box>
          </Col>
          <Col
            style={{ display: 'flex', justifyContent: 'center' }}
            span={12}
            xs={24}
            sm={24}
            md={12}
          >
            <Box>
              <Cav src={cav} />
              <p>{t('roleinfo.info_cav')}</p>

              <Button
                type="default"
                shape="round"
                icon={<HeartTwoTone twoToneColor="#C0458A" />}
                onClick={() =>
                  chooseApplicationPreference(ApplicationPreference.cav)
                }
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

export default RoleInfo;
