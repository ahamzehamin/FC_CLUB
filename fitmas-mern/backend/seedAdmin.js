const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Seed admin user
const seedAdmin = async () => {
  try {
    console.log('🌱 Seeding admin user...');

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ role: 'admin' });

    if (existingAdmin) {
      console.log('✅ Admin user already exists!');
      console.log('Username: admin');
      console.log('Email: admin@fitmas.com');
      return;
    }

    // Create admin user
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@fitmas.com',
      password: 'admin123', // This will be hashed by the pre-save middleware
      role: 'admin',
      profile: {
        firstName: 'Fitmas',
        lastName: 'Admin'
      },
      permissions: {
        canCreate: true,
        canEdit: true,
        canDelete: true,
        canPublish: true
      }
    });

    console.log('✅ Admin user created successfully!');
    console.log('Username: admin');
    console.log('Email: admin@fitmas.com');
    console.log('Password: admin123');
    console.log('⚠️  Please change the password after first login!');

  } catch (error) {
    console.error('❌ Error seeding admin user:', error);
  }
};

// Run seeder
const runSeeder = async () => {
  await connectDB();
  await seedAdmin();

  console.log('🎉 Seeding completed!');
  process.exit(0);
};

// Handle errors
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err.message);
  process.exit(1);
});

process.on('SIGINT', () => {
  console.log('👋 Shutting down gracefully...');
  process.exit(0);
});

// Run the seeder
runSeeder();
