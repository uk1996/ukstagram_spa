import React, { useCallback, useEffect, useState } from 'react';
import AppLayout from '../../components/AppLayout';
import Axios from 'axios';
import { useUrlContext } from '../../utils/UrlProvider';
import { useAppContext } from '../../store';
import './Profile.scss';
import UserAvatar from '../../components/UserAvatar';
import { usePostListContext, setPostList } from '../../utils/PostListProvider';
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
    const { postList, dispatch } = usePostListContext();
    const [isFollow, setIsFollow] = useState();
    const { myUser } = useMyUserContext();

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

    useEffect(() => {
        const headers = { Authorization: `Bearer ${jwtToken}` };
        if (username) {
            Axios.post(userPageUrl, { username }, { headers })
                .then((response) => {
                    const { user, postList } = response.data;
                    setUser(user);
                    dispatch(setPostList(postList));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [username, userPageUrl, jwtToken, dispatch]);

    const followClick = useCallback(() => {
        if (username) {
            setIsFollow(true);
            const headers = { Authorization: `Bearer ${jwtToken}` };
            Axios.post(followUrl, { username }, { headers }).then(() => {
                Axios.post(userPageUrl, { username }, { headers })
                    .then((response) => {
                        const { user, postList } = response.data;
                        setUser(user);
                        dispatch(setPostList(postList));
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            });
        }
    }, [jwtToken, username, followUrl, dispatch, userPageUrl]);
    const unFollowClick = useCallback(() => {
        if (username) {
            setIsFollow(false);
            const headers = { Authorization: `Bearer ${jwtToken}` };
            Axios.post(unFollowUrl, { username }, { headers }).then(() => {
                Axios.post(userPageUrl, { username }, { headers })
                    .then((response) => {
                        const { user, postList } = response.data;
                        setUser(user);
                        dispatch(setPostList(postList));
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            });
        }
    }, [jwtToken, username, unFollowUrl, dispatch, userPageUrl]);

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
