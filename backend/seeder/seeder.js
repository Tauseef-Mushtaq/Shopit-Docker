import mongoose from 'mongoose';
import dotenv from 'dotenv';
import products from './data.js';
import Product from '../models/product.js';
import User from '../models/user.js';

// Load environment variables
dotenv.config({ path: '../config/config.env' });

const seedProducts = async () => {
  try {
    const mongoUri = process.env.DB_LOCAL_URI;
    console.log('Connecting to:', mongoUri);
    await mongoose.connect(mongoUri);
    
    // Delete existing products and users
    await Product.deleteMany();
    await User.deleteMany();
    console.log('Products and Users are deleted');
    
    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@shopit.com',
      password: 'Admin123',
      role: 'admin',
    });
    console.log('Admin user created:', adminUser._id);
    
    // Add user field to all products
    const productsWithUser = products.map((product) => ({
      ...product,
      user: adminUser._id,
    }));
    
    await Product.insertMany(productsWithUser);
    console.log('Products are added');
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

seedProducts();
