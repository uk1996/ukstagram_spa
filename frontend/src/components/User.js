import React, { useEffect, useState } from 'react';
import { useMyUserContext } from '../utils/MyUserProvider';
import { Row, Col, Avatar, Button } from 'antd';
import { Link } from 'react-router-dom';
import { useUrlContext } from '../utils/UrlProvider';
import Axios from 'axios';
import { useAppContext } from '../store';

const User = ({ user: { username, avatar, avatar_url }, requestUerPage }) => {
    const { myUser, setMyUser } = useMyUserContext();
    const [isFollow, setIsFollow] = useState();
    const defaultUrl = useUrlContext().defaulturl;
    const {
        store: { jwtToken },
    } = useAppContext();

    const handleClick = () => {
        const kind = isFollow ? 'unfollow' : 'follow';
        const headers = { Authorization: `Bearer ${jwtToken}` };

        Axios.post(
            defaultUrl + `/accounts/${kind}/`,
            { username },
            { headers },
        ).then(() => {
            setIsFollow(!isFollow);
            Axios.get(defaultUrl + '/accounts/users/me/', { headers })
                .then((response) => {
                    setMyUser(response.data);
                })
                .catch((error) => {
                    console.log(error.response);
                });
            requestUerPage({ headers });
        });
    };

    useEffect(() => {
        if (myUser) {
            const myFollowingUser = myUser.following_set.map(
                (user) => user.username,
            );
            setIsFollow(myFollowingUser.includes(username));
        }
    }, [myUser, username]);

    return (
        <div style={{ marginBottom: '2%' }}>
            <Row>
                <Col span={2}>
                    <Link to={`/accounts/profile/${username}`}>
                        <Avatar
                            size="small"
                            icon={
                                <img
                                    src={
                                        avatar
                                            ? avatar
                                            : defaultUrl + avatar_url
                                    }
                                    alt=""
                                />
                            }
                        />
                    </Link>
                </Col>
                <Col span={11}>
                    <Link to={`/accounts/profile/${username}`}>
                        <span
                            style={{
                                color: 'black',
                                opacity: '0.9',
                                position: 'relative',
                                left: '10%',
                            }}
                        >
                            {username}
                        </span>
                    </Link>
                </Col>
                <Col span={11} style={{ textAlign: 'right' }}>
                    {myUser.username === username ? (
                        <div>me</div>
                    ) : isFollow ? (
                        <Button size="small" onClick={handleClick}>
                            UnFollow
                        </Button>
                    ) : (
                        <Button size="small" onClick={handleClick}>
                            Follow
                        </Button>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default User;
