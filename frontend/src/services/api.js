import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // As per the backend .env.example
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
