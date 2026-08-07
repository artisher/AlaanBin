"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";


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



    useEffect(() => {

        async function getUser() {

            try {

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`,
                    {
                        credentials: "include",
                    }
                );


                if (!res.ok) {
                    throw new Error();
                }


                const data = await res.json();

                setUser(data.user);


            } catch {

                setUser(null);

            } finally {

                setLoading(false);

            }

        }


        getUser();

    }, []);



    async function logout() {

        await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
            {
                method: "POST",
                credentials: "include",
            }
        );


        setUser(null);

    }



    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
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