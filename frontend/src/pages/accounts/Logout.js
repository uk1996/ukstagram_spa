import React from 'react';
import { useAppContext, deleteToken } from '../../store';

const Logout = () => {
    const { dispatch } = useAppContext();

    const onClick = () => {
        dispatch(deleteToken());
    };

    return (
        <div onClick={onClick}>
            <span>로그아웃</span>
        </div>
    );
};

export default Logout;
