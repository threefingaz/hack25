#!/bin/bash

# CashFlow Bridge Development Startup Script
# This script reliably starts both servers and handles common issues

echo "🚀 Starting CashFlow Bridge Development Environment..."

# Kill any existing processes on our ports
echo "🧹 Cleaning up existing processes..."
pkill -f "react-scripts" 2>/dev/null || true
pkill -f "nodemon" 2>/dev/null || true
pkill -f "node.*server" 2>/dev/null || true

# Force kill anything on our target ports
lsof -ti:3001 2>/dev/null | xargs kill -9 2>/dev/null || true
lsof -ti:3002 2>/dev/null | xargs kill -9 2>/dev/null || true

# Wait a moment for cleanup
sleep 2

echo "✅ Cleanup complete"

# Start the Express server
echo "🔧 Starting Express server on port 3001..."
(cd server && npm run dev) &
SERVER_PID=$!

# Wait for server to start
sleep 3

# Test server health
if curl -s http://localhost:3001/api/health > /dev/null; then
    echo "✅ Server running successfully on http://localhost:3001"
else
    echo "❌ Server failed to start on port 3001"
    exit 1
fi

# Start the React client on port 3002
echo "⚛️  Starting React client on port 3002..."
(cd client && PORT=3002 npm start) &
CLIENT_PID=$!

# Wait for client to start
sleep 5

# Test client
if curl -s http://localhost:3002 > /dev/null; then
    echo "✅ Client running successfully on http://localhost:3002"
else
    echo "❌ Client failed to start on port 3002"
    kill $SERVER_PID 2>/dev/null || true
    exit 1
fi

echo ""
echo "🎉 CashFlow Bridge Development Environment Ready!"
echo ""
echo "📱 Client: http://localhost:3002"
echo "🔧 Server: http://localhost:3001"
echo "❤️  Health: http://localhost:3001/api/health"
echo ""
echo "Press Ctrl+C to stop all servers"

# Keep script running and handle cleanup on exit
trap 'echo "🛑 Stopping servers..."; kill $SERVER_PID $CLIENT_PID 2>/dev/null || true; exit 0' INT

# Wait for both processes
wait $SERVER_PID $CLIENT_PID