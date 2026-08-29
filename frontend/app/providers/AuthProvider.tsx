"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
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

export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    async function refreshUser() {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
                {
                    credentials: "include",
                }
            );

            if (!res.ok) {
                setUser(null);
                return;
            }

            const data = await res.json();

            setUser(data.user ?? null);

        } catch {
            setUser(null);
        }
    }

    useEffect(() => {
        async function getInitialUser() {
            try {
                await refreshUser();
            } finally {
                setLoading(false);
            }
        }

        getInitialUser();
    }, []);

    async function logout() {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
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

            toast.error(
                error instanceof Error
                    ? error.message
                    : "خروج از حساب با خطا مواجه شد."
            );
        }
    }
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