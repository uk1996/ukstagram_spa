import React from 'react';
import Post from './Post';
import { useAppContext } from '../store';
import { Alert } from 'antd';
import { useUrlContext } from '../utils/UrlProvider';
import useAxios from 'axios-hooks';

const PostList = () => {
    const {
        store: { jwtToken },
    } = useAppContext();

    const apiUrl = useUrlContext().defaulturl + '/api/posts/';
    const headers = { Authorization: `Bearer ${jwtToken}` };

    const [{ data: postList }] = useAxios({
        url: apiUrl,
        headers,
    });

    return (
        <div>
            {postList && postList.length === 0 && (
                <Alert type="warning" message="포스팅이 없습니다." />
            )}
            {postList &&
                postList.map((post) => {
                    return <Post post={post} key={post.pk} />;
                })}
        </div>
    );
};

export default PostList;
