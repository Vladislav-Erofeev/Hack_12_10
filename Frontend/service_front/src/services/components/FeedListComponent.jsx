import React from 'react'
import {Link} from "react-router-dom";
import "./FeedListComponent.css"
import {url} from "../requests";

const FeedListComponent = ({feeds}) => {

    if (!feeds.length) {
        return (
            <div className="my-container text-center">
                <h2>Здесь пока ничего нет!</h2>
            </div>
        )
    }

    return (feeds.map(feed => (
        <div className="m-3 p-3 border-4 rounded-3 feeds-frame" key={feed.id}>
            <div className="user">
                <Link style={{width: "50px", height: "50px"}} to={`/user/${feed.author.id}`}>
                    <img className="user-img"
                         src={feed.author.url === null
                             ? "https://i.stack.imgur.com/U9zFC.png?s=192&g=1"
                             : `${url}/image${feed.author.url}`
                         } alt=""/>
                </Link>
                <Link className="text-decoration-none text-dark profile-info ms-4" to={`/user/${feed.author.id}`}>
                    <h2 className="user-text">{feed.author.name}</h2>
                </Link>
            </div>
            <div>
                <p className="user-descr">{feed.body}</p>
                <Link to={`/feeds/${feed.id}`} className="user-descr-img"><img
                    src={`${url}/image${feed.images[0].url}`}
                    width="100%" alt=""/></Link>
            </div>
        </div>
    )))
}

export default FeedListComponent