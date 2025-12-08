# MongoDB Setup Guide

## ⚠️ MongoDB Not Found

It looks like MongoDB is not installed on your system. You have two options:

---

## Option 1: Install MongoDB Locally (Recommended for Learning)

### For Ubuntu/Debian:
```bash
# Import MongoDB public GPG key
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-7.0.gpg --dearmor

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | \
   sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update package list
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod

# Enable MongoDB to start on boot
sudo systemctl enable mongod

# Check status
sudo systemctl status mongod
```

### For Fedora/RHEL:
```bash
# Create repository file
sudo tee /etc/yum.repos.d/mongodb-org-7.0.repo << EOF
[mongodb-org-7.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/\$releasever/mongodb-org/7.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-7.0.asc
EOF

# Install MongoDB
sudo dnf install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod

# Enable MongoDB to start on boot
sudo systemctl enable mongod
```

### For macOS:
```bash
# Install using Homebrew
brew tap mongodb/brew
brew install mongodb-community@7.0

# Start MongoDB
brew services start mongodb-community@7.0
```

---

## Option 2: Use MongoDB Atlas (Cloud - Free Tier)

If you don't want to install MongoDB locally, use MongoDB Atlas (free cloud database):

### Steps:

1. **Sign up for MongoDB Atlas**
   - Go to: https://www.mongodb.com/cloud/atlas/register
   - Create free account

2. **Create a Free Cluster**
   - Choose "Free" tier (M0)
   - Select region closest to you
   - Click "Create Cluster"

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `cityuser`
   - Password: `citypass123` (or your choice)
   - User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Whitelist Your IP**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://cityuser:<password>@cluster0.xxxxx.mongodb.net/`

6. **Update Backend .env File**
   ```bash
   cd /home/dog/Desktop/CITY_CMS/backend
   nano .env
   ```
   
   Replace:
   ```
   MONGODB_URI=mongodb://localhost:27017/city_cms
   ```
   
   With:
   ```
   MONGODB_URI=mongodb+srv://cityuser:citypass123@cluster0.xxxxx.mongodb.net/city_cms?retryWrites=true&w=majority
   ```
   
   (Replace `citypass123` with your actual password and update the cluster URL)

---

## Option 3: Use Docker (Quick Setup)

If you have Docker installed:

```bash
# Pull MongoDB image
docker pull mongo:7.0

# Run MongoDB container
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo:7.0

# Check if running
docker ps

# Your connection string in .env:
# MONGODB_URI=mongodb://admin:password@localhost:27017/city_cms?authSource=admin
```

To stop MongoDB:
```bash
docker stop mongodb
```

To start again:
```bash
docker start mongodb
```

---

## Verify MongoDB Installation

After installing, verify it's working:

```bash
# Check if MongoDB is running
sudo systemctl status mongod

# Or for Docker:
docker ps | grep mongodb

# Test connection
mongosh --eval "db.version()"
```

You should see MongoDB version number.

---

## Update Backend Configuration

Make sure your backend `.env` file has the correct MongoDB URI:

```bash
cd /home/dog/Desktop/CITY_CMS/backend
cat .env
```

Should contain:
```
MONGODB_URI=mongodb://localhost:27017/city_cms
```

Or for Atlas:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/city_cms
```

Or for Docker:
```
MONGODB_URI=mongodb://admin:password@localhost:27017/city_cms?authSource=admin
```

---

## Test Backend Connection

After MongoDB is running:

```bash
cd /home/dog/Desktop/CITY_CMS/backend
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB Connected
```

If you see "MongoDB Connected", you're ready to test! 🎉

---

## Common Issues

### Issue: "Connection refused"
**Solution**: MongoDB is not running
```bash
sudo systemctl start mongod
# or
docker start mongodb
```

### Issue: "Authentication failed"
**Solution**: Check username/password in connection string

### Issue: "Network timeout"
**Solution**: 
- Check firewall settings
- For Atlas: Verify IP whitelist
- Check internet connection

### Issue: "Port 27017 already in use"
**Solution**: Another MongoDB instance is running
```bash
sudo systemctl stop mongod
# or
docker stop mongodb
```

---

## Next Steps

Once MongoDB is running:

1. ✅ Start backend: `cd backend && npm run dev`
2. ✅ Run tests: `./test-api.sh`
3. ✅ Start frontend: `cd frontend && npm run dev`

---

## Quick Reference

### Local MongoDB Commands
```bash
# Start
sudo systemctl start mongod

# Stop
sudo systemctl stop mongod

# Status
sudo systemctl status mongod

# Connect to shell
mongosh

# View databases
mongosh --eval "show dbs"

# View collections in city_cms
mongosh city_cms --eval "show collections"

# View users
mongosh city_cms --eval "db.users.find().pretty()"

# View complaints
mongosh city_cms --eval "db.complaints.find().pretty()"

# Delete database (reset)
mongosh city_cms --eval "db.dropDatabase()"
```

### Docker MongoDB Commands
```bash
# Start
docker start mongodb

# Stop
docker stop mongodb

# View logs
docker logs mongodb

# Connect to shell
docker exec -it mongodb mongosh -u admin -p password

# Remove container
docker rm -f mongodb
```

---

## Recommended: Local Installation

For learning and development, I recommend **Option 1 (Local Installation)** because:
- ✅ Faster (no network latency)
- ✅ Works offline
- ✅ Full control
- ✅ Easy to reset/test
- ✅ No account needed

Choose **Option 2 (Atlas)** if:
- ❌ Can't install locally
- ✅ Want to access from multiple devices
- ✅ Want automatic backups
- ✅ Don't want to manage server

Choose **Option 3 (Docker)** if:
- ✅ Already have Docker
- ✅ Want easy cleanup
- ✅ Want isolated environment

---

## Need Help?

After setting up MongoDB, return to **START_HERE.md** to continue testing!
