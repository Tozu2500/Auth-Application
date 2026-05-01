export interface User {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    enabled: boolean;
    createdAt: string;
    lastLoginAt: string | null;
}

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    tokenType: string;
    user: User;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface MessageResponse {
    message: string;
    success: boolean;
    timestamp: string;
}