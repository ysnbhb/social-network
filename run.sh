#!/bin/bash

# Navigate to backend and start the server
echo "Starting backend..."
cd backend
go run .  &
BACKEND_PID=$!
cd ..

# Navigate to frontend and start the dev server
echo "Starting frontend..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

# Wait for user input to stop the servers
echo "Press CTRL+C to stop both servers."

# Keep script running
wait $BACKEND_PID $FRONTEND_PID
