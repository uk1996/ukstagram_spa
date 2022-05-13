import React from 'react';
import { useAppContext, deleteToken } from '../../store';

const Logout = () => {
    const {
        store: { isAuthenticated },
        dispatch,
    } = useAppContext();

    const onClick = () => {
        dispatch(deleteToken());
    };

    if (isAuthenticated) {
        return (
            <div onClick={onClick}>
                <span style={{ fontSize: '13px', opacity: '0.5' }}>Logout</span>
            </div>
        );
    } else {
        return '';
    }
};

export default Logout;
