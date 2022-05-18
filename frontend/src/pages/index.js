import React from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import AccountRoutes from './accounts';
import LoginRequiredRoute from '../utils/LoginRequiredRoute';
import PostNew from './PostNew';

const Root = () => {
    return (
        <>
            <LoginRequiredRoute exact path="/" component={Home} />
            <Route path="/accounts/" component={AccountRoutes} />
            <LoginRequiredRoute exact path="/posts/new" component={PostNew} />
        </>
    );
};

export default Root;
