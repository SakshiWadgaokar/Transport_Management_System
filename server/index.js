const express = require('express');
const cors = require('cors');
const sequelize = require('./database');
const User = require('./models/User');
const Driver = require('./models/Driver');
const Vehicle = require('./models/Vehicle');
const Shipment = require('./models/Shipment');

const authRoutes = require('./routes/auth');
const driverRoutes = require('./routes/drivers');
const vehicleRoutes = require('./routes/vehicles');
const bookingRoutes = require('./routes/bookings');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/bookings', bookingRoutes);

// Database Sync and Server Start
sequelize.sync({ force: false }).then(async () => {
    console.log('Database connected and synced');

    // Seed initial data if empty
    const driverCount = await Driver.count();
    if (driverCount === 0) {
        await Driver.bulkCreate([
            { name: 'John Doe', license: 'DL12345', status: 'Available', phone: '555-0101' },
            { name: 'Jane Smith', license: 'DL67890', status: 'On Route', phone: '555-0102' }
        ]);
        await Vehicle.bulkCreate([
            { name: 'Volvo FH16', type: 'Truck', number: 'TRK-001', capacity: '20000kg', status: 'Available' },
            { name: 'Mercedes Sprinter', type: 'Van', number: 'VAN-001', capacity: '3500kg', status: 'Available' }
        ]);
        console.log('Initial data seeded');
    }

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Database connection failed:', err);
});
