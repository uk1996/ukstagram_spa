import Post from './Post';

import { Alert } from 'antd';

import { usePostListContext } from '../utils/PostListProvider';

const PostList = () => {
    const { postList } = usePostListContext();

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
