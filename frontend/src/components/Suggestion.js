import React from 'react';
import { Button, Avatar } from 'antd';
import './Suggestion.scss';
import { useUrlContext } from '../utils/UrlProvider';

const Suggestion = ({ username, avatar_url }) => {
    const imgUrl = useUrlContext().defaulturl + avatar_url;

    return (
        <div className="suggestion">
            <div className="avatar">
                <Avatar size="small" icon={<img src={imgUrl} alt="" />} />
            </div>
            <div className="username">{username}</div>
            <div className="action">
                <Button size="small">Follow</Button>
            </div>
        </div>
    );
};

export default Suggestion;
