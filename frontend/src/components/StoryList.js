import React from 'react';
import './StoryList.scss';
import { Card } from 'antd';

const StoryList = ({ style }) => {
    return (
        <div style={style}>
            <Card title="Stoires" size="small">
                <span style={{ opacity: '0.5' }}>
                    Stories from people you follow will show up here.
                </span>
            </Card>
        </div>
    );
};

export default StoryList;
