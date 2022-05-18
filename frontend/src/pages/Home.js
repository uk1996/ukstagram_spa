import React from 'react';
import PostList from '../components/PostList';
import AppLayout from '../components/AppLayout';
import StoryList from '../components/StoryList';
import SuggestionList from '../components/SuggestionList';

const Home = () => {
    const sidebar = (
        <>
            <StoryList style={{ marginBottom: '1rem' }} />
            <SuggestionList />
        </>
    );

    return (
        <AppLayout sidebar={sidebar}>
            <PostList />
        </AppLayout>
    );
};

export default Home;
