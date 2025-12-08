# MongoDB Installation - Step by Step (Linux Mint 22.1)

## 🎯 What We're Going to Do

1. Add MongoDB repository to your system
2. Install MongoDB packages
3. Start MongoDB service
4. Verify installation
5. Test connection with your project

**Time needed**: ~10 minutes

---

## 📋 Step 1: Import MongoDB GPG Key

### What this does:
- Verifies that MongoDB packages are authentic
- Prevents installation of tampered packages
- Standard security practice for all software

### Command:
```bash
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
  sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg
```

### Run it:
```bash
cd /home/dog/Desktop/CITY_CMS
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
  sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg
```

**Expected output**: (silent, no errors)

---

## 📋 Step 2: Add MongoDB Repository

### What this does:
- Tells your system where to download MongoDB
- Ubuntu/Mint don't include MongoDB by default
- We use Ubuntu 24.04 (noble) repository

### Command:
```bash
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/7.0 multiverse" | \
  sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
```

**Expected output**: The command echoed back

---

## 📋 Step 3: Update Package List

### What this does:
- Refreshes list of available packages
- Includes newly added MongoDB repository
- Like "checking for updates"

### Command:
```bash
sudo apt-get update
```

**Expected output**: 
```
Hit:1 http://packages.linuxmint.com...
Get:2 https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/7.0...
```

---

## 📋 Step 4: Install MongoDB

### What this does:
- Installs MongoDB server (mongod)
- Installs MongoDB shell (mongosh)
- Installs tools and libraries
- Creates system service

### Command:
```bash
sudo apt-get install -y mongodb-org
```

**Expected output**:
```
Reading package lists... Done
Building dependency tree... Done
The following NEW packages will be installed:
  mongodb-database-tools mongodb-mongosh mongodb-org...
```

**This will install**:
- `mongod` - Database server
- `mongosh` - Shell client
- Configuration files
- System service

---

## 📋 Step 5: Start MongoDB Service

### What this does:
- Starts MongoDB server in background
- Makes it run as a system service
- Listens on port 27017

### Command:
```bash
sudo systemctl start mongod
```

**Expected output**: (silent, no errors)

---

## 📋 Step 6: Enable Auto-Start (Optional but Recommended)

### What this does:
- MongoDB starts automatically when you boot your computer
- You won't need to start it manually each time

### Command:
```bash
sudo systemctl enable mongod
```

**Expected output**:
```
Created symlink /etc/systemd/system/multi-user.target.wants/mongod.service...
```

---

## 📋 Step 7: Verify MongoDB is Running

### Command:
```bash
sudo systemctl status mongod
```

**Expected output**:
```
● mongod.service - MongoDB Database Server
     Loaded: loaded (/lib/systemd/system/mongod.service; enabled)
     Active: active (running) since...
```

**Look for**: `Active: active (running)` in green

---

## 📋 Step 8: Test MongoDB Shell

### What this does:
- Connects to MongoDB
- Verifies it's accepting connections
- Shows MongoDB version

### Command:
```bash
mongosh --eval "db.version()"
```

**Expected output**:
```
Current Mongosh Log ID: ...
Connecting to: mongodb://127.0.0.1:27017/...
Using MongoDB: 7.0.x
7.0.x
```

---

## 📋 Step 9: Test with Your Project

### Command:
```bash
cd /home/dog/Desktop/CITY_CMS/backend
npm run dev
```

**Expected output**:
```
Server running on port 5000
MongoDB Connected
```

**Look for**: `MongoDB Connected` - this means success! 🎉

---

## 🎓 Understanding What Happened

### Files Created:

```
/usr/bin/mongod              # MongoDB server executable
/usr/bin/mongosh             # MongoDB shell
/etc/mongod.conf             # Configuration file
/var/lib/mongodb/            # Data storage directory
/var/log/mongodb/mongod.log  # Log file
```

### Service Created:

```bash
# MongoDB is now a system service
sudo systemctl start mongod   # Start
sudo systemctl stop mongod    # Stop
sudo systemctl restart mongod # Restart
sudo systemctl status mongod  # Check status
```

### Port Opened:

```
Port 27017 is now listening
Your application connects to: localhost:27017
```

---

## 🔍 Useful Commands for Any Project

### Check if MongoDB is Running:
```bash
sudo systemctl status mongod
# or
ps aux | grep mongod
# or
sudo lsof -i :27017
```

### View MongoDB Logs:
```bash
sudo tail -f /var/log/mongodb/mongod.log
```

### Connect to MongoDB Shell:
```bash
mongosh
```

### Inside MongoDB Shell:
```javascript
// Show all databases
show dbs

// Use a database
use city_cms

// Show collections
show collections

// Query data
db.users.find()
db.complaints.find()

// Count documents
db.users.countDocuments()

// Exit shell
exit
```

---

## 🛠️ Troubleshooting

### Issue: "Failed to start mongod.service"

**Check logs**:
```bash
sudo journalctl -u mongod -n 50
```

**Common causes**:
1. Port 27017 already in use
2. Permission issues with data directory
3. Corrupted data files

**Solutions**:
```bash
# Check port
sudo lsof -i :27017

# Fix permissions
sudo chown -R mongodb:mongodb /var/lib/mongodb
sudo chown mongodb:mongodb /tmp/mongodb-27017.sock

# Restart
sudo systemctl restart mongod
```

### Issue: "Connection refused"

**Check if running**:
```bash
sudo systemctl status mongod
```

**Start if not running**:
```bash
sudo systemctl start mongod
```

### Issue: "mongosh: command not found"

**Install shell separately**:
```bash
sudo apt-get install -y mongodb-mongosh
```

---

## 🔐 Security Note (For Production)

Your current setup has **no authentication** (fine for development).

For production, enable authentication:

```bash
# 1. Connect to MongoDB
mongosh

# 2. Create admin user
use admin
db.createUser({
  user: "admin",
  pwd: "securePassword123",
  roles: ["userAdminAnyDatabase", "readWriteAnyDatabase"]
})

# 3. Enable auth in config
sudo nano /etc/mongod.conf
# Add: security.authorization: enabled

# 4. Restart MongoDB
sudo systemctl restart mongod

# 5. Update connection string
# mongodb://admin:securePassword123@localhost:27017/city_cms?authSource=admin
```

---

## 📊 MongoDB Configuration File

Location: `/etc/mongod.conf`

```yaml
# Where data is stored
storage:
  dbPath: /var/lib/mongodb

# Where logs are written
systemLog:
  destination: file
  path: /var/log/mongodb/mongod.log

# Network settings
net:
  port: 27017
  bindIp: 127.0.0.1  # Only localhost (secure)

# Process management
processManagement:
  timeZoneInfo: /usr/share/zoneinfo
```

**To change port** (if 27017 is used):
```bash
sudo nano /etc/mongod.conf
# Change: port: 27017 to port: 27018
sudo systemctl restart mongod
# Update .env: MONGODB_URI=mongodb://localhost:27018/city_cms
```

---

## 🎯 Verification Checklist

After installation, verify:

- [ ] MongoDB service is running: `sudo systemctl status mongod`
- [ ] MongoDB shell works: `mongosh --eval "db.version()"`
- [ ] Port 27017 is listening: `sudo lsof -i :27017`
- [ ] Backend connects: `cd backend && npm run dev`
- [ ] See "MongoDB Connected" in backend logs
- [ ] Can run tests: `./test-api.sh`

---

## 🚀 Next Steps

Once MongoDB is installed and running:

1. ✅ Keep this terminal open with backend running
2. ✅ Open new terminal and run: `./test-api.sh`
3. ✅ Watch as data is created in MongoDB
4. ✅ Explore data: `mongosh city_cms`

---

## 📚 Learning Resources

- MongoDB Manual: https://docs.mongodb.com/manual/
- MongoDB University (Free): https://university.mongodb.com/
- Mongoose Docs: https://mongoosejs.com/docs/

---

## 💡 Key Concepts Recap

**MongoDB** = NoSQL database that stores JSON-like documents
**mongod** = The database server (runs in background)
**mongosh** = Shell to interact with MongoDB
**Port 27017** = Default MongoDB port
**Connection String** = How apps connect to MongoDB
**Collections** = Like tables in SQL
**Documents** = Like rows in SQL (but flexible)

---

You're now ready to use MongoDB in this and any other project! 🎉
