import React, { useState } from 'react';
import { Card, Avatar } from 'antd';
import './Post.scss';
import { HeartOutlined, HeartFilled, UserOutlined } from '@ant-design/icons';
import { useUrlContext } from '../utils/UrlProvider';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useAppContext } from '../store';

const Post = ({ post }) => {
    const { pk, author, photo, caption, is_like } = post;
    const { username, avatar_url } = author;
    const avatarUrl = useUrlContext().defaulturl + avatar_url;
    const [isLike, setIsLike] = useState(is_like);
    const {
        store: { jwtToken },
    } = useAppContext();
    const defaultUrl = useUrlContext().defaulturl;

    const handleClcik = () => {
        const method = isLike ? 'DELETE' : 'PATCH';
        const apiUrl = defaultUrl + `/api/posts/${pk}/like/`;
        const headers = { Authorization: `Bearer ${jwtToken}` };
        Axios({
            url: apiUrl,
            method,
            headers,
        }).then(() => {
            setIsLike(!isLike);
        });
    };

    return (
        <Card
            className="post"
            hoverable
            cover={<img src={photo} alt={caption} />}
            actions={[
                <div onClick={handleClcik}>
                    {isLike ? (
                        <HeartFilled style={{ color: '#FF6666' }} />
                    ) : (
                        <HeartOutlined />
                    )}
                </div>,
            ]}
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
