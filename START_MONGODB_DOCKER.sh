#!/bin/bash

# Start MongoDB using Docker - Simple and Fast!

echo "Starting MongoDB with Docker..."
echo ""

# Pull MongoDB image (if not already downloaded)
echo "→ Pulling MongoDB image..."
docker pull mongo:7.0

# Start MongoDB container
echo "→ Starting MongoDB container..."
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  mongo:7.0

# Wait for MongoDB to start
echo "→ Waiting for MongoDB to start..."
sleep 3

# Check if running
if docker ps | grep mongodb > /dev/null; then
    echo ""
    echo "✓ MongoDB is running!"
    echo ""
    echo "MongoDB is now available at: localhost:27017"
    echo ""
    echo "Useful commands:"
    echo "  Stop:    docker stop mongodb"
    echo "  Start:   docker start mongodb"
    echo "  Remove:  docker rm -f mongodb"
    echo "  Shell:   docker exec -it mongodb mongosh"
    echo ""
    echo "Next: Start your backend with 'cd backend && npm run dev'"
else
    echo "✗ Failed to start MongoDB"
    docker logs mongodb
fi
