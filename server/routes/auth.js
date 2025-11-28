const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/login', async (req, res) => {
    try {
        const { email } = req.body;
        // In a real app, verify password here
        const user = await User.findOne({ where: { email } });

        if (!user) {
            // Auto-register for demo purposes if user doesn't exist
            const newUser = await User.create({
                email,
                name: 'Demo User',
                password: 'password123', // In real app, hash this
                role: 'admin'
            });
            return res.json(newUser);
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
