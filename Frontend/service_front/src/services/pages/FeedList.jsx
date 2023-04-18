import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {/*fetchFeeds,*/ selectAllFeeds} from "../../redux/slices/feeds";
import {Button} from "reactstrap";
import FeedListComponent from "./FeedListComponent";

const FeedList = () => {
    // const dispatch = useDispatch()

    const feeds = useSelector(selectAllFeeds)

    // const feedsStatus = useSelector(state => state.feeds.status)

    // useEffect(() => {
    //     if (feedsStatus === 'idle') {
    //         dispatch(fetchFeeds())
    //     }
    // }, [feedsStatus, dispatch])


    return (
        <div className="my-container">
            <h2 className="text-center my-3">Новости</h2>
            <FeedListComponent feeds={feeds}/>
        </div>
    )
}

export default FeedList