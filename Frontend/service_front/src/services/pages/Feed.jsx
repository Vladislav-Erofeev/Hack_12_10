import React, {useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom";
import {delete_feed, get_feed, url} from "../requests";
import {useSelector} from "react-redux";
import {selectToken} from "../../redux/slices/security";
import CustomCarousel from "../components/CustomCarousel";
import {Button} from "reactstrap";
import {selectUser} from "../../redux/slices/user";
import "../components/FeedListComponent.css"
import "./Feed.css"


const Feed = () => {
    const {feedId} = useParams();

    const token = useSelector(selectToken)

    const user = useSelector(selectUser)

    const [feed, setFeed] = useState(null)

    const [userId, setUserId] = useState(0)

    useEffect(() => {
        if (user)
            setUserId(user.id)
        else
            setUserId(0)
    }, [user])

    useEffect(() => {
        get_feed(feedId).then(res => {
            setFeed(res)
        })
    }, [token])

    if (!feed) {
        return (
            <div className="my-container text-center">
                <h2>Feed not found!</h2>
            </div>
        )
    }

    return (
        <div className="my-container">
            <div className="d-flex my-4">
                <Link className="profile-avatar" to={`/user/${feed.author.id}`}>
                    <img className="profile-img"
                         src={feed.author.url === null
                             ? "https://i.stack.imgur.com/U9zFC.png?s=192&g=1"
                             : `${url}/image${feed.author.url}`
                         }/>
                </Link>
                <Link className="profile-info ms-2 text-decoration-none titel_one titel_one--media m-0" to={`/user/${feed.author.id}`}>
                    <h1>{feed.author.name}</h1>
                </Link>
                {
                    userId === feed.author.id
                        ? <Button className="ms-auto my-btn btn-user align-self-start" onClick={event => {
                            event.preventDefault()
                            delete_feed(token, feedId)
                        }}>Удалить</Button>
                        : <></>
                }
            </div>
            <div>
                <p className="feed-body">{feed.body}</p>
                <CustomCarousel images={feed.images}/>
            </div>
            <div className="mt-3">

            </div>
        </div>
    )
}

export default Feed