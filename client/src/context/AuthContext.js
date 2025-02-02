import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = () => {
            try {
                const token = localStorage.getItem('token');
                const userType = localStorage.getItem('userType');
                if (token && userType) {
                    setUser({ token, userType });
                }
            } catch (error) {
                console.error('Error initializing auth:', error);
                // Clear potentially corrupted auth data
                localStorage.removeItem('token');
                localStorage.removeItem('userType');
            } finally {
                setLoading(false);
            }
        };

        initAuth();

        // Cleanup function
        return () => {
            setUser(null);
            setLoading(true);
        };
    }, []);

    const login = (userData) => {
        try {
            setUser(userData);
        } catch (error) {
            console.error('Error during login:', error);
            logout();
        }
    };

    const logout = () => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('userType');
            setUser(null);
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
