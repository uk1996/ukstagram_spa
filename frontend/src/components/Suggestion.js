import React from 'react';
import { Button, Avatar } from 'antd';
import './Suggestion.scss';
import { useUrlContext } from '../utils/UrlProvider';
import { Link } from 'react-router-dom';

const Suggestion = ({ username, avatar_url, is_follow, onFollowUser }) => {
    const imgUrl = useUrlContext().defaulturl + avatar_url;

    return (
        <div className="suggestion">
            <Link to={'/accounts/profile/' + username}>
                <div className="avatar">
                    <Avatar size="small" icon={<img src={imgUrl} alt="" />} />
                </div>
            </Link>
            <Link to={'/accounts/profile/' + username}>
                <div className="username">
                    {
                        <span style={{ color: 'black', opacity: '0.9' }}>
                            {username}
                        </span>
                    }
                </div>
            </Link>
            <div className="action">
                {is_follow && (
                    <span style={{ opacity: '0.5' }}>following...</span>
                )}
                {!is_follow && (
                    <Button size="small" onClick={() => onFollowUser(username)}>
                        Follow
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Suggestion;
