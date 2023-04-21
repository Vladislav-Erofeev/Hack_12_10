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
import {useDispatch} from "react-redux";
import Cookies from "universal-cookie";
import {fetchUser} from "./redux/slices/user";
import {useEffect} from "react";
import * as PropTypes from "prop-types";



Routes.propTypes = {children: PropTypes.node};

function App() {
    const dispatch = useDispatch()

    const cookies = new Cookies()

    const token = cookies.get('token')

    useEffect(() => {
        dispatch(fetchUser(token))
    }, [])
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<><NavBar/><MainPage/></>}/>

                <Route path='/people' element={<><NavBar/><People/></>}/>
                <Route path='/friends' element={<><NavBar/><Friends/></>}/>
                <Route path="/profile" element={<PrivateRoute/>}/>
                <Route path="/user/:userId" element={<><NavBar/><Profile/></>}/>

                <Route path='/login' element={<><NavBar/><Login/></>}/>
                <Route path='/registration' element={<><NavBar/><Register/></>}/>

                <Route path='/feeds' element={<><NavBar/><FeedList/></>}/>
                <Route path='/feeds/:feedId' element={<><NavBar/><Feed/></>}/>
                <Route path='/add_feed' element={<><NavBar/><AddFeed/></>}/>

                <Route path='/game' element={<GameUI/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
