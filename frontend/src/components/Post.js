import React from 'react';
import { Card, Avatar } from 'antd';
import './Post.scss';
import { HeartOutlined, UserOutlined } from '@ant-design/icons';

const Post = ({ post }) => {
    const { photo, caption, location } = post;
    return (
        <Card
            className="post"
            hoverable
            cover={<img src={photo} alt={caption} />}
            actions={[<HeartOutlined />]}
        >
            <Card.Meta
                avatar={<Avatar size="64" icon={<UserOutlined />} />}
                title={location}
                description={caption}
            />
        </Card>
    );
};

export default Post;
