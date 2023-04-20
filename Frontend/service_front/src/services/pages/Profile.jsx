import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import FeedListComponent from "../components/FeedListComponent";
import Cookies from "universal-cookie";
import axios from "axios";


const Profile = () => {
    const {userId} = useParams();

    const cookies = new Cookies();

    const token = cookies.get('token')

    const [user, setUser] = useState(null)

    const [feeds, setFeeds] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8080/person/${userId}`,
            {
                headers: {
                    "access-control-allow-origin": "http://localhost:3000",
                    "Authorization": `Bearer ${token}`,
                }
            }).then(res => {
                setUser(res.data)
            }
        );
    }, [token, userId])

    useEffect(() => {
        axios.get(`http://localhost:8080/feed/person/${userId}`,
            {
                headers: {
                    "access-control-allow-origin": "http://localhost:3000",
                    "Authorization": `Bearer ${token}`,
                }
            }).then(res => {
                setFeeds(res.data)
            }
        );
    }, [token, userId])

    if (!user) {
        return (
            <div className="my-container text-center">
                <h2>User not found!</h2>
            </div>
        )
    }

    return (
        <div className="my-container">
            <div className="d-flex my-4">
                <div className="profile-avatar">
                    {user.url === null
                        ?<img style={{width: "100%", height: "100%", borderRadius: "100%"}} src="https://i.stack.imgur.com/U9zFC.png?s=192&g=1" alt=""/>
                        :<img style={{width: "100%", height: "100%", borderRadius: "100%"}} src={`http://localhost:8080/image${user.url}`} alt=""/>
                    }
                </div>
                <div className="profile-info ms-5">
                    <h1 className="mb-3">{user.name}</h1>
                    <h3 className="m-0">Лучший результат {user.bestScore}</h3>
                </div>
            </div>
            <FeedListComponent feeds={feeds}/>
        </div>
    )
}

export default Profile