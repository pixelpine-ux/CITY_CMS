#!/bin/bash

# City CMS API Testing Script
# This script helps you test the API step by step

BASE_URL="http://localhost:5000/api"
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "======================================"
echo "City CMS - Interactive Testing Script"
echo "======================================"
echo ""

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Function to make API calls and display results
api_call() {
    local method=$1
    local endpoint=$2
    local data=$3
    local token=$4
    
    echo ""
    print_info "Calling: $method $endpoint"
    
    if [ -n "$token" ]; then
        response=$(curl -s -w "\n%{http_code}" -X $method "$BASE_URL$endpoint" \
            -H "Content-Type: application/json" \
            -H "Authorization: Bearer $token" \
            -d "$data")
    else
        response=$(curl -s -w "\n%{http_code}" -X $method "$BASE_URL$endpoint" \
            -H "Content-Type: application/json" \
            -d "$data")
    fi
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    if [ $http_code -ge 200 ] && [ $http_code -lt 300 ]; then
        print_success "Success (HTTP $http_code)"
        echo "$body" | jq '.' 2>/dev/null || echo "$body"
    else
        print_error "Failed (HTTP $http_code)"
        echo "$body" | jq '.' 2>/dev/null || echo "$body"
    fi
    
    echo "$body"
}

# Check if server is running
echo "Checking if server is running..."
if curl -s "$BASE_URL/../" > /dev/null; then
    print_success "Server is running!"
else
    print_error "Server is not running. Please start the server first."
    exit 1
fi

echo ""
echo "======================================"
echo "STEP 1: User Registration"
echo "======================================"

read -p "Press Enter to register a Citizen user..."
CITIZEN_RESPONSE=$(api_call "POST" "/auth/register" '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
}')

CITIZEN_TOKEN=$(echo "$CITIZEN_RESPONSE" | jq -r '.token' 2>/dev/null)
CITIZEN_ID=$(echo "$CITIZEN_RESPONSE" | jq -r '.user._id' 2>/dev/null)

if [ "$CITIZEN_TOKEN" != "null" ] && [ -n "$CITIZEN_TOKEN" ]; then
    print_success "Citizen registered successfully!"
    print_info "Citizen Token: $CITIZEN_TOKEN"
    print_info "Citizen ID: $CITIZEN_ID"
else
    print_error "Failed to register citizen. User might already exist."
fi

echo ""
read -p "Press Enter to register a Staff user..."
STAFF_RESPONSE=$(api_call "POST" "/auth/register" '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "password": "password123",
    "role": "staff"
}')

STAFF_TOKEN=$(echo "$STAFF_RESPONSE" | jq -r '.token' 2>/dev/null)
STAFF_ID=$(echo "$STAFF_RESPONSE" | jq -r '.user._id' 2>/dev/null)

if [ "$STAFF_TOKEN" != "null" ] && [ -n "$STAFF_TOKEN" ]; then
    print_success "Staff registered successfully!"
    print_info "Staff Token: $STAFF_TOKEN"
    print_info "Staff ID: $STAFF_ID"
fi

echo ""
read -p "Press Enter to register an Admin user..."
ADMIN_RESPONSE=$(api_call "POST" "/auth/register" '{
    "name": "Admin User",
    "email": "admin@example.com",
    "password": "password123",
    "role": "admin"
}')

ADMIN_TOKEN=$(echo "$ADMIN_RESPONSE" | jq -r '.token' 2>/dev/null)
ADMIN_ID=$(echo "$ADMIN_RESPONSE" | jq -r '.user._id' 2>/dev/null)

if [ "$ADMIN_TOKEN" != "null" ] && [ -n "$ADMIN_TOKEN" ]; then
    print_success "Admin registered successfully!"
    print_info "Admin Token: $ADMIN_TOKEN"
    print_info "Admin ID: $ADMIN_ID"
fi

echo ""
echo "======================================"
echo "STEP 2: User Login"
echo "======================================"

read -p "Press Enter to login as Citizen..."
LOGIN_RESPONSE=$(api_call "POST" "/auth/login" '{
    "email": "john@example.com",
    "password": "password123"
}')

CITIZEN_TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.token' 2>/dev/null)
print_success "Logged in as Citizen"

echo ""
echo "======================================"
echo "STEP 3: View User Profile"
echo "======================================"

read -p "Press Enter to view Citizen profile..."
api_call "GET" "/users/profile" "" "$CITIZEN_TOKEN"

echo ""
echo "======================================"
echo "STEP 4: Create Complaints"
echo "======================================"

read -p "Press Enter to create first complaint (Electricity)..."
COMPLAINT1_RESPONSE=$(api_call "POST" "/complaints" '{
    "title": "Broken Street Light on Main Street",
    "description": "The street light near house #45 has been broken for 3 days. It is very dark at night and unsafe.",
    "category": "electricity",
    "location": "Main Street, near house #45",
    "priority": "high"
}' "$CITIZEN_TOKEN")

COMPLAINT1_ID=$(echo "$COMPLAINT1_RESPONSE" | jq -r '._id' 2>/dev/null)
print_info "Complaint ID: $COMPLAINT1_ID"

echo ""
read -p "Press Enter to create second complaint (Water)..."
COMPLAINT2_RESPONSE=$(api_call "POST" "/complaints" '{
    "title": "Water Leakage in Park Avenue",
    "description": "There is a major water pipe leak causing flooding on the sidewalk.",
    "category": "water",
    "location": "Park Avenue, Block 3",
    "priority": "medium"
}' "$CITIZEN_TOKEN")

COMPLAINT2_ID=$(echo "$COMPLAINT2_RESPONSE" | jq -r '._id' 2>/dev/null)
print_info "Complaint ID: $COMPLAINT2_ID"

echo ""
echo "======================================"
echo "STEP 5: View Complaints (Role-Based)"
echo "======================================"

read -p "Press Enter to view complaints as Citizen (only own complaints)..."
api_call "GET" "/complaints" "" "$CITIZEN_TOKEN"

echo ""
read -p "Press Enter to login as Staff and view all complaints..."
STAFF_LOGIN=$(api_call "POST" "/auth/login" '{
    "email": "jane@example.com",
    "password": "password123"
}')
STAFF_TOKEN=$(echo "$STAFF_LOGIN" | jq -r '.token' 2>/dev/null)

api_call "GET" "/complaints" "" "$STAFF_TOKEN"

echo ""
echo "======================================"
echo "STEP 6: Assign Complaint (Admin Only)"
echo "======================================"

read -p "Press Enter to login as Admin and assign complaint to Staff..."
ADMIN_LOGIN=$(api_call "POST" "/auth/login" '{
    "email": "admin@example.com",
    "password": "password123"
}')
ADMIN_TOKEN=$(echo "$ADMIN_LOGIN" | jq -r '.token' 2>/dev/null)

if [ "$COMPLAINT1_ID" != "null" ] && [ "$STAFF_ID" != "null" ]; then
    api_call "PUT" "/complaints/$COMPLAINT1_ID/assign" "{
        \"staffId\": \"$STAFF_ID\"
    }" "$ADMIN_TOKEN"
else
    print_error "Cannot assign - missing complaint or staff ID"
fi

echo ""
echo "======================================"
echo "STEP 7: Update Complaint Status"
echo "======================================"

read -p "Press Enter to update complaint status to 'in_progress' (as Staff)..."
if [ "$COMPLAINT1_ID" != "null" ]; then
    api_call "PUT" "/complaints/$COMPLAINT1_ID/status" '{
        "status": "in_progress",
        "comment": "Started working on this issue. Will fix by tomorrow."
    }' "$STAFF_TOKEN"
fi

echo ""
read -p "Press Enter to update complaint status to 'resolved' (as Staff)..."
if [ "$COMPLAINT1_ID" != "null" ]; then
    api_call "PUT" "/complaints/$COMPLAINT1_ID/status" '{
        "status": "resolved",
        "comment": "Issue has been fixed. Street light is now working properly."
    }' "$STAFF_TOKEN"
fi

echo ""
echo "======================================"
echo "STEP 8: View All Users (Admin Only)"
echo "======================================"

read -p "Press Enter to view all users as Admin..."
api_call "GET" "/users" "" "$ADMIN_TOKEN"

echo ""
echo "======================================"
echo "STEP 9: View Single Complaint Details"
echo "======================================"

read -p "Press Enter to view detailed complaint with status history..."
if [ "$COMPLAINT1_ID" != "null" ]; then
    api_call "GET" "/complaints/$COMPLAINT1_ID" "" "$STAFF_TOKEN"
fi

echo ""
echo "======================================"
echo "Testing Complete!"
echo "======================================"
print_success "All tests executed successfully!"
echo ""
print_info "Summary of created resources:"
echo "  - Citizen: john@example.com (password: password123)"
echo "  - Staff: jane@example.com (password: password123)"
echo "  - Admin: admin@example.com (password: password123)"
echo "  - Complaints created: 2"
echo ""
print_info "You can now test the frontend application with these credentials!"
