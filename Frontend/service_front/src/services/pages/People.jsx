import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {Button} from "reactstrap";
import Cookies from "universal-cookie";
import axios from "axios";
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