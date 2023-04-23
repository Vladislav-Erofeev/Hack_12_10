import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./services/pages/MainPage";
import Profile from "./services/pages/Profile";
import FeedList from "./services/pages/FeedList";
import People from "./services/pages/People";
import Feed from "./services/pages/Feed";
import Login from "./services/pages/Login";
import Register from "./services/pages/Register";
import PrivateRoute from "./services/pages/PrivateRoute";
import AddFeed from "./services/pages/AddFeed";
import GameUI from './game/components/GameUI/GameUI';
import Friends from "./services/pages/Friends";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser} from "./redux/slices/user";
import {useEffect, useState} from "react";
import Rating from "./services/pages/Rating";
import {getCookies, selectToken} from "./redux/slices/security";
import WrapComponent from "./services/components/WrapComponent";


function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCookies())
    }, [])

    const token = useSelector(selectToken)

    useEffect(() => {
        if (token) {
            dispatch(fetchUser(token))
        }
    }, [token])

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<WrapComponent><MainPage/></WrapComponent>}/>

                <Route path='/people' element={<WrapComponent><People/></WrapComponent>}/>
                <Route path='/friends' element={<WrapComponent><Friends/></WrapComponent>}/>
                <Route path="/profile" element={<PrivateRoute/>}/>
                <Route path="/user/:userId" element={<WrapComponent><Profile/></WrapComponent>}/>

                <Route path='/login' element={<WrapComponent><Login/></WrapComponent>}/>
                <Route path='/registration' element={<WrapComponent><Register/></WrapComponent>}/>

                <Route path='/feeds' element={<WrapComponent><FeedList/></WrapComponent>}/>
                <Route path='/feeds/:feedId' element={<WrapComponent><Feed/></WrapComponent>}/>
                <Route path='/add_feed' element={<WrapComponent><AddFeed/></WrapComponent>}/>

                <Route path='/rating' element={<WrapComponent><Rating/></WrapComponent>}/>

                <Route path='/game' element={<GameUI/>}/>
            </Routes>

        </BrowserRouter>
    );
}

export default App;
