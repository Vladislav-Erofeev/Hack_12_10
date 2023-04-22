import React, {useEffect, useState} from 'react'
import FeedListComponent from "../components/FeedListComponent";
import {useSelector} from "react-redux";
import {selectToken} from "../../redux/slices/security";
import {get_feeds} from "../requests";

const FeedList = () => {
    const token = useSelector(selectToken)

    const [feeds, setFeeds] = useState([])

    useEffect(() => {
        if (token)
            get_feeds(token).then(res => {
                setFeeds(res)
            })
    }, [token])

    return (
        <div className="my-container">
            <h2 className="text-center my-3 titel_one">Новости</h2>
            <FeedListComponent feeds={feeds}/>
        </div>
    )
}

export default FeedList