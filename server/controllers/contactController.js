const { sendAdminNotification, sendUserConfirmation } = require('../services/emailService');
const Contact = require('../models/Contact');

/**
 * Handle contact form submission
 */
const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email address',
      });
    }

    const contactData = { 
      name, 
      email, 
      subject, 
      message,
      ipAddress: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      userAgent: req.headers['user-agent'],
    };

    // Save to database (non-blocking)
    let savedContact = null;
    try {
      savedContact = await Contact.create(contactData);
      console.log('✅ Contact saved to database:', savedContact._id);
    } catch (dbError) {
      console.error('⚠️  Database save failed:', dbError.message);
      // Continue even if DB save fails
    }

    // Send emails
    await Promise.all([
      sendAdminNotification(contactData),
      sendUserConfirmation(contactData),
    ]);

    res.status(200).json({
      success: true,
      message: 'Message sent successfully! We will get back to you soon.',
      contactId: savedContact?._id,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

module.exports = {
  submitContact,
};
