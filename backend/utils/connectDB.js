// import dotenv from 'dotenv';
// import mongoose from 'mongoose';

// dotenv.config();

// export const connectDB = async () => {
//     try {
//         const con = await mongoose.connect(process.env.MONGO_URI)
//         console.log(`MongoDB Connected: ${con.connection.host}`);
//     } catch (error) {
//         console.log(error);
//     }
// }
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGO_URI;

if (!MONGODB_URI) {
  throw new Error('❌ Please define the MONGO_URI environment variable');
}

// --- Global connection caching for serverless environments like Vercel ---
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectDB = async () => {
  if (cached.conn) {
    // ✅ Already connected
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000, // 10s timeout
      connectTimeoutMS: 10000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB connected successfully');
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }

  return cached.conn;
};
