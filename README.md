# City Complaint Management System (CMS)

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6+-green.svg)](https://mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A professional full-stack MERN application implementing enterprise-grade complaint management with comprehensive role-based access control and security features.

## 🔄 Getting Started for Group Members

### 1. Fork & Clone the Repository

**Step 1: Fork the Repository**
1. Go to the GitHub repository page
2. Click the "Fork" button in the top-right corner
3. Select your GitHub account to create a fork

**Step 2: Clone Your Fork**
```bash
# Clone your forked repository
git clone https://github.com/YOUR_USERNAME/CITY_CMS.git
cd CITY_CMS

# Add the original repository as upstream (for syncing)
git remote add upstream https://github.com/ORIGINAL_OWNER/CITY_CMS.git
```

**Step 3: Keep Your Fork Updated**
```bash
# Fetch latest changes from original repository
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

## 🚀 Features

### Core Functionality
- **Multi-Role Authentication**: JWT-based stateless authentication with bcrypt encryption
- **Role-Based Access Control**: Granular permissions for Citizens, Staff, and Administrators
- **Complaint Lifecycle Management**: Complete CRUD operations with status tracking
- **Assignment System**: Dynamic complaint assignment to staff members
- **Audit Trail**: Comprehensive logging of all complaint status changes

### Security & Performance
- **Enterprise Security**: Helmet.js security headers, rate limiting, NoSQL injection prevention
- **Input Validation**: Comprehensive server-side validation with express-validator
- **Performance Optimization**: Efficient database queries with proper indexing
- **Error Handling**: Centralized error management with detailed logging

## 🛠 Technology Stack

### Backend Architecture
- **Runtime**: Node.js 18+
- **Framework**: Express.js with MVC pattern
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcrypt password hashing
- **Security**: Helmet, express-rate-limit, express-mongo-sanitize
- **Validation**: express-validator with custom middleware

### Frontend Architecture
- **Framework**: React 18+ with Vite
- **State Management**: Context API with custom hooks
- **HTTP Client**: Axios with interceptors
- **Routing**: React Router with protected routes
- **Styling**: Modern CSS with component-based architecture

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Users
- `GET /api/users/profile` - Get user profile (authenticated)
- `GET /api/users` - Get all users (admin only)

### Complaints
- `POST /api/complaints` - Create complaint (authenticated)
- `GET /api/complaints` - List complaints (role-based access)
- `GET /api/complaints/:id` - Get single complaint
- `PUT /api/complaints/:id/status` - Update status (staff/admin)
- `PUT /api/complaints/:id/assign` - Assign to staff (admin)

## 🚀 Complete Setup Guide

### Prerequisites
- **Node.js 18+** and npm ([Download here](https://nodejs.org/))
- **MongoDB 6+** (see database setup below)
- **Git** ([Download here](https://git-scm.com/))

### 2. Database Setup (CRITICAL STEP)

**Option A: Local MongoDB Installation**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install -y mongodb
sudo systemctl start mongodb
sudo systemctl enable mongodb

# macOS (using Homebrew)
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community

# Windows: Download from https://www.mongodb.com/try/download/community
```

**Option B: MongoDB Docker (Recommended for Groups)**
```bash
# Pull and run MongoDB container
docker run -d --name city-cms-mongo -p 27017:27017 mongo:6

# Or use the provided script
chmod +x docs/deployment/START_MONGODB_DOCKER.sh
./docs/deployment/START_MONGODB_DOCKER.sh
```

**Option C: MongoDB Atlas (Cloud - Free Tier)**
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create free account and cluster
3. Get connection string (replace `<password>` with your password)
4. Use this URI in your `.env` file

### 3. Project Installation

**Step 1: Install Dependencies**
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies (in new terminal)
cd frontend
npm install
```

**Step 2: Configure Environment Variables**
```bash
# In backend directory
cp .env.example .env
```

**Edit `backend/.env` file:**
```env
PORT=5000
# For local MongoDB:
MONGODB_URI=mongodb://localhost:27017/city_cms
# For MongoDB Atlas (replace with your connection string):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/city_cms
JWT_SECRET=your_super_secure_jwt_secret_key_min_32_chars_2024
JWT_EXPIRE=7d
NODE_ENV=development
```

**Step 3: Initialize Database & Create Admin Users**
```bash
# In backend directory
node setup-roles.js
```

**Step 4: Start the Application**
```bash
# Terminal 1: Start Backend (in backend directory)
npm run dev

# Terminal 2: Start Frontend (in frontend directory)
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000

### 5. Test Login Credentials
- **Admin**: admin@city.gov / admin123
- **Staff**: staff@city.gov / staff123
- **Citizen**: Register new account or use any registered user

## 🔧 Troubleshooting Common Issues

### Database Connection Issues
```bash
# Check if MongoDB is running
# For local installation:
sudo systemctl status mongodb  # Linux
brew services list | grep mongodb  # macOS

# For Docker:
docker ps | grep mongo

# Test database connection:
node -e "const mongoose = require('mongoose'); mongoose.connect('mongodb://localhost:27017/city_cms').then(() => console.log('✅ Connected')).catch(err => console.log('❌ Error:', err.message))"
```

### Port Already in Use
```bash
# Kill process using port 5000 or 5173
sudo lsof -ti:5000 | xargs kill -9
sudo lsof -ti:5173 | xargs kill -9
```

### Environment Variables
**Required `.env` configuration:**
```env
PORT=5000
# Choose ONE of these MongoDB options:
MONGODB_URI=mongodb://localhost:27017/city_cms          # Local
# MONGODB_URI=mongodb+srv://user:pass@cluster.net/city_cms  # Atlas
JWT_SECRET=your_super_secure_jwt_secret_key_min_32_chars_2024
JWT_EXPIRE=7d
NODE_ENV=development
```

## 🏧 Software Engineering Concepts

### Design Patterns Implemented
- **MVC (Model-View-Controller)**: Clear separation of concerns
- **Repository Pattern**: Data access abstraction
- **Middleware Pattern**: Cross-cutting concerns handling
- **Factory Pattern**: User role and permission management
- **Observer Pattern**: Real-time status updates

### SOLID Principles
- **Single Responsibility**: Each module has one clear purpose
- **Open/Closed**: Extensible architecture for new features
- **Liskov Substitution**: Consistent interface implementations
- **Interface Segregation**: Focused, minimal interfaces
- **Dependency Inversion**: Abstraction over concrete implementations

### Security Architecture
- **Defense in Depth**: Multiple security layers
- **Principle of Least Privilege**: Role-based access control
- **Input Validation**: Server-side validation and sanitization
- **Secure Communication**: JWT tokens with proper expiration

## 📁 Project Structure

```
city-cms/
├── backend/                 # Node.js/Express API
│   ├── controllers/         # Business logic layer
│   │   ├── authController.js
│   │   ├── userController.js
│   │   └── complaintController.js
│   ├── models/             # Data models (Mongoose schemas)
│   │   ├── User.js
│   │   └── Complaint.js
│   ├── routes/             # API route definitions
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   │   └── complaintRoutes.js
│   ├── middlewares/        # Custom middleware functions
│   │   ├── auth.js         # JWT authentication
│   │   ├── validation.js   # Input validation
│   │   └── errorHandler.js # Centralized error handling
│   ├── .env.example        # Environment variables template
│   ├── server.js           # Application entry point
│   └── package.json        # Dependencies and scripts
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route-level components
│   │   ├── contexts/       # React Context providers
│   │   ├── services/       # API communication layer
│   │   ├── hooks/          # Custom React hooks
│   │   └── utils/          # Utility functions
│   ├── package.json
│   └── vite.config.js
├── docs/                   # Development documentation (git-ignored)
├── ARCHITECTURE.md         # System architecture overview
├── CONTRIBUTING.md         # Development guidelines
└── README.md              # Project documentation
```

## 🔒 Security Implementation

### Authentication & Authorization
- **JWT Tokens**: Stateless authentication with configurable expiration
- **Password Security**: bcrypt hashing with salt rounds
- **Role-Based Access**: Granular permissions (Citizen, Staff, Admin)
- **Protected Routes**: Middleware-based route protection

### Security Middleware Stack
- **Helmet.js**: Security headers (XSS, CSRF, clickjacking protection)
- **Rate Limiting**: Configurable request throttling
  - General API: 100 requests/15 minutes
  - Authentication: 10 requests/15 minutes
- **Input Sanitization**: MongoDB injection prevention
- **Validation**: Comprehensive input validation with express-validator

### Production Security
- Environment variable validation
- CORS configuration
- Request size limiting
- Error message sanitization

## 📊 Performance & Scalability

- **Database Optimization**: Proper indexing and query optimization
- **Stateless Architecture**: Horizontal scaling capability
- **Caching Strategy**: Efficient data retrieval patterns
- **Error Handling**: Graceful degradation and recovery

## 📝 Documentation

For detailed development documentation, see the `docs/` directory:
- **Architecture**: System design and patterns
- **Development**: Setup guides and best practices  
- **Testing**: API testing and validation procedures
- **Troubleshooting**: Common issues and solutions
- **Deployment**: Production deployment guides

## 🤝 Group Collaboration Workflow

### Branch Strategy
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "Add: your feature description"

# Push to your fork
git push origin feature/your-feature-name

# Create Pull Request on GitHub
```

### Code Review Process
1. Create Pull Request with clear description
2. Request review from team members
3. Address feedback and update code
4. Merge after approval

## 🆘 Getting Help

### Quick Help Commands
```bash
# Check if everything is installed correctly
node --version    # Should be 18+
npm --version     # Should be 9+
mongo --version   # Should be 6+ (if local install)

# Test API endpoints
cd docs/testing
./test-api.sh
```

### Common Issues & Solutions
- **MongoDB not connecting**: Check `docs/troubleshooting/TROUBLESHOOTING_GUIDE.md`
- **Port conflicts**: See troubleshooting section above
- **Environment setup**: Review `docs/development/START_HERE.md`
- **API testing**: Use `docs/testing/TESTING_GUIDE.md`

## 📋 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For questions and support:
1. Check the `docs/` directory for detailed guides
2. Create an issue in the repository
3. Contact team members for group project help

---
**🎯 Quick Start Checklist for New Team Members:**
- [ ] Fork and clone repository
- [ ] Install Node.js 18+
- [ ] Setup MongoDB (local/Docker/Atlas)
- [ ] Install dependencies (`npm install` in both directories)
- [ ] Configure `.env` file
- [ ] Run `node setup-roles.js` in backend
- [ ] Start backend (`npm run dev`)
- [ ] Start frontend (`npm run dev`)
- [ ] Test login with admin@city.gov / admin123
