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
        <div className="m-3 p-3 border-4 rounded-3 feeds-frame" key={feed.id}>
            <div className="d-flex mb-3 align-items-center">
                <Link style={{width: "100px", height: "100px"}} to={`/user/${feed.author.id}`}>
                    {feed.author.url === null
                        ? <img style={{width: "100%", height: "100%", borderRadius: "100%"}}
                               src="https://i.stack.imgur.com/U9zFC.png?s=192&g=1" alt=""/>
                        : <img style={{width: "100%", height: "100%", borderRadius: "100%"}}
                               src={`http://localhost:8080/image${feed.author.url}`} alt=""/>
                    }
                </Link>
                <Link className="text-decoration-none text-dark profile-info ms-4" to={`/user/${feed.author.id}`}>
                    <h2>{feed.author.name}</h2>
                </Link>
            </div>
            <div>
                <p>{feed.body}</p>
                <Link to={`/feeds/${feed.id}`}><img src={`http://localhost:8080/image${feed.images[0].url}`}
                                                    width="100%" alt=""/></Link>
            </div>
        </div>
    )))
}

export default FeedListComponent