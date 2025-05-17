const express = require('express');

const { submitVotedData } = require('../controllers/voteOptionController');

const router = express.Router();
router.post('/submit', submitVotedData);

module.exports = router;
