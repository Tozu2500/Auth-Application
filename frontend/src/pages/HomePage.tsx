import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const HomePage = () => {
    const { isAuthenticated } = useAuth();

    return (
        <div className="page home-page">
            <div className="hero">
                <h1>Welcome to AuthApp</h1>
                <p className="hero-subtitle">
                    A full-stack authentication application system built with Spring Boot, React + TS and
                    MySQL.
                </p>
                <div className="hero-features">
                    <div className="feature-card">
                        <h3>Secure Authentication</h3>
                        <p>JWT-Based authentication with access and refresh tokens</p>
                    </div>
                    <div className="feature-card">
                        <h3>Role-Based Access</h3>
                        <p>User and Admin roles with protected routes and endpoints</p>
                    </div>
                    <div className="feature-card">
                        <h3>Password Security</h3>
                        <p>BCrypt password hashing with change password functionality</p>
                    </div>
                    <div className="feature-card">
                        <h3>Modern Stack</h3>
                        <p>Spring Boot 3 + React 18 + TypeScript + MySQL</p>
                    </div>
                </div>
                <div className="hero-actions">
                    {isAuthenticated ? (
                        <Link to="/dashboard" className="btn btn-primary btn-lg">
                            Go to Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link to="/register" className="btn btn-primary btn-lg">
                                Get Started
                            </Link>
                            <Link to="/login" className="btn btn-secondary btn-lg">
                                Sign In
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;