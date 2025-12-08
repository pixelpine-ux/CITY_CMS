# Understanding MongoDB - Complete Guide

## 🗄️ What is MongoDB?

MongoDB is a **NoSQL database** - fundamentally different from traditional SQL databases like MySQL or PostgreSQL.

### SQL vs NoSQL: The Key Difference

```
SQL (MySQL, PostgreSQL):
┌─────────────────────────────────┐
│         USERS TABLE             │
├────┬──────────┬─────────┬───────┤
│ id │   name   │  email  │  role │
├────┼──────────┼─────────┼───────┤
│ 1  │ John Doe │ john@.. │ user  │
│ 2  │ Jane     │ jane@.. │ admin │
└────┴──────────┴─────────┴───────┘
- Fixed structure (schema)
- Rows and columns
- Relationships via foreign keys
- Must define structure before adding data

NoSQL (MongoDB):
┌─────────────────────────────────┐
│      USERS COLLECTION           │
├─────────────────────────────────┤
│ { _id: 1, name: "John Doe",     │
│   email: "john@...", role: "user",│
│   preferences: {...} }          │
├─────────────────────────────────┤
│ { _id: 2, name: "Jane",         │
│   email: "jane@...", role: "admin",│
│   permissions: [...] }          │
└─────────────────────────────────┘
- Flexible structure (schemaless)
- Documents (JSON-like)
- Embedded data or references
- Can add any fields anytime
```

---

## 📊 MongoDB Structure

```
MongoDB Server (mongod)
    ↓
Database (city_cms)
    ↓
Collections (users, complaints)
    ↓
Documents (individual records)
    ↓
Fields (name, email, etc.)
```

### Real Example from Your Project:

```javascript
// Database: city_cms
// Collection: users
{
  _id: ObjectId("507f1f77bcf86cd799439011"),  // Auto-generated unique ID
  name: "John Doe",
  email: "john@example.com",
  password: "$2a$12$hashed...",  // Encrypted
  role: "citizen",
  createdAt: ISODate("2024-01-01T10:00:00Z"),
  updatedAt: ISODate("2024-01-01T10:00:00Z")
}

// Collection: complaints
{
  _id: ObjectId("507f1f77bcf86cd799439012"),
  title: "Broken Street Light",
  description: "Light not working...",
  category: "electricity",
  location: "Main Street",
  status: "pending",
  priority: "high",
  citizen: ObjectId("507f1f77bcf86cd799439011"),  // Reference to user
  assignedTo: null,
  statusHistory: [  // Embedded array
    {
      status: "pending",
      changedAt: ISODate("2024-01-01T10:00:00Z")
    }
  ],
  createdAt: ISODate("2024-01-01T10:00:00Z")
}
```

---

## 🔧 MongoDB Components

### 1. **mongod** (MongoDB Daemon)
- The actual database server
- Runs in the background
- Listens on port 27017 (default)
- Stores data in `/var/lib/mongodb`
- Logs in `/var/log/mongodb/mongod.log`

### 2. **mongosh** (MongoDB Shell)
- Command-line interface to interact with MongoDB
- Like MySQL's `mysql` command
- Used for queries, administration, debugging

### 3. **MongoDB Driver** (in your code)
- Library that connects your application to MongoDB
- In Node.js: `mongoose` or `mongodb` package
- Handles connection, queries, data validation

---

## 🌐 Connection String Anatomy

```
mongodb://username:password@host:port/database?options

Example from your project:
mongodb://localhost:27017/city_cms
│         │         │     │
│         │         │     └─ Database name
│         │         └─────── Port (default: 27017)
│         └───────────────── Host (localhost = your computer)
└─────────────────────────── Protocol

For MongoDB Atlas (cloud):
mongodb+srv://user:pass@cluster.mongodb.net/dbname?retryWrites=true
│          │                                        │
│          └─ srv = automatic server discovery     └─ Options
└─ Protocol for cloud
```

---

## 📦 What Gets Installed?

When you install MongoDB, you get:

```
/usr/bin/
├── mongod          # Database server
├── mongosh         # Shell client
└── mongos          # Sharding router (advanced)

/var/lib/mongodb/   # Data storage
├── collection-1.wt
├── collection-2.wt
└── ...

/var/log/mongodb/   # Logs
└── mongod.log

/etc/mongod.conf    # Configuration file
```

---

## 🔄 How MongoDB Works in Your Project

```
1. START MONGODB SERVER
   $ sudo systemctl start mongod
   → mongod process starts
   → Listens on port 27017
   → Ready to accept connections

2. START YOUR BACKEND
   $ npm run dev
   → Node.js starts
   → Mongoose connects to MongoDB
   → Connection string: mongodb://localhost:27017/city_cms

3. FIRST REQUEST (Register User)
   Frontend → Backend → Mongoose → MongoDB
   
   Mongoose creates:
   - Database: city_cms (if doesn't exist)
   - Collection: users (if doesn't exist)
   - Document: { name: "John", email: "john@...", ... }

4. SUBSEQUENT REQUESTS
   Backend queries MongoDB through Mongoose
   MongoDB returns data
   Backend sends to frontend
```

---

## 🎯 Why MongoDB for This Project?

### Advantages:
✅ **Flexible Schema**: Can add fields without migrations
✅ **JSON-like**: Matches JavaScript objects perfectly
✅ **Embedded Data**: statusHistory array inside complaint
✅ **Fast Development**: No need to define schema upfront
✅ **Scalable**: Easy to scale horizontally

### When to Use MongoDB:
- Rapid development
- Flexible/changing requirements
- Document-based data (like complaints)
- JavaScript/Node.js projects
- Need to store arrays/nested objects

### When to Use SQL Instead:
- Complex relationships (many joins)
- Financial transactions (ACID critical)
- Fixed schema requirements
- Complex reporting queries

---

## 🔍 MongoDB vs Other Databases

| Feature | MongoDB | MySQL | PostgreSQL |
|---------|---------|-------|------------|
| Type | NoSQL | SQL | SQL |
| Structure | Documents | Tables | Tables |
| Schema | Flexible | Fixed | Fixed |
| Query Language | MongoDB Query | SQL | SQL |
| Relationships | Embedded/Refs | Foreign Keys | Foreign Keys |
| Transactions | Yes (4.0+) | Yes | Yes |
| Best For | Flexible data | Structured data | Complex queries |

---

## 📚 Common MongoDB Concepts

### Collections
- Like SQL tables
- Group of documents
- No fixed schema
- Example: `users`, `complaints`

### Documents
- Like SQL rows
- JSON-like objects (BSON)
- Can have different fields
- Example: One user record

### Fields
- Like SQL columns
- Key-value pairs
- Can be any type (string, number, array, object)
- Example: `name`, `email`, `role`

### ObjectId
- Unique identifier (like auto-increment ID in SQL)
- 12-byte value
- Auto-generated
- Example: `507f1f77bcf86cd799439011`

### Embedded Documents
- Documents inside documents
- Example: `statusHistory` array in complaints

### References
- Link to another document
- Example: `citizen: ObjectId("...")` in complaints

---

## 🛠️ Installation Methods Explained

### Method 1: System Package (Recommended for You)
```bash
# Installs MongoDB as a system service
# Pros: Starts automatically, system-managed, production-ready
# Cons: Requires root access, system-wide installation
```

### Method 2: Docker
```bash
# Runs MongoDB in a container
# Pros: Isolated, easy cleanup, no system changes
# Cons: Requires Docker, container management
```

### Method 3: MongoDB Atlas (Cloud)
```bash
# Hosted MongoDB in the cloud
# Pros: No installation, managed, backups included
# Cons: Requires internet, free tier limits
```

---

## 🔐 MongoDB Security Basics

### Authentication
```javascript
// No auth (development - your current setup)
mongodb://localhost:27017/city_cms

// With auth (production)
mongodb://username:password@localhost:27017/city_cms
```

### Authorization
- **Roles**: read, readWrite, dbAdmin, userAdmin
- **Users**: Created per database
- **Best Practice**: Always use auth in production

---

## 📊 MongoDB in Other Projects

### How to Identify MongoDB in Any Project:

1. **Check package.json**
   ```json
   "dependencies": {
     "mongoose": "^7.5.0",  // ← MongoDB ODM
     "mongodb": "^5.0.0"    // ← MongoDB driver
   }
   ```

2. **Check .env or config files**
   ```
   MONGODB_URI=mongodb://...
   DATABASE_URL=mongodb://...
   MONGO_URL=mongodb://...
   ```

3. **Check for connection code**
   ```javascript
   mongoose.connect(process.env.MONGODB_URI)
   // or
   MongoClient.connect(uri)
   ```

4. **Check for models/schemas**
   ```javascript
   const userSchema = new mongoose.Schema({...})
   ```

### Common MongoDB Patterns:

**Pattern 1: Mongoose (Your Project)**
```javascript
// Define schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String
});

// Create model
const User = mongoose.model('User', userSchema);

// Use model
const user = await User.findOne({ email: 'john@example.com' });
```

**Pattern 2: Native Driver**
```javascript
const { MongoClient } = require('mongodb');
const client = new MongoClient(uri);
await client.connect();
const db = client.db('city_cms');
const users = db.collection('users');
const user = await users.findOne({ email: 'john@example.com' });
```

---

## 🎓 Key Takeaways

### What You Need to Know:

1. **MongoDB is NoSQL**: Stores JSON-like documents, not tables
2. **Port 27017**: Default MongoDB port (like 3306 for MySQL)
3. **Connection String**: How your app connects to MongoDB
4. **Collections**: Groups of documents (like tables)
5. **Documents**: Individual records (like rows)
6. **Mongoose**: ODM that makes MongoDB easier in Node.js

### For Any Project:

1. **Check if MongoDB is used**: Look for mongoose/mongodb in package.json
2. **Find connection string**: Check .env or config files
3. **Install MongoDB**: Use system package, Docker, or Atlas
4. **Start MongoDB**: `sudo systemctl start mongod` (or Docker/Atlas)
5. **Verify connection**: Check backend logs for "MongoDB Connected"

---

## 🚀 Ready to Install?

Now that you understand MongoDB, let's install it on your system!

**Next**: Follow the installation steps below for Linux Mint 22.1
