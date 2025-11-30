const mongoose = require('mongoose');

// Global cached promise for serverless reuse
let cached = global.__MONGO_CONN__;
if (!cached) {
  cached = { promise: null, conn: null };
  global.__MONGO_CONN__ = cached;
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error('MONGODB_URI not set');
    cached.promise = mongoose
      .connect(uri, { dbName: process.env.MONGODB_DB })
      .then((mongooseInstance) => {
        console.log(`✅ MongoDB connected: ${mongooseInstance.connection.host}/${mongooseInstance.connection.name}`);
        cached.conn = mongooseInstance;
        return mongooseInstance;
      })
      .catch((err) => {
        console.error('❌ MongoDB connection error:', err.message);
        cached.promise = null; // allow retry on next invocation
        throw err;
      });
  }
  return cached.promise;
}

module.exports = { connectDB };
