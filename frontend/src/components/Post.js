import React from 'react';
import { Card, Avatar } from 'antd';
import './Post.scss';
import { HeartOutlined, UserOutlined } from '@ant-design/icons';
import { useUrlContext } from '../utils/UrlProvider';
import { Link } from 'react-router-dom';

const Post = ({ post }) => {
    const { author, photo, caption } = post;
    const { username, avatar_url } = author;
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
                    <Link to={'/accounts/profile/' + username}>
                        <Avatar
                            hoverable="true"
                            size="large"
                            icon={
                                <img src={avatarUrl} alt={<UserOutlined />} />
                            }
                        />
                    </Link>
                }
                title={
                    <Link
                        to={'/accounts/profile/' + username}
                        style={{ color: 'black' }}
                    >
                        {username}
                    </Link>
                }
                description={
                    <span style={{ color: 'black', opacity: '0.85' }}>
                        {caption}
                    </span>
                }
            />
        </Card>
    );
};

export default Post;
