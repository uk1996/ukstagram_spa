import { createContext, useContext } from 'react';

const UrlContext = createContext();

const UrlProvider = ({ children }) => {
    return (
        <UrlContext.Provider value={{ defaulturl: 'http://localhost:8000' }}>
            {children}
        </UrlContext.Provider>
    );
};

export const useUrlContext = () => useContext(UrlContext);

export default UrlProvider;
