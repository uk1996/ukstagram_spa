import React from 'react';
import { useAppContext, deleteToken } from '../../store';

const Logout = () => {
    const { dispatch } = useAppContext();

    const onClick = () => {
        dispatch(deleteToken());
    };

    return (
        <div onClick={onClick}>
            <span style={{ fontSize: '13px', opacity: '0.5' }}>Logout</span>
        </div>
    );
};

export default Logout;
