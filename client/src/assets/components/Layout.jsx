import Header from "./Header.jsx";
import Routes from "../../Routes.jsx";
import Footer from "./Footer.jsx";

const Layout = () => {
    return (
        <div>
            <Header />
            <div className="content">
                <Routes />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;