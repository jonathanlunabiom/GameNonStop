import Navigation from "./Navigation.jsx";

const Header = () => {
    return (
      <header className="bg-dark text-light py-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>GameNonStop</h1>
            </div>
            <div className="col text-end">
              <Navigation />
            </div>
          </div>
        </div>
      </header>
    );
  };
  
  export default Header;