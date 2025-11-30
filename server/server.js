const express = require('express');
const mongoose = require('mongoose');
const { connectDB } = require('./config/database');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables explicitly from server/.env
dotenv.config({ path: path.join(__dirname, '.env') });

// Import routes AFTER env is loaded (env needed by services)
const contactRoutes = require('./routes/contactRoutes');

const app = express();

// Serve static files from public directory
app.use('/public', express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
const frontendOriginEnv = process.env.FRONTEND_ORIGIN || 'http://localhost:5173,http://localhost:8080,https://arunoff774.vercel.app';
const allowedOrigins = frontendOriginEnv.split(',').map(origin => origin.trim().replace(/\/$/, ''));

console.log('🌐 Allowed CORS origins:', allowedOrigins);
console.log('🔑 Environment:', process.env.NODE_ENV);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      console.log('✅ CORS: No origin header (mobile/curl)');
      return callback(null, true);
    }
    
    // Remove trailing slash from origin for comparison
    const normalizedOrigin = origin.replace(/\/$/, '');
    
    if (allowedOrigins.indexOf(normalizedOrigin) === -1) {
      console.log('❌ CORS blocked origin:', origin);
      console.log('📋 Allowed origins:', allowedOrigins);
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    
    console.log('✅ CORS allowed origin:', origin);
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// MongoDB Connection
// Initiate (or reuse) connection early but allow cold start retry
connectDB().catch(err => {
  console.error('❌ Initial MongoDB connect attempt failed:', err.message);
});

// Routes
app.use('/api/contact', contactRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: `${process.env.APP_NAME} - Backend API`,
    status: 'Running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// In traditional hosting we listen; in Vercel serverless we just export the app.
const isServerless = !!process.env.VERCEL; // Vercel sets VERCEL=1
const PORT = process.env.PORT || 4000;
if (!isServerless) {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📧 Email notifications enabled for ${process.env.ADMIN_EMAIL}`);
  });
} else {
  console.log('🌀 Running in serverless (Vercel) mode – no explicit listen.');
}

module.exports = app;
