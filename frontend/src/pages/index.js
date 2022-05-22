import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import AccountRoutes from './accounts';
import LoginRequiredRoute from '../utils/LoginRequiredRoute';

const Root = () => {
    return (
        <>
            <LoginRequiredRoute exact path="/" component={Home} />
            <Route path="/accounts/" component={AccountRoutes} />
        </>
    );
};

export default Root;
