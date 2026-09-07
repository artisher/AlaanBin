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
        console.log("🔵 refreshUser START");

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
                {
                    credentials: "include",
                }
            );

            console.log("🟡 /me STATUS:", res.status);

            if (!res.ok) {
                console.log("🔴 /me FAILED → setUser(null)");
                setUser(null);
                return;
            }

            const data = await res.json();

            console.log("🟢 /me USER:", data.user);

            setUser(data.user ?? null);

        } catch (error) {
            console.log("🔴 refreshUser ERROR:", error);
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
            console.log("1 - logout شروع شد");
            console.log("🔴 LOGOUT START");

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );

            console.log("2 - response:", res.status);
            console.log("3 - response ok:", res.ok);

            const data = await res.json();

            console.log("4 - response data:", data);

            if (!res.ok) {
                throw new Error(
                    data?.message || "خطا در خروج از حساب"
                );
            }
            console.log("🔴 LOGOUT → setUser(null)");
            setUser(null);

            console.log("5 - USER CLEARED");

            toast.success("با موفقیت از حساب خارج شدید.");

        } catch (error) {
            console.error("6 - LOGOUT ERROR:", error);

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