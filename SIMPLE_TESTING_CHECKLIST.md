# Simple Testing Checklist - City CMS

## Quick Start

### Option 1: Automated Testing (Recommended for Beginners)
```bash
cd /home/dog/Desktop/CITY_CMS
./test-api.sh
```
This script will guide you through all features step by step!

### Option 2: Manual Testing with Postman
Import the endpoints below into Postman and test manually.

---

## Prerequisites Checklist

- [ ] MongoDB is running (check with: `sudo systemctl status mongod`)
- [ ] Backend server is running (check with: `cd backend && npm run dev`)
- [ ] Port 5000 is available
- [ ] You have Postman or curl installed

---

## Testing Sequence (Follow in Order)

### ✅ Phase 1: Authentication & User Management

#### Test 1: Register a Citizen
- **Endpoint:** `POST http://localhost:5000/api/auth/register`
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
- **What to check:** 
  - ✓ Returns token
  - ✓ Returns user object with role "citizen"
  - ✓ Password is NOT in response

#### Test 2: Register a Staff Member
- **Endpoint:** `POST http://localhost:5000/api/auth/register`
- **Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "password123",
  "role": "staff"
}
```

#### Test 3: Register an Admin
- **Endpoint:** `POST http://localhost:5000/api/auth/register`
- **Body:**
```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "password123",
  "role": "admin"
}
```

#### Test 4: Login as Citizen
- **Endpoint:** `POST http://localhost:5000/api/auth/login`
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- **IMPORTANT:** Save the token from response!

#### Test 5: View Profile
- **Endpoint:** `GET http://localhost:5000/api/users/profile`
- **Headers:** `Authorization: Bearer YOUR_CITIZEN_TOKEN`
- **What to check:**
  - ✓ Returns your user info
  - ✓ No password in response

---

### ✅ Phase 2: Complaint Management

#### Test 6: Create First Complaint (as Citizen)
- **Endpoint:** `POST http://localhost:5000/api/complaints`
- **Headers:** `Authorization: Bearer YOUR_CITIZEN_TOKEN`
- **Body:**
```json
{
  "title": "Broken Street Light on Main Street",
  "description": "The street light near house #45 has been broken for 3 days.",
  "category": "electricity",
  "location": "Main Street, near house #45",
  "priority": "high"
}
```
- **What to check:**
  - ✓ Status is "pending"
  - ✓ Citizen is set to your user
  - ✓ statusHistory has one entry
  - ✓ Save the complaint ID!

#### Test 7: Create Second Complaint
- **Endpoint:** `POST http://localhost:5000/api/complaints`
- **Headers:** `Authorization: Bearer YOUR_CITIZEN_TOKEN`
- **Body:**
```json
{
  "title": "Water Leakage in Park Avenue",
  "description": "Major water pipe leak causing flooding.",
  "category": "water",
  "location": "Park Avenue, Block 3"
}
```

#### Test 8: View Your Complaints (as Citizen)
- **Endpoint:** `GET http://localhost:5000/api/complaints`
- **Headers:** `Authorization: Bearer YOUR_CITIZEN_TOKEN`
- **What to check:**
  - ✓ Only shows YOUR complaints
  - ✓ Shows 2 complaints

---

### ✅ Phase 3: Role-Based Access Testing

#### Test 9: Login as Staff
- **Endpoint:** `POST http://localhost:5000/api/auth/login`
- **Body:**
```json
{
  "email": "jane@example.com",
  "password": "password123"
}
```
- **Save the staff token!**

#### Test 10: View All Complaints (as Staff)
- **Endpoint:** `GET http://localhost:5000/api/complaints`
- **Headers:** `Authorization: Bearer YOUR_STAFF_TOKEN`
- **What to check:**
  - ✓ Shows ALL complaints (not just staff's own)
  - ✓ Shows complaints from John Doe

#### Test 11: Update Complaint Status (as Staff)
- **Endpoint:** `PUT http://localhost:5000/api/complaints/COMPLAINT_ID/status`
- **Headers:** `Authorization: Bearer YOUR_STAFF_TOKEN`
- **Body:**
```json
{
  "status": "in_progress",
  "comment": "Started working on this issue."
}
```
- **What to check:**
  - ✓ Status changed to "in_progress"
  - ✓ statusHistory has 2 entries now
  - ✓ Comment is saved

#### Test 12: Resolve Complaint (as Staff)
- **Endpoint:** `PUT http://localhost:5000/api/complaints/COMPLAINT_ID/status`
- **Headers:** `Authorization: Bearer YOUR_STAFF_TOKEN`
- **Body:**
```json
{
  "status": "resolved",
  "comment": "Issue fixed successfully."
}
```

---

### ✅ Phase 4: Admin Functions

#### Test 13: Login as Admin
- **Endpoint:** `POST http://localhost:5000/api/auth/login`
- **Body:**
```json
{
  "email": "admin@example.com",
  "password": "password123"
}
```
- **Save the admin token!**

#### Test 14: View All Users (Admin Only)
- **Endpoint:** `GET http://localhost:5000/api/users`
- **Headers:** `Authorization: Bearer YOUR_ADMIN_TOKEN`
- **What to check:**
  - ✓ Shows all 3 users
  - ✓ No passwords in response

#### Test 15: Assign Complaint to Staff (Admin Only)
- **Endpoint:** `PUT http://localhost:5000/api/complaints/COMPLAINT_ID/assign`
- **Headers:** `Authorization: Bearer YOUR_ADMIN_TOKEN`
- **Body:**
```json
{
  "staffId": "STAFF_USER_ID"
}
```
- **What to check:**
  - ✓ assignedTo field is updated
  - ✓ Shows staff member details

---

### ✅ Phase 5: Security & Validation Testing

#### Test 16: Try to Access Without Token (Should Fail)
- **Endpoint:** `GET http://localhost:5000/api/users/profile`
- **Headers:** None
- **Expected:** 401 error "No token, authorization denied"

#### Test 17: Try to Update Status as Citizen (Should Fail)
- **Endpoint:** `PUT http://localhost:5000/api/complaints/COMPLAINT_ID/status`
- **Headers:** `Authorization: Bearer YOUR_CITIZEN_TOKEN`
- **Body:**
```json
{
  "status": "resolved"
}
```
- **Expected:** 403 error "Access denied"

#### Test 18: Try to Assign as Staff (Should Fail)
- **Endpoint:** `PUT http://localhost:5000/api/complaints/COMPLAINT_ID/assign`
- **Headers:** `Authorization: Bearer YOUR_STAFF_TOKEN`
- **Body:**
```json
{
  "staffId": "SOME_ID"
}
```
- **Expected:** 403 error "Admin only"

#### Test 19: Try Invalid Email Format (Should Fail)
- **Endpoint:** `POST http://localhost:5000/api/auth/register`
- **Body:**
```json
{
  "name": "Test",
  "email": "invalid-email",
  "password": "password123"
}
```
- **Expected:** 400 error with validation message

#### Test 20: Try Short Password (Should Fail)
- **Endpoint:** `POST http://localhost:5000/api/auth/register`
- **Body:**
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "123"
}
```
- **Expected:** 400 error "Password must be at least 6 characters"

---

## Understanding the Flow

### 1. **Registration Flow**
```
User submits data → Validation → Password hashing → Save to DB → Generate JWT → Return token
```

### 2. **Login Flow**
```
User submits credentials → Find user by email → Compare passwords → Generate JWT → Return token
```

### 3. **Authenticated Request Flow**
```
Request with token → Verify JWT → Extract user info → Check permissions → Process request
```

### 4. **Complaint Creation Flow**
```
Authenticated user → Validate input → Set citizen to current user → Set status to pending → Create status history → Save to DB
```

### 5. **Status Update Flow**
```
Staff/Admin request → Verify permissions → Update status → Add to status history → Save to DB
```

---

## Key Concepts to Understand

### JWT Tokens
- Generated after login/registration
- Contains user ID and role
- Must be included in Authorization header
- Format: `Bearer YOUR_TOKEN_HERE`
- Expires after 7 days

### Role-Based Access Control (RBAC)
| Role    | Can Create Complaints | Can View All | Can Update Status | Can Assign | Can View Users |
|---------|----------------------|--------------|-------------------|------------|----------------|
| Citizen | ✅                    | ❌           | ❌                | ❌         | ❌             |
| Staff   | ✅                    | ✅           | ✅                | ❌         | ❌             |
| Admin   | ✅                    | ✅           | ✅                | ✅         | ✅             |

### Status Lifecycle
```
pending → in_progress → resolved
```

### Categories Available
- roads
- water
- electricity
- waste
- noise
- other

### Priority Levels
- low
- medium (default)
- high

---

## Common Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| "No token, authorization denied" | Missing Authorization header | Add `Authorization: Bearer TOKEN` |
| "Invalid credentials" | Wrong email/password | Check credentials |
| "Access denied" | Insufficient permissions | Use correct role (staff/admin) |
| "Validation error" | Invalid input | Check required fields and formats |
| "User already exists" | Duplicate email | Use different email |
| "Complaint not found" | Invalid complaint ID | Check complaint ID is correct |

---

## Next Steps After Testing

1. ✅ All API endpoints working
2. Test the frontend application
3. Verify UI matches API responses
4. Test form validations in UI
5. Test error messages in UI
6. Test complete user workflows end-to-end

---

## Quick Commands Reference

### Start MongoDB
```bash
sudo systemctl start mongod
```

### Start Backend Server
```bash
cd backend
npm run dev
```

### Run Automated Tests
```bash
./test-api.sh
```

### Check Server Status
```bash
curl http://localhost:5000/api/
```

---

## Testing Checklist Summary

- [ ] Register 3 users (citizen, staff, admin)
- [ ] Login with each user
- [ ] View profile
- [ ] Create 2 complaints as citizen
- [ ] View complaints (test role-based access)
- [ ] Update complaint status as staff
- [ ] Assign complaint as admin
- [ ] View all users as admin
- [ ] Test security (unauthorized access)
- [ ] Test validation (invalid inputs)

**Total Tests: 20**

Once all tests pass, your backend is working correctly! 🎉
