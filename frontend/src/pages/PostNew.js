import React from 'react';
import PostNewForm from '../components/PostNewForm';
import AppLayout from '../components/AppLayout';

const PostNew = () => {
    return (
        <AppLayout>
            <div>
                <PostNewForm />
            </div>
        </AppLayout>
    );
};

export default PostNew;
