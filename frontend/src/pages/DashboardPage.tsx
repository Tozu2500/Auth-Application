import { useAuth } from "../hooks/useAuth";

const DashboardPage = () => {
    const { user } = useAuth();

    return (
        <div className="page dashboard-page">
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <p>Welcome back, {user?.firstName} {user?.lastName}!</p>
            </div>

            <div className="dashboard-grid">
                <div className="dashboard-card">
                    <h3>Account Info</h3>
                    <div className="info-list">
                        <div className="info-item">
                            <span className="info-label">Username</span>
                            <span className="info-value">{user?.username}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Email</span>
                            <span className="info-value">{user?.email}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Role</span>
                            <span className={`badge ${user?.role === 'ROLE_ADMIN' ? 'badge-admin' : 'badge-user'}`}>
                                {user?.role === 'ROLE_ADMIN' ? 'Admin' : 'User'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="dashboard-card">
                    <h3>Account Status</h3>
                    <div className="info-list">
                        <div className="info-item">
                            <span className="info-label">Status</span>
                            <span className={`badge ${user?.enabled ? 'badge-active' : 'badge-inactive'}`}>
                                {user?.enabled ? 'Active' : 'Disabled'}
                            </span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Member Since</span>
                            <span className="info-value">
                                {user?.createdAt
                                    ? new Date(user.createdAt).toLocaleDateString('en-US', {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })
                                : 'N/A'}
                            </span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Last Login</span>
                            <span className="info-value">
                                {user?.lastLoginAt
                                    ? new Date(user.lastLoginAt).toLocaleString()
                                    : 'First Login'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="dashboard-card full-width">
                    <h3>Quick Actions</h3>
                    <div className="quick-actions">
                        <a href="/profile" className="action-btn">
                            Edit Profile
                        </a>
                        {user?.role === 'ROLE_ADMIN' && (
                            <a href="/admin" className="action-btn">
                                Manage Users
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;