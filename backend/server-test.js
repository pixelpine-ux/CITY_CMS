const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Basic Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'City CMS API is running!', status: 'OK' });
});

// Mock auth routes for testing
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  
  // Mock successful registration
  res.status(201).json({
    message: 'User registered successfully',
    user: { id: '123', name, email, role: 'citizen' },
    token: 'mock-jwt-token'
  });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  
  // Mock successful login
  res.json({
    message: 'Login successful',
    user: { id: '123', name: 'Test User', email, role: 'citizen' },
    token: 'mock-jwt-token'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Test server running on port ${PORT}`);
});