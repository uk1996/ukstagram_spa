import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import Axios from 'axios';
import { useUrlContext } from '../utils/UrlProvider';
import { useAppContext } from '../store';
import { setPostList, usePostListContext } from '../utils/PostListProvider';
import './UserFilter.scss';

const UserFilter = () => {
    const apiUrl = useUrlContext().defaulturl + '/api/posts/';
    const {
        store: { jwtToken },
    } = useAppContext();
    const { dispatch } = usePostListContext();
    const [searchUserName, setSearchUserName] = useState('');

    useEffect(() => {
        const headers = { Authorization: `Bearer ${jwtToken}` };
        const requestUrl = apiUrl + `?username=${searchUserName}`;

        Axios.get(requestUrl, { headers })
            .then((response) => {
                const postListFilter = response.data;
                dispatch(setPostList(postListFilter));
            })
            .catch((error) => {
                console.log(error.response);
            });
    }, [searchUserName, jwtToken, dispatch, apiUrl]);

    const handleChange = ({ target }) => {
        setSearchUserName(target.value);
    };

    return (
        <Input.Search
            name="username"
            onChange={handleChange}
            placeholder="username을 입력해주세요."
        />
    );
};

export default UserFilter;
