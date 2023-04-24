import axios from "axios";

export const url = "http://194.58.119.86:8080"

export async function login(info) {
    let data
    await axios.post(`${url}/login`, info).then(res => {
        data = res.data.token
    })
    return data
}

export async function get_feed(feedId) {
    let data
    await axios.get(`${url}/feed/${feedId}`).then(res => {
        data = res.data
    })
    return data
}

export async function get_feeds() {
    let data
    await axios.get(`${url}/feed`).then(res => {
        data = res.data
    })
    return data
}

export async function add_feed(token, feed) {
    let data
    await axios.post(`${url}/feed/add`, feed, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    }).then(res => data = res.data)
    return data
}

export async function delete_feed(token, feedId) {
    await axios.delete(`${url}/feed/delete/${feedId}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
}

export async function add_feed_image(token, feedId, formData) {
    await axios.post(`${url}/feed_image/add/${feedId}`, formData, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    }).catch(error => {
        console.error('There was an error!', error);
    })
}


export async function get_all_users() {
    let data
    console.log("get_all_users")
    await axios.get(`${url}/person/all`).then(res => {
        data = res.data
    }).catch(error => {
        console.error('There was an error!', error);
    })
    return data
}

export async function send_friend_request(token, userId) {
    console.log("send friend request to", userId)
    await axios.post(`${url}/friends/send_request/${userId}`, {}, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    }).catch(error => {
        console.error('There was an error!', error);
    });
}

export async function get_friends(token) {
    let data
    await axios.get(`${url}/friends`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    }).then(res => {
        data = res.data
    })
    return data
}

export async function delete_friend(token, userId) {
    await axios.delete(`${url}/friends/delete/${userId}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
}

export async function get_sent_friend_requests(token) {
    let data
    await axios.get(`${url}/friends/sent_requests`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    }).then(res => {
        data = res.data
    })
    return data
}

export async function get_received_friend_requests(token) {
    let data
    await axios.get(`${url}/friends/received_requests`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    }).then(res => {
        data = res.data
    });
    return data
}

export async function accept_friend_request(token, userId) {
    let data
    await axios.post(`${url}/friends/friend_request/${userId}`, {}, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    }).then(res => {
        data = res.data
    });
    return data
}

export async function deny_friend_request(token, userId) {
    await axios.delete(`${url}/friends/friend_request/${userId}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
}

export async function cancel_friend_request(token, userId) {
    await axios.delete(`${url}/friends/cancel_request/${userId}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    })
}

export async function get_top_ten() {
    let data
    await axios.get(`${url}/person/getTopTen`).then(res => {
        data = res.data
    });
    return data
}


export async function get_user(userId) {
    let data
    await axios.get(`${url}/person/${userId}`).then(res => {
        data = res.data
    });
    return data
}

export async function get_user_feeds(userId) {
    let data
    await axios.get(`${url}/feed/person/${userId}`).then(res => {
        data = res.data
    });
    return data
}

export async function get_user_rating(userId) {
    let data
    await axios.get(`${url}/person/getRatingPosition/${userId}`).then(res => {
        data = res.data
    })
    return data
}



