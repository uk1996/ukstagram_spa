import React, { useState } from 'react';
import { Card, Avatar, Row, Col } from 'antd';
import './Post.scss';
import { HeartOutlined, HeartFilled, UserOutlined } from '@ant-design/icons';
import { useUrlContext } from '../utils/UrlProvider';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useAppContext } from '../store';
import useAxios from 'axios-hooks';

const Post = ({ post }) => {
    const { pk, author, photo, caption, is_like } = post;
    const { username, avatar_url } = author;
    const avatarUrl = useUrlContext().defaulturl + avatar_url;
    const [isLike, setIsLike] = useState(is_like);
    const {
        store: { jwtToken },
    } = useAppContext();
    const defaultUrl = useUrlContext().defaulturl;
    const headers = { Authorization: `Bearer ${jwtToken}` };

    const [{ data: commentList }, refetch] = useAxios({
        url: defaultUrl + `/api/posts/${pk}/comments/`,
        headers,
    });

    const handleClcik = () => {
        const method = isLike ? 'DELETE' : 'POST';
        const apiUrl = defaultUrl + `/api/posts/${pk}/like/`;

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
            title={
                <>
                    <Link to={'/accounts/profile/' + username}>
                        <Avatar
                            hoverable="true"
                            size="large"
                            icon={
                                <img src={avatarUrl} alt={<UserOutlined />} />
                            }
                        />
                    </Link>
                    <Link
                        to={'/accounts/profile/' + username}
                        style={{ color: 'black', marginLeft: '0.5rem' }}
                    >
                        {username}
                    </Link>
                </>
            }
        >
            <Row>
                <Col span={4}>
                    <Link
                        to={'/accounts/profile/' + username}
                        style={{ color: 'black', fontWeight: '500' }}
                    >
                        {username}
                    </Link>
                </Col>
                <Col span={20}>
                    <span style={{ color: 'black', opacity: '0.85' }}>
                        {caption}
                    </span>
                </Col>
            </Row>

            {commentList &&
                commentList.map((comment) => {
                    return (
                        <Row>
                            <Col span={4}>
                                <Link
                                    to={'/accounts/profile/' + username}
                                    style={{
                                        color: 'black',
                                        fontWeight: '500',
                                    }}
                                >
                                    {comment.author.username}
                                </Link>
                            </Col>
                            <Col span={20}>
                                <span
                                    style={{ color: 'black', opacity: '0.85' }}
                                >
                                    {comment.message}
                                </span>
                            </Col>
                        </Row>
                    );
                })}
        </Card>
    );
};

export default Post;
