import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

const app = express();

// ✅ Middleware
app.use(express.json());

// ✅ Allow all CORS preflights
app.options('*', cors());

// ✅ CORS Configuration
app.use(cors({
  origin: [
    'http://localhost:8081',
    'https://arunofficxal.vercel.app',
    'https://www.404arunfound.me',
    'https://my-portfolio-h5gc.vercel.app',
  ],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));

// ✅ Routes
app.use('/api', contactRoutes);

// ✅ Test route
app.get('/', (req, res) => {
  res.status(200).send('Contact form backend is live');
});

// ✅ Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// ✅ Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
