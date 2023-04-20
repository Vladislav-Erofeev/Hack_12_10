import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {fetchFeeds, selectAllFeeds} from "../../redux/slices/feeds";
import FeedListComponent from "../components/FeedListComponent";
import Cookies from "universal-cookie";

const FeedList = () => {
    const dispatch = useDispatch()

    const cookies = new Cookies();

    const feeds = useSelector(selectAllFeeds)

    const feedsStatus = useSelector(state => state.feeds.status)

    useEffect(() => {
        if (feedsStatus === 'idle') {
            dispatch(fetchFeeds(cookies.get('token')))
        }
    }, [feedsStatus, dispatch])

    console.log(feedsStatus)

    return (
        <div className="my-container">
            <h2 className="text-center my-3">Новости</h2>
            <FeedListComponent feeds={feeds}/>
        </div>
    )

}

export default FeedList