import React, { useEffect, useState } from 'react';
import AppLayout from '../../components/AppLayout';
import Axios from 'axios';
import { useUrlContext } from '../../utils/UrlProvider';
import { useAppContext } from '../../store';
import './Profile.scss';
import UserAvatar from '../../components/UserAvatar';
import { usePostListContext, setPostList } from '../../utils/PostListProvider';
import Post from '../../components/Post';

const Profile = ({ location }) => {
    const defaultUrl = useUrlContext().defaulturl;
    const apiUrl = defaultUrl + '/api/user_page/';
    const {
        store: { jwtToken },
    } = useAppContext();
    const [username, setUserName] = useState();
    const [user, setUser] = useState();
    const { postList, dispatch } = usePostListContext();

    useEffect(() => {
        setUserName(location.pathname.split('/').at(-1));
    }, [location]);

    useEffect(() => {
        const headers = { Authorization: `Bearer ${jwtToken}` };

        if (username) {
            Axios.post(apiUrl, { username }, { headers })
                .then((response) => {
                    const { user, postList } = response.data;
                    setUser(user);
                    dispatch(setPostList(postList));
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [username, apiUrl, jwtToken, dispatch]);

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
                        </div>
                    </div>
                    <div className="postList"></div>
                </>
            )}
        </AppLayout>
    );
};

export default Profile;
