import React from 'react';
import { Avatar } from 'antd';

const UserAvatar = ({ avatarUrl, size }) => {
    return <Avatar size={size} icon={<img src={avatarUrl} alt="" />} />;
};

export default UserAvatar;
