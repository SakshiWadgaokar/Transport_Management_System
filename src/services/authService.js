const API_URL = 'http://localhost:3000/api/auth';

export const login = async (email) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });

    if (!response.ok) {
        throw new Error('Login failed');
    }

    const user = await response.json();
    localStorage.setItem('user', JSON.stringify(user));
    return user;
};

export const logout = () => {
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};
