import { CloseOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import React from 'react';
import styled from 'styled-components';

import { MenuItem } from '../../types/menu-item';
import SideNavMenu from '../SideNavMenu/SideNavMenu';

const CloseButton = styled.button`
  float: right;
  right: 0;
  padding: 15px;
`;

const SideDrawer: React.FC<SideDrawerProps> = ({
  menuLinks,
  closeHandler,
  collapsed,
}) => (
  <Layout.Sider collapsed={collapsed} theme="light">
    <CloseButton onClick={closeHandler}>
      <CloseOutlined />
    </CloseButton>
    <SideNavMenu items={menuLinks || []} />
  </Layout.Sider>
);

interface SideDrawerProps {
  collapsed: boolean;
  menuLinks: Array<MenuItem>;
  closeHandler: () => void;
}

export default SideDrawer;
