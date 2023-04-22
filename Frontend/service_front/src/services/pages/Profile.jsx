import React, {useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom";
import FeedListComponent from "../components/FeedListComponent";
import {get_user, get_user_feeds, get_user_rating} from "../requests";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectToken} from "../../redux/slices/security";
import {Button} from "reactstrap";


const Profile = () => {
    const {userId} = useParams();

    const token = useSelector(selectToken)

    const dispatch = useDispatch()

    const [user, setUser] = useState(null)

    const [rating, setRating] = useState(null)

    const [feeds, setFeeds] = useState([])

    useEffect(() => {
        if (token)
            get_user(token, userId).then(res => {
                setUser(res)
            })
    }, [token])

    useEffect(() => {
        if (token && user)
            get_user_feeds(token, userId).then(res => {
                setFeeds(res)
            })
    }, [user])

    useEffect(() => {
        if (user)
            get_user_rating(token, user.id).then(res => {
                setRating(res)
            })
    }, [user])

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
                    <img className="profile-img"
                         src={user.url === null
                             ? "https://i.stack.imgur.com/U9zFC.png?s=192&g=1"
                             : `http://localhost:8080/image${user.url}`
                         } alt=""/>
                </div>
                <div className="profile-info ms-5">
                    <h1 className="mb-3">{user.name}</h1>
                    <h3 className="mb-3">Лучший результат {user.bestScore}</h3>
                    <h3 className="m-0">Место в рейтинге {rating}</h3>
                </div>
                <div className="ms-auto"><Button onClick={event => {
                    event.preventDefault()
                    dispatch(logout())
                    window.location.reload();
                }}>Выйти</Button></div>
            </div>
            <div className="d-flex align-items-center">
                <h1 className="m-0">Посты</h1>
                <Button className="ms-auto" to="/add_feed" tag={Link}>Добавить пост</Button>
            </div>
            <FeedListComponent feeds={feeds}/>
        </div>
    )
}

export default Profile