const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema(
  {
    ipAddress: {
      type: String,
      required: true,
      index: true,
    },
    userAgent: {
      type: String,
      default: null,
    },
    referrer: {
      type: String,
      default: null,
    },
    country: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    device: {
      type: String,
      enum: ['mobile', 'tablet', 'desktop', 'unknown'],
      default: 'unknown',
    },
    browser: {
      type: String,
      default: null,
    },
    lastVisit: {
      type: Date,
      default: Date.now,
    },
    visitCount: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for unique visitor tracking
visitorSchema.index({ ipAddress: 1, userAgent: 1 });

module.exports = mongoose.model('Visitor', visitorSchema);
