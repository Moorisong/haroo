const express = require('express');

const { chatWithGPT } = require('../controllers/chatController');

const router = express.Router();
router.post('/', chatWithGPT);

module.exports = router;
