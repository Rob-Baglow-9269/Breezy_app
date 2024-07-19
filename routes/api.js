const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// Example route
router.get('/data', apiController.getData);

module.exports = router;
