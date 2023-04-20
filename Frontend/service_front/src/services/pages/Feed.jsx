import React from 'react'
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {selectFeedById} from "../../redux/slices/feeds";


const Feed = () => {
    const {feedId} = useParams();

    const feed = useSelector(state => selectFeedById(state, feedId))

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