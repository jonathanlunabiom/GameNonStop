import { Routes, Route } from "react-router-dom";
import Layout from "./assets/components/Layout";
import Games from "./assets/components/Games";
import Cart from "./assets/components/Cart";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Games />} />
        <Route path="cart" element={<Cart />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
