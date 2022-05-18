import React, { useEffect, useState } from 'react';
import './AppLayout.scss';
import { Input } from 'antd';
import UkstagramImage from '../assets/Ukstagram.png';
import { useAppContext } from '../store';
import Logout from './Logout';
import MyImage from './MyImage';
import PostNewLogo from './PostNewLogo';
import CustomDropdown from './CuntomDropdown';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const AppLayout = ({ children, sidebar, contentwidth = '70%' }) => {
    const [appStyle, setAppStyle] = useState({});
    const [contentStyle, setContentStyle] = useState({});
    const {
        store: { isAuthenticated },
    } = useAppContext();

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
                    <>
                        <a href="/">
                            <img src={UkstagramImage} alt="ukstagram" />
                        </a>
                    </>
                </h1>
                {isAuthenticated && (
                    <div className="search">
                        <Input.Search />
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
            {sidebar && <div className="sidebar">{sidebar}</div>}
            <div className="footer">@Ukstagram</div>
        </div>
    );
};

export default AppLayout;
