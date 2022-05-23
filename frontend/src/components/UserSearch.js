import React, { useEffect, useState } from 'react';
import { Input, AutoComplete, Avatar, Row, Col } from 'antd';
import Axios from 'axios';
import { useUrlContext } from '../utils/UrlProvider';
import { useAppContext } from '../store';
import { useHistory } from 'react-router-dom';

const UserSearch = () => {
    const [userName, setUserName] = useState('');
    const defaultUrl = useUrlContext().defaulturl;
    const apiUrl = defaultUrl + '/accounts/usersearch/';
    const [userList, setUserList] = useState([]);
    const {
        store: { jwtToken },
    } = useAppContext();
    const history = useHistory();
    const [options, setOptions] = useState([]);

    const handleChange = ({ target }) => {
        setUserName(target.value);
    };

    useEffect(() => {
        const headers = { Authorization: `Bearer ${jwtToken}` };
        const requestUrl = apiUrl + `?username=${userName}`;
        Axios.get(requestUrl, { headers }).then((response) => {
            setUserList(response.data);
            if (userName.length === 0) {
                setUserList([]);
            }
        });
    }, [userName, jwtToken, apiUrl]);

    useEffect(() => {
        setOptions(
            userList.map((user) => {
                return {
                    key: user.pk,
                    value: (
                        <Row>
                            <Col span={8}>
                                <Avatar
                                    icon={
                                        <img
                                            src={defaultUrl + user.avatar_url}
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
    }, [userList, defaultUrl, history]);

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
