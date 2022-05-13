import React from 'react';
import { Route } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import Home from './Home';
import About from './About';
import AccountRoutes from './accounts';
import LoginRequiredRoute from '../utils/LoginRequiredRoute';

const Root = () => {
    return (
        <AppLayout>
            <LoginRequiredRoute exact path="/" component={Home} />
            <Route exact path="/about/" component={About} />
            <Route path="/accounts/" component={AccountRoutes} />
        </AppLayout>
    );
};

export default Root;
