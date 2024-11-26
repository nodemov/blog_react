import { createContext, useEffect, useState } from 'react';

export const AppContext = createContext();

export default function AppProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null);

    async function getUser() {
        const res = await fetch('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await res.json();

        if (res.ok) {
            setUser(data);
        } else {
            localStorage.removeItem('token');
        }
    }

    useEffect(() => {
        if (token) {
            getUser()
        }
    }, [token])

    return (
        <AppContext.Provider value={{ user, token, setUser, setToken }}>
            {children}
        </AppContext.Provider>
    );
}