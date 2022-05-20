import React, { useCallback, useEffect, useState } from 'react';
import AppLayout from '../../components/AppLayout';
import Axios from 'axios';
import { useUrlContext } from '../../utils/UrlProvider';
import { useAppContext } from '../../store';
import './Profile.scss';
import UserAvatar from '../../components/UserAvatar';
import { Row, Col, Button } from 'antd';
import { useMyUserContext } from '../../utils/MyUserProvider';

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
                    <div className="info">
                        <div className="userAvatar">
                            <UserAvatar
                                size={150}
                                avatarUrl={defaultUrl + user.avatar_url}
                            />
                        </div>
                        <div className="userInfo">
                            <div style={{ display: 'block' }}>
                                <h1>{user.username}</h1>
                            </div>
                            <div className="length">
                                <div className="post">
                                    게시물 {postList.length}
                                </div>
                                <div className="follower">
                                    팔로워 {user.follower_set.length}
                                </div>
                                <div className="following">
                                    팔로잉 {user.following_set.length}
                                </div>
                            </div>
                            {myUser.username !== username && (
                                <div>
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
                    </div>
                    <hr style={{ marginTop: '3rem', opacity: '0.7' }} />
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
                                            style={{
                                                marginBottom: '0.5rem',
                                            }}
                                        >
                                            <img
                                                style={{ width: '100%' }}
                                                src={defaultUrl + post.photo}
                                                alt=""
                                            />
                                        </div>
                                    </Col>
                                );
                            })}
                        </Row>
                    </div>
                </>
            )}
        </AppLayout>
    );
};

export default Profile;
