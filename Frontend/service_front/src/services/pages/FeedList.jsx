import React, {useEffect, useState} from 'react'
import FeedListComponent from "../components/FeedListComponent";
import Cookies from "universal-cookie";
import axios from "axios";

const FeedList = () => {

    const cookies = new Cookies();

    const token = cookies.get('token')

    const [feeds, setFeeds] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8080/feed',
            {
                headers: {
                    "access-control-allow-origin": "http://localhost:3000",
                    "Authorization": `Bearer ${token}`,
                }
            }).then(res => {
                setFeeds(res.data)
            }
        );
    }, [])

    return (
        <div className="my-container">
            <h2 className="text-center my-3">Новости</h2>
            <FeedListComponent feeds={feeds}/>
        </div>
    )
}

export default FeedList