import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {Button} from "reactstrap";
import {reg} from "../../redux/slices/security";
import {Link, useNavigate} from "react-router-dom";
import "./Register.css"


const Registration = () => {
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
        <div className="my-container">
            <h1 className="titel_one my-3">Регистрация</h1>
            <form>
                <label>
                    <p>Имя пользователя</p>
                    <input type="text" required onChange={(event) => {
                        setAdmReg({...admReg, username: event.target.value})
                    }}/>
                </label>
                <label>
                    <p>Email</p>
                    <input type="email" required onChange={(event) => {
                        setAdmReg({...admReg, email: event.target.value})
                    }}/>
                </label>
                <label>
                    <p>Пароль</p>
                    <input className="d-block" type="password" required onChange={(event) => {
                        setAdmReg({...admReg, password: event.target.value})
                    }}/>
                </label>
                <label>
                    <p>Фотография профиля</p>
                    <input type="file" className="file-input d-block" onChange={(event) => {
                        setFile(event.target.files[0])
                    }}/>
                </label>
                <Button className="my-btn fsss my-2"   onClick={(event) => {
                    event.preventDefault()
                    register()
                    navigate("/")
                }}>Зарегистрироваться</Button>
                <Link className="cont-form__link" to={"/login"}>У меня уже есть аккаунт</Link>
            </form>

        </div>
    )
}

export default Registration