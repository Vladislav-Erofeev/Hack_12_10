import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPage from "./services/pages/MainPage";
import Profile from "./services/pages/Profile";
import Feed from "./services/pages/Feed";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainPage/>}/>
                <Route path='/profile' element={<Profile/>}/>
                <Route path='/feed' element={<Feed/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
