import {
    createContext,
    useState,
    useEffect,
    ReactNode,
    useCallback,
} from "react";
import { User, LoginRequest, RegisterRequest, AuthResponse } from "../types";
import authService from "../services/authService";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (data: LoginRequest) => Promise<void>;
}