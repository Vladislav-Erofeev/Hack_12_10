import React, {useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import Cookies from "universal-cookie";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser, selectUser, selectUserStatus} from "../../redux/slices/user";
import {Spin} from "../components/Spin";

const PrivateRoute = () => {
    const cookies = new Cookies();
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const userStatus = useSelector(selectUserStatus)
    const token = cookies.get('token')
    useEffect(() => {
        if (userStatus === 'idle' && token) {
            dispatch(fetchUser(token))
        }
    }, [userStatus, dispatch])

    let content

    if (userStatus === "loading") {
        content = <Spin text="Loading..."></Spin>
    } else if (userStatus === "succeeded") {
        // user is not authenticated
        content = <Navigate to={`/user/${user.id}`}/>;
    } else {
        content = <Navigate to="/login"/>;
    }

    return content
}

export default PrivateRoute