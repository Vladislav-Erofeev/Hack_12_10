import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {/*fetchUsers,*/ selectAllUsers} from "../../redux/slices/users";
import {Button} from "reactstrap";

const People = () => {
    // const dispatch = useDispatch()

    const users = useSelector(selectAllUsers)

    // const usersStatus = useSelector(state => state.users.status)

    // useEffect(() => {
    //     if (usersStatus === 'idle') {
    //         dispatch(fetchUsers())
    //     }
    // }, [usersStatus, dispatch])

    const renderedUsers = users.map(user => (
        <div className="d-flex my-4 align-items-center" key={user.id}>
            <Link to={`/profile/${user.id}`}>
                <div style={{width: "50px", height: "50px"}}>
                    <img style={{width: "100%", height: "100%", borderRadius: "100%"}} src="mpi.jpg" alt=""/>
                </div>
            </Link>
            <div className="profile-info ms-5">
                <Link className="text-decoration-none text-dark" to={`/profile/${user.id}`}><h2 className="m-0">{user.username}</h2></Link>
            </div>
            <Button className="my-btn ms-auto fs-5">удалить из друзей</Button>
        </div>
    ))

    return (
        <div className="my-container">
            <h2 className="my-3">Друзья</h2>
            {renderedUsers}
        </div>
    )
}

export default People