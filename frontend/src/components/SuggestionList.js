import React from 'react';
import './SuggestionList.scss';
import { Card } from 'antd';
import Suggestion from './Suggestion';
import { useUrlContext } from '../utils/UrlProvider';
import { useAppContext } from '../store';
import useAxios from 'axios-hooks';

const SuggestionList = ({ style }) => {
    const {
        store: { jwtToken },
    } = useAppContext();
    const apiUrl = useUrlContext().defaulturl + '/accounts/suggestions/';
    const headers = { Authorization: `Bearer ${jwtToken}` };

    const [{ data: suggestionList, loading, error }, refetch] = useAxios({
        url: apiUrl,
        headers,
    });

    return (
        <div style={style}>
            <Card
                title="Suggestions for you"
                size="small"
                extra={
                    <span
                        style={{ marginLeft: '0.3rem', opacity: '0.5' }}
                        size="small"
                        onClick={() => refetch()}
                    >
                        reload
                    </span>
                }
            >
                {loading && <div>Loading...</div>}
                {error && <div>error</div>}

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
