import React, {useState} from 'react'
import {Button} from "reactstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import {add_feed, add_feed_image, url} from "../requests";

const AddFeedPage = () => {

    const cookies = new Cookies();
    const token = cookies.get('token')
    const [file, setFile] = useState(null)
    const [feed, setFeed] = useState({
        body: ""
    })

    const addFeed = async () => {
        const res = await add_feed(token, feed)
        console.log(res)
        if (file) {
            const formData = new FormData()
            formData.append('file', file)
            await add_feed_image(token, res, formData)
        }
    }

    return (
        <div style={{margin: "0 auto", maxWidth: "500px"}}>
            <h1>Добавление поста</h1>
            <form>
                <h2>Текст поста</h2>
                <input className="d-block" type="text" required onChange={(event) => {
                    setFeed({body: event.target.value})
                }}/>
                <h2>Фотографии поста</h2>
                <input className="d-block" type="file" required onChange={(event) => {
                    setFile(event.target.files[0])
                }}/>
                <Button onClick={(event) => {
                    event.preventDefault()
                    addFeed()
                }}>добавить</Button>
            </form>
        </div>
    )
}

export default AddFeedPage