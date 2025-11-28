const express = require('express');
const router = express.Router();
const Vehicle = require('../models/Vehicle');

router.get('/', async (req, res) => {
    try {
        const vehicles = await Vehicle.findAll();
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const vehicle = await Vehicle.create(req.body);
        res.json(vehicle);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
