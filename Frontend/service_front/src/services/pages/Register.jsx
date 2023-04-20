import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import {Button} from "reactstrap";
import {reg} from "../../redux/slices/security";

const AdminLogin = () => {

    const [admReg, setAdmReg] = useState({
        email: "",
        password: ""
    })

    const dispatch = useDispatch()

    return (
        <>
            <form>
                <h1>Регистрация</h1>
                <input type="email" required onChange={(event) => {
                    setAdmReg({...admReg, email: event.target.value})
                }}/>
                <input type="password" required onChange={(event) => {
                    setAdmReg({...admReg, password: event.target.value})
                }}/>
                <Button text = "Войти" onClick={(event) => {
                    event.preventDefault()
                    dispatch(reg(admReg, dispatch))
                }}/>
            </form>
        </>
    )
}

export default AdminLogin