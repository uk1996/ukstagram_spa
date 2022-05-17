import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useUrlContext } from '../utils/UrlProvider';
import { useAppContext } from '../store';
import { Avatar } from 'antd';

const MyImage = () => {
    const [avatarUrl, setAvatarUrl] = useState();
    const apiUrl = useUrlContext().defaulturl + '/accounts/users/me/';
    const {
        store: { jwtToken },
    } = useAppContext();

    useEffect(() => {
        const headers = { Authorization: `Bearer ${jwtToken}` };
        Axios.get(apiUrl, { headers })
            .then((response) => {
                setAvatarUrl(response.data.avatar_url);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [jwtToken, apiUrl]);

    return (
        <Avatar
            size={32}
            icon={<img src={useUrlContext().defaulturl + avatarUrl} alt="my" />}
        />
    );
};

export default MyImage;
