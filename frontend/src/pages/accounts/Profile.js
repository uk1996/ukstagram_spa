import React, { useCallback, useEffect, useState } from 'react';
import AppLayout from '../../components/AppLayout';
import Axios from 'axios';
import { useUrlContext } from '../../utils/UrlProvider';
import { useAppContext } from '../../store';
import './Profile.scss';
import UserAvatar from '../../components/UserAvatar';
import { Row, Col, Button, Modal } from 'antd';
import { useMyUserContext } from '../../utils/MyUserProvider';
import UserList from '../../components/UserList';
import EditProfileLogo from '../../components/EditProfileLogo';
import '../../utils/hover.scss';
import PostDetail from '../../components/PostDetail';

const Profile = ({ location }) => {
    const defaultUrl = useUrlContext().defaulturl;
    const userPageUrl = defaultUrl + '/api/user_page/';
    const followUrl = defaultUrl + '/accounts/follow/';
    const unFollowUrl = defaultUrl + '/accounts/unfollow/';
    const {
        store: { jwtToken },
    } = useAppContext();
    const headers = { Authorization: `Bearer ${jwtToken}` };
    const [username, setUserName] = useState();
    const [user, setUser] = useState();
    const [isFollow, setIsFollow] = useState();
    const { myUser } = useMyUserContext();
    const [postList, setPostList] = useState();
    const [buttonKinds, setButtonKinds] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDetailVisble, setDetailVisble] = useState(false);
    const [postDeleteModalVisible, setPostDeleteModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const followingClick = () => {
        setButtonKinds('following');
        showModal();
    };

    const followerClick = () => {
        setButtonKinds('follower');
        showModal();
    };

    useEffect(() => {
        setUserName(location.pathname.split('/').at(-1));
    }, [location]);

    useEffect(() => {
        if (myUser) {
            const myFollowingUser = myUser.following_set.map(
                (user) => user.username,
            );
            setIsFollow(myFollowingUser.includes(username));
        }
    }, [myUser, username]);

    const requestUerPage = useCallback(
        ({ headers }) => {
            Axios.post(userPageUrl, { username }, { headers })
                .then((response) => {
                    const { user, postList } = response.data;
                    setUser(user);
                    setPostList(postList);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        [userPageUrl, username],
    );

    useEffect(() => {
        if (username) {
            const headers = { Authorization: `Bearer ${jwtToken}` };
            requestUerPage({ headers });
        }
    }, [requestUerPage, jwtToken, username]);

    const followClick = useCallback(() => {
        setIsFollow(true);
        if (username) {
            const headers = { Authorization: `Bearer ${jwtToken}` };
            Axios.post(followUrl, { username }, { headers }).then(() => {
                requestUerPage({ headers });
            });
        }
    }, [requestUerPage, jwtToken, username, followUrl]);

    const unFollowClick = useCallback(() => {
        setIsFollow(false);
        if (username) {
            const headers = { Authorization: `Bearer ${jwtToken}` };
            Axios.post(unFollowUrl, { username }, { headers }).then(() => {
                requestUerPage({ headers });
            });
        }
    }, [requestUerPage, jwtToken, username, unFollowUrl]);

    return (
        <AppLayout contentwidth="100%">
            {username && user && postList && (
                <>
                    <Row gutter={0}>
                        <Col className="gutter-row" span={8}>
                            <UserAvatar
                                divposition={{ left: '35%' }}
                                avatarUrl={
                                    user.avatar
                                        ? user.avatar_url
                                        : defaultUrl + user.avatar_url
                                }
                            />
                        </Col>
                        <Col className="gutter-row" span={16}>
                            <div>
                                <p
                                    style={{
                                        fontSize: '200%',
                                        fontWeight: '500',
                                        marginBottom: '2%',
                                        display: 'inline',
                                        marginRight: '2%',
                                    }}
                                >
                                    {username}
                                </p>
                                {myUser.username === username && (
                                    <EditProfileLogo
                                        requestUerPage={requestUerPage}
                                        size="large"
                                        style={{
                                            cursor: 'pointer',
                                        }}
                                    />
                                )}
                                {myUser.username !== username && (
                                    <div
                                        style={{
                                            display: 'inline',
                                            position: 'relative',
                                            bottom: '5px',
                                        }}
                                    >
                                        {isFollow && (
                                            <Button onClick={unFollowClick}>
                                                UnFollow
                                            </Button>
                                        )}
                                        {!isFollow && (
                                            <Button onClick={followClick}>
                                                Follow
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div
                                style={{
                                    width: '60%',
                                    paddingBottom: '2%',
                                    paddingTop: '2%',
                                }}
                            >
                                <Row gutter={0}>
                                    <Col className="gutter-row" span={8}>
                                        <div>
                                            <span
                                                style={{ fontWeight: '1000' }}
                                            >
                                                게시물 {postList.length}
                                            </span>
                                        </div>
                                    </Col>
                                    <Col className="gutter-row" span={8}>
                                        <div
                                            style={{ cursor: 'pointer' }}
                                            onClick={followerClick}
                                        >
                                            <span
                                                style={{ fontWeight: '1000' }}
                                            >
                                                팔로워{' '}
                                                {user.follower_set.length}
                                            </span>
                                        </div>
                                    </Col>
                                    <Col
                                        className="gutter-row"
                                        span={8}
                                        onClick={followingClick}
                                    >
                                        <div style={{ cursor: 'pointer' }}>
                                            <span
                                                style={{ fontWeight: '1000' }}
                                            >
                                                팔로잉{' '}
                                                {user.following_set.length}
                                            </span>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            {user && user.introduction.trim().length > 0 && (
                                <div
                                    style={{
                                        display: 'inline',
                                        marginRight: '3%',
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: '15px',
                                            fontWeight: '500',
                                        }}
                                    >
                                        {user.introduction.trim()}
                                    </span>
                                </div>
                            )}
                        </Col>
                    </Row>
                    <hr style={{ marginTop: '1.5rem', opacity: '0.7' }} />
                    <div className="postList">
                        <Row gutter={16}>
                            {postList.map((post, idx) => {
                                return (
                                    <React.Fragment key={post.pk}>
                                        <Col className="gutter-row" span={8}>
                                            <div
                                                onClick={() => {
                                                    setDetailVisble(true);
                                                }}
                                                className="grow"
                                                style={{
                                                    cursor: 'pointer',
                                                    marginBottom: '1.2rem',
                                                }}
                                            >
                                                <img
                                                    style={{ width: '100%' }}
                                                    src={post.photo}
                                                    alt=""
                                                />
                                            </div>
                                        </Col>
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
                                                pk={post.pk}
                                                photo={post.photo}
                                                caption={post.caption}
                                                author={post.author}
                                                is_like={post.is_like}
                                                myUser={myUser}
                                                setPostDeleteModalVisible={
                                                    setPostDeleteModalVisible
                                                }
                                                setDetailVisble={
                                                    setDetailVisble
                                                }
                                            />
                                        </Modal>
                                        <Modal
                                            title="포스팅 삭제"
                                            visible={postDeleteModalVisible}
                                            footer={null}
                                            onCancel={() => {
                                                setPostDeleteModalVisible(
                                                    false,
                                                );
                                            }}
                                        >
                                            <p>포스팅을 삭제 하시겠습니까?</p>
                                            <Button
                                                onClick={() => {
                                                    Axios.delete(
                                                        defaultUrl +
                                                            `/api/posts/${post.pk}/`,
                                                        {
                                                            headers,
                                                        },
                                                    ).then(() => {
                                                        window.location.reload();
                                                    });
                                                }}
                                            >
                                                예
                                            </Button>
                                            <Button
                                                style={{
                                                    marginLeft: '0.3rem',
                                                }}
                                                onClick={() => {
                                                    setPostDeleteModalVisible(
                                                        false,
                                                    );
                                                }}
                                            >
                                                아니요
                                            </Button>
                                        </Modal>
                                    </React.Fragment>
                                );
                            })}
                        </Row>
                    </div>
                    {user && buttonKinds === 'following' ? (
                        <Modal
                            footer={null}
                            title="팔로잉"
                            visible={isModalVisible}
                            onCancel={handleCancel}
                            width={280}
                        >
                            <UserList
                                requestUerPage={requestUerPage}
                                userList={user.following_set}
                                kind="following"
                            />
                        </Modal>
                    ) : (
                        <Modal
                            footer={null}
                            title="팔로워"
                            visible={isModalVisible}
                            onCancel={handleCancel}
                            width={280}
                        >
                            <UserList
                                requestUerPage={requestUerPage}
                                userList={user.follower_set}
                                kind="follower"
                            />
                        </Modal>
                    )}
                </>
            )}
        </AppLayout>
    );
};

export default Profile;
