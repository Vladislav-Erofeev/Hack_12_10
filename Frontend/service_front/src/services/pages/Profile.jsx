import React, {useEffect, useState} from 'react'
import {Link, useNavigate, useParams} from "react-router-dom";
import FeedListComponent from "../components/FeedListComponent";
import {get_user, get_user_feeds, get_user_rating, url} from "../requests";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectToken} from "../../redux/slices/security";
import {Button} from "reactstrap";
import "./Profile.css"
import {selectUser} from "../../redux/slices/user";


const Profile = () => {
    const {userId} = useParams();

    const navigate = useNavigate();

    const dispatch = useDispatch()

    const [user, setUser] = useState(null)

    const [rating, setRating] = useState(null)

    const [feeds, setFeeds] = useState([])

    const curUser = useSelector(selectUser)

    const [curUserId, setCurUserId] = useState(0)

    useEffect(()=>{
        if (curUser)
            setCurUserId(curUser.id)
        else
            setCurUserId(0)
    },[curUser])

    useEffect(() => {
        get_user(userId).then(res => {
            setUser(res)
        })
    }, [])

    useEffect(() => {
        if (user)
            get_user_feeds(user.id).then(res => {
                setFeeds(res)
            })
    }, [user])

    useEffect(() => {
        if (user)
            get_user_rating(user.id).then(res => {
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
            <div className="d-flex mb-3 pb-3 border-bottom border-primary border-3">
                <div className="profile-avatar">
                    <img className="profile-img"
                         src={user.url === null
                             ? "https://i.stack.imgur.com/U9zFC.png?s=192&g=1"
                             : `${url}/image${user.url}`
                         } alt=""/>
                </div>
                <div className="d-flex flex-column justify-content-between flex-grow-1 ms-auto">
                    <div className="d-flex justify-content-between  mt-2">
                        <h1 className="titel_one titel_one--media m-0">{user.name}</h1>
                        {curUserId === user.id
                            ?<Button className="my-btn btn-user" onClick={event => {
                                event.preventDefault()
                                dispatch(logout())
                                navigate("/")
                                window.location.reload();
                            }}>Выйти</Button>
                            :<></>
                        }
                    </div>
                    <div className="align-self-center">
                        <h3 className="mb-3 dop-info">Лучший результат {user.bestScore}</h3>
                        <h3 className="m-0 dop-info">Место в рейтинге {rating}</h3>
                    </div>
                </div>
            </div>
            <div className="m-3 d-flex align-items-center">
                <h1 className="m-0 titel_one titel_one--media">Посты</h1>
                {curUserId === user.id
                    ? <Button className="ms-auto my-btn btn-user" to="/add_feed" tag={Link}>Новая запись</Button>
                    : <></>
                }
            </div>
            <FeedListComponent feeds={feeds}/>
        </div>
    )
}

export default Profile