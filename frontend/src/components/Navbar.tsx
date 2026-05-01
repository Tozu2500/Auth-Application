import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">AuthApp</Link>
            </div>
            <div className="navbar-links">
                {isAuthenticated ? (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/profile">Profile</Link>
                        {user?.role === 'ROLE_ADMIN' && (
                            <Link to="/admin">Admin Panel</Link>
                        )}
                        <span className="navbar-user">
                            Hello, <strong>{user?.firstName}</strong>
                        </span>
                        <button className="btn btn-logout" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;