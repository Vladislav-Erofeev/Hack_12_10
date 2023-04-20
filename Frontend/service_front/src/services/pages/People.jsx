import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import {Button} from "reactstrap";
import Cookies from "universal-cookie";
import axios from "axios";

const People = () => {

    const cookies = new Cookies();

    const token = cookies.get('token')

    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8080/people',
            {
                headers: {
                    "access-control-allow-origin": "http://localhost:3000",
                    "Authorization": `Bearer ${token}`,
                }
            }).then(res => {
                setUsers(res.data)
            }
        );
    }, [token])

    const renderedUsers = users.map(user => (
        <div className="d-flex my-4 align-items-center" key={user.id}>

            <div style={{width: "50px", height: "50px"}}>
                <Link to={`/user/${user.id}`}>
                    <img style={{width: "100%", height: "100%", borderRadius: "100%"}} src="mpi.jpg" alt=""/>
                </Link>
            </div>
            <div className="profile-info ms-5">
                <Link className="text-decoration-none text-dark" to={`/user/${user.id}`}><h2
                    className="m-0">{user.name}</h2></Link>
            </div>
        </div>
    ))

    return (
        <div className="my-container">
            <h2 className="my-3">Друзья</h2>
            {renderedUsers}
        </div>
    )
}

export default People