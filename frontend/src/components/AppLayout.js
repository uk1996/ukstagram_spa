import React, { useEffect, useState } from 'react';
import './AppLayout.scss';
import { Input } from 'antd';
import StoryList from './StoryList';
import SuggestionList from './SuggestionList';
import UkstagramImage from '../assets/Ukstagram.png';
import { useAppContext } from '../store';
import Logout from '../pages/accounts/Logout';
import MyImage from './MyImage';
import PostNewLogo from './PostNewLogo';
import CustomDropdown from './CuntomDropdown';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const AppLayout = ({ children }) => {
    const [appStyle, setAppStyle] = useState({});
    const [contentStyle, setContentStyle] = useState({});
    const {
        store: { isAuthenticated },
    } = useAppContext();

    useEffect(() => {
        const width =
            window.location.pathname === '/accounts/profile/' ? '100%' : '70%';
        if (
            !isAuthenticated ||
            window.location.pathname === '/accounts/profile/'
        ) {
            setAppStyle({
                gridTemplateAreas:
                    "'header header header' 'contents contents contents' 'footer footer footer'",
            });
            setContentStyle({
                width: width,
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
                {isAuthenticated && (
                    <div className="topnav">
                        <div className="postnewlogo">
                            <PostNewLogo />
                        </div>
                        <div className="myimage">
                            <CustomDropdown
                                items={[
                                    {
                                        label: (
                                            <Link to="/accounts/profile">
                                                프로필
                                            </Link>
                                        ),
                                    },
                                    {
                                        label: <Logout />,
                                    },
                                ]}
                                logo={<MyImage />}
                                buttontype="text"
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className="contents" style={contentStyle}>
                {children}
            </div>
            {isAuthenticated &&
                window.location.pathname !== '/accounts/profile/' && (
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
