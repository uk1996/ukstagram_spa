import React from 'react';
import Logout from '../pages/accounts/Logout';
import MyImage from './MyImage';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

export const profileImageItems = [
    getItem(null, 'sub1', <MyImage size={30}/>, [getItem(null, 'Logout', <Logout />)]),
];
