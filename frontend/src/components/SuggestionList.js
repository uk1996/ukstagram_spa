import React, { useEffect, useState } from 'react';
import './SuggestionList.scss';
import { Card } from 'antd';
import Suggestion from './Suggestion';
import { useUrlContext } from '../utils/UrlProvider';
import Axios from 'axios';
import { useAppContext } from '../store';

const SuggestionList = ({ style }) => {
    const [suggestionList, setSuggestionList] = useState([]);
    const {
        store: { jwtToken },
    } = useAppContext();
    const apiUrl = useUrlContext().defaulturl + '/accounts/suggestions/';

    useEffect(() => {
        const headers = { Authorization: `Bearer ${jwtToken}` };
        Axios.get(apiUrl, { headers })
            .then((response) => {
                const { data } = response;
                setSuggestionList(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [jwtToken, apiUrl]);

    return (
        <div style={style}>
            <Card title="Suggestionss for you" size="small">
                {suggestionList.length === 0 && (
                    <span style={{ opacity: '0.5' }}>
                        추천 유저가 없습니다.
                    </span>
                )}
                {suggestionList.map((suggestion) => {
                    return <Suggestion {...suggestion} key={suggestion.pk} />;
                })}
            </Card>
        </div>
    );
};

export default SuggestionList;
