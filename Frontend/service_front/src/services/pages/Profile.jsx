import "./Profile.css"
import React from 'react'
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {selectUserById} from "../../redux/slices/users";
import {selectAllFeeds} from "../../redux/slices/feeds";
import FeedListComponent from "./FeedListComponent";


const Profile = () => {
    const {userId} = useParams();

    const user = useSelector(state => selectUserById(state, userId))
    const feeds = useSelector(selectAllFeeds)

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
                    <img style={{width: "100%", height: "100%", borderRadius: "100%"}} src="mpi.jpg" alt=""/>
                </div>
                <div className="profile-info ms-5">
                    <h1 className="mb-3">{user.username}</h1>
                    <h3 className="m-0">Лучший результат {user.bestScore}</h3>
                </div>
            </div>
            <FeedListComponent feeds={feeds}/>
        </div>
    )
}

export default Profile