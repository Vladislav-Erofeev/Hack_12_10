import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {Button} from "reactstrap";
import {reg} from "../../redux/slices/security";
import {Link, useNavigate} from "react-router-dom";

const AdminLogin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [admReg, setAdmReg] = useState({
        username: "",
        email: "",
        password: ""
    })

    const [file, setFile] = useState(null)

    const register = async () => {
        const formData = new FormData();

        formData.append('request', new Blob([JSON.stringify(admReg)], {
            type: "application/json"
        }))

        if (file)
            formData.append('file', file)

        dispatch(reg(formData))
    }

    return (
        <>
            <h1>Регистрация</h1>
            <form>
                <label htmlFor=""></label>
                <input type="text" required onChange={(event) => {
                    setAdmReg({...admReg, username: event.target.value})
                }}/>
                <input type="email" required onChange={(event) => {
                    setAdmReg({...admReg, email: event.target.value})
                }}/>
                <input type="password" required onChange={(event) => {
                    setAdmReg({...admReg, password: event.target.value})
                }}/>
                <input type="file" required onChange={(event) => {
                    setFile(event.target.files[0])
                }}/>
                <Button onClick={(event) => {
                    event.preventDefault()
                    register()
                    navigate("/")
                }}>Зарегистрироваться</Button>

            </form>
            <Link to={"/login"}>У меня уже есть аккаунт</Link>
        </>
    )
}

export default AdminLogin