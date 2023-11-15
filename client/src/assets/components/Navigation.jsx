import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul className="list-unstyled d-flex justify-content-end">
        <li className="me-3">
          <NavLink to="/games" className="text-light text-decoration-none">Games</NavLink>
        </li>
        <li className="me-3">
          <NavLink to="/cart" className="text-light text-decoration-none">My Cart</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;