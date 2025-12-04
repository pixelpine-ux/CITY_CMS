# City Complaint Management System - Backend Architecture Documentation

## Executive Summary

The City CMS backend is a robust, enterprise-grade Node.js application built with Express.js and MongoDB, designed to handle municipal complaint management with strict security protocols and role-based access control. The system follows RESTful API principles and implements comprehensive security measures suitable for government-grade applications.

## System Architecture Overview

### Core Technology Stack
- **Runtime**: Node.js (v18+)
- **Framework**: Express.js 4.18.2
- **Database**: MongoDB with Mongoose ODM 7.5.0
- **Authentication**: JWT (JSON Web Tokens) with bcryptjs hashing
- **Security**: Helmet, express-rate-limit, express-mongo-sanitize
- **Validation**: express-validator with custom middleware

### Application Structure
```
backend/
├── server.js              # Application entry point & middleware configuration
├── models/                # Database schemas and business logic
│   ├── User.js           # User entity with role-based access
│   └── Complaint.js      # Complaint entity with status tracking
├── controllers/           # Business logic handlers
│   ├── authController.js # Authentication & authorization logic
│   ├── userController.js # User management operations
│   └── complaintController.js # Complaint CRUD operations
├── routes/               # API endpoint definitions
│   ├── authRoutes.js     # Authentication endpoints
│   ├── userRoutes.js     # User management endpoints
│   └── complaintRoutes.js # Complaint management endpoints
└── middlewares/          # Custom middleware functions
    ├── auth.js           # JWT authentication & role authorization
    ├── validation.js     # Input validation & sanitization
    └── errorHandler.js   # Centralized error handling
```

## Database Schema Design

### User Entity
```javascript
{
  _id: ObjectId,
  name: String (required, max: 50 chars),
  email: String (required, unique, validated),
  password: String (required, bcrypt hashed, min: 6 chars),
  role: Enum ['citizen', 'staff', 'admin'] (default: 'citizen'),
  createdAt: Date,
  updatedAt: Date
}
```

**Business Rules:**
- Email uniqueness enforced at database level
- Password automatically hashed using bcrypt (salt rounds: 12)
- Role-based access control with three distinct levels
- Soft validation with comprehensive error messaging

### Complaint Entity
```javascript
{
  _id: ObjectId,
  title: String (required, max: 100 chars),
  description: String (required, max: 1000 chars),
  category: Enum ['roads', 'water', 'electricity', 'waste', 'noise', 'other'],
  location: String (required, max: 200 chars),
  status: Enum ['pending', 'in_progress', 'resolved'] (default: 'pending'),
  priority: Enum ['low', 'medium', 'high'] (default: 'medium'),
  citizen: ObjectId (ref: User, required),
  assignedTo: ObjectId (ref: User, optional),
  photos: [String] (file paths/URLs),
  statusHistory: [{
    status: String,
    changedBy: ObjectId (ref: User),
    changedAt: Date (default: now),
    comment: String (optional)
  }],
  createdAt: Date,
  updatedAt: Date
}
```

**Business Rules:**
- Automatic status history tracking with audit trail
- Citizen reference required for complaint ownership
- Staff assignment optional (admin-controlled)
- Photo attachments supported (paths stored as strings)
- Complete audit trail for status changes

## API Endpoint Specification

### Authentication Endpoints
```
POST /api/auth/register
- Purpose: User registration with role assignment
- Access: Public
- Rate Limit: 5 requests/15 minutes
- Validation: Name (2-50 chars), email (valid format), password (min 6 chars)
- Response: JWT token + user profile (excluding password)

POST /api/auth/login
- Purpose: User authentication
- Access: Public
- Rate Limit: 5 requests/15 minutes
- Validation: Email format, password presence
- Response: JWT token + user profile
```

### User Management Endpoints
```
GET /api/users/profile
- Purpose: Retrieve authenticated user's profile
- Access: Authenticated users only
- Rate Limit: 100 requests/15 minutes
- Response: User profile data

GET /api/users
- Purpose: List all system users
- Access: Admin only
- Rate Limit: 100 requests/15 minutes
- Response: Array of user profiles (passwords excluded)
```

### Complaint Management Endpoints
```
POST /api/complaints
- Purpose: Create new complaint
- Access: Authenticated users
- Validation: Title (5-100 chars), description (10-1000 chars), category, location
- Business Logic: Auto-assigns citizen, creates initial status history entry

GET /api/complaints
- Purpose: List complaints with role-based filtering
- Access: Authenticated users
- Business Logic: 
  * Citizens: Only their own complaints
  * Staff/Admin: All complaints
- Response: Array of complaints with populated references

GET /api/complaints/:id
- Purpose: Retrieve single complaint with full details
- Access: Authenticated users
- Business Logic: Citizens can only view their own complaints
- Response: Complete complaint object with status history

PUT /api/complaints/:id/status
- Purpose: Update complaint status
- Access: Staff and Admin only
- Validation: Status enum, optional comment (max 500 chars)
- Business Logic: Adds entry to status history with timestamp and user

PUT /api/complaints/:id/assign
- Purpose: Assign complaint to staff member
- Access: Admin only
- Business Logic: Updates assignedTo field
- Response: Updated complaint object
```

## Security Implementation

### Authentication & Authorization
- **JWT Implementation**: Stateless authentication with configurable expiration (default: 7 days)
- **Password Security**: bcryptjs with 12 salt rounds for government-grade security
- **Role-Based Access Control**: Three-tier system (citizen, staff, admin) with middleware enforcement
- **Token Validation**: Comprehensive JWT verification with user existence checks

### Security Middleware Stack
```javascript
// Applied in order:
1. Helmet.js - Security headers (XSS, CSRF, etc.)
2. express-mongo-sanitize - NoSQL injection prevention
3. Rate Limiting - Tiered approach:
   - General API: 100 requests/15 minutes
   - Authentication: 5 requests/15 minutes
4. CORS - Cross-origin resource sharing
5. Body parsing with size limits (10MB)
```

### Input Validation & Sanitization
- **express-validator**: Comprehensive input validation with custom error handling
- **Data Sanitization**: Automatic trimming, normalization, and sanitization
- **Error Standardization**: Consistent error response format across all endpoints

## Business Logic & Workflows

### User Registration Flow
1. Input validation (name, email, password, optional role)
2. Email uniqueness check
3. Password hashing (bcrypt, 12 rounds)
4. User creation in database
5. JWT token generation
6. Response with token and user profile

### Complaint Lifecycle Management
1. **Creation**: Citizen submits complaint with automatic status history initialization
2. **Assignment**: Admin assigns complaint to staff member
3. **Status Updates**: Staff/Admin updates status with audit trail
4. **Resolution**: Final status change to 'resolved' with completion timestamp

### Role-Based Data Access
- **Citizens**: CRUD on own complaints only, read-only on profile
- **Staff**: Read/Update on all complaints, status management capabilities
- **Admin**: Full system access, user management, complaint assignment

## Error Handling & Logging

### Centralized Error Handler
```javascript
// Error response format:
{
  message: "Human-readable error description",
  errors: [...], // Validation errors array (if applicable)
  status: 400|401|403|404|500
}
```

### Error Categories
- **Validation Errors (400)**: Input validation failures with detailed field-level errors
- **Authentication Errors (401)**: Invalid/missing JWT tokens
- **Authorization Errors (403)**: Insufficient role permissions
- **Not Found Errors (404)**: Resource not found
- **Server Errors (500)**: Unhandled exceptions with generic messages

## Performance & Scalability Considerations

### Database Optimization
- **Indexing Strategy**: Automatic indexes on email (unique), complaint citizen reference
- **Population Efficiency**: Selective field population to minimize data transfer
- **Query Optimization**: Role-based query filtering at database level

### Caching Strategy (Recommended)
- JWT token validation caching
- User role caching for authorization
- Complaint status lookup caching

### Horizontal Scaling Readiness
- Stateless JWT authentication (no session storage)
- Database connection pooling via Mongoose
- Environment-based configuration for multi-instance deployment

## Configuration Management

### Environment Variables
```bash
PORT=5000                    # Server port
MONGODB_URI=mongodb://...    # Database connection string
JWT_SECRET=<32+ char string> # JWT signing secret
JWT_EXPIRE=7d               # Token expiration period
NODE_ENV=development        # Environment mode
```

### Security Configuration
- JWT secret minimum 32 characters for production
- MongoDB connection with authentication enabled
- Rate limiting configured for DDoS protection
- CORS configured for specific frontend domains (production)

## Deployment Architecture

### Production Readiness Checklist
- [ ] Environment variables secured and validated
- [ ] MongoDB replica set configuration
- [ ] SSL/TLS termination at load balancer
- [ ] Rate limiting configured for production traffic
- [ ] Error logging and monitoring integration
- [ ] Health check endpoints implemented
- [ ] Graceful shutdown handling

### Recommended Infrastructure
- **Load Balancer**: NGINX or AWS ALB with SSL termination
- **Application Servers**: Multiple Node.js instances behind load balancer
- **Database**: MongoDB Atlas or self-hosted replica set
- **Monitoring**: Application performance monitoring (APM) integration
- **Logging**: Centralized logging with ELK stack or CloudWatch

## API Testing & Documentation

### Testing Strategy
- Unit tests for controllers and middleware
- Integration tests for API endpoints
- Security testing for authentication flows
- Load testing for rate limiting validation

### API Documentation
- OpenAPI/Swagger specification recommended
- Postman collection for development testing
- Environment-specific testing configurations

## Future Enhancement Recommendations

### Immediate Improvements
1. **File Upload Handling**: Implement secure file upload for complaint photos
2. **Email Notifications**: Status change notifications to citizens
3. **Advanced Filtering**: Search and filter capabilities for complaints
4. **Audit Logging**: Comprehensive system activity logging

### Long-term Enhancements
1. **Real-time Updates**: WebSocket integration for live status updates
2. **Analytics Dashboard**: Complaint metrics and reporting
3. **Mobile API**: Optimized endpoints for mobile applications
4. **Integration APIs**: Third-party system integration capabilities

## Conclusion

The City CMS backend represents a well-architected, security-focused solution suitable for government-grade municipal complaint management. The system demonstrates enterprise-level patterns including comprehensive security measures, role-based access control, audit trails, and scalable architecture design. The modular structure and clear separation of concerns facilitate maintenance and future enhancements while ensuring robust operation under production loads.