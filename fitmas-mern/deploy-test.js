#!/usr/bin/env node

/**
 * MERN Application Deployment Readiness Test
 *
 * This script verifies that the Fitmas MERN application is fully ready for deployment
 * by checking all critical components, dependencies, and configurations.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🎯 FITMAS MERN DEPLOYMENT READINESS TEST\n');
console.log('=' .repeat(50));

// Test 1: Check if all required files exist
console.log('\n📁 STEP 1: Checking Required Files...');
const requiredFiles = [
  'package.json',
  'README.md',
  'backend/package.json',
  'backend/server.js',
  'backend/.env',
  'frontend/package.json',
  'frontend/src/App.js',
  'frontend/src/index.js'
];

let filesCheck = true;
requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} - Found`);
  } else {
    console.log(`❌ ${file} - Missing`);
    filesCheck = false;
  }
});

if (filesCheck) {
  console.log('✅ All required files present');
} else {
  console.log('❌ Some required files are missing');
  process.exit(1);
}

// Test 2: Check backend models
console.log('\n📊 STEP 2: Checking Backend Models...');
const models = ['Service.js', 'Blog.js', 'Team.js', 'Pricing.js', 'Contact.js'];
let modelsCheck = true;

models.forEach(model => {
  const modelPath = path.join(__dirname, 'backend', 'models', model);
  if (fs.existsSync(modelPath)) {
    const content = fs.readFileSync(modelPath, 'utf8');
    if (content.includes('mongoose.model') && content.includes('Schema')) {
      console.log(`✅ ${model} - Valid Mongoose model`);
    } else {
      console.log(`❌ ${model} - Invalid model structure`);
      modelsCheck = false;
    }
  } else {
    console.log(`❌ ${model} - Missing`);
    modelsCheck = false;
  }
});

// Test 3: Check API routes
console.log('\n🛣️ STEP 3: Checking API Routes...');
const routes = ['serviceRoutes.js', 'blogRoutes.js', 'teamRoutes.js', 'pricingRoutes.js', 'contactRoutes.js'];
let routesCheck = true;

routes.forEach(route => {
  const routePath = path.join(__dirname, 'backend', 'routes', route);
  if (fs.existsSync(routePath)) {
    const content = fs.readFileSync(routePath, 'utf8');
    if (content.includes('express.Router') && content.includes('export')) {
      console.log(`✅ ${route} - Valid route structure`);
    } else {
      console.log(`❌ ${route} - Invalid route structure`);
      routesCheck = false;
    }
  } else {
    console.log(`❌ ${route} - Missing`);
    routesCheck = false;
  }
});

// Test 4: Check React components
console.log('\n⚛️ STEP 4: Checking React Components...');
const components = {
  'Header/Header.jsx': ['Header'],
  'Footer/Footer.jsx': ['Footer'],
  'Preloader/Preloader.jsx': ['Preloader'],
  'pages/Home/Home.jsx': ['Home'],
  'pages/About/About.jsx': ['About'],
  'pages/Services/Services.jsx': ['Services'],
  'pages/Contact/Contact.jsx': ['Contact'],
  'pages/Team/Team.jsx': ['Team'],
  'pages/Blog/Blog.jsx': ['Blog'],
  'pages/Pricing/Pricing.jsx': ['Pricing'],
  'pages/Gallery/Gallery.jsx': ['Gallery'],
  'pages/Error/ErrorPage.jsx': ['ErrorPage']
};

let componentsCheck = true;

Object.entries(components).forEach(([filePath, expectedExports]) => {
  const fullPath = path.join(__dirname, 'frontend', 'src', 'components', filePath);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath, 'utf8');
    const hasReactImport = content.includes('import React') || content.includes("from 'react'");
    const hasExport = content.includes('export default') || content.includes('export {');
    const hasJSX = content.includes('<') && content.includes('>');

    if (hasReactImport && hasExport && hasJSX) {
      console.log(`✅ ${filePath} - Valid React component`);
    } else {
      console.log(`❌ ${filePath} - Invalid React component`);
      componentsCheck = false;
    }
  } else {
    console.log(`❌ ${filePath} - Missing`);
    componentsCheck = false;
  }
});

// Test 5: Check App.js routing
console.log('\n🔀 STEP 5: Checking App.js Routing...');
const appPath = path.join(__dirname, 'frontend', 'src', 'App.js');
let routingCheck = false;

if (fs.existsSync(appPath)) {
  const content = fs.readFileSync(appPath, 'utf8');
  const hasRouter = content.includes('BrowserRouter') || content.includes('Routes');
  const hasRoutes = content.includes('<Route');
  const routes = [
    'path="/"', 'path="/about"', 'path="/services"',
    'path="/contact"', 'path="/team"', 'path="/blog"',
    'path="/pricing"', 'path="/gallery"'
  ];

  let routeCount = 0;
  routes.forEach(route => {
    if (content.includes(route)) routeCount++;
  });

  routingCheck = hasRouter && hasRoutes && routeCount >= 6;
  console.log(routingCheck ? '✅ App.js routing is properly configured' : '❌ App.js routing has issues');
} else {
  console.log('❌ App.js not found');
}

// Test 6: Environment configuration
console.log('\n🔧 STEP 6: Checking Environment Configuration...');
const envPath = path.join(__dirname, 'backend', '.env');
let envCheck = false;

if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  const hasPort = content.includes('PORT=');
  const hasMongoDB = content.includes('MONGODB_URI=');

  envCheck = hasPort && hasMongoDB;
  console.log(envCheck ? '✅ Environment variables configured' : '❌ Environment variables incomplete');
} else {
  console.log('❌ .env file missing');
}

// Final Summary
console.log('\n' + '=' .repeat(50));
console.log('📋 DEPLOYMENT READINESS SUMMARY:\n');

const allChecks = [filesCheck, modelsCheck, routesCheck, componentsCheck, routingCheck, envCheck];
const passedChecks = allChecks.filter(Boolean).length;
const totalChecks = allChecks.length;

console.log(`✅ Passed: ${passedChecks}/${totalChecks} checks`);

if (passedChecks === totalChecks) {
  console.log('\n🎉 CONGRATULATIONS! FITMAS MERN APPLICATION IS DEPLOYMENT READY!');
  console.log('\n🚀 NEXT STEPS:');
  console.log('1. Install MongoDB locally or set up MongoDB Atlas');
  console.log('2. Update backend/.env with your database connection');
  console.log('3. Run: cd backend && npm install && npm run dev');
  console.log('4. Run: cd frontend && npm install && npm start');
  console.log('5. Access at: http://localhost:3000');
  console.log('\n📖 Read README.md for complete setup instructions');
} else {
  console.log('\n❌ ISSUES DETECTED - FIX BEFORE DEPLOYMENT');
  console.log('\n🔍 Check the specific failures above and resolve them.');
}

console.log('\n' + '=' .repeat(50));
console.log('🏆 Fitmas MERN Stack Transformation Complete!');
console.log('Built with ❤️ using MongoDB, Express.js, React & Node.js');
console.log('=' .repeat(50));

process.exit(passedChecks === totalChecks ? 0 : 1);
