import React, { useEffect, useState } from 'react';
import './SuggestionList.scss';
import { Card } from 'antd';
import Suggestion from './Suggestion';
import { useUrlContext } from '../utils/UrlProvider';
import { useAppContext } from '../store';
import Axios from 'axios';

const SuggestionList = ({ style }) => {
    const {
        store: { jwtToken },
    } = useAppContext();
    const listUrl = useUrlContext().defaulturl + '/accounts/suggestions/';
    const [suggestionList, setSuggestionList] = useState([]);

    useEffect(() => {
        const headers = { Authorization: `Bearer ${jwtToken}` };
        Axios.get(listUrl, { headers }).then((response) => {
            setSuggestionList(response.data);
        });
    }, [listUrl, jwtToken]);

    return (
        <div style={style}>
            <Card title="Suggestions for you" size="small">
                {suggestionList && suggestionList.length === 0 && (
                    <span style={{ opacity: '0.5' }}>
                        추천 유저가 없습니다.
                    </span>
                )}
                {suggestionList &&
                    suggestionList.map((suggestion) => {
                        return (
                            <Suggestion {...suggestion} key={suggestion.pk} />
                        );
                    })}
            </Card>
        </div>
    );
};

export default SuggestionList;
