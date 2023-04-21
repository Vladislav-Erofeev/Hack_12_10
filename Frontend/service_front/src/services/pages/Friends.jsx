import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {Button} from "reactstrap";
import Cookies from "universal-cookie";
import axios from "axios";
import UserList from "../components/UserList";
import {get_friends} from "../requests";

const Friends = () => {

    return (
        <div className="my-container">
            <UserList
                getUsers={get_friends}
                nameList={"Друзья"}
            />
        </div>
    )
}

export default Friends