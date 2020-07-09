import { Card } from 'antd';
import React from 'react';

const CenteredCard: React.FC<CenteredScreenProps> = ({
  children,
}): React.ReactElement => <Card style={{ minHeight: '90vh' }}>{children}</Card>;

interface CenteredScreenProps {
  children: React.ReactNode;
}

export default CenteredCard;
