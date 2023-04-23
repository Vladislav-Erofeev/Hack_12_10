import React, {useEffect, useState} from 'react'
import FeedListComponent from "../components/FeedListComponent";
import {get_feeds} from "../requests";

const FeedList = () => {

    const [feeds, setFeeds] = useState([])

    useEffect(() => {
        get_feeds().then(res => {
            setFeeds(res)
        })
    }, [])

    return (
        <div className="my-container">
            <h2 className="text-center my-3 titel_one">Новости</h2>
            <FeedListComponent feeds={feeds}/>
        </div>
    )
}

export default FeedList