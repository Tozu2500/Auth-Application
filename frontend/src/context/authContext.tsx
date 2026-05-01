import {
    createContext,
    useState,
    useEffect,
    ReactNode,
    useCallback,
} from "react";
import { User, LoginRequest, RegisterRequest, AuthResponse } from "../types/index.ts";
import authService from "../services/authService";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (data: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => void;
    updateUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleAuthResponse = (response: AuthResponse) => {
        localStorage.setItem("accessToken", response.accessToken);
        localStorage.setItem("refreshToken", response.refreshToken);
        localStorage.setItem("user", JSON.stringify(response.user));
        setUser(response.user);
    };

    const logout = useCallback(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
        setUser(null);
    }, []);

    useEffect(() => {
        const initAuth = async () => {
            const storedUser = localStorage.getItem("user");
            const accessToken = localStorage.getItem("accessToken");

            if (storedUser && accessToken) {
                try {
                    const currentUser = await authService.getCurrentUser();
                    setUser(currentUser);
                    localStorage.setItem("user", JSON.stringify(currentUser));
                } catch {
                    logout();
                }
            }
            setIsLoading(false);
        };

        initAuth();
    }, [logout]);

    const login = async (data: LoginRequest) => {
        const response = await authService.login(data);
        handleAuthResponse(response);
    };

    const register = async (data: RegisterRequest) => {
        const response = await authService.register(data);
        handleAuthResponse(response);
    };

    const updateUser = (updatedUser: User) => {
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                isLoading,
                login,
                register,
                logout,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};