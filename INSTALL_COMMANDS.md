# MongoDB Installation Commands - Run These in Your Terminal

## 🚀 Copy and paste these commands one by one in your terminal

MongoDB requires sudo access, so you'll need to run these commands in your terminal.

---

## Step 1: Import MongoDB GPG Key
```bash
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
  sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg
```
**What this does**: Adds security key to verify MongoDB packages

---

## Step 2: Add MongoDB Repository
```bash
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/7.0 multiverse" | \
  sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
```
**What this does**: Tells your system where to download MongoDB

---

## Step 3: Update Package List
```bash
sudo apt-get update
```
**What this does**: Refreshes available packages list

---

## Step 4: Install MongoDB
```bash
sudo apt-get install -y mongodb-org
```
**What this does**: Installs MongoDB server, shell, and tools (takes 2-3 minutes)

---

## Step 5: Start MongoDB
```bash
sudo systemctl start mongod
```
**What this does**: Starts MongoDB service

---

## Step 6: Enable Auto-Start
```bash
sudo systemctl enable mongod
```
**What this does**: MongoDB will start automatically on boot

---

## Step 7: Verify Installation
```bash
sudo systemctl status mongod
```
**Expected**: Should show "active (running)" in green
**Press Q to exit**

---

## Step 8: Test MongoDB Shell
```bash
mongosh --eval "db.version()"
```
**Expected**: Should show MongoDB version (7.0.x)

---

## Step 9: Test with Your Project
```bash
cd /home/dog/Desktop/CITY_CMS/backend
npm run dev
```
**Expected**: Should show "MongoDB Connected"

---

## 🎯 Quick Install (All Commands at Once)

If you want to run all commands at once, copy this entire block:

```bash
# Import GPG key
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
  sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg

# Add repository
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/7.0 multiverse" | \
  sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update packages
sudo apt-get update

# Install MongoDB
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod

# Enable auto-start
sudo systemctl enable mongod

# Verify
echo ""
echo "Checking MongoDB status..."
sudo systemctl status mongod | head -10
echo ""
echo "Testing MongoDB shell..."
mongosh --eval "db.version()"
echo ""
echo "✓ MongoDB installation complete!"
```

---

## ✅ After Installation

Once MongoDB is running, test your project:

```bash
cd /home/dog/Desktop/CITY_CMS/backend
npm run dev
```

Look for: **"MongoDB Connected"** ✅

Then run tests:
```bash
cd /home/dog/Desktop/CITY_CMS
./test-api.sh
```

---

## 🐛 If Something Goes Wrong

### Check MongoDB status:
```bash
sudo systemctl status mongod
```

### View logs:
```bash
sudo tail -20 /var/log/mongodb/mongod.log
```

### Restart MongoDB:
```bash
sudo systemctl restart mongod
```

### Check if port is listening:
```bash
sudo lsof -i :27017
```
