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
                    
                </div>
            </div>
        </div>
    );
}