import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAppContext } from '../store';
import Axios from 'axios';
import { useUrlContext } from './UrlProvider';

const MyUserContext = createContext();

const MyUserProvdier = ({ children }) => {
    const {
        store: { jwtToken, isAuthenticated },
    } = useAppContext();
    const [myUser, setMyUser] = useState('');
    const apiUrl = useUrlContext().defaulturl + '/accounts/users/me/';

    useEffect(() => {
        const headers = { Authorization: `Bearer ${jwtToken}` };
        if (isAuthenticated) {
            Axios.get(apiUrl, { headers })
                .then((response) => {
                    setMyUser(response.data);
                })
                .catch((error) => {
                    console.log(error.response);
                });
        }
    }, [jwtToken, isAuthenticated, apiUrl]);

    return (
        <MyUserContext.Provider value={{ myUser, setMyUser }}>
            {children}
        </MyUserContext.Provider>
    );
};

export const useMyUserContext = () => useContext(MyUserContext);

export default MyUserProvdier;
