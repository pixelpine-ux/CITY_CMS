// Test login functionality
const axios = require('axios');

async function testLogin() {
  try {
    console.log('Testing admin login...');
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'admin@city.gov',
      password: 'admin123'
    });
    
    console.log('✅ Login successful!');
    console.log('User:', response.data.user);
    console.log('Token:', response.data.token.substring(0, 20) + '...');
  } catch (error) {
    console.error('❌ Login failed:', error.response?.data || error.message);
  }
}

testLogin();