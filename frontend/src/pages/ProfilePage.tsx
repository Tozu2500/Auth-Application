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

                
            </div>
        </div>
    );
}