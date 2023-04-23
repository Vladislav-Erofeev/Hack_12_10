import React, {useEffect, useState} from 'react'
import UserList from "../components/UserList";
import {get_all_users, send_friend_request} from "../requests";
import {useBeforeUnload, useLocation} from "react-router-dom";

function People() {

    const [audio] = useState(new Audio("master_of_puppets.mp3"))
    const [playing, setPlaying] = useState(true)

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    }, [playing])

    const toggle = () => setPlaying(!playing);

    const location = useLocation();
    useEffect(() => {
        console.log(location.pathname)
        if (location.pathname !== "/people")
            audio.pause();
    }, [location])

    useEffect(() => {
        return () => audio.pause()
    }, [])



    return (
        <div className="my-container">
            <h1 className="my-3 titel_one">Люди</h1>
            <UserList
                getUsers={get_all_users}
                actionToUser1={send_friend_request}
                nameAction1={"Добавить"}
            />
        </div>
    )
}

export default People