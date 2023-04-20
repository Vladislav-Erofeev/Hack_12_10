import React from 'react'
import {Link} from "react-router-dom";

const FeedListComponent = ({feeds}) => {

    if (!feeds.length) {
        return (
            <div className="my-container text-center">
                <h2>Здесь пока ничего нет!</h2>
            </div>
        )
    }



    return (feeds.map(feed => (
        <div style={{border: "#604636 solid"}} className="m-3 p-3 border-4 rounded-3" key={feed.id}>
            <div className="d-flex mb-3 align-items-center">
                <Link to={`/profile/${feed.author.id}`}>
                    <div style={{width: "50px", height: "50px"}}>
                        <img style={{width: "100%", height: "100%", borderRadius: "100%"}} src={`http://localhost:8080${feed.author.url}`} alt=""/>
                    </div>
                </Link>
                <div className="profile-info ms-4">
                    <Link className="text-decoration-none text-dark" to={`/profile/${feed.author.id}`}><h2
                        className="m-0">{feed.author.name}</h2></Link>
                </div>
            </div>
            <div>
                <p>{feed.body}</p>
                <Link to={`/feeds/${feed.id}`}><img src={`http://localhost:8080${feed.images[0].url}`} width="100%" alt=""/></Link>
            </div>
        </div>
    )))
}

export default FeedListComponent