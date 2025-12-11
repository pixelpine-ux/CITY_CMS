const { body, validationResult } = require('express-validator');

// Handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors.array().map(e => ({ field: e.path, message: e.msg }))
    });
  }
  next();
};

// User registration validation
const validateRegister = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  body('role')
    .optional()
    .isIn(['citizen', 'staff', 'admin'])
    .withMessage('Role must be citizen, staff, or admin'),
  handleValidationErrors
];

// User login validation
const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  handleValidationErrors
];

// Complaint creation validation
const validateComplaint = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 100 })
    .withMessage('Title must be between 5 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('category')
    .isIn(['Roads & Infrastructure', 'Water & Utilities', 'Electricity', 'Waste Management', 'Noise Complaints', 'Other'])
    .withMessage('Invalid category'),
  body('location')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Location must be between 5 and 200 characters'),
  body('priority')
    .optional()
    .isIn(['Low', 'Medium', 'High'])
    .withMessage('Priority must be Low, Medium, or High'),
  handleValidationErrors
];

// Status update validation
const validateStatusUpdate = [
  body('status')
    .isIn(['pending', 'in_progress', 'resolved'])
    .withMessage('Status must be pending, in_progress, or resolved'),
  body('comment')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Comment cannot exceed 500 characters'),
  handleValidationErrors
];

// Staff assignment validation
const validateAssignment = [
  body('staffId')
    .isMongoId()
    .withMessage('Invalid staff ID'),
  handleValidationErrors
];

module.exports = {
  validateRegister,
  validateLogin,
  validateComplaint,
  validateStatusUpdate,
  validateAssignment
};