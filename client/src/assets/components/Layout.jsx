// Layout.jsx
import { Outlet } from "react-router-dom";
import Header from './Header';

const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet /> {/* Componentes de ruta hijos se renderizarán aquí */}
    </div>
  );
};

export default Layout;
