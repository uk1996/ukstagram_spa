import React, { useState } from 'react';
import { Button, Avatar } from 'antd';
import './Suggestion.scss';
import { useUrlContext } from '../utils/UrlProvider';
import { Link } from 'react-router-dom';
import { useAppContext } from '../store';
import Axios from 'axios';
import { useMyUserContext } from '../utils/MyUserProvider';

const Suggestion = ({ username, avatar_url, is_follow }) => {
    const defaultUrl = useUrlContext().defaulturl;
    const imgUrl = defaultUrl + avatar_url;
    const [isFollow, setIsFollow] = useState(false);
    const {
        store: { jwtToken },
    } = useAppContext();
    const { setMyUser } = useMyUserContext();

    const onFollowUser = () => {
        setIsFollow(true);
        const followUrl = defaultUrl + '/accounts/follow/';
        const headers = { Authorization: `Bearer ${jwtToken}` };
        Axios.post(followUrl, { username }, { headers }).then(() => {
            Axios.get(defaultUrl + '/accounts/users/me/', { headers })
                .then((response) => {
                    setMyUser(response.data);
                })
                .catch((error) => {
                    console.log(error.response);
                });
        });
    };

    return (
        <div className="suggestion">
            <Link to={`/accounts/profile/${username}`}>
                <div className="avatar" style={{ cursor: 'pointer' }}>
                    <Avatar size="small" icon={<img src={imgUrl} alt="" />} />
                </div>
            </Link>
            <Link to={`/accounts/profile/${username}`}>
                <div className="username" style={{ cursor: 'pointer' }}>
                    {
                        <span style={{ color: 'black', opacity: '0.9' }}>
                            {username}
                        </span>
                    }
                </div>
            </Link>

            <div className="action">
                {isFollow && (
                    <span style={{ opacity: '0.5' }}>following...</span>
                )}
                {!isFollow && (
                    <Button size="small" onClick={() => onFollowUser(username)}>
                        Follow
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Suggestion;
