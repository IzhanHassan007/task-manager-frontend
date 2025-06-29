import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FiHome, FiUserPlus, FiLogIn, FiLogOut, FiGrid, FiPlusSquare } from "react-icons/fi";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">
          <FiHome className="nav-icon" /> Home
        </Link>
        {!user && (
          <>
            <Link to="/register">
              <FiUserPlus className="nav-icon" /> Register
            </Link>
            <Link to="/login">
              <FiLogIn className="nav-icon" /> Login
            </Link>
          </>
        )}
        {user && (
          <>
            <Link to="/dashboard">
              <FiGrid className="nav-icon" /> Dashboard
            </Link>
            <Link to="/add-task">
              <FiPlusSquare className="nav-icon" /> Add Task
            </Link>
            <button onClick={handleLogout}>
              <FiLogOut className="nav-icon" /> Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
