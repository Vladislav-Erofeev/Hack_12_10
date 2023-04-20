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
import GameUI from './game/components/GameUI/GameUI';


function App() {
    return (
        <BrowserRouter>
            <Routes>
                
                <Route path='/' element={<><NavBar/><MainPage/></>}/>
                <Route path='/people' element={<><NavBar/><People/></>}/>
                <Route path="/profile/:userId" element={<><NavBar/><Profile/></>}/>
                <Route path='/feeds' element={<><NavBar/><FeedList/></>}/>
                <Route path='/feeds/:feedId' element={<><NavBar/><Feed/></>}/>
                <Route path='/login' element={<><NavBar/><Login/></>}/>
                <Route path='/registration' element={<><NavBar/><Register/></>}/>
                <Route path='/game' element={<GameUI/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
