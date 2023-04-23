import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {Button} from "reactstrap";
import Cookies from "universal-cookie";
import axios from "axios";
import Person from "./Person";

const People = ({nameAction1, nameAction2, getUsers, actionToUser1, actionToUser2}) => {

    const cookies = new Cookies();

    const token = cookies.get('token')

    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers(token).then(res => {
            setUsers(res)
        })
    }, [getUsers])


    return (
        <div>
            {users
                ? users.map(user => (
                    <div className="d-flex my-4 align-items-center"  key={user.id}>
                        <Person user={user}/>
                        <div className="d-flex justify-content-around flex-column ms-auto" style={{height:"100px"}}>
                            {actionToUser1 !== undefined
                                ? <Button className="my-btn btn-user" onClick={event => {
                                    event.preventDefault()
                                    actionToUser1(token, user.id)
                                }}>{nameAction1}</Button>
                                : <></>
                            }
                            {actionToUser2 !== undefined
                                ? <Button className="my-btn btn-user btn-deny" color="danger" onClick={event => {
                                    event.preventDefault()
                                    actionToUser2(token, user.id)
                                }}>{nameAction2}</Button>
                                : <></>
                            }
                        </div>
                    </div>
                ))
                :
                <h3 className="titel_two">Мы никого не нашли %(</h3>
            }

        </div>
    )
}

export default People