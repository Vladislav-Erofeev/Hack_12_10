import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./services/pages/MainPage";
import Profile from "./services/pages/Profile";
import Feed from "./services/pages/Feed";
import NavBar from "./services/components/NavBar";
import Footer from "./services/components/Footer";


function App() {
    return (
        <>
            <NavBar/>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<MainPage/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='/feed' element={<Feed/>}/>
                </Routes>
            </BrowserRouter>
            <Footer/>
        </>
    );
}

export default App;
