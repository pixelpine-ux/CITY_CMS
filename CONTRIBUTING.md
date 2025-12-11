# Contributing Guidelines

## Development Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
3. Configure environment variables (see `.env.example`)
4. Start development servers:
   ```bash
   # Backend
   cd backend && npm run dev
   
   # Frontend
   cd frontend && npm run dev
   ```

## Code Standards

### Backend (Node.js/Express)
- Use ES6+ features
- Follow RESTful API conventions
- Implement proper error handling
- Add input validation for all endpoints
- Use middleware for cross-cutting concerns

### Frontend (React)
- Use functional components with hooks
- Implement proper state management
- Follow component composition patterns
- Use consistent naming conventions

## Security Requirements
- Validate all user inputs
- Implement proper authentication
- Use HTTPS in production
- Follow OWASP security guidelines

## Testing
- Write unit tests for controllers
- Test API endpoints
- Validate security measures
- Test role-based access control

## Pull Request Process
1. Create feature branch from main
2. Implement changes with tests
3. Update documentation if needed
4. Submit pull request with description