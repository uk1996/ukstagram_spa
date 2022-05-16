import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Post from './Post';
import { useAppContext } from '../store';
import { Alert } from 'antd';

const apiUrl = 'http://localhost:8000/api/posts/';

const PostList = () => {
    const {
        store: { jwtToken },
    } = useAppContext();

    const [postList, setPostList] = useState([]);

    useEffect(() => {
        const headers = { Authorization: `Bearer ${jwtToken}` };
        Axios.get(apiUrl, { headers })
            .then((response) => {
                const { data } = response;
                setPostList(data);
            })
            .catch((error) => {});
    }, [jwtToken]);

    return (
        <div>
            {postList.length === 0 && (
                <Alert type="warning" message="포스팅이 없습니다." />
            )}
            {postList.map((post) => {
                return <Post post={post} key={post.id} />;
            })}
        </div>
    );
};

export default PostList;
