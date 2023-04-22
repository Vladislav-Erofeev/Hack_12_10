import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
import FeedListComponent from "../components/FeedListComponent";
import {get_user, get_user_feeds} from "../requests";
import {useSelector} from "react-redux";
import {selectToken} from "../../redux/slices/security";


const Profile = () => {
    const {userId} = useParams();

    const token = useSelector(selectToken)

    const [user, setUser] = useState(null)

    const [feeds, setFeeds] = useState([])

    useEffect(() => {
        get_user(token, userId).then(res => {
            setUser(res)
        })
    }, [])

    useEffect(() => {
        get_user_feeds(token, userId).then(res => {
            setFeeds(res)
        })
    }, [])

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
                        ? <img style={{width: "100%", height: "100%", borderRadius: "100%"}}
                               src="https://i.stack.imgur.com/U9zFC.png?s=192&g=1" alt=""/>
                        : <img style={{width: "100%", height: "100%", borderRadius: "100%"}}
                               src={`http://localhost:8080/image${user.url}`} alt=""/>
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