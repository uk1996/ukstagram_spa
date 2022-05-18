import React, { useCallback } from 'react';
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

    const handleChange = useCallback(
        ({ target }) => {
            const headers = { Authorization: `Bearer ${jwtToken}` };
            const requestUrl = apiUrl + `?username=${target.value}`;

            Axios.get(requestUrl, { headers })
                .then((response) => {
                    const postListFilter = response.data;
                    dispatch(setPostList(postListFilter));
                })
                .catch((error) => {
                    console.log(error.response);
                });
        },
        [apiUrl, jwtToken, dispatch],
    );

    return (
        <Input.Search
            name="username"
            onChange={handleChange}
            placeholder="username을 입력해주세요."
        />
    );
};

export default UserFilter;
