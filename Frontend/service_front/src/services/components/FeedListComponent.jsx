import React from 'react'
import {Link} from "react-router-dom";

const FeedListComponent = ({feeds}) => {

    if (!feeds.length) {
        return (
            <div className="my-container text-center">
                <h2>Здесь пока ничего нет!</h2>
            </div>
        )
    }

    return (feeds.map(feed => (
        <div className="m-3 p-3 border-4 rounded-3 feeds-frame" key={feed.id}>
            <div className="user">
                <Link /*style={{width: "100px", height: "100px"}}*/ to={`/user/${feed.author.id}`}>
                    {feed.author.url === null
                        ? <img className="user-img"
                               // style={{width: "100%", height: "100%", borderRadius: "100%"}}
                               src="https://i.stack.imgur.com/U9zFC.png?s=192&g=1" alt=""/>
                        : <img className="user-img"
                            // style={{width: "100%", height: "100%", borderRadius: "100%"}}
                               src={`http://localhost:8080/image${feed.author.url}`} alt=""/>
                    }
                </Link>
                <Link className="text-decoration-none text-dark profile-info ms-4" to={`/user/${feed.author.id}`}>
                    <h2 className="user-text">{feed.author.name} User228</h2>
                </Link>
            </div>
            <div>
                <p className="user-descr">{feed.body}Это бесплатно. Просто создайте аккаунт и начните играть — никаких подписок и платежей. Новые друзья. Находите интересных вам игроков и добавляйте их в друзья. Делитесь своими достижениями и следите за интересующими вас игроками. Играйте где угодноВы можете играть на любом устройстве..</p>
                <Link to={`/feeds/${feed.id}`} className="user-descr-img"><img src={`http://localhost:8080/image${feed.images[0].url}`}
                                                    width="100%" alt=""/></Link>
            </div>
        </div>
    )))
}

export default FeedListComponent