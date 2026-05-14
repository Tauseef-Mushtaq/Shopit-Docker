import mongoose from 'mongoose';

export const connectDatabase = () => {
  let DB_URI = '';
  const env = process.env.NODE_ENV?.toUpperCase();
  if (env === 'DEVELOPMENT') {
    DB_URI = process.env.DB_LOCAL_URI;
  }
  if (env === 'PRODUCTION') {
    DB_URI = process.env.DB_URI;
  }
  if (!DB_URI) {
    console.error('No DB_URI configured for NODE_ENV:', process.env.NODE_ENV);
    process.exit(1);
  }
  mongoose.connect(DB_URI).then((con) => {
    console.log(
      `MongoDB Database connected with HOST: ${con?.connection?.host}`
    );
  });
};
