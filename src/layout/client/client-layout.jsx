import './style.css'
import { Outlet } from "react-router-dom";
import Header from "../../component/ui/Header";
import Footer from "../../component/ui/Footer";

const ClientLayout = () => {
    return(
        <div className='body'>
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    )
}

export default ClientLayout;