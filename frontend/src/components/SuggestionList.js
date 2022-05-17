import React, { useEffect, useState } from 'react';
import './SuggestionList.scss';
import { Card, Button } from 'antd';
import Suggestion from './Suggestion';
import { useUrlContext } from '../utils/UrlProvider';
import { useAppContext } from '../store';
import useAxios from 'axios-hooks';
import Axios from 'axios';

const SuggestionList = ({ style }) => {
    const {
        store: { jwtToken },
    } = useAppContext();
    const listUrl = useUrlContext().defaulturl + '/accounts/suggestions/';
    const followUrl = useUrlContext().defaulturl + '/accounts/follow/';
    const headers = { Authorization: `Bearer ${jwtToken}` };
    const [suggestionList, setSuggestionList] = useState([]);

    const [{ data: orignSuggestionList, loading, error }, refetch] = useAxios({
        url: listUrl,
        headers,
    });

    useEffect(() => {
        if (!orignSuggestionList) setSuggestionList([]);
        else
            setSuggestionList(
                orignSuggestionList.map((suggestion) => ({
                    ...suggestion,
                    is_follow: false,
                })),
            );
    }, [orignSuggestionList]);

    const onFollowUser = (username) => {
        Axios.post(followUrl, { username }, { headers })
            .then((response) => {
                setSuggestionList((prevState) => {
                    return prevState.map((suggestion) => {
                        if (suggestion.username === username) {
                            return { ...suggestion, is_follow: true };
                        } else {
                            return suggestion;
                        }
                    });
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    console.log(suggestionList);

    return (
        <div style={style}>
            <Card
                title="Suggestions for you"
                size="small"
                extra={
                    <Button
                        type="text"
                        onClick={() => refetch()}
                        style={{ marginLeft: '0.3rem', opacity: '0.5' }}
                        size="small"
                    >
                        reload
                    </Button>
                }
            >
                {loading && <div>Loading...</div>}
                {error && <div>error</div>}

                {suggestionList.length === 0 && (
                    <span style={{ opacity: '0.5' }}>
                        추천 유저가 없습니다.
                    </span>
                )}
                {suggestionList.map((suggestion) => {
                    return (
                        <Suggestion
                            {...suggestion}
                            key={suggestion.pk}
                            onFollowUser={onFollowUser}
                        />
                    );
                })}
            </Card>
        </div>
    );
};

export default SuggestionList;
