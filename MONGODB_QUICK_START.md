# MongoDB Quick Start Guide

## 🎯 What You Need to Know

### What is MongoDB?
- **NoSQL database** that stores data as JSON-like documents
- Different from SQL databases (MySQL, PostgreSQL)
- Flexible structure - no fixed schema required
- Perfect for JavaScript/Node.js projects

### Why MongoDB for This Project?
- Stores user data (name, email, password, role)
- Stores complaints with flexible fields
- Easy to add new fields without database migrations
- Works naturally with JavaScript objects

---

## 📚 Three Ways to Learn

### Option 1: Quick Install (5 minutes)
```bash
cd /home/dog/Desktop/CITY_CMS
./install-mongodb.sh
```
**Best for**: Just want to get started quickly

### Option 2: Understand First, Then Install (20 minutes)
1. Read `MONGODB_EXPLAINED.md` (15 min)
2. Run `./install-mongodb.sh` (5 min)
**Best for**: Want to understand MongoDB concepts

### Option 3: Manual Step-by-Step (30 minutes)
1. Read `MONGODB_EXPLAINED.md` (15 min)
2. Follow `INSTALL_MONGODB_STEP_BY_STEP.md` (15 min)
**Best for**: Want to learn every detail

---

## 🚀 Recommended Path (For You)

Since you want to understand MongoDB for other projects too:

### Step 1: Read the Concepts (15 minutes)
```bash
cat MONGODB_EXPLAINED.md
```

**You'll learn**:
- What MongoDB is and how it differs from SQL
- MongoDB structure (databases, collections, documents)
- Connection strings
- How MongoDB works in your project
- How to identify MongoDB in any project

### Step 2: Install MongoDB (5 minutes)
```bash
./install-mongodb.sh
```

**What happens**:
- Adds MongoDB repository
- Installs MongoDB server (mongod)
- Installs MongoDB shell (mongosh)
- Starts MongoDB service
- Enables auto-start on boot

### Step 3: Verify Installation (2 minutes)
```bash
# Check MongoDB is running
sudo systemctl status mongod

# Test MongoDB shell
mongosh --eval "db.version()"

# Test with your project
cd backend
npm run dev
```

**Look for**: "MongoDB Connected" in backend logs

### Step 4: Run Tests (5 minutes)
```bash
cd /home/dog/Desktop/CITY_CMS
./test-api.sh
```

**What happens**:
- Creates database: `city_cms`
- Creates collections: `users`, `complaints`
- Inserts test data
- Tests all features

### Step 5: Explore the Data (5 minutes)
```bash
# Connect to MongoDB shell
mongosh city_cms

# Inside the shell:
show collections          # See users and complaints
db.users.find().pretty()  # See all users
db.complaints.find().pretty()  # See all complaints
exit                      # Exit shell
```

---

## 🗄️ Understanding Your Database

### Database Structure:
```
MongoDB Server (localhost:27017)
    ↓
city_cms (database)
    ↓
    ├── users (collection)
    │   ├── { _id: ..., name: "John", email: "john@...", role: "citizen" }
    │   ├── { _id: ..., name: "Jane", email: "jane@...", role: "staff" }
    │   └── { _id: ..., name: "Admin", email: "admin@...", role: "admin" }
    │
    └── complaints (collection)
        ├── { _id: ..., title: "Broken Light", status: "pending", citizen: ObjectId(...) }
        └── { _id: ..., title: "Water Leak", status: "resolved", citizen: ObjectId(...) }
```

### Connection Flow:
```
Your Backend (Node.js)
    ↓
Mongoose (ODM Library)
    ↓
MongoDB Driver
    ↓
MongoDB Server (mongod)
    ↓
Data Files (/var/lib/mongodb/)
```

---

## 🔍 Key Concepts

### 1. MongoDB Server (mongod)
- The actual database program
- Runs in the background
- Listens on port 27017
- Stores data in `/var/lib/mongodb`

### 2. MongoDB Shell (mongosh)
- Command-line tool to interact with MongoDB
- Like MySQL's `mysql` command
- Used for queries and administration

### 3. Connection String
```
mongodb://localhost:27017/city_cms
│         │         │     │
│         │         │     └─ Database name
│         │         └─────── Port
│         └───────────────── Host
└─────────────────────────── Protocol
```

### 4. Collections vs Documents
```
Collection = Group of documents (like SQL table)
Document = Single record (like SQL row, but flexible)

Example:
users collection contains user documents
complaints collection contains complaint documents
```

### 5. Mongoose (in your code)
```javascript
// Define structure (optional in MongoDB, but Mongoose requires it)
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String
});

// Create model
const User = mongoose.model('User', userSchema);

// Use model
const user = await User.findOne({ email: 'john@example.com' });
```

---

## 🛠️ Essential Commands

### System Commands:
```bash
# Start MongoDB
sudo systemctl start mongod

# Stop MongoDB
sudo systemctl stop mongod

# Check status
sudo systemctl status mongod

# View logs
sudo tail -f /var/log/mongodb/mongod.log

# Check if port is listening
sudo lsof -i :27017
```

### MongoDB Shell Commands:
```bash
# Connect to MongoDB
mongosh

# Connect to specific database
mongosh city_cms

# Inside shell:
show dbs                    # List all databases
use city_cms                # Switch to database
show collections            # List collections
db.users.find()             # Find all users
db.users.findOne()          # Find one user
db.users.countDocuments()   # Count users
db.complaints.find({ status: "pending" })  # Find pending complaints
db.dropDatabase()           # Delete database (careful!)
exit                        # Exit shell
```

---

## 🎓 For Other Projects

### How to Identify MongoDB in Any Project:

**1. Check package.json:**
```json
"dependencies": {
  "mongoose": "^7.5.0",     // ← MongoDB ODM
  "mongodb": "^5.0.0"       // ← MongoDB driver
}
```

**2. Check .env file:**
```
MONGODB_URI=mongodb://...
DATABASE_URL=mongodb://...
MONGO_URL=mongodb://...
```

**3. Check for connection code:**
```javascript
mongoose.connect(process.env.MONGODB_URI)
```

**4. Check for models folder:**
```
models/
├── User.js
├── Product.js
└── Order.js
```

### Setup MongoDB for Any Project:

1. **Install MongoDB** (one time on your system)
   ```bash
   ./install-mongodb.sh
   ```

2. **Start MongoDB** (if not running)
   ```bash
   sudo systemctl start mongod
   ```

3. **Update .env** (in the project)
   ```
   MONGODB_URI=mongodb://localhost:27017/database_name
   ```

4. **Install dependencies** (in the project)
   ```bash
   npm install
   ```

5. **Run the project**
   ```bash
   npm start
   ```

---

## 🐛 Common Issues

### "Connection refused"
**Cause**: MongoDB not running
**Fix**: `sudo systemctl start mongod`

### "Port 27017 already in use"
**Cause**: Another MongoDB instance running
**Fix**: `sudo systemctl restart mongod`

### "Authentication failed"
**Cause**: Wrong credentials in connection string
**Fix**: Check username/password in .env

### "Database not found"
**Cause**: Database doesn't exist yet (this is normal!)
**Fix**: MongoDB creates database automatically on first write

---

## ✅ Quick Verification

After installation, verify everything works:

```bash
# 1. MongoDB is running
sudo systemctl status mongod
# Should show: Active: active (running)

# 2. Can connect with shell
mongosh --eval "db.version()"
# Should show: 7.0.x

# 3. Backend connects
cd backend && npm run dev
# Should show: MongoDB Connected

# 4. Can create data
cd .. && ./test-api.sh
# Should create users and complaints

# 5. Can see data
mongosh city_cms --eval "db.users.countDocuments()"
# Should show: 3
```

---

## 🎯 Summary

**What MongoDB Is**:
- NoSQL database for flexible, document-based data
- Stores JSON-like objects
- No fixed schema required

**What You Installed**:
- MongoDB server (mongod) - runs on port 27017
- MongoDB shell (mongosh) - for administration
- System service - starts automatically

**How It Works in Your Project**:
- Backend connects via Mongoose
- Creates `city_cms` database
- Stores users and complaints as documents
- Queries data using Mongoose models

**For Other Projects**:
- MongoDB is already installed (one-time setup)
- Just start the service: `sudo systemctl start mongod`
- Update connection string in .env
- Run the project

---

## 🚀 Ready to Install?

Choose your path:

**Quick**: `./install-mongodb.sh`
**Learn**: Read `MONGODB_EXPLAINED.md` first
**Detailed**: Follow `INSTALL_MONGODB_STEP_BY_STEP.md`

After installation, continue with `START_HERE.md` to test your application!
