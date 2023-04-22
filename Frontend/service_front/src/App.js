import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./services/pages/MainPage";
import Profile from "./services/pages/Profile";
import FeedList from "./services/pages/FeedList";
import NavBar from "./services/components/NavBar";
import Footer from "./services/components/Footer";
import People from "./services/pages/People";
import Feed from "./services/pages/Feed";
import Login from "./services/pages/Login";
import Register from "./services/pages/Register";
import PrivateRoute from "./services/pages/PrivateRoute";
import AddFeed from "./services/components/AddFeed";
import GameUI from './game/components/GameUI/GameUI';
import Friends from "./services/pages/Friends";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser} from "./redux/slices/user";
import {useEffect} from "react";
import Rating from "./services/pages/Rating";
import {getCookies, selectToken} from "./redux/slices/security";

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCookies())
    }, [])

    const token = useSelector(selectToken)

    useEffect(() => {
        if (token){
            dispatch(fetchUser(token))
        }
    }, [token])

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<><NavBar/><MainPage/><Footer/></>}/>

                <Route path='/people' element={<><NavBar/><People/><Footer/></>}/>
                <Route path='/friends' element={<><NavBar/><Friends/><Footer/></>}/>
                <Route path="/profile" element={<PrivateRoute/>}/>
                <Route path="/user/:userId" element={<><NavBar/><Profile/><Footer/></>}/>

                <Route path='/login' element={<><NavBar/><Login/></>}/>
                <Route path='/registration' element={<><NavBar/><Register/><Footer/></>}/>

                <Route path='/feeds' element={<><NavBar/><FeedList/><Footer/></>}/>
                <Route path='/feeds/:feedId' element={<><NavBar/><Feed/><Footer/></>}/>
                <Route path='/add_feed' element={<><NavBar/><AddFeed/><Footer/></>}/>

                <Route path='/rating' element={<><NavBar/><Rating/><Footer/></>}/>

                <Route path='/game' element={<GameUI/>}/>
            </Routes>

        </BrowserRouter>
    );
}

export default App;
