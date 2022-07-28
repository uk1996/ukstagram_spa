import React from 'react';
import { useUrlContext } from '../utils/UrlProvider';
import { Avatar } from 'antd';
import { useMyUserContext } from '../utils/MyUserProvider';

const MyImage = ({ size }) => {
    const { myUser } = useMyUserContext();
    const defaulturl = useUrlContext().defaulturl;
    const avatar_url = myUser.avatar
        ? myUser.avatar_url
        : defaulturl + myUser.avatar_url;

    return <Avatar size={size} icon={<img src={avatar_url} alt="" />} />;
};

export default MyImage;
