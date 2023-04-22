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
                <Route path='/' element={<div className='megaconteiner'><NavBar/><MainPage style={{color: 'red'}}/><Footer/></div>}/>

                <Route path='/people' element={<div className='megaconteiner'><NavBar/><People/><Footer/></div>}/>
                <Route path='/friends' element={<div className='megaconteiner'><NavBar/><Friends/><Footer/></div>}/>
                <Route path="/profile" element={<PrivateRoute/>}/>
                <Route path="/user/:userId" element={<div className='megaconteiner'><NavBar/><Profile/><Footer/></div>}/>

                <Route path='/login' element={<div className='megaconteiner'><NavBar/><Login/></div>}/>
                <Route path='/registration' element={<div className='megaconteiner'><NavBar/><Register/><Footer/></div>}/>

                <Route path='/feeds' element={<div className='megaconteiner'><NavBar/><FeedList/><Footer/></div>}/>
                <Route path='/feeds/:feedId' element={<div className='megaconteiner'><NavBar/><Feed/><Footer/></div>}/>
                <Route path='/add_feed' element={<div className='megaconteiner'><NavBar/><AddFeed/><Footer/></div>}/>

                <Route path='/rating' element={<div className='megaconteiner'><NavBar/><Rating/><Footer/></div>}/>

                <Route path='/game' element={<GameUI/>}/>
            </Routes>

        </BrowserRouter>
    );
}

export default App;
