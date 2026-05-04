import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AxiosError } from "axios";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [serverError, setServerError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (formData.username.length < 3) {
            newErrors.username = "Username must be at least 3 characters";
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        
        if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (!formData.firstName.trim()) {
            newErrors.firstName = "First name is required";
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = "Last name is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setServerError("");

        if (!validate()) return;

        try {
            await register({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                firstName: formData.firstName,
                lastName: formData.lastName,
            });
            navigate("/dashboard");
        } catch (err) {
            const axiosError = err as AxiosError<Record<string, string> & {message?: string } >;
            
            if (axiosError.response?.data?.message) {
                setServerError(axiosError.response.data.message);
            } else if (axiosError.response?.data) {
                setErrors(axiosError.response.data as Record<string, string>);
            } else {
                setServerError("Registration failed, please try again!");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="page auth-page">
            <div className="auth-card auth-card-wide">
                <h2>Create Account</h2>
                <p className="auth-subtitle">Join us! Fill in your details down below!</p>

                {serverError && <div className="alert alert-error">{serverError}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                id="firstName"
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="John"
                                required
                            />
                            {errors.firstName && (
                                <span className="field-error">{errors.firstName}</span>
                            )}
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input 
                                id="lastName"
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Doe"
                                required
                            />
                            {errors.lastName && (
                                <span className="field-error">{errors.lastName}</span>
                            )}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input 
                            id="username"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="johndoe"
                            required
                            minLength={3}
                            autoComplete="username"
                        />
                        {errors.username && (
                            <span className="field-error">{errors.username}</span>
                        )}
                    </div>

                    <div className="form-group">
                        /* Line 150 */
                    </div>
                </form>
            </div>
        </div>
    );

}