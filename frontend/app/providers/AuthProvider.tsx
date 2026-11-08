
"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from "react";
import toast from "react-hot-toast";

type User = {
    id: string;
    fullName: string;
    email: string;
    role: string;
    hasActiveSubscription: boolean;
};

type AuthContextType = {
    user: User | null;
    loading: boolean;
    refreshUser: () => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = useCallback(async () => {
        try {
            const res = await fetch(
                `${ API_URL } /api/auth / me`,
                {
                    credentials: "include",
                    cache: "no-store",
                }
            );

            if (res.status === 401) {
                setUser(null);
                return;
            }

            if (!res.ok) {
                console.error(
                    "خطا در دریافت اطلاعات کاربر:",
                    res.status
                );
                return;
            }

            const data = await res.json();

            if (!data.isAuthenticated || !data.user) {
                setUser(null);
                return;
            }

            setUser(data.user);

        } catch (error) {
            console.error(
                "خطا در ارتباط با سرور:",
                error
            );
        }
    }, []);

    useEffect(() => {
        async function initialize() {
            try {
                await refreshUser();
            } finally {
                setLoading(false);
            }
        }

        initialize();
    }, [refreshUser]);

    const logout = useCallback(async () => {
        try {
            const res = await fetch(
                `${ API_URL } /api/auth / logout`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );

            if (!res.ok) {
                throw new Error("خطا در خروج از حساب");
            }

            setUser(null);

            toast.success("با موفقیت از حساب خارج شدید.");

        } catch (error) {
            console.error("LOGOUT ERROR:", error);
            throw error;
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                refreshUser,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}
