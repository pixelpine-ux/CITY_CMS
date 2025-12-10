# City Complaint Management System (CMS)

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6+-green.svg)](https://mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A professional full-stack MERN application implementing enterprise-grade complaint management with comprehensive role-based access control and security features.

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

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB 6+ (local or cloud)
- Git

### Installation

1. **Clone and Setup**
   ```bash
   git clone <repository-url>
   cd city-cms
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Configure your .env file
   npm run dev
   ```

3. **Frontend Setup** (in new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access Application**
   - Backend API: http://localhost:5000
   - Frontend: http://localhost:5173

## Environment Variables

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/city_cms
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

For detailed development documentation, see the `docs/` directory (available locally):
- Architecture diagrams and design decisions
- Development setup and troubleshooting guides
- Testing procedures and deployment instructions

## 🤝 Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for development guidelines and coding standards.

## 📋 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For questions and support, please refer to the documentation in the `docs/` directory or create an issue in the repository.# Updated
