import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Post from './Post';

const apiUrl = 'http://localhost:8000/api/posts/';

const PostList = () => {
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        Axios.get(apiUrl)
            .then((response) => {
                const { data } = response;
                setPostList(data);
            })
            .catch((error) => {});
        console.log('mounted');
    }, []);

    return (
        <div>
            <h1>PostList</h1>
            {postList.map((post) => {
                return <Post post={post} key={post.id} />;
            })}
        </div>
    );
};

export default PostList;