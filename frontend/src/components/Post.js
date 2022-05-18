import React from 'react';
import { Card, Avatar } from 'antd';
import './Post.scss';
import { HeartOutlined, UserOutlined } from '@ant-design/icons';
import { useUrlContext } from '../utils/UrlProvider';

const Post = ({ post }) => {
    const { author, photo, caption } = post;
    const { username, name, avatar_url } = author;
    const avatarUrl = useUrlContext().defaulturl + avatar_url;

    return (
        <Card
            className="post"
            hoverable
            cover={<img src={photo} alt={caption} />}
            actions={[<HeartOutlined />]}
        >
            <Card.Meta
                avatar={
                    <Avatar
                        size="large"
                        icon={<img src={avatarUrl} alt={<UserOutlined />} />}
                    />
                }
                title={name.length > 0 ? name : username}
                description={caption}
            />
        </Card>
    );
};

export default Post;
