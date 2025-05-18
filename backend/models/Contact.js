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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Contact', contactSchema);
