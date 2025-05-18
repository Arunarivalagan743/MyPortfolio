import { validationResult } from 'express-validator';
import Contact from '../models/Contact.js';
import sendEmail from '../utils/sendEmail.js';

export const submitContactForm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const { fullName, email, reason } = req.body;

    const newContact = new Contact({ fullName, email, reason });
    await newContact.save();

    const adminEmailHtml = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Reason:</strong> ${reason}</p>
    `;

    const userEmailHtml = `
      <h2>Thank You for Contacting Us, ${fullName}!</h2>
      <p>We received your message regarding: <strong>${reason}</strong></p>
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

    res.status(201).json({ message: 'Message sent and emails delivered.' });
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};
