const express = require('express');
const router = express.Router();
const Shipment = require('../models/Shipment');

router.post('/', async (req, res) => {
    try {
        const trackingId = 'SH-' + Math.floor(1000 + Math.random() * 9000);
        const shipment = await Shipment.create({
            ...req.body,
            trackingId,
            status: 'Pending'
        });
        res.json(shipment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/track/:id', async (req, res) => {
    try {
        const shipment = await Shipment.findOne({
            where: { trackingId: req.params.id }
        });
        if (!shipment) return res.status(404).json({ error: 'Shipment not found' });
        res.json(shipment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const shipments = await Shipment.findAll();
        res.json(shipments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
