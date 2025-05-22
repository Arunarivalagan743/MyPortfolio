import { validationResult } from 'express-validator';
import Contact from '../models/Contact.js';
import sendEmail from '../utils/sendEmail.js';

export const submitContactForm = async (req, res) => {
  // Enhanced validation error logging
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Log entire request body for debugging
    console.log('Full request body:', JSON.stringify(req.body));
    
    const { fullName, email, reason, message } = req.body;
    
    // Log extracted fields to verify message is present
    console.log('Extracted fields:', { fullName, email, reason, message });
    
    if (!message) {
      console.warn('Warning: message field is empty or undefined');
    }
    
    // Create contact document with explicit assignment
const newContact = new Contact({ 
  fullName, 
  email, 
  reason, 
  userMessage: message // Use a different field name in the model
});
    
    console.log('Contact document before save:', JSON.stringify(newContact.toObject(), null, 2));
    
    // Save to database
    const savedContact = await newContact.save();
    console.log('Saved contact:', JSON.stringify(savedContact.toObject(), null, 2));

    // Email templates with message included
    const adminEmailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Reason:</strong> ${reason}</p>
      <p><strong>Message:</strong> ${message || '[No message provided]'}</p>
    `;

    const userEmailHtml = `
      <h2>Thank You for Contacting Us, ${fullName}!</h2>
      <p>We received your message regarding: <strong>${reason}</strong></p>
      <p>Your message: "${message ? message.substring(0, 100) + (message.length > 100 ? '...' : '') : '[No message provided]'}"</p>
      <p>Our team will get back to you shortly.</p>
    `;

    // Send email to admin
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: 'New Contact Form Submission',
      html: adminEmailHtml,
    });

    // Send confirmation email to user
    await sendEmail({
      to: email,
      subject: 'Thank you for contacting us!',
      html: userEmailHtml,
    });

    // Return saved data in response for frontend debugging
    res.status(201).json({ 
      message: 'Message sent and emails delivered.',
      savedData: savedContact // Return the saved data in response
    });
    
  } catch (err) {
    // Enhanced error logging
    console.error('Error in submitContactForm:', err);
    
    // Provide more specific error info for debugging
    if (err.name === 'ValidationError') {
      console.error('Mongoose validation error:', err.errors);
      return res.status(400).json({ 
        message: 'Validation error', 
        details: err.errors 
      });
    }
    
    res.status(500).json({ 
      message: 'Server error', 
      error: err.message 
    });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (err) {
    console.error('Error in getAllContacts:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
