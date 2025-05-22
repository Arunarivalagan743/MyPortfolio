import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    enum: ['Work', 'Collaboration', 'Hiring', 'Other'],
    default: 'Work',
  },
  userMessage: {  // Changed from message to userMessage
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Contact', contactSchema);