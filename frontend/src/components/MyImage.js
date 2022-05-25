import React from 'react';
import { useUrlContext } from '../utils/UrlProvider';
import { Avatar } from 'antd';
import { useMyUserContext } from '../utils/MyUserProvider';

const MyImage = ({ size }) => {
    const { myUser } = useMyUserContext();
    const defaulturl = useUrlContext().defaulturl;

    return (
        <Avatar
            size={size}
            icon={<img src={defaulturl + myUser.avatar_url} alt="" />}
        />
    );
};

export default MyImage;
