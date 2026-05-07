import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import AdminPage from './pages/AdminPage';
import './App.css';

function App() {
    return(
        <div className="app">
            <Navbar />
            <main className="main-content">
                <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Protected routes (authenticated users) */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                    </Route>

                    {/* Admin only routes */}
                    <Route element={<ProtectedRoute requiredRole="ROLE_ADMIN" />}>
                        <Route path="/admin" element={<AdminPage />} />
                    </Route>
                </Routes>
            </main>
        </div>
    );
}