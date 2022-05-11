import React from 'react';
import AppFooter from './AppFooter';
import AppHeader from './AppHeader';

const AppLayout = ({ children }) => {
    return (
        <>
            <AppHeader />
            {children}
            <AppFooter />
        </>
    );
};

export default AppLayout;
