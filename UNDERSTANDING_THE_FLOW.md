# Understanding City CMS - Visual Flow Guide

## 🎯 Overview: What Does This Application Do?

The City CMS is like a **digital complaint box** for a city. Citizens can report problems (broken lights, potholes, etc.), and city staff can track and fix them.

---

## 👥 Three Types of Users

### 1. **Citizen** (Regular User)
- Can register and login
- Can create complaints about city issues
- Can only see their own complaints
- Cannot change complaint status

### 2. **Staff** (City Worker)
- Can login
- Can see ALL complaints from all citizens
- Can update complaint status (pending → in_progress → resolved)
- Cannot assign complaints to others

### 3. **Admin** (Manager)
- Can do everything Staff can do
- Can assign complaints to specific staff members
- Can view all users in the system

---

## 🔄 Complete Application Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    USER STARTS HERE                          │
└─────────────────────────────────────────────────────────────┘
                              ↓
                    ┌─────────────────┐
                    │  Visit Website  │
                    └─────────────────┘
                              ↓
                    ┌─────────────────┐
                    │  New User?      │
                    └─────────────────┘
                      ↙              ↘
                   YES               NO
                    ↓                 ↓
            ┌──────────────┐   ┌──────────────┐
            │  REGISTER    │   │    LOGIN     │
            │              │   │              │
            │ • Name       │   │ • Email      │
            │ • Email      │   │ • Password   │
            │ • Password   │   │              │
            │ • Role       │   └──────────────┘
            └──────────────┘          ↓
                    ↓                 ↓
                    └────────┬────────┘
                             ↓
                    ┌─────────────────┐
                    │  Get JWT Token  │
                    │  (Logged In!)   │
                    └─────────────────┘
                             ↓
                    ┌─────────────────┐
                    │  What's your    │
                    │     role?       │
                    └─────────────────┘
                             ↓
        ┌────────────────────┼────────────────────┐
        ↓                    ↓                    ↓
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│   CITIZEN    │    │    STAFF     │    │    ADMIN     │
│   Dashboard  │    │   Dashboard  │    │   Dashboard  │
└──────────────┘    └──────────────┘    └──────────────┘
```

---

## 📝 Citizen Journey (Detailed)

```
CITIZEN LOGS IN
       ↓
┌─────────────────────────────────────┐
│  Dashboard - What can I do?         │
│                                     │
│  1. Create New Complaint            │
│  2. View My Complaints              │
│  3. View My Profile                 │
└─────────────────────────────────────┘
       ↓
┌─────────────────────────────────────┐
│  CREATE COMPLAINT                   │
│                                     │
│  Fill Form:                         │
│  • Title: "Broken Street Light"    │
│  • Description: Details...          │
│  • Category: electricity            │
│  • Location: "Main St, #45"         │
│  • Priority: high                   │
│                                     │
│  [Submit Button]                    │
└─────────────────────────────────────┘
       ↓
┌─────────────────────────────────────┐
│  BACKEND PROCESSING                 │
│                                     │
│  1. Validate input                  │
│  2. Set citizen = current user      │
│  3. Set status = "pending"          │
│  4. Create status history entry     │
│  5. Save to database                │
└─────────────────────────────────────┘
       ↓
┌─────────────────────────────────────┐
│  SUCCESS!                           │
│                                     │
│  Complaint Created:                 │
│  • ID: abc123                       │
│  • Status: pending                  │
│  • Created: 2024-01-01              │
└─────────────────────────────────────┘
       ↓
┌─────────────────────────────────────┐
│  VIEW MY COMPLAINTS                 │
│                                     │
│  📋 Broken Street Light             │
│     Status: pending                 │
│     Created: 2024-01-01             │
│                                     │
│  📋 Water Leakage                   │
│     Status: in_progress             │
│     Created: 2024-01-02             │
└─────────────────────────────────────┘
```

---

## 👷 Staff Journey (Detailed)

```
STAFF LOGS IN
       ↓
┌─────────────────────────────────────┐
│  Dashboard - What can I do?         │
│                                     │
│  1. View ALL Complaints             │
│  2. Update Complaint Status         │
│  3. View My Profile                 │
└─────────────────────────────────────┘
       ↓
┌─────────────────────────────────────┐
│  VIEW ALL COMPLAINTS                │
│                                     │
│  📋 Broken Street Light             │
│     By: John Doe                    │
│     Status: pending                 │
│     Assigned to: Me                 │
│     [Update Status]                 │
│                                     │
│  📋 Water Leakage                   │
│     By: Jane Smith                  │
│     Status: pending                 │
│     [Update Status]                 │
└─────────────────────────────────────┘
       ↓
┌─────────────────────────────────────┐
│  UPDATE STATUS                      │
│                                     │
│  Current Status: pending            │
│                                     │
│  New Status: [in_progress ▼]       │
│  Comment: "Started working on it"   │
│                                     │
│  [Update Button]                    │
└─────────────────────────────────────┘
       ↓
┌─────────────────────────────────────┐
│  BACKEND PROCESSING                 │
│                                     │
│  1. Check user is staff/admin       │
│  2. Update complaint status         │
│  3. Add to status history:          │
│     - status: in_progress           │
│     - changedBy: current user       │
│     - changedAt: now                │
│     - comment: "Started..."         │
│  4. Save to database                │
└─────────────────────────────────────┘
       ↓
┌─────────────────────────────────────┐
│  SUCCESS!                           │
│                                     │
│  Status Updated:                    │
│  pending → in_progress              │
│                                     │
│  History:                           │
│  1. pending (2024-01-01)            │
│  2. in_progress (2024-01-02)        │
└─────────────────────────────────────┘
```

---

## 👨‍💼 Admin Journey (Detailed)

```
ADMIN LOGS IN
       ↓
┌─────────────────────────────────────┐
│  Dashboard - What can I do?         │
│                                     │
│  1. View ALL Complaints             │
│  2. Assign Complaints to Staff      │
│  3. Update Complaint Status         │
│  4. View All Users                  │
│  5. View My Profile                 │
└─────────────────────────────────────┘
       ↓
┌─────────────────────────────────────┐
│  VIEW ALL USERS                     │
│                                     │
│  👤 John Doe                        │
│     Role: citizen                   │
│     Email: john@example.com         │
│                                     │
│  👤 Jane Smith                      │
│     Role: staff                     │
│     Email: jane@example.com         │
│                                     │
│  👤 Admin User                      │
│     Role: admin                     │
│     Email: admin@example.com        │
└─────────────────────────────────────┘
       ↓
┌─────────────────────────────────────┐
│  ASSIGN COMPLAINT                   │
│                                     │
│  Complaint: Broken Street Light     │
│  Current: Unassigned                │
│                                     │
│  Assign to: [Jane Smith ▼]         │
│                                     │
│  [Assign Button]                    │
└─────────────────────────────────────┘
       ↓
┌─────────────────────────────────────┐
│  BACKEND PROCESSING                 │
│                                     │
│  1. Check user is admin             │
│  2. Verify staff member exists      │
│  3. Update assignedTo field         │
│  4. Save to database                │
└─────────────────────────────────────┘
       ↓
┌─────────────────────────────────────┐
│  SUCCESS!                           │
│                                     │
│  Complaint assigned to:             │
│  Jane Smith (staff)                 │
└─────────────────────────────────────┘
```

---

## 🔐 Authentication Flow (How Login Works)

```
USER ENTERS CREDENTIALS
       ↓
┌─────────────────────────────────────┐
│  Login Form                         │
│  Email: john@example.com            │
│  Password: ••••••••                 │
│  [Login Button]                     │
└─────────────────────────────────────┘
       ↓
┌─────────────────────────────────────┐
│  BACKEND: Step 1                    │
│  Find user by email                 │
│                                     │
│  Database Query:                    │
│  User.findOne({ email: "john@..." })│
└─────────────────────────────────────┘
       ↓
    Found?
    ↙    ↘
  YES     NO → Return "Invalid credentials"
   ↓
┌─────────────────────────────────────┐
│  BACKEND: Step 2                    │
│  Compare passwords                  │
│                                     │
│  Stored: $2a$12$hashed...           │
│  Entered: password123               │
│                                     │
│  bcrypt.compare(entered, stored)    │
└─────────────────────────────────────┘
       ↓
   Match?
    ↙    ↘
  YES     NO → Return "Invalid credentials"
   ↓
┌─────────────────────────────────────┐
│  BACKEND: Step 3                    │
│  Generate JWT Token                 │
│                                     │
│  Token contains:                    │
│  • User ID                          │
│  • Role                             │
│  • Expiration (7 days)              │
│                                     │
│  Signed with: JWT_SECRET            │
└─────────────────────────────────────┘
       ↓
┌─────────────────────────────────────┐
│  RESPONSE TO USER                   │
│                                     │
│  {                                  │
│    "token": "eyJhbGc...",           │
│    "user": {                        │
│      "id": "123",                   │
│      "name": "John Doe",            │
│      "email": "john@...",           │
│      "role": "citizen"              │
│    }                                │
│  }                                  │
└─────────────────────────────────────┘
       ↓
┌─────────────────────────────────────┐
│  FRONTEND SAVES TOKEN               │
│                                     │
│  localStorage.setItem('token', ...) │
│                                     │
│  Now user is logged in!             │
└─────────────────────────────────────┘
```

---

## 🔒 How Protected Routes Work

```
USER MAKES REQUEST
       ↓
┌─────────────────────────────────────┐
│  Request to Protected Endpoint      │
│                                     │
│  GET /api/complaints                │
│  Headers:                           │
│    Authorization: Bearer eyJhbG...  │
└─────────────────────────────────────┘
       ↓
┌─────────────────────────────────────┐
│  MIDDLEWARE: auth.js                │
│  Step 1: Check token exists         │
└─────────────────────────────────────┘
       ↓
   Token exists?
    ↙         ↘
  YES          NO → Return 401 "No token"
   ↓
┌─────────────────────────────────────┐
│  MIDDLEWARE: auth.js                │
│  Step 2: Verify token               │
│                                     │
│  jwt.verify(token, JWT_SECRET)      │
└─────────────────────────────────────┘
       ↓
   Valid?
    ↙      ↘
  YES       NO → Return 401 "Invalid token"
   ↓
┌─────────────────────────────────────┐
│  MIDDLEWARE: auth.js                │
│  Step 3: Find user in database      │
│                                     │
│  User.findById(decoded.id)          │
└─────────────────────────────────────┘
       ↓
   Found?
    ↙      ↘
  YES       NO → Return 401 "User not found"
   ↓
┌─────────────────────────────────────┐
│  MIDDLEWARE: auth.js                │
│  Step 4: Attach user to request     │
│                                     │
│  req.user = user                    │
└─────────────────────────────────────┘
       ↓
┌─────────────────────────────────────┐
│  CHECK ROLE PERMISSIONS             │
│                                     │
│  If endpoint requires staff:        │
│    Check req.user.role === 'staff'  │
│                                     │
│  If endpoint requires admin:        │
│    Check req.user.role === 'admin'  │
└─────────────────────────────────────┘
       ↓
   Authorized?
    ↙         ↘
  YES          NO → Return 403 "Access denied"
   ↓
┌─────────────────────────────────────┐
│  PROCESS REQUEST                    │
│                                     │
│  Execute controller function        │
│  Access database                    │
│  Return response                    │
└─────────────────────────────────────┘
```

---

## 📊 Complaint Lifecycle

```
┌─────────────────────────────────────────────────────────────┐
│                    COMPLAINT LIFECYCLE                       │
└─────────────────────────────────────────────────────────────┘

CREATION
   ↓
┌──────────────┐
│   PENDING    │ ← Initial status when citizen creates complaint
│              │   • Waiting for staff assignment
│              │   • Visible to all staff/admin
└──────────────┘
   ↓ (Staff/Admin updates status)
┌──────────────┐
│ IN_PROGRESS  │ ← Staff is working on the complaint
│              │   • Staff member assigned
│              │   • Work in progress
└──────────────┘
   ↓ (Staff/Admin updates status)
┌──────────────┐
│   RESOLVED   │ ← Complaint has been fixed
│              │   • Issue resolved
│              │   • Citizen can see resolution
└──────────────┘

STATUS HISTORY TRACKING:
Every status change is recorded with:
• What status changed to
• Who changed it
• When it was changed
• Optional comment

Example:
[
  {
    status: "pending",
    changedAt: "2024-01-01T10:00:00Z"
  },
  {
    status: "in_progress",
    changedBy: "Jane Smith (staff)",
    changedAt: "2024-01-02T14:30:00Z",
    comment: "Started working on this"
  },
  {
    status: "resolved",
    changedBy: "Jane Smith (staff)",
    changedAt: "2024-01-03T16:45:00Z",
    comment: "Fixed the street light"
  }
]
```

---

## 🗄️ Database Structure

```
┌─────────────────────────────────────┐
│         MONGODB DATABASE            │
│         (city_cms)                  │
└─────────────────────────────────────┘
              ↓
    ┌─────────┴─────────┐
    ↓                   ↓
┌─────────┐      ┌──────────────┐
│  users  │      │  complaints  │
└─────────┘      └──────────────┘

USERS COLLECTION:
{
  _id: ObjectId("..."),
  name: "John Doe",
  email: "john@example.com",
  password: "$2a$12$hashed...",  ← Encrypted!
  role: "citizen",
  createdAt: Date,
  updatedAt: Date
}

COMPLAINTS COLLECTION:
{
  _id: ObjectId("..."),
  title: "Broken Street Light",
  description: "Details...",
  category: "electricity",
  location: "Main St",
  status: "pending",
  priority: "high",
  citizen: ObjectId("..."),  ← References users._id
  assignedTo: ObjectId("..."),  ← References users._id
  statusHistory: [
    {
      status: "pending",
      changedBy: ObjectId("..."),
      changedAt: Date,
      comment: "..."
    }
  ],
  createdAt: Date,
  updatedAt: Date
}

RELATIONSHIPS:
complaints.citizen → users._id (who created it)
complaints.assignedTo → users._id (who is fixing it)
complaints.statusHistory.changedBy → users._id (who changed status)
```

---

## 🎨 Frontend-Backend Communication

```
┌─────────────────────────────────────┐
│         REACT FRONTEND              │
│         (Port 5173)                 │
└─────────────────────────────────────┘
              ↓
         HTTP Request
         (with JWT token)
              ↓
┌─────────────────────────────────────┐
│      EXPRESS BACKEND                │
│      (Port 5000)                    │
│                                     │
│  1. Receive request                 │
│  2. Validate token                  │
│  3. Check permissions               │
│  4. Process request                 │
└─────────────────────────────────────┘
              ↓
         Query/Update
              ↓
┌─────────────────────────────────────┐
│      MONGODB DATABASE               │
│      (Port 27017)                   │
│                                     │
│  1. Execute query                   │
│  2. Return data                     │
└─────────────────────────────────────┘
              ↓
         Response
              ↓
┌─────────────────────────────────────┐
│      EXPRESS BACKEND                │
│                                     │
│  1. Format response                 │
│  2. Send JSON                       │
└─────────────────────────────────────┘
              ↓
         JSON Response
              ↓
┌─────────────────────────────────────┐
│      REACT FRONTEND                 │
│                                     │
│  1. Receive data                    │
│  2. Update UI                       │
│  3. Show to user                    │
└─────────────────────────────────────┘
```

---

## 🔍 Example: Complete Request Flow

Let's trace what happens when a citizen creates a complaint:

```
1. USER ACTION
   User fills form and clicks "Submit"

2. FRONTEND (React)
   → Collects form data
   → Gets token from localStorage
   → Makes POST request to /api/complaints

3. NETWORK
   → HTTP POST request sent
   → Headers include Authorization: Bearer token
   → Body contains complaint data (JSON)

4. BACKEND - Middleware Stack
   → CORS: Check origin allowed
   → Helmet: Add security headers
   → Rate Limit: Check request count
   → Body Parser: Parse JSON body
   → Auth Middleware: Verify JWT token
   → Validation Middleware: Validate input

5. BACKEND - Controller
   → complaintController.createComplaint()
   → Extract data from req.body
   → Set citizen = req.user.id
   → Set status = "pending"
   → Create status history entry

6. DATABASE
   → Mongoose creates document
   → MongoDB saves to complaints collection
   → Returns saved document with _id

7. BACKEND - Response
   → Format response
   → Populate citizen details
   → Send JSON response

8. NETWORK
   → HTTP 201 Created
   → JSON body with complaint data

9. FRONTEND (React)
   → Receive response
   → Update state
   → Show success message
   → Redirect to complaints list

10. USER SEES
    → "Complaint created successfully!"
    → New complaint appears in list
```

---

## 📚 Key Takeaways

### Security
- Passwords are NEVER stored in plain text (bcrypt hashing)
- JWT tokens expire after 7 days
- Every protected route checks authentication
- Role-based access prevents unauthorized actions

### Data Flow
- Frontend → Backend → Database → Backend → Frontend
- All communication uses JSON format
- Token must be included in every authenticated request

### Role Permissions
- Citizens: Limited to own data
- Staff: Can see and update all complaints
- Admin: Full system access

### Status Tracking
- Every change is recorded
- Complete audit trail maintained
- Who, what, when for every update

---

## 🚀 Ready to Test?

Now that you understand the flow, follow these steps:

1. **Start MongoDB**: `sudo systemctl start mongod`
2. **Start Backend**: `cd backend && npm run dev`
3. **Run Tests**: `./test-api.sh`
4. **Start Frontend**: `cd frontend && npm run dev`
5. **Test in Browser**: Open http://localhost:5173

Happy Testing! 🎉
