import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {auth} from "../../redux/security/authService";
import {Button} from "reactstrap";

const AdminLogin = () => {

    const [admAuth, setAdmAuth] = useState({
        email: "",
        password: ""
    })

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
                }}/>
            </form>
        </>
    )
}

export default AdminLogin