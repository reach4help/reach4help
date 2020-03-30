import { Layout, Menu, Typography, Steps } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const { Header, Content, Footer } = Layout;

const { Step } = Steps;

const RoleIntro: React.FC = (): React.ReactElement => {
  const { t } = useTranslation();

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">Content</div>
        <Steps size="small" current={2}>
          <Step title="Phone Validation" />
          <Step title="Name & Address" />
          <Step title="Role Info" />
        </Steps>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Reach4Help.org ©2020</Footer>
    </Layout>
  );
};

export default RoleIntro;
