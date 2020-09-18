import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, filterUsers } from '../../store/Actions';
import User from './UserItem';

export default function Users() {

    const dispatch = useDispatch();
    const usersData = useSelector(state => state.userReducer);

    const getUserData = () => {
        dispatch(getUsers());
        console.log("USERS ", usersData)
    }

    const filterHandler = (id) => {
        let filterted = usersData.users.filter(user => user.id !== id);
        dispatch(filterUsers({ users: filterted, id }));
    }

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <>
            <h1 className="title"> Users </h1>
            {usersData.error && (<p>{usersData.error}</p>)}
            {usersData.pending && (<p>Loading Data</p>)}
            <div className="user-records">
                {usersData && usersData.users.map(user => (
                    <User
                        key={user.id}
                        name={user.first_name + ' ' + user.last_name}
                        userId={user.id}
                        avatar={user.avatar}
                        userEmail={user.email}
                        filterHandler={() => filterHandler(user.id)}
                    />
                ))}
            </div>
        </>
    );
}
