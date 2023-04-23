import NavBar from "./NavBar";
import Footer from "./Footer";

function WrapComponent({children}) {
    return (
        <div className='megaconteiner'>
            <NavBar/>
            <div className="wrap-container">
                {children}
            </div>
            <Footer/>
        </div>
    )
}

export default WrapComponent