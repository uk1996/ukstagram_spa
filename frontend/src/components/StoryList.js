import React from 'react';
import './StoryList.scss';
import { Card } from 'antd';

const StoryList = ({ style }) => {
    return (
        <div style={style}>
            <Card title="Stoires" size="small">
                Stories from people you follow will show up here.
            </Card>
        </div>
    );
};

export default StoryList;
