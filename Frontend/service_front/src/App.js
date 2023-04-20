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
import Cookies from "universal-cookie";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser, selectUser, selectUserStatus} from "./redux/slices/user";
import {useEffect} from "react";

function App() {

    return (
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path='/' element={<MainPage/>}/>
                <Route path='/people' element={<People/>}/>
                <Route path="/user/:userId" element={<Profile/>}/>
                <Route path='/feeds' element={<FeedList/>}/>
                <Route path='/feeds/:feedId' element={<Feed/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/registration' element={<Register/>}/>
                <Route path="/profile" element={<PrivateRoute/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
