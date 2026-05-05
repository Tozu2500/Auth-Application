import { useAuth } from "../hooks/useAuth";

const DashboardPage = () => {
    const { user } = useAuth();

    return (
        <div className="page dashboard-page">
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <p>Welcome back, {user?.firstName} {user?.lastName}!</p>
            </div>
        </div>
    );
}