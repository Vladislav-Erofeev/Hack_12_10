import axios from "axios";

export async function get_all_users(token) {
    let data
    console.log("get_all_users")
    await axios.get('http://localhost:8080/person/all',
        {
            headers: {
                "access-control-allow-origin": "http://localhost:3000",
                "Authorization": `Bearer ${token}`,
            }
        }).then(res => {
        data = res.data
    }).catch(error => {
        console.error('There was an error!', error);
    });
    return data
}

export async function send_friend_request(token, userId) {
    console.log("send friend request to", userId)
    await axios.post(`http://localhost:8080/friends/send_request/${userId}`, {},
        {
            headers: {
                "access-control-allow-origin": "http://localhost:3000",
                "Authorization": `Bearer ${token}`,
            }
        }
    ).catch(error => {
        console.error('There was an error!', error);
    });
}

export async function get_friends(token) {
    let data
    console.log("get_friends")
    await axios.get('http://localhost:8080/friends',
        {
            headers: {
                "access-control-allow-origin": "http://localhost:3000",
                "Authorization": `Bearer ${token}`,
            }
        }).then(res => {
            data = res.data
        }
    );
    return data
}