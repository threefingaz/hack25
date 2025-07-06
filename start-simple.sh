#!/bin/bash

echo "🚀 Starting CashFlow Bridge Development Environment..."

# Stop any existing processes
npm run stop

echo "🔧 Starting servers..."

# Start server in background
npm run server &
SERVER_PID=$!

# Wait for server
sleep 3

# Start client  
npm run client &
CLIENT_PID=$!

echo "🎉 Servers starting..."
echo "📱 Client: http://localhost:3002"
echo "🔧 Server: http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop all servers"

# Handle cleanup on exit
trap 'echo "🛑 Stopping servers..."; kill $SERVER_PID $CLIENT_PID 2>/dev/null || true; npm run stop; exit 0' INT

# Wait for both processes
wait $SERVER_PID $CLIENT_PID