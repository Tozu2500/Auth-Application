import { useState, FormEvent } from "react";
import { useAuth } from "../hooks/useAuth";
import authService from "../services/authService";
import { AxiosError } from "axios";

const ProfilePage = () => {
    const { user } = useAuth();
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    
}