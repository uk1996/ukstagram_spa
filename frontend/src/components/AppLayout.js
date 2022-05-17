import React, { useEffect, useState } from 'react';
import './AppLayout.scss';
import { Input, Menu } from 'antd';
import StoryList from './StoryList';
import SuggestionList from './SuggestionList';
import UkstagramImage from '../assets/Ukstagram.png';
import Logout from '../pages/accounts/Logout';
import { useAppContext } from '../store';

const AppLayout = ({ children }) => {
    const [appStyle, setAppStyle] = useState({});
    const [contentStyle, setContentStyle] = useState({});
    const {
        store: { isAuthenticated },
    } = useAppContext();

    useEffect(() => {
        if (!isAuthenticated) {
            setAppStyle({
                gridTemplateAreas:
                    "'header header header' 'contents contents contents' 'footer footer footer'",
            });
            setContentStyle({
                width: '70%',
                justifySelf: 'center',
            });
        } else {
            setAppStyle({
                gridTemplateAreas:
                    "'header header header' 'contents contents sidebar' 'footer footer footer'",
            });
            setContentStyle({});
        }
    }, [isAuthenticated]);

    return (
        <div className="app" style={appStyle}>
            <div className="header">
                <h1 className="page-title">
                    <>
                        <a href="/">
                            <img src={UkstagramImage} alt="ukstagram" />
                        </a>
                    </>
                </h1>
                <div className="search">
                    <Input.Search />
                </div>
                <div className="topnav">
                    {isAuthenticated && (
                        <Menu mode="horizontal">
                            <Menu.Item>
                                <Logout />
                            </Menu.Item>
                        </Menu>
                    )}
                </div>
            </div>
            <div className="contents" style={contentStyle}>
                {children}
            </div>
            {isAuthenticated && (
                <div className="sidebar">
                    <StoryList style={{ marginBottom: '1rem' }} />
                    <SuggestionList />
                </div>
            )}
            <div className="footer">@Ukstagram</div>
        </div>
    );
};

export default AppLayout;
