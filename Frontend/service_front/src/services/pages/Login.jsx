import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {Button} from "reactstrap";
import {Link, useNavigate} from "react-router-dom";
import {auth} from "../../redux/slices/security";
import "./Register.css"

const Login = () => {

    const [admAuth, setAdmAuth] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    const dispatch = useDispatch()
    return (
        <div className="my-container">
            <h1 className="titel_one my-3">Авторизация</h1>
            <form>

                <label>
                    <p>Email</p>
                    <input className="d-block" type="email" required onChange={(event) => {
                        setAdmAuth({...admAuth, email: event.target.value})
                    }}/>
                </label>
                <label>
                    <p>Пароль</p>
                    <input className="d-block" type="password" required onChange={(event) => {
                        setAdmAuth({...admAuth, password: event.target.value})
                    }}/>
                </label>
                <Button className="my-btn fsss my-2" onClick={(event) => {
                    event.preventDefault()
                    dispatch(auth(admAuth))
                    navigate("/")
                }}>Войти</Button>
                <Link className="cont-form__link" to={"/registration"}>У меня нет аккаунта</Link>
            </form>
        </div>

    )
}

export default Login