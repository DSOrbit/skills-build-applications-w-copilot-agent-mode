import mongoose from 'mongoose';

export const databaseName = 'octofit_db';
export const mongoUri = process.env.MONGODB_URI ?? `mongodb://127.0.0.1:27017/${databaseName}`;

export async function connectDatabase() {
  await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 1000 });
}

export async function disconnectDatabase() {
  await mongoose.connection.close();
}