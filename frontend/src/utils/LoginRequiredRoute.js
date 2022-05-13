import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAppContext } from '../store';

const LoginRequiredRoute = ({ component: Component, ...kwargs }) => {
    const {
        store: { isAuthenticated },
    } = useAppContext();

    return (
        <Route
            {...kwargs}
            render={(props) => {
                if (isAuthenticated) {
                    return (
                        <div>
                            <Component {...props} />
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <Redirect
                                to={{
                                    pathname: '/accounts/login',
                                    state: { from: props.location },
                                }}
                            />
                        </div>
                    );
                }
            }}
        />
    );
};

export default LoginRequiredRoute;
