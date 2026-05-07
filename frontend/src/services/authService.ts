import api from "../api/axios";

import {
    AuthResponse,
    ChangePasswordRequest,
    LoginRequest,
    MessageResponse,
    RegisterRequest,
    User,
} from "../types/index.ts";

const authService = {
    async login(data: LoginRequest): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>("/auth/login", data);
        return response.data;
    },

    async register(data: RegisterRequest): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>("/auth/register", data);
        return response.data;
    },

    async refreshToken(refreshToken: string): Promise<AuthResponse> {
        const response = await api.post<AuthResponse>("/auth/refresh-token", {
            refreshToken,
        });
        return response.data;
    },

    async getCurrentUser(): Promise<User> {
        const response = await api.get<User>("/users/me");
        return response.data;
    },

    async changePassword(data: ChangePasswordRequest): Promise<MessageResponse> {
        const response = await api.put<MessageResponse>(
            "/users/change-password",
            data
        );
        return response.data;
    },

    async getAllUsers(): Promise<User[]> {
        const response = await api.get<User[]>("/admin/users");
        return response.data;
    },

    async toggleUserEnabled(userId: number): Promise<User> {
        const response = await api.put<User>(
            `admin/users/${userId}/toggle-enabled`
        );
        return response.data;
    },

    async toggleUserLock(userId: number): Promise<User> {
        const response = await api.put<User>(`/admin/users/${userId}/toggle-lock`);
        return response.data;
    },

    async changeUserRole(userId: number, role: string): Promise<User> {
        const response = await api.put<User>(
            `/admin/users/${userId}/role?role=${role}`
        );
        return response.data;
    },

    async deleteUser(userId: number): Promise<MessageResponse> {
        const response = await api.delete<MessageResponse>(
            `/admin/users/${userId}`
        );
        return response.data;
    },
};

export default authService;