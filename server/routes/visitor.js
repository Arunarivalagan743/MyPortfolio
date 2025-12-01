const express = require('express');
const router = express.Router();
const { trackVisitor, getStats } = require('../controllers/visitorController');

// POST /api/visitor/track - Track a visitor
router.post('/track', trackVisitor);

// GET /api/visitor/stats - Get visitor statistics
router.get('/stats', getStats);

module.exports = router;
