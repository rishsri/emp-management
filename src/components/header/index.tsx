import {
  Link,
} from "react-router-dom";
import { LogOut, Users } from "lucide-react";
import "./style.css";
import { urls } from "../../URLs/urls";
import { useAuthContext } from "../../context/AuthContext";
const Header = () => {
  const { isAuthenticated,logout } = useAuthContext();

  return (
    <nav className="nav">
      <div className="nav-container">
        <Link to={urls.HOMEPAGE} className="nav-brand">
          <Users className="h-6 w-6" />
          <span>Customer Portal</span>
        </Link>

        <div className="nav-links">

          {isAuthenticated ? (
            <>
              <Link to={urls.EMPLOYEE} className="nav-link">
                Employees
              </Link>
              <button onClick={logout}  className="nav-link logout">
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to={urls.LOGIN} className="nav-link">
                Login
              </Link>
              <Link to={urls.SIGNUP} className="btn btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
