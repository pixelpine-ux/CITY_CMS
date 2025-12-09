# 🔧 TROUBLESHOOTING GUIDE

Quick solutions to common issues you might encounter.

---

## 🚨 STARTUP ISSUES

### ❌ "Missing required environment variable: JWT_SECRET"
**Problem**: Backend can't start because .env is missing or incomplete

**Solution**:
```bash
cd backend
cp .env.example .env
# Edit .env and add your values
```

Make sure JWT_SECRET is at least 32 characters!

---

### ❌ "JWT_SECRET must be at least 32 characters"
**Problem**: Your JWT secret is too short

**Solution**: Update your .env file:
```bash
JWT_SECRET=your_super_secure_jwt_secret_key_min_32_chars_2024
```

---

### ❌ "MongoDB connection error"
**Problem**: MongoDB is not running

**Solution**:
```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Start MongoDB
sudo systemctl start mongod

# Or if using Docker:
docker start mongodb
```

---

## 🔐 AUTHENTICATION ISSUES

### ❌ "Access denied. No token provided"
**Problem**: Token not being sent with requests

**Solution**: This should be fixed by the API interceptor. If still happening:
1. Check that `frontend/src/services/api.js` has the interceptor code
2. Clear localStorage: `localStorage.clear()` in browser console
3. Login again

---

### ❌ "Invalid token" or "Token expired"
**Problem**: Token is expired or corrupted

**Solution**:
```javascript
// In browser console:
localStorage.clear();
// Then login again
```

---

### ❌ Login works but API calls fail with 401
**Problem**: Token not being attached to requests

**Solution**: Make sure you updated `api.js` with the interceptor code. Check that this exists:
```javascript
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }
);
```

---

## 📝 VALIDATION ISSUES

### ❌ "Password must be at least 8 characters"
**Problem**: New password requirements

**Solution**: Use a password with:
- At least 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number

Example: `Password123`

---

### ❌ "Please enter a valid email"
**Problem**: Email format not recognized

**Solution**: Use standard email format: `user@example.com`

---

### ❌ "Validation failed" with array of errors
**Problem**: Multiple validation errors

**Solution**: Check the `errors` array in the response. Each error shows:
- `field`: Which field has the error
- `message`: What's wrong

---

## 🌐 CORS ISSUES

### ❌ "CORS policy: No 'Access-Control-Allow-Origin' header"
**Problem**: Frontend URL doesn't match backend CORS config

**Solution**: Update backend .env:
```bash
FRONTEND_URL=http://localhost:5173
```

If using different port, update accordingly.

---

### ❌ Frontend can't connect to backend
**Problem**: Wrong API URL

**Solution**: Check `frontend/.env`:
```bash
VITE_API_URL=http://localhost:5000/api
```

Make sure backend is running on port 5000.

---

## 🐛 RUNTIME ERRORS

### ❌ "useAuth must be used within AuthProvider"
**Problem**: Component using useAuth outside of AuthProvider

**Solution**: Make sure `main.jsx` wraps App with AuthProvider:
```javascript
<AuthProvider>
  <App />
</AuthProvider>
```

---

### ❌ "Cannot read property 'user' of null"
**Problem**: Trying to access auth context before it's loaded

**Solution**: Check for loading state:
```javascript
const { user, loading } = useAuth();

if (loading) return <div>Loading...</div>;
```

---

### ❌ "Resource not found" (404)
**Problem**: Invalid ID or resource doesn't exist

**Solution**: 
1. Check that the ID is valid MongoDB ObjectId
2. Verify the resource exists in database
3. Check user has permission to access it

---

## 🔄 RATE LIMITING ISSUES

### ❌ "Too many login attempts"
**Problem**: Exceeded 10 login attempts in 15 minutes

**Solution**: 
- Wait 15 minutes
- Or restart the backend server (resets rate limiter)

---

### ❌ "Too many requests"
**Problem**: Exceeded 100 requests in 15 minutes

**Solution**: 
- Wait 15 minutes
- Or restart the backend server
- Or increase limit in `server.js` if legitimate use

---

## 📦 DEPENDENCY ISSUES

### ❌ "Cannot find module 'express'"
**Problem**: Dependencies not installed

**Solution**:
```bash
cd backend
npm install

cd ../frontend
npm install
```

---

### ❌ "Module not found: Can't resolve './contexts/AuthContext'"
**Problem**: Missing AuthContext.js file

**Solution**: File should exist at `frontend/src/contexts/AuthContext.js`
If missing, create it with:
```javascript
import { createContext, useContext } from 'react';

export const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

---

## 🗄️ DATABASE ISSUES

### ❌ "Duplicate field value entered"
**Problem**: Trying to create user with existing email

**Solution**: Use a different email or login with existing account

---

### ❌ "Validation Error: Path `title` is required"
**Problem**: Missing required field

**Solution**: Make sure all required fields are provided:
- Complaint: title, description, category, location
- User: name, email, password

---

### ❌ Slow queries
**Problem**: Database not using indexes

**Solution**: Indexes should be created automatically. To verify:
```javascript
// In MongoDB shell or Compass
db.complaints.getIndexes()
db.users.getIndexes()
```

Should see indexes on: citizen, status, assignedTo, category, email, role

---

## 🎨 FRONTEND ISSUES

### ❌ "Uncaught ReferenceError: process is not defined"
**Problem**: Using Node.js process in browser

**Solution**: Use `import.meta.env` instead:
```javascript
// Wrong
const apiUrl = process.env.VITE_API_URL;

// Correct
const apiUrl = import.meta.env.VITE_API_URL;
```

---

### ❌ Environment variables not working
**Problem**: Vite env vars must start with VITE_

**Solution**: In `frontend/.env`:
```bash
# Wrong
API_URL=http://localhost:5000/api

# Correct
VITE_API_URL=http://localhost:5000/api
```

Then restart frontend dev server.

---

### ❌ "Failed to fetch"
**Problem**: Backend not running or wrong URL

**Solution**:
1. Check backend is running: `curl http://localhost:5000/api`
2. Check frontend .env has correct URL
3. Check browser console for actual error

---

## 🔍 DEBUGGING TIPS

### Check Backend Logs
```bash
cd backend
npm run dev
# Watch console for request logs and errors
```

### Check Frontend Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for errors (red text)
4. Check Network tab for failed requests

### Check Database
```bash
# MongoDB shell
mongosh
use city_cms
db.users.find()
db.complaints.find()
```

### Check Token
```javascript
// In browser console
console.log(localStorage.getItem('token'));
console.log(localStorage.getItem('user'));
```

### Test API Directly
```bash
# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Password123"}'

# Test with token
curl http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 🆘 STILL STUCK?

### Checklist
- [ ] MongoDB is running
- [ ] Backend is running on port 5000
- [ ] Frontend is running on port 5173
- [ ] .env files are configured correctly
- [ ] Dependencies are installed (npm install)
- [ ] Browser console shows no errors
- [ ] Network tab shows requests succeeding

### Reset Everything
```bash
# Stop all servers
# Clear browser data
localStorage.clear()

# Backend
cd backend
rm -rf node_modules package-lock.json
npm install
npm run dev

# Frontend (new terminal)
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev

# MongoDB
mongosh
use city_cms
db.dropDatabase()
```

---

## 📊 COMMON ERROR CODES

| Code | Meaning | Common Cause |
|------|---------|--------------|
| 400 | Bad Request | Validation failed, missing fields |
| 401 | Unauthorized | No token or invalid token |
| 403 | Forbidden | Don't have permission (wrong role) |
| 404 | Not Found | Invalid ID or resource deleted |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Server Error | Backend bug, check logs |

---

## 🎯 QUICK FIXES

### Reset User Password
```javascript
// In MongoDB shell
use city_cms
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { password: "$2a$12$..." } } // Use bcrypt hash
)
```

### Make User Admin
```javascript
use city_cms
db.users.updateOne(
  { email: "user@example.com" },
  { $set: { role: "admin" } }
)
```

### Delete All Complaints
```javascript
use city_cms
db.complaints.deleteMany({})
```

### Check Server Health
```bash
curl http://localhost:5000/
# Should return: {"message":"City CMS API is running!"}
```

---

## 📞 GETTING HELP

When asking for help, provide:
1. Error message (full text)
2. What you were trying to do
3. Backend console output
4. Frontend console output
5. Your environment (OS, Node version)

```bash
# Get system info
node --version
npm --version
mongod --version
```

---

Remember: Most issues are configuration problems. Double-check your .env files! 🔍
