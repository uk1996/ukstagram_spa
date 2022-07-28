import { createContext, useContext } from 'react';

const UrlContext = createContext();

const UrlProvider = ({ children }) => {
    return (
        <UrlContext.Provider
            value={{ defaulturl: process.env.REACT_APP_API_HOST }}
        >
            {children}
        </UrlContext.Provider>
    );
};

export const useUrlContext = () => useContext(UrlContext);

export default UrlProvider;
