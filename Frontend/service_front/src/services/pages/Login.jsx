import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {Button} from "reactstrap";
import {useNavigate} from "react-router-dom";
import {auth} from "../../redux/slices/security";

const AdminLogin = () => {

    const [admAuth, setAdmAuth] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    const dispatch = useDispatch()
    return (
        <>
            <form>
                <h1>Логин</h1>
                <input type="email" required onChange={(event) => {
                    setAdmAuth({...admAuth, email: event.target.value})
                }}/>
                <input type="password" required onChange={(event) => {
                    setAdmAuth({...admAuth, password: event.target.value})
                }}/>
                <Button text="Войти" onClick={(event) => {
                    event.preventDefault()
                    dispatch(auth(admAuth, dispatch))
                    navigate("/")
                }}/>
            </form>
        </>
    )
}

export default AdminLogin