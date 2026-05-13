import dotenv from 'dotenv';

dotenv.config();

if (!process.env.PORT) {
  console.error('Error: PORT is not defined in the environment variables.');
  process.exit(1);
}

if (!process.env.MONGO_URI) {
  console.error('Error: MONGO_URI is not defined in the environment variables.');
  process.exit(1);
}
if (!process.env.JWT_SECRET) {
  console.error('Error: JWT_SECRET is not defined in the environment variables.');
  process.exit(1);
}
if (!process.env.GOOGLE_CLIENT_ID) {
  console.error('Error: GOOGLE_CLIENT_ID is not defined in the environment variables.');
  process.exit(1);
}
if (!process.env.GOOGLE_CLIENT_SECRET) {
  console.error('Error: GOOGLE_CLIENT_SECRET is not defined in the environment variables.');
  process.exit(1);
}
if (!process.env.CLOUDINARY_CLOUD_NAME) {
  console.error('Error: CLOUDINARY_CLOUD_NAME is not defined in the environment variables.');
  process.exit(1);
}
if (!process.env.CLOUDINARY_API_KEY) {
  console.error('Error: CLOUDINARY_API_KEY is not defined in the environment variables.');
  process.exit(1);
}
if (!process.env.CLOUDINARY_API_SECRET) {
  console.error('Error: CLOUDINARY_API_SECRET is not defined in the environment variables.');
  process.exit(1);
}


export const config = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI,
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET: process.env.JWT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};
