import React from 'react'
import UserList from "../components/UserList";
import {get_all_users, send_friend_request} from "../requests";

const People = () => {

    return (
        <div className="my-container">
            <UserList
                getUsers={get_all_users}
                actionToUser={send_friend_request}
                nameList={"Пользователи"}
                nameAction={"Добавить в друзья"}
            />
        </div>
    )
}

export default People