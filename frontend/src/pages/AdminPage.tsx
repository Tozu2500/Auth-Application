import { useState, useEffect } from 'react';
import { User } from '../types';
import authService from '../services/authService';
import LoadingSpinner from '../components/LoadingSpinner';

const AdminPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [actionMessage, setActionMessage] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await authService.getAllUsers();
            setUsers(data);
        } catch {
            setError('Failed to load users');
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleEnabled = async (userId: number) => {
        try {
            const updated = await authService.toggleUserEnabled(userId);
            setUsers((prev) =>
                prev.map((u) => (u.id === userId ? updated : u))
            );
            setActionMessage(
                `User ${updated.username} has been ${updated.enabled ? 'enabled' : 'disabled'}`
            );
        } catch {
            setError('Failed to toggle user status');
        }
    };

    const handleToggleLock = async (userId: number) => {
        try {
            const updated = await authService.toggleUserLock(userId);
            setUsers((prev) =>
                prev.map((u) => (u.id === userId ? updated : u))
            );
            setActionMessage(`User ${updated.username} lock status updated`);
        } catch {
            setError('Failed to toggle user lock');
        }
    };

    const handleChangeRole = async (userId: number, currentRole: string) => {
        const newRole = currentRole === 'ROLE_ADMIN' ? 'ROLE_USER' : 'ROLE_ADMIN';
        try {
            const updated = await authService.changeUserRole(userId, newRole);
            setUsers((prev) =>
                prev.map((u) => (u.id === userId ? updated : u))
            );
            setActionMessage(
                `User ${updated.username} role changed to ${updated.role === 'ROLE_ADMIN' ? 'Admin' : 'User'}`
            );
        } catch {
            setError('Failed to change user role');
        }
    };

    const handleDeleteUser = async (userId: number, username: string) => {
        if (!window.confirm(`Are you sure you want to delete user "${username}"?`)) {
            return;
        }
        try {
            await authService.deleteUser(userId);
            setUsers((prev) => prev.filter((u) => u.id !== userId));
            setActionMessage(`User ${username} has been deleted`);
        } catch {
            setError('Failed to delete user');
        }
    };

    if (isLoading) return <LoadingSpinner />;

    return (
        <div className="page admin-page">
            <div className="admin-header">
                <h1>Admin Panel</h1>
                <p>Manage all registered users</p>
            </div>

            {actionMessage && (
                <div className="alert alert-success">
                    {actionMessage}
                    <button
                        className="alert-close"
                        onClick={() => setActionMessage('')}
                    >
                        ×
                    </button>
                </div>
            )}
            {error && (
                <div className="alert alert-error">
                    {error}
                    <button className="alert-close" onClick={() => setError('')}>
                        ×
                    </button>
                </div>
            )}

            <div className="table-container">
                <table className="users-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td><strong>{user.username}</strong></td>
                                <td>{user.email}</td>
                                <td>
                                    {user.firstName} {user.lastName}
                                </td>
                                <td>
                                    <span
                                        className={`badge ${user.role === 'ROLE_ADMIN' ? 'badge-admin' : 'badge-user'}`}
                                    >
                                        {user.role === 'ROLE_ADMIN' ? 'Admin' : 'User'}
                                    </span>
                                </td>
                                <td>
                                    <span
                                        className={`badge ${user.enabled ? 'badge-active' : 'badge-inactive'}`}
                                    >
                                        {user.enabled ? 'Active' : 'Disabled'}
                                    </span>
                                </td>
                                <td>
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td className="actions-cell">
                                    <button
                                        className="btn btn-sm btn-secondary"
                                        onClick={() => handleToggleEnabled(user.id)}
                                        title={user.enabled ? 'Disable user' : 'Enable user'}
                                    >
                                        {user.enabled ? 'Disable' : 'Enable'}
                                    </button>
                                    <button
                                        className="btn btn-sm btn-secondary"
                                        onClick={() => handleToggleLock(user.id)}
                                        title="Toggle lock"
                                    >
                                        Lock/Unlock
                                    </button>
                                    <button
                                        className="btn btn-sm btn-secondary"
                                        onClick={() => handleChangeRole(user.id, user.role)}
                                        title="Toggle role"
                                    >
                                        {user.role === 'ROLE_ADMIN' ? 'Demote' : 'Promote'}
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDeleteUser(user.id, user.username)}
                                        title="Delete user"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="admin-stats">
                <div className="stat-card">
                    <h4>Total Users</h4>
                    <span className="stat-number">{users.length}</span>
                </div>
                <div className="stat-card">
                    <h4>Admins</h4>
                    <span className="stat-number">
                        {users.filter((u) => u.role === 'ROLE_ADMIN').length}
                    </span>
                </div>
                <div className="stat-card">
                    <h4>Active</h4>
                    <span className="stat-number">
                        {users.filter((u) => u.enabled).length}
                    </span>
                </div>
                <div className="stat-card">
                    <h4>Disabled</h4>
                    <span className="stat-number">
                        {users.filter((u) => !u.enabled).length}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
