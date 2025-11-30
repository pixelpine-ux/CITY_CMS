# City Complaint Management System (CMS)

A full-stack MERN application for managing city complaints with role-based access control.

## Features

- **User Authentication**: JWT-based auth with bcrypt password hashing
- **Role-Based Access**: Citizens, Staff, and Admin roles
- **Complaint Management**: Create, view, update, and assign complaints
- **Status Tracking**: Complete audit trail of complaint status changes
- **Security**: Rate limiting, input validation, and security headers

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **Security**: Helmet, express-rate-limit, express-validator
- **Frontend**: React (coming soon)

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

## Installation

1. Clone the repository
2. Navigate to backend directory: `cd backend`
3. Install dependencies: `npm install`
4. Copy `.env.example` to `.env` and configure
5. Start the server: `npm run dev`

## Environment Variables

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/city_cms
JWT_SECRET=your_super_secure_jwt_secret_key_min_32_chars_2024
JWT_EXPIRE=7d
NODE_ENV=development
```

## Project Structure

```
backend/
├── controllers/     # Business logic
├── models/         # Database schemas
├── routes/         # API routes
├── middlewares/    # Custom middleware
├── server.js       # Main application file
└── package.json    # Dependencies
```

## Security Features

- Input validation and sanitization
- Rate limiting (100 req/15min general, 5 req/15min auth)
- Security headers via Helmet
- NoSQL injection prevention
- JWT token authentication
- Password hashing with bcrypt

## License

MIT License