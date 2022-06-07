import React, { useState } from 'react';
import { Card, Avatar, Row, Col } from 'antd';
import './Post.scss';
import { UserOutlined } from '@ant-design/icons';
import { useUrlContext } from '../utils/UrlProvider';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useAppContext } from '../store';
import useAxios from 'axios-hooks';
import Heart from './Heart';
import HeartFilled from './HeartFilled';
import Comment from './Comment';

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
            bodyStyle={{
                paddingTop: '3px',
                paddingBottom: '0px',
                paddingLeft: '10px',
                paddingRight: '10px',
            }}
        >
            <Row>
                <Col span={1.5}>
                    <div onClick={handleClcik}>
                        {isLike ? <HeartFilled /> : <Heart />}
                    </div>
                </Col>
            </Row>

            <div>
                <div style={{ display: 'inline' }}>
                    <Link
                        to={'/accounts/profile/' + username}
                        style={{ color: 'black', fontWeight: '500' }}
                    >
                        <span>{username}</span>
                    </Link>
                </div>
                <div style={{ display: 'inline', marginLeft: '0.5rem' }}>
                    <span style={{ color: 'black', opacity: '0.85' }}>
                        <span>{caption}</span>
                    </span>
                </div>
            </div>

            {commentList &&
                commentList.map((comment) => {
                    return (
                        <div key={comment.id}>
                            <div style={{ display: 'inline' }}>
                                <Link
                                    to={'/accounts/profile/' + username}
                                    style={{
                                        color: 'black',
                                        fontWeight: '500',
                                    }}
                                >
                                    <span>{comment.author.username}</span>
                                </Link>
                            </div>
                            <div
                                style={{
                                    display: 'inline',
                                    marginLeft: '0.5rem',
                                }}
                            >
                                <span
                                    style={{
                                        color: 'black',
                                        opacity: '0.85',
                                    }}
                                >
                                    <span>{comment.message}</span>
                                </span>
                            </div>
                        </div>
                    );
                })}
            <hr style={{ opacity: '0.5' }} />
            <Comment postPk={pk} refetch={refetch} />
        </Card>
    );
};

export default Post;
