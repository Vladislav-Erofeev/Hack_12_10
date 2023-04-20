import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {Button} from "reactstrap";
import {useNavigate} from "react-router-dom";
import {auth} from "../../redux/slices/security";
import axios from "axios";
import Cookies from "universal-cookie";

const AdminLogin = () => {

    const cookies = new Cookies();
    const token = cookies.get('token')
    const [file, setFile] = useState(null)
    const [feed, setFeed] = useState({
        body: ""
    })


    const addFeed = async () => {
        let response = await axios.post(`http://localhost:8080/feed/add`, feed,
            {
                headers: {
                    "access-control-allow-origin": "http://localhost:3000",
                    "Authorization": `Bearer ${token}`,
                }
            }
        )
        console.log(response.data)
        if (file) {
            console.log(file)
            const formData = new FormData();
            formData.append('file', file)
            console.log(formData)
            axios.post(`http://localhost:8080/feed_image/add/${response.data}`, formData,
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
                <h1>Добавление поста</h1>
                <input type="text" required onChange={(event) => {
                    setFeed({body: event.target.value})
                }}/>
                <input type="file" required onChange={(event) => {
                    setFile(event.target.files[0])
                }}/>
                <Button onClick={(event) => {
                    event.preventDefault()
                    addFeed()
                }}>добавить</Button>
            </form>
        </>
    )
}

export default AdminLogin