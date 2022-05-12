import React from 'react';
import './SuggestionList.scss';
import { Card } from 'antd';
import Suggestion from './Suggestion';

const SuggestionList = ({ style }) => {
    return (
        <div style={style}>
            <Card title="Suggestionss for you" size="small">
                <Suggestion />
                <Suggestion />
                <Suggestion />
                <Suggestion />
                <Suggestion />
            </Card>
        </div>
    );
};

export default SuggestionList;
