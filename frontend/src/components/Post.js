import React, { useState } from 'react';
import { Card, Avatar, Row, Col, Modal, Button } from 'antd';
import './Post.scss';
import { UserOutlined, DeleteOutlined } from '@ant-design/icons';
import { useUrlContext } from '../utils/UrlProvider';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import { useAppContext } from '../store';
import useAxios from 'axios-hooks';
import Heart from './Heart';
import HeartFilled from './HeartFilled';
import Comment from './Comment';
import { useMyUserContext } from '../utils/MyUserProvider';
import PostDetail from './PostDetail';

const Post = ({ post }) => {
    const { pk, author, photo, caption, is_like } = post;
    const { username, avatar, avatar_url } = author;
    const defaultUrl = useUrlContext().defaulturl;
    const avatarUrl = avatar ? avatar : defaultUrl + avatar_url;
    const [isLike, setIsLike] = useState(is_like);
    const {
        store: { jwtToken },
    } = useAppContext();
    const headers = { Authorization: `Bearer ${jwtToken}` };
    const { myUser } = useMyUserContext();
    const [postDeleteModalVisible, setPostDeleteModalVisible] = useState(false);
    const [isDetailVisble, setDetailVisble] = useState(false);

    const [{ data: commentList }, refetch] = useAxios({
        url: defaultUrl + `/api/posts/${pk}/comments/?count=2`,
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
        <>
            <Card
                className="post"
                // hoverable
                cover={<img src={photo} alt={caption} />}
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
                <span
                    style={{ cursor: 'pointer', opacity: '0.5' }}
                    onClick={() => {
                        setDetailVisble(true);
                    }}
                >
                    댓글 모두 보기
                </span>
                <hr style={{ opacity: '0.5' }} />
                <Comment postPk={pk} refetch={refetch} />
            </Card>
            <Modal
                title="포스팅 삭제"
                visible={postDeleteModalVisible}
                footer={null}
                onCancel={() => {
                    setPostDeleteModalVisible(false);
                }}
            >
                <p>포스팅을 삭제 하시겠습니까?</p>
                <Button
                    onClick={() => {
                        Axios.delete(defaultUrl + `/api/posts/${pk}/`, {
                            headers,
                        }).then(() => {
                            window.location.reload();
                        });
                    }}
                >
                    예
                </Button>
                <Button
                    style={{ marginLeft: '0.3rem' }}
                    onClick={() => {
                        setPostDeleteModalVisible(false);
                    }}
                >
                    아니요
                </Button>
            </Modal>
            <Modal
                visible={isDetailVisble}
                footer={null}
                onCancel={() => {
                    setDetailVisble(false);
                }}
                bodyStyle={{ padding: '0px' }}
                width="80%"
            >
                <PostDetail
                    pk={pk}
                    photo={photo}
                    caption={caption}
                    author={author}
                    is_like={is_like}
                    myUser={myUser}
                    setPostDeleteModalVisible={setPostDeleteModalVisible}
                    setDetailVisble={setDetailVisble}
                />
            </Modal>
        </>
    );
};

export default Post;
