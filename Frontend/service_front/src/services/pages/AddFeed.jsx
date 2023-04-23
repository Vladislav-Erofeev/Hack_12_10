import React, {useState} from 'react'
import {Button} from "reactstrap";
import Cookies from "universal-cookie";
import {add_feed, add_feed_image, url} from "../requests";
import "./Register.css"

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
        <div className="my-container">
            <h1 className="titel_one my-3">Добавление поста</h1>
            <form>
                <label>
                    <p>Текст поста</p>
                    <input type="text" required onChange={(event) => {
                        setFeed({body: event.target.value})
                    }}/>
                </label>
                <label>
                    <p>Фотографии поста</p>
                    <input type="file" required onChange={(event) => {
                        setFile(event.target.files[0])
                    }}/>
                </label>
                <Button className="my-btn fsss my-2" onClick={(event) => {
                    event.preventDefault()
                    addFeed()
                }}>добавить</Button>
            </form>
        </div>
    )
}

export default AddFeedPage