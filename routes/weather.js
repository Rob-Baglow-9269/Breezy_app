const express = require('express');
const router = express.Router();
const { getWeather } = require('../controllers/weatherController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, getWeather); // Protect the route with middleware

module.exports = router;
