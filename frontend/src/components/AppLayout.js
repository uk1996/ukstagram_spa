import React, { useEffect, useState } from 'react';
import './AppLayout.scss';
import UkstagramImage from '../assets/Ukstagram.png';
import { useAppContext } from '../store';
import Logout from './Logout';
import MyImage from './MyImage';
import PostNewLogo from './PostNewLogo';
import CustomDropdown from './CuntomDropdown';
import { Link } from 'react-router-dom';
import { useMyUserContext } from '../utils/MyUserProvider';
import { Input } from 'antd';

const AppLayout = ({ children, sidebar, contentwidth = '70%' }) => {
    const [appStyle, setAppStyle] = useState({});
    const [contentStyle, setContentStyle] = useState({});
    const {
        store: { isAuthenticated },
    } = useAppContext();
    const { myUser } = useMyUserContext();

    useEffect(() => {
        if (!sidebar) {
            setAppStyle({
                gridTemplateAreas:
                    "'header header header' 'contents contents contents' 'footer footer footer'",
            });
            setContentStyle({
                width: contentwidth,
                justifySelf: 'center',
            });
        } else {
            setAppStyle({
                gridTemplateAreas:
                    "'header header header' 'contents contents sidebar' 'footer footer footer'",
            });
            setContentStyle({});
        }
    }, [sidebar, contentwidth]);

    return (
        <div className="app" style={appStyle}>
            <div className="header">
                <h1 className="page-title">
                    <div
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                            window.location.replace('/');
                        }}
                    >
                        <img src={UkstagramImage} alt="ukstagram" />
                    </div>
                </h1>
                {isAuthenticated && (
                    <div className="search">
                        <Input.Search
                            name="username"
                            placeholder="username 검색"
                        />
                    </div>
                )}
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
                                            <Link
                                                to={
                                                    '/accounts/profile/' +
                                                    myUser.username
                                                }
                                            >
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
            {sidebar && <div className="sidebar">{sidebar}</div>}
            <div className="footer">@Ukstagram</div>
        </div>
    );
};

export default AppLayout;
