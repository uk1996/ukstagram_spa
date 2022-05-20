import Post from './Post';

import { Alert } from 'antd';
import React, { useState, useCallback, useEffect } from 'react';
import { useUrlContext } from '../utils/UrlProvider';
import { useAppContext } from '../store';
import { useInView } from 'react-intersection-observer';
import Axios from 'axios';
const PostList = () => {
    const apiUrl = useUrlContext().defaulturl + '/api/posts/';
    const {
        store: { jwtToken },
    } = useAppContext();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [postList, setPostList] = useState([]);
    const [ref, inView] = useInView();

    // 서버에서 아이템을 가지고 오는 함수
    const getItems = useCallback(async () => {
        const headers = { Authorization: `Bearer ${jwtToken}` };
        const requestUrl = apiUrl + `?page=${page}`;

        setLoading(true);
        Axios.get(requestUrl, { headers }).then((response) => {
            setPostList((prevState) => {
                return [...prevState, ...response.data.results];
            });
        });
        setLoading(false);
    }, [apiUrl, jwtToken, page]);

    // `getItems` 가 바뀔 때 마다 함수 실행
    useEffect(() => {
        getItems();
    }, [getItems]);

    useEffect(() => {
        // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
        if (inView && !loading) {
            setPage((prevState) => prevState + 1);
        }
    }, [inView, loading]);

    return (
        <div>
            {postList.length === 0 && (
                <Alert type="warning" message="포스팅이 없습니다." />
            )}
            {postList.length > 0 &&
                postList.map((post, idx) => {
                    return (
                        <React.Fragment key={post.pk}>
                            {postList.length - 1 === idx ? (
                                <div ref={ref}>
                                    <Post post={post} />
                                </div>
                            ) : (
                                <div>
                                    <Post post={post} />
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
        </div>
    );
};

export default PostList;
