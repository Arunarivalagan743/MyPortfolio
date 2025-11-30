const express = require('express');
const router = express.Router();
const {
  submitContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
  getContactStats
} = require('../controllers/contactController');

// Public routes
router.post('/', submitContact);

// Admin routes (add authentication middleware here if needed)
router.get('/', getAllContacts);
router.get('/stats', getContactStats);
router.get('/:id', getContactById);
router.patch('/:id', updateContactStatus);
router.delete('/:id', deleteContact);

module.exports = router;
