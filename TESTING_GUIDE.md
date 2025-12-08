# City CMS - Step-by-Step Testing Guide

## Prerequisites
- MongoDB running on localhost:27017
- Backend server running on port 5000
- Postman or curl for API testing

## Testing Flow Overview

```
1. Register Users (Citizen, Staff, Admin)
2. Login with each user
3. Create Complaints (as Citizen)
4. View Complaints (role-based access)
5. Assign Complaints (as Admin)
6. Update Status (as Staff/Admin)
```

---

## STEP 1: User Registration (Sign Up)

### Understanding the Logic:
- New users register with name, email, password
- Password is automatically hashed using bcrypt (12 rounds)
- Default role is 'citizen' unless specified
- System generates JWT token immediately after registration
- Email must be unique in the database

### Test Case 1.1: Register a Citizen
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "citizen",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Test Case 1.2: Register a Staff Member
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "password": "password123",
    "role": "staff"
  }'
```

### Test Case 1.3: Register an Admin
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "password123",
    "role": "admin"
  }'
```

### Test Case 1.4: Test Validation (Should Fail)
```bash
# Missing required fields
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "invalid-email"
  }'
```

**Expected Error:**
```json
{
  "errors": [
    {"msg": "Please provide a valid email", "param": "email"},
    {"msg": "Password is required", "param": "password"}
  ]
}
```

---

## STEP 2: User Login (Sign In)

### Understanding the Logic:
- User provides email and password
- System verifies email exists in database
- Password is compared with hashed version using bcrypt
- If valid, JWT token is generated and returned
- Token expires after 7 days (configurable)

### Test Case 2.1: Login as Citizen
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "citizen"
  }
}
```

**IMPORTANT:** Save this token! You'll need it for authenticated requests.

### Test Case 2.2: Login with Wrong Password (Should Fail)
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "wrongpassword"
  }'
```

**Expected Error:**
```json
{
  "message": "Invalid credentials"
}
```

---

## STEP 3: View User Profile

### Understanding the Logic:
- Requires authentication (JWT token in header)
- Returns current logged-in user's information
- Password is never returned in response

### Test Case 3.1: Get Profile (Authenticated)
```bash
curl -X GET http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

**Replace YOUR_TOKEN_HERE with the token from login response**

**Expected Response:**
```json
{
  "_id": "...",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "citizen",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### Test Case 3.2: Access Without Token (Should Fail)
```bash
curl -X GET http://localhost:5000/api/users/profile
```

**Expected Error:**
```json
{
  "message": "No token, authorization denied"
}
```

---

## STEP 4: Create Complaints

### Understanding the Logic:
- Only authenticated users can create complaints
- Citizen is automatically set to the logged-in user
- Initial status is 'pending'
- Status history is automatically created with first entry
- Priority defaults to 'medium' if not specified

### Test Case 4.1: Create a Complaint (as Citizen)
```bash
curl -X POST http://localhost:5000/api/complaints \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer CITIZEN_TOKEN" \
  -d '{
    "title": "Broken Street Light on Main Street",
    "description": "The street light near house #45 has been broken for 3 days. It is very dark at night and unsafe.",
    "category": "electricity",
    "location": "Main Street, near house #45",
    "priority": "high"
  }'
```

**Expected Response:**
```json
{
  "_id": "...",
  "title": "Broken Street Light on Main Street",
  "description": "The street light near house #45...",
  "category": "electricity",
  "location": "Main Street, near house #45",
  "status": "pending",
  "priority": "high",
  "citizen": {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "statusHistory": [
    {
      "status": "pending",
      "changedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### Test Case 4.2: Create Multiple Complaints
```bash
# Water complaint
curl -X POST http://localhost:5000/api/complaints \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer CITIZEN_TOKEN" \
  -d '{
    "title": "Water Leakage in Park Avenue",
    "description": "There is a major water pipe leak causing flooding on the sidewalk.",
    "category": "water",
    "location": "Park Avenue, Block 3"
  }'

# Road complaint
curl -X POST http://localhost:5000/api/complaints \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer CITIZEN_TOKEN" \
  -d '{
    "title": "Pothole on Highway 101",
    "description": "Large pothole causing damage to vehicles. Approximately 2 feet wide.",
    "category": "roads",
    "location": "Highway 101, Mile Marker 15"
  }'
```

---

## STEP 5: View Complaints (Role-Based Access)

### Understanding the Logic:
- **Citizens**: Can only see their own complaints
- **Staff**: Can see all complaints in the system
- **Admin**: Can see all complaints in the system

### Test Case 5.1: View Complaints as Citizen
```bash
curl -X GET http://localhost:5000/api/complaints \
  -H "Authorization: Bearer CITIZEN_TOKEN"
```

**Expected:** Only complaints created by this citizen

### Test Case 5.2: View Complaints as Staff
```bash
# First login as staff to get token
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane@example.com",
    "password": "password123"
  }'

# Then view all complaints
curl -X GET http://localhost:5000/api/complaints \
  -H "Authorization: Bearer STAFF_TOKEN"
```

**Expected:** All complaints from all citizens

### Test Case 5.3: View Single Complaint
```bash
curl -X GET http://localhost:5000/api/complaints/COMPLAINT_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## STEP 6: Assign Complaint to Staff (Admin Only)

### Understanding the Logic:
- Only admins can assign complaints
- Assigns a staff member to handle the complaint
- Updates the 'assignedTo' field with staff user ID

### Test Case 6.1: Assign Complaint
```bash
# First login as admin
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "password123"
  }'

# Then assign complaint to staff
curl -X PUT http://localhost:5000/api/complaints/COMPLAINT_ID/assign \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -d '{
    "staffId": "STAFF_USER_ID"
  }'
```

### Test Case 6.2: Try to Assign as Citizen (Should Fail)
```bash
curl -X PUT http://localhost:5000/api/complaints/COMPLAINT_ID/assign \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer CITIZEN_TOKEN" \
  -d '{
    "staffId": "STAFF_USER_ID"
  }'
```

**Expected Error:**
```json
{
  "message": "Access denied. Admin only."
}
```

---

## STEP 7: Update Complaint Status (Staff/Admin)

### Understanding the Logic:
- Only staff and admin can update status
- Status changes: pending → in_progress → resolved
- Each status change is recorded in statusHistory
- Optional comment can be added with status change

### Test Case 7.1: Update Status to In Progress
```bash
curl -X PUT http://localhost:5000/api/complaints/COMPLAINT_ID/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer STAFF_TOKEN" \
  -d '{
    "status": "in_progress",
    "comment": "Started working on this issue. Will fix by tomorrow."
  }'
```

**Expected Response:**
```json
{
  "_id": "...",
  "status": "in_progress",
  "statusHistory": [
    {
      "status": "pending",
      "changedAt": "2024-01-01T00:00:00.000Z"
    },
    {
      "status": "in_progress",
      "changedBy": {
        "_id": "...",
        "name": "Jane Smith"
      },
      "changedAt": "2024-01-01T12:00:00.000Z",
      "comment": "Started working on this issue..."
    }
  ]
}
```

### Test Case 7.2: Update Status to Resolved
```bash
curl -X PUT http://localhost:5000/api/complaints/COMPLAINT_ID/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer STAFF_TOKEN" \
  -d '{
    "status": "resolved",
    "comment": "Issue has been fixed. Street light is now working."
  }'
```

### Test Case 7.3: Try to Update as Citizen (Should Fail)
```bash
curl -X PUT http://localhost:5000/api/complaints/COMPLAINT_ID/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer CITIZEN_TOKEN" \
  -d '{
    "status": "resolved"
  }'
```

**Expected Error:**
```json
{
  "message": "Access denied. Staff or Admin only."
}
```

---

## STEP 8: View All Users (Admin Only)

### Understanding the Logic:
- Only admins can view all users
- Returns list of all registered users
- Passwords are excluded from response

### Test Case 8.1: Get All Users
```bash
curl -X GET http://localhost:5000/api/users \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

**Expected Response:**
```json
[
  {
    "_id": "...",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "citizen"
  },
  {
    "_id": "...",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "role": "staff"
  },
  {
    "_id": "...",
    "name": "Admin User",
    "email": "admin@example.com",
    "role": "admin"
  }
]
```

---

## Quick Reference: Complete Testing Sequence

```bash
# 1. Register users
CITIZEN_RESPONSE=$(curl -s -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}')

STAFF_RESPONSE=$(curl -s -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Smith","email":"jane@example.com","password":"password123","role":"staff"}')

ADMIN_RESPONSE=$(curl -s -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin User","email":"admin@example.com","password":"password123","role":"admin"}')

# 2. Extract tokens (you'll need to parse JSON)
echo "Save these tokens for testing!"

# 3. Create complaint as citizen
# 4. View complaints (different roles)
# 5. Assign complaint (admin)
# 6. Update status (staff)
```

---

## Understanding the Security Flow

### JWT Token Flow:
1. User logs in → Server validates credentials
2. Server generates JWT with user ID and role
3. Token sent to client
4. Client includes token in Authorization header for all requests
5. Server validates token and extracts user info
6. Server checks role permissions for the requested action

### Role-Based Access:
- **Citizen**: Create complaints, view own complaints
- **Staff**: View all complaints, update status
- **Admin**: All staff permissions + assign complaints + view all users

---

## Common Issues & Troubleshooting

### Issue 1: "No token, authorization denied"
**Solution:** Make sure to include the Authorization header with Bearer token

### Issue 2: "Invalid credentials"
**Solution:** Check email and password are correct

### Issue 3: "Access denied"
**Solution:** Your role doesn't have permission for this action

### Issue 4: Connection refused
**Solution:** Make sure MongoDB and backend server are running

---

## Next Steps

After completing manual testing:
1. Test the frontend application
2. Verify role-based UI rendering
3. Test form validations
4. Test error handling in UI
5. Test complete user workflows

