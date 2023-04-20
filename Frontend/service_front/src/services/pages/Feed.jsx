import React, {useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom";
import Cookies from "universal-cookie";
import axios from "axios";


const Feed = () => {
    const {feedId} = useParams();

    const cookies = new Cookies();

    const token = cookies.get('token')

    const [feed, setFeed] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:8080/feed/${feedId}`,
            {
                headers: {
                    "access-control-allow-origin": "http://localhost:3000",
                    "Authorization": `Bearer ${token}`,
                }
            }).then(res => {
                setFeed(res.data)
            }
        );
    }, [])

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
                <Link style={{width: "100px", height: "100px"}} to={`/user/${feed.author.id}`}>
                    {feed.author.url === null
                        ? <img style={{width: "100%", height: "100%", borderRadius: "100%"}}
                               src="https://i.stack.imgur.com/U9zFC.png?s=192&g=1" alt=""/>
                        : <img style={{width: "100%", height: "100%", borderRadius: "100%"}}
                               src={`http://localhost:8080/image${feed.author.url}`} alt=""/>
                    }
                </Link>
                <Link className="profile-info ms-5 text-decoration-none text-dark" to={`/user/${feed.author.id}`}>
                    <h1>{feed.author.name}</h1>
                </Link>
            </div>
            <div>
                <p>{feed.body}</p>
            </div>
        </div>
    )
}

export default Feed