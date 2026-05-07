import { useState, FormEvent } from "react";
import { useAuth } from "../hooks/useAuth";
import authService from "../services/authService";
import axios, { AxiosError } from "axios";

const ProfilePage = () => {
    const { user } = useAuth();
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handlePasswordChange = async (e: FormEvent) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setError("New password and confirm password do not match");
            return;
        }

        if (passwordForm.newPassword.length < 6) {
            setError("New password must be at least 6 characters");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await authService.changePassword(passwordForm);
            setMessage(response.message);
            setPasswordForm({
                currentPassword: '',
                newPassword: '',
                confirmPassword: '',
            });
        } catch (err) {
            const axiosError = err as AxiosError<{ message?: string }>;
            setError(
                axiosError.response?.data?.message || "Failed to change password"
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="page profile-page">
            <h1>My Profile</h1>

            <div className="profile-grid">
                <div className="profile-card">
                    <h3>Personal Information</h3>
                    <div className="info-list">
                        <div className="info-item">
                            <span className="info-label">First Name</span>
                            <span className="info-value">{user?.firstName}</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Last Name</span>
                            <span className="info-value">{user?.lastName}</span>
                        </div>
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
                                {user?.role === 'ROLE_ADMIN' ? 'Administrator' : 'User'}
                            </span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Member Since</span>
                            <span className="info-value">
                                {user?.createdAt
                                    ? new Date(user.createdAt).toLocaleDateString()
                                    : 'N/A'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="profile-card">
                    <h3>Change Password</h3>

                    {message && <div className="alert alert-success">{message}</div>}
                    {error && <div className="alert alert-error">{error}</div>}

                    <form onSubmit={handlePasswordChange}>
                        <div className="form-group">
                            <label htmlFor="currentPassword">Current Password</label>
                            <input
                                id="currentPassword"
                                type="password"
                                value={passwordForm.currentPassword}
                                onChange={(e) =>
                                    setPasswordForm((prev) => ({
                                        ...prev,
                                        currentPassword: e.target.value,
                                    }))
                                }
                                placeholder="Enter current password"
                                required
                                autoComplete="current-password"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="newPassword">New Password</label>
                            <input 
                                id="newPassword"
                                type="password"
                                value={passwordForm.newPassword}
                                onChange={(e) =>
                                    setPasswordForm((prev) => ({
                                        ...prev,
                                        newPassword: e.target.value,
                                    }))
                                }
                                placeholder="Min 6 characters"
                                required
                                minLength={6}
                                autoComplete="new-password"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmNewPassword">Confirm New Password</label>
                            <input 
                                id="confirmNewPassword"
                                type="password"
                                value={passwordForm.confirmPassword}
                                onChange={(e) =>
                                    setPasswordForm((prev) => ({
                                        ...prev,
                                        confirmPassword: e.target.value,
                                    }))
                                }
                                placeholder="Repeat new password"
                                required
                                autoComplete="new-password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-block"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Changing...' : 'Change Password'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;