const express = require('express');

const { initHaroo } = require('../controllers/harooController');

const router = express.Router();
router.post('/', initHaroo);

module.exports = router;
