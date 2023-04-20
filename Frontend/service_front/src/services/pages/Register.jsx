import React, {useEffect, useState} from 'react'
import {useDispatch} from 'react-redux';
import {Button} from "reactstrap";
import {reg} from "../../redux/slices/security";
import axios from "axios";
import Cookies from "universal-cookie";
import {fetchUser} from "../../redux/slices/user";
import jwt from "jwt-decode";

const AdminLogin = () => {
    const cookies = new Cookies();

    const [admReg, setAdmReg] = useState({
        email: "",
        password: ""
    })

    const [file, setFile] = useState(null)

    const dispatch = useDispatch()

    const register = async () => {
        dispatch(reg(admReg, dispatch))
        const token = cookies.get('token')
        console.log(jwt(token))
        if (file) {
            console.log(file)
            const formData = new FormData();
            formData.append('file', file)
            console.log(formData)
            axios.post('http://localhost:8080/person_image/add', formData,
                {
                    headers: {
                        "access-control-allow-origin": "http://localhost:3000",
                        "Authorization": `Bearer ${token}`,
                    }
                }
            ).catch(error => {
                console.error('There was an error!', error);
            });
        }
    }

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
                <input type="file" required onChange={(event) => {
                    setFile(event.target.files[0])
                }}/>
                <Button text="Войти" onClick={(event) => {
                    event.preventDefault()
                    register()
                }}/>
            </form>
        </>
    )
}

export default AdminLogin