#!/bin/bash

# MongoDB Installation Script for Linux Mint 22.1
# This script automates the installation process

set -e  # Exit on any error

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "======================================"
echo "MongoDB 7.0 Installation Script"
echo "For Linux Mint 22.1 (Ubuntu 24.04 base)"
echo "======================================"
echo ""

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}→ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Check if running as root
if [ "$EUID" -eq 0 ]; then 
    print_error "Please do not run as root. Run as normal user (script will ask for sudo when needed)"
    exit 1
fi

# Step 1: Import GPG Key
print_info "Step 1/7: Importing MongoDB GPG key..."
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | \
    sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg
print_success "GPG key imported"
echo ""

# Step 2: Add MongoDB Repository
print_info "Step 2/7: Adding MongoDB repository..."
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/7.0 multiverse" | \
    sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list > /dev/null
print_success "Repository added"
echo ""

# Step 3: Update Package List
print_info "Step 3/7: Updating package list..."
sudo apt-get update > /dev/null 2>&1
print_success "Package list updated"
echo ""

# Step 4: Install MongoDB
print_info "Step 4/7: Installing MongoDB (this may take a few minutes)..."
sudo apt-get install -y mongodb-org > /dev/null 2>&1
print_success "MongoDB installed"
echo ""

# Step 5: Start MongoDB
print_info "Step 5/7: Starting MongoDB service..."
sudo systemctl start mongod
print_success "MongoDB started"
echo ""

# Step 6: Enable Auto-start
print_info "Step 6/7: Enabling MongoDB to start on boot..."
sudo systemctl enable mongod > /dev/null 2>&1
print_success "Auto-start enabled"
echo ""

# Step 7: Verify Installation
print_info "Step 7/7: Verifying installation..."
sleep 2  # Give MongoDB time to fully start

if sudo systemctl is-active --quiet mongod; then
    print_success "MongoDB is running!"
else
    print_error "MongoDB failed to start"
    echo "Check logs: sudo journalctl -u mongod -n 50"
    exit 1
fi

# Test connection
if mongosh --eval "db.version()" > /dev/null 2>&1; then
    VERSION=$(mongosh --quiet --eval "db.version()")
    print_success "MongoDB shell connected (version: $VERSION)"
else
    print_error "Could not connect to MongoDB"
    exit 1
fi

echo ""
echo "======================================"
echo "✓ MongoDB Installation Complete!"
echo "======================================"
echo ""
echo "MongoDB is now running on: localhost:27017"
echo ""
echo "Useful commands:"
echo "  Start:   sudo systemctl start mongod"
echo "  Stop:    sudo systemctl stop mongod"
echo "  Status:  sudo systemctl status mongod"
echo "  Shell:   mongosh"
echo ""
echo "Next steps:"
echo "  1. Start your backend: cd backend && npm run dev"
echo "  2. Run tests: ./test-api.sh"
echo ""
print_success "Ready to use MongoDB!"
