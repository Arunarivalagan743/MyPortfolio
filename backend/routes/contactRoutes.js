import express from 'express';
import { body } from 'express-validator';
import { submitContactForm, getAllContacts } from '../controllers/contactController.js';

const router = express.Router();

router.post(
  '/contact',
  [
    body('fullName').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('reason').notEmpty().withMessage('Reason is required'),
    body('message').notEmpty().withMessage('Message is required'), // Add message validation
  ],
  submitContactForm
);

router.get('/contact', getAllContacts);

export default router;