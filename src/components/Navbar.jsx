import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate); 
  };

  return (
    <div className="navbar container">
      <img src={logo} alt="fetch logo" className="fetch-logo" />
      {isAuthenticated && (
        <button className="fetch-btn" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Navbar;
