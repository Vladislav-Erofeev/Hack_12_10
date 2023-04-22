import {Link} from "react-router-dom";
import React from "react";

function Person({user}) {
    return (
        <div className="d-flex align-items-center" key={user.id}>
            <Link style={{width: "100px", height: "100px"}} to={`/user/${user.id}`}>
                <img className="profile-img"
                     src={user.url === null
                         ? "https://i.stack.imgur.com/U9zFC.png?s=192&g=1"
                         : `http://localhost:8080/image${user.url}`
                     } alt=""/>
            </Link>
            <Link className="profile-info ms-5 text-decoration-none text-dark" to={`/user/${user.id}`}>
                <h2 className="m-0 fs-1">{user.name}</h2>
            </Link>
        </div>
    )
}

export default Person