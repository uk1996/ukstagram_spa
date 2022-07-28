import React, { useEffect, useState } from 'react';
import { Input, AutoComplete, Avatar, Row, Col } from 'antd';
import { useUrlContext } from '../utils/UrlProvider';
import { useAppContext } from '../store';
import { useHistory } from 'react-router-dom';
import useAxios from 'axios-hooks';

const UserSearch = () => {
    const [userName, setUserName] = useState('');
    const defaultUrl = useUrlContext().defaulturl;
    const apiUrl = defaultUrl + '/accounts/usersearch/';
    const requestUrl = apiUrl + `?username=${userName}`;
    const {
        store: { jwtToken },
    } = useAppContext();
    const headers = { Authorization: `Bearer ${jwtToken}` };
    const history = useHistory();
    const [options, setOptions] = useState([]);

    const handleChange = ({ target }) => {
        setUserName(target.value);
    };

    const [{ data: userList }] = useAxios({
        url: requestUrl,
        headers,
    });

    useEffect(() => {
        setOptions(
            userList &&
                userName.length > 0 &&
                userList.map((user) => {
                    return {
                        key: user.pk,
                        value: (
                            <Row>
                                <Col span={8}>
                                    <Avatar
                                        icon={
                                            <img
                                                src={
                                                    user.avatar
                                                        ? user.avatar
                                                        : defaultUrl +
                                                          user.avatar_url
                                                }
                                                alt=""
                                            />
                                        }
                                    />
                                </Col>
                                <Col span={12}>{user.username}</Col>
                            </Row>
                        ),
                    };
                }),
        );
    }, [userList, defaultUrl, history, userName]);

    return (
        <div>
            <AutoComplete
                options={options}
                style={{
                    width: 200,
                }}
                onSelect={(e) => {
                    history.push(
                        `/accounts/profile/${
                            e.props.children.at(1).props.children
                        }`,
                    );
                }}
            >
                <Input.Search
                    onChange={handleChange}
                    placeholder="username 검색"
                />
            </AutoComplete>
        </div>
    );
};

export default UserSearch;
