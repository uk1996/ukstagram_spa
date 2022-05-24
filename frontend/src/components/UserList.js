import React from 'react';
import User from './User';

const UserList = ({ userList, kind, requestUerPage }) => {
    return (
        <>
            <div>
                {userList.length === 0 && (
                    <div>
                        {kind === 'following'
                            ? '팔로잉한 유저가 없습니다.'
                            : '팔로워가 없습니다.'}
                    </div>
                )}
            </div>
            {userList.length > 0 &&
                userList.map((user) => {
                    return (
                        <User
                            key={user.pk}
                            user={user}
                            requestUerPage={requestUerPage}
                        />
                    );
                })}
        </>
    );
};

export default UserList;
