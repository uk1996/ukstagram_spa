import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAppContext, deleteToken } from '../../store';

const Logout = () => {
    const {
        store: { isAuthenticated },
        dispatch,
    } = useAppContext();

    const onClick = () => {
        dispatch(deleteToken());
        return (
            <Redirect
                to={{
                    pathname: '/accounts/login',
                }}
            />
        );
    };

    if (isAuthenticated) {
        return (
            <div name="Logout" onClick={onClick}>
                <span style={{ fontSize: '13px', opacity: '0.5' }}>Logout</span>
            </div>
        );
    } else {
        return '';
    }
};

export default Logout;
