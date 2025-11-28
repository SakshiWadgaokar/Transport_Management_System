const express = require('express');
const router = express.Router();
const Driver = require('../models/Driver');

router.get('/', async (req, res) => {
    try {
        const drivers = await Driver.findAll();
        res.json(drivers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const driver = await Driver.create(req.body);
        res.json(driver);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
