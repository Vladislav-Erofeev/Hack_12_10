import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";
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
    })

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
                <div style={{width:"100px", height:"100px"}}>
                    <img style={{width: "100%", height: "100%", borderRadius: "100%"}} src="mpi.jpg" alt=""/>
                </div>
                <div className="profile-info ms-5">
                    <h1>{feed.author.name}</h1>
                </div>
            </div>
            <div>
                <p>{feed.body}</p>
            </div>
        </div>
    )
}

export default Feed