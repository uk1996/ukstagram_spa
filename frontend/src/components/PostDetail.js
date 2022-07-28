import React, { useState } from 'react';
import { Col, Row, Card, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { UserOutlined, DeleteOutlined } from '@ant-design/icons';
import Heart from './Heart';
import HeartFilled from './HeartFilled';
import { useUrlContext } from '../utils/UrlProvider';
import { useAppContext } from '../store';
import Axios from 'axios';
import Comment from './Comment';
import useAxios from 'axios-hooks';

const PostDetail = ({
    pk,
    photo,
    caption,
    author,
    is_like,
    myUser,
    setPostDeleteModalVisible,
}) => {
    const { username, avatar, avatar_url } = author;
    const defaultUrl = useUrlContext().defaulturl;
    const avatarUrl = avatar ? avatar : defaultUrl + avatar_url;
    const [isLike, setIsLike] = useState(is_like);

    const {
        store: { jwtToken },
    } = useAppContext();
    const headers = { Authorization: `Bearer ${jwtToken}` };

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

    const [{ data: commentList }, refetch] = useAxios({
        url: defaultUrl + `/api/posts/${pk}/comments/`,
        headers,
    });

    return (
        <Row>
            <Col span={16}>
                <img src={photo} alt={caption} style={{ width: '100%' }} />
            </Col>
            <Col span={8}>
                <Card
                    className="post"
                    title={
                        <div>
                            <Link to={'/accounts/profile/' + username}>
                                <Avatar
                                    hoverable="true"
                                    size="large"
                                    icon={
                                        <img
                                            src={avatarUrl}
                                            alt={<UserOutlined />}
                                        />
                                    }
                                />
                            </Link>
                            <Link
                                to={'/accounts/profile/' + username}
                                style={{ color: 'black', marginLeft: '0.5rem' }}
                            >
                                {username}
                            </Link>
                        </div>
                    }
                    style={{ width: '100%', height: '100%' }}
                    bodyStyle={{
                        paddingTop: '3px',
                        paddingBottom: '0px',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                    }}
                >
                    <Row>
                        <Col span={2} style={{ cursor: 'pointer' }}>
                            <div onClick={handleClcik}>
                                {isLike ? <HeartFilled /> : <Heart />}
                            </div>
                        </Col>
                        <Col span={22} style={{ textAlign: 'right' }}>
                            {myUser.pk === author.pk && (
                                <div
                                    style={{
                                        display: 'inline',
                                        float: 'right',
                                        marginTop: 'auto',
                                        marginBottom: 'auto',
                                    }}
                                >
                                    <DeleteOutlined
                                        style={{ fontSize: '17px' }}
                                        onClick={() => {
                                            setPostDeleteModalVisible(true);
                                        }}
                                    />
                                </div>
                            )}
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
                        <div
                            style={{ display: 'inline', marginLeft: '0.5rem' }}
                        >
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
                                            <span>
                                                {comment.author.username}
                                            </span>
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
                                    {myUser.pk === comment.author.pk && (
                                        <div
                                            style={{
                                                display: 'inline',
                                                float: 'right',
                                            }}
                                        >
                                            <DeleteOutlined
                                                style={{ fontSize: '12px' }}
                                                onClick={() => {
                                                    Axios.delete(
                                                        defaultUrl +
                                                            `/api/posts/${pk}/comments/${comment.id}/`,
                                                        { headers },
                                                    ).then(() => {
                                                        refetch();
                                                    });
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    <hr style={{ opacity: '0.5' }} />
                    <Comment postPk={pk} refetch={refetch} />
                </Card>
            </Col>
        </Row>
    );
};

export default PostDetail;
