import React, { useReducer, createContext, useContext } from 'react';

const PostListContext = createContext();

const SET_POSTLIST = 'APP/SET_TOKEN';

export const setPostList = (postList) => ({
    type: SET_POSTLIST,
    payload: postList,
});

const reducer = (prevState, action) => {
    const { type } = action;
    if (type === SET_POSTLIST) {
        const { payload: postList } = action;
        return postList;
    } else {
        return prevState;
    }
};

const PostListProvider = ({ children }) => {
    const [postList, dispatch] = useReducer(reducer);

    return (
        <PostListContext.Provider value={{ postList, dispatch }}>
            {children}
        </PostListContext.Provider>
    );
};

export const usePostListContext = () => useContext(PostListContext);

export default PostListProvider;
