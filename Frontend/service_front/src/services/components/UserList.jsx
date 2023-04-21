import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {Button} from "reactstrap";
import Cookies from "universal-cookie";
import axios from "axios";

const People = ({nameList, nameAction, getUsers, actionToUser}) => {

    const cookies = new Cookies();

    const token = cookies.get('token')

    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers(token).then(res => {
            setUsers(res)
        })
    }, [])

    const renderedUsers = users.map(user => (
        <div className="d-flex my-4 align-items-center" key={user.id}>
            <Link style={{width: "50px", height: "50px"}} to={`/user/${user.id}`}>
                {user.url === null
                    ? <img style={{width: "100%", height: "100%", borderRadius: "100%"}}
                           src="https://i.stack.imgur.com/U9zFC.png?s=192&g=1" alt=""/>
                    : <img style={{width: "100%", height: "100%", borderRadius: "100%"}}
                           src={`http://localhost:8080/image${user.url}`} alt=""/>
                }
            </Link>
            <Link className=" profile-info ms-5 text-decoration-none text-dark" to={`/user/${user.id}`}>
                <h2 className="m-0">{user.name}</h2>
            </Link>
            {nameAction !== undefined
                ? <Button className="my-btn ms-auto fs-5" onClick={event => {
                    event.preventDefault()
                    actionToUser(token, user.id)
                }}>{nameAction}</Button>
                : <></>
            }

        </div>
    ))

    return (
        <div className="my-container">
            <h2 className="my-3">{nameList}</h2>
            {renderedUsers}
        </div>
    )
}

export default People