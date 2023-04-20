import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import FeedListComponent from "../components/FeedListComponent";
import {fetchUser, fetchUserById, selectUser, selectUserStatus} from "../../redux/slices/user";
import Cookies from "universal-cookie";
import {fetchUserFeeds, selectUserFeeds, selectUserFeedsStatus} from "../../redux/slices/userFeeds";
import axios from "axios";


const Profile = () => {
    const {userId} = useParams();

    const cookies = new Cookies();

    const dispatch = useDispatch()

    const user = useSelector(selectUser)
    const feeds = useSelector(selectUserFeeds)

    const userStatus = useSelector(selectUserStatus)
    const feedsStatus = useSelector(selectUserFeedsStatus)

        useEffect(() => {
            if (feedsStatus === 'idle') {
                dispatch(fetchUserFeeds({token:cookies.get('token'), userId: userId}))
            }
        }, [feedsStatus, dispatch])

    useEffect(() => {
        if (userStatus === 'idle') {
            dispatch(fetchUserById({token:cookies.get('token'), userId: userId}))
        }
    }, [userStatus, dispatch])

    console.log(feeds)
    console.log(user)


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