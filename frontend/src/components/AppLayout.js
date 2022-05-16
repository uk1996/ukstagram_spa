import React from 'react';
import './AppLayout.scss';
import { Input, Menu } from 'antd';
import StoryList from './StoryList';
import SuggestionList from './SuggestionList';
import UkstagramImage from '../assets/Ukstagram.png';
import Logout from '../pages/accounts/Logout';
import { useAppContext } from '../store';

const AppLayout = ({ children }) => {
    const {
        store: { isAuthenticated },
    } = useAppContext();

    return (
        <div className="app">
            <div className="header">
                <h1 className="page-title">
                    <img src={UkstagramImage} alt="ukstagram" />
                </h1>
                <div className="search">
                    <Input.Search />
                </div>
                <div className="topnav">
                    <Menu mode="horizontal">
                        <Menu.Item>
                            <Logout />
                        </Menu.Item>
                    </Menu>
                </div>
            </div>
            <div className="contents">{children}</div>
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
