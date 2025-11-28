const API_URL = 'http://localhost:3000/api';

export const getDrivers = async () => {
    const response = await fetch(`${API_URL}/drivers`);
    if (!response.ok) throw new Error('Failed to fetch drivers');
    return response.json();
};

export const getVehicles = async () => {
    const response = await fetch(`${API_URL}/vehicles`);
    if (!response.ok) throw new Error('Failed to fetch vehicles');
    return response.json();
};
