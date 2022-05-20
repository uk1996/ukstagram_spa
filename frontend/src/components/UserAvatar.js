import React from 'react';

const UserAvatar = ({ avatarUrl, divposition }) => {
    return (
        <div
            style={{
                position: 'relative',
                width: '50%',
                paddingBottom: '50%',
                overflow: 'hidden',
                ...divposition,
            }}
        >
            <img
                style={{
                    borderRadius: '50%',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                }}
                src={avatarUrl}
                alt=""
            />
        </div>
    );
};

export default UserAvatar;
