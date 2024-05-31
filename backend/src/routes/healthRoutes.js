const express = require('express');
const { checkDatabaseConnection } = require('../controllers/healthController');
const router = express.Router();

router.get('/health', checkDatabaseConnection);

module.exports = router;
