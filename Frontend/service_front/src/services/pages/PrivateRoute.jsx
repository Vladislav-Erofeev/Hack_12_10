import React, {useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {fetchUser, selectUser, selectUserStatus} from "../../redux/slices/user";
import {Spin} from "../components/Spin";
import {selectToken} from "../../redux/slices/security";

const PrivateRoute = () => {
    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const userStatus = useSelector(selectUserStatus)
    const token = useSelector(selectToken)
    useEffect(() => {
        if (token) {
            dispatch(fetchUser(token))
        }
    }, [userStatus])

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