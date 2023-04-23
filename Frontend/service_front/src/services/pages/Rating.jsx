import {get_top_ten, get_user_rating} from "../requests";
import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {selectUser} from "../../redux/slices/user";
import Person from "../components/Person";
import {selectToken} from "../../redux/slices/security";

const Rating = () => {

    const token = useSelector(selectToken)

    const user = useSelector(selectUser)

    const [rating, setRating] = useState(0)

    const [users, setUsers] = useState([])

    useEffect(() => {
        get_top_ten().then(res => {
            setUsers(res)
        })
    }, [])

    useEffect(() => {
        if (user)
            get_user_rating(user.id).then(res => {
                setRating(res)
            })
    }, [user])

    return (
        <div className="my-container">
            <h1 className="my-3">Рейтинг</h1>
            {users
                ?
                users.map((user, index) => (
                    <div className="d-flex p-3 align-items-center"
                         style={{backgroundColor: rating === index + 1 ? '#fcc45c' : 'none'}} key={user.id}>
                        <h2 style={{width: "50px"}}>{index + 1}</h2>
                        <Person user={user}/>
                    </div>
                ))
                :
                <h3>Мы никого не нашли %(</h3>
            }
            {rating < 10
                ? <></>
                :
                <>
                    <h1 className="text-center">...</h1>
                    <h2>{rating}</h2>
                    <Person user={user}/>
                </>
            }

        </div>
    )
}

export default Rating