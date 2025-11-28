export const mockDrivers = [
    { id: 1, name: 'John Doe', license: 'DL12345', status: 'Available', phone: '555-0101' },
    { id: 2, name: 'Jane Smith', license: 'DL67890', status: 'On Route', phone: '555-0102' },
    { id: 3, name: 'Mike Johnson', license: 'DL54321', status: 'Available', phone: '555-0103' },
];

export const mockVehicles = [
    { id: 1, name: 'Volvo FH16', type: 'Truck', number: 'TRK-001', capacity: '20000kg', status: 'Available' },
    { id: 2, name: 'Scania R-series', type: 'Truck', number: 'TRK-002', capacity: '18000kg', status: 'In Use' },
    { id: 3, name: 'Mercedes Sprinter', type: 'Van', number: 'VAN-001', capacity: '3500kg', status: 'Available' },
];

export const mockShipments = [
    { id: 'SH-1001', customer: 'Acme Corp', origin: 'New York, NY', destination: 'Boston, MA', status: 'Pending', date: '2023-11-28' },
    { id: 'SH-1002', customer: 'Globex', origin: 'Chicago, IL', destination: 'Detroit, MI', status: 'In Transit', date: '2023-11-27' },
];

export const mockUser = {
    email: 'user@example.com',
    name: 'Admin User',
    role: 'admin'
};
