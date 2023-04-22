import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {Button} from "reactstrap";
import Cookies from "universal-cookie";
import axios from "axios";
import Person from "./Person";

const People = ({nameList, nameAction, getUsers, actionToUser}) => {

    const cookies = new Cookies();

    const token = cookies.get('token')

    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers(token).then(res => {
            setUsers(res)
        })
    }, [])


    return (
        <div className="my-container">
            <h1 className="my-3">{nameList}</h1>
            {users
                ?
                users.map(user => (
                    <div className="d-flex my-4 align-items-center" key={user.id}>
                        <Person user={user}/>
                        {nameAction !== undefined
                            ? <Button className="my-btn ms-auto fs-5" onClick={event => {
                                event.preventDefault()
                                actionToUser(token, user.id)
                            }}>{nameAction}</Button>
                            : <></>
                        }
                    </div>
                ))
                :
                <h3>Мы никого не нашли %(</h3>
            }

        </div>
    )
}

export default People