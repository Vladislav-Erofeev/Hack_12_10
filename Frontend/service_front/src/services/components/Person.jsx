import {Link} from "react-router-dom";
import React from "react";
import {url} from "../requests"
import "./Person.css"

function Person({user}) {
    return (
        <div className="d-flex align-items-center" key={user.id}>
            <Link className="person-img" to={`/user/${user.id}`}>
                <img className="profile-img"
                     src={user.url === null
                         ? "https://i.stack.imgur.com/U9zFC.png?s=192&g=1"
                         : `${url}/image${user.url}`
                     } alt=""/>
            </Link>
            <Link className="profile-info ms-3 text-decoration-none text-dark" to={`/user/${user.id}`}>
                <h2 className="user-text m-0">{user.name}</h2>
            </Link>
        </div>
    )
}

export default Person