import { AlertTwoTone, HeartTwoTone } from '@ant-design/icons';
import { Button, Col, Row, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

// import logo from '../../assets/logo.png';
import doctor from '../../assets/doctor.png';
import nurse from '../../assets/nurse.png';
import TitleWithAddon from '../TitleWithAddon/TitleWithAddon';

// const { Title, Text } = Typography;

const StyledIntro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 50px;
`;

// const Logo = styled.img`
//   height: 125px;
//   width: 125px;
// `;

// const StyledTitle = styled(Title)`
//   margin-top: 20px;
//   margin-bottom: 50px !important;
// `;

// const Info = styled(Text)`
//   margin-top: 40px;
//   text-align: center;
//   font-size: 20px;
// `;

// const Coll = styled(Col)`
//   text-align: center;
// `;
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
  width: 445px;
  height: 385px;
`;

const Doctor = styled.img``;
const Nurse = styled.img``;

const LoginIntro: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <StyledIntro>
      <TitleWithAddon level={2}>{t('roleinfo.sub_title')}</TitleWithAddon>
      <Container>
        <Row>
          <Col span={12}>
            <Box>
              <Doctor src={doctor} />

              <p>{t('roleinfo.info_pin')}</p>

              <Button type="default" shape="round" icon={<AlertTwoTone />}>
                {t('roleinfo.c2a_pin')}
              </Button>
            </Box>
          </Col>
          <Col span={12}>
            <Box>
              <Nurse src={nurse} />
              <p>{t('roleinfo.info_cav')}</p>

              <Button
                type="default"
                shape="round"
                icon={<HeartTwoTone twoToneColor="#eb2f96" />}
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
