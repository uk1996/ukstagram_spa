import React from 'react';
import { Route } from 'react-router-dom';
import Login from './Login';
import Profile from './Profile';

const Routes = ({ match }) => {
    return (
        <>
            <Route path={match.url + '/login/'} component={Login} />
            <Route path={match.url + '/profile/'} component={Profile} />
        </>
    );
};

export default Routes;
