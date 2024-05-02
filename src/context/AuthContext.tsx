"use client";

import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext({
    user: "",
    loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem("username")) setUser(localStorage.getItem("username")!);
        setLoading(false);
    }, []);

    const contextValue = {
        user,
        loading
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {!loading ? children : null}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);