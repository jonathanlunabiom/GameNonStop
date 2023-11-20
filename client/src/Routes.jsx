import { Routes, Route } from "react-router-dom";
import Layout from "./assets/components/Layout";
import Games from "./assets/components/Games";
import Cart from "./assets/components/Cart";
import Whishlist from "./assets/components/Wishlist";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Games />} />
        <Route path="cart" element={<Cart />} />
        <Route path="Wishlist" element={<Whishlist />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
