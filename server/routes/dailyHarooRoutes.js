const express = require('express');

const { dailyHaroo } = require('../controllers/dailyHarooController');

const router = express.Router();
router.get('/', dailyHaroo);

module.exports = router;
