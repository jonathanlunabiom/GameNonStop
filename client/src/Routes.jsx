import { Route, Routes as AppRoutes, Navigate } from "react-router-dom";
import Games from "./assets/components/Games.jsx";
import Cart from "./assets/components/Cart.jsx";

const DefaultRoute = () => {
    return <Navigate to="/games" />;
}

const Routes = () => {
    return (
        <AppRoutes>
            <Route path="/" element={<DefaultRoute />} />
            <Route path="/games" element={<Games />} />
            <Route path="/cart" element={<Cart />} />
        </AppRoutes>
    );
};

export default Routes;