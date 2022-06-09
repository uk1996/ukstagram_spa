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

const Profile = ({ location }) => {
    const defaultUrl = useUrlContext().defaulturl;
    const userPageUrl = defaultUrl + '/api/user_page/';
    const followUrl = defaultUrl + '/accounts/follow/';
    const unFollowUrl = defaultUrl + '/accounts/unfollow/';
    const {
        store: { jwtToken },
    } = useAppContext();
    const [username, setUserName] = useState();
    const [user, setUser] = useState();
    const [isFollow, setIsFollow] = useState();
    const { myUser } = useMyUserContext();
    const [postList, setPostList] = useState();
    const [buttonKinds, setButtonKinds] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);

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
                                avatarUrl={defaultUrl + user.avatar_url}
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
                            {postList.map((post) => {
                                return (
                                    <Col
                                        className="gutter-row"
                                        span={8}
                                        key={post.pk}
                                    >
                                        <div
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
