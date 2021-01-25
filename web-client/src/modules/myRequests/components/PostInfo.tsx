import { HomeOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Divider, Space, Typography } from 'antd';
import React from 'react';

const { Title, Text } = Typography;
const { Meta } = Card;

const PostInfo = ({ post }) => {
  const { userSnapshot, description, title } = post;
  const { displayName, displayPicture } = userSnapshot;
  const onClickHandler = () => {
    alert('this should create a specific offer');
  };

  return (
    <Card>
      <Meta
        avatar={<Avatar src={displayPicture} alt={displayName} size={64} />}
        title={displayName}
        description={
          <Space>
            <HomeOutlined />
            <span>2.5 miles</span>
            <StarOutlined />
            <span>4.5</span>
          </Space>
        }
      />
      <Divider />
      <div>
        <Title level={4}>{title}</Title>
        <Text>{description}</Text>
      </div>
      <Button
        style={{
          padding: '0 2em',
          float: 'right',
          backgroundColor: '#811E79',
          color: '#fff',
          borderRadius: '5px',
        }}
        size="large"
        onClick={onClickHandler}
      >
        Offer help
      </Button>
    </Card>
  );
};

export default PostInfo;
