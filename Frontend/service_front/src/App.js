import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./services/pages/MainPage";
import Profile from "./services/pages/Profile";
import FeedList from "./services/pages/FeedList";
import NavBar from "./services/components/NavBar";
import Footer from "./services/components/Footer";
import People from "./services/pages/People";
import Feed from "./services/pages/Feed";


function App() {
    return (
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path='/' element={<MainPage/>}/>
                <Route path='/people' element={<People/>}/>
                <Route path="/profile/:userId" element={<Profile/>}/>
                <Route path='/feeds' element={<FeedList/>}/>
                <Route path='/feeds/:feedId' element={<Feed/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
