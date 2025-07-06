# CashFlow Bridge Development Guide

## Quick Start

### Option 1: Automated Script (Recommended)
```bash
npm run dev:all
```

### Option 2: Manual Start
```bash
# Terminal 1 - Server
npm run server

# Terminal 2 - Client  
npm run client
```

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev:all` | Start both server and client with automated setup |
| `npm run server` | Start only the Express server (port 3001) |
| `npm run client` | Start only the React client (port 3002) |
| `npm run stop` | Stop all development servers |
| `npm run restart` | Stop and restart all servers |
| `npm run health` | Check if both servers are responding |
| `npm run build` | Build React app for production |

## Service URLs

- **Client Application**: http://localhost:3002
- **Express API Server**: http://localhost:3001
- **Health Check**: http://localhost:3001/api/health

## Troubleshooting

### Port Already in Use
```bash
# Kill processes on specific ports
lsof -ti:3001 | xargs kill -9
lsof -ti:3002 | xargs kill -9

# Or use our stop command
npm run stop
```

### Server Not Responding
```bash
# Check server status
npm run health

# Force restart
npm run restart
```

### Client Won't Start
```bash
# Clear React cache
cd client && rm -rf node_modules/.cache
npm run client
```

### General Reset
```bash
# Nuclear option - restart everything
npm run stop
sleep 3
npm run dev:all
```

## Development Workflow

1. **Start Development**:
   ```bash
   npm run dev:all
   ```

2. **Verify Running**:
   - Visit http://localhost:3002
   - Check http://localhost:3001/api/health

3. **Stop Development**:
   ```bash
   npm run stop
   # or press Ctrl+C in the script terminal
   ```

## Common Issues & Solutions

### Issue: "This site can't be reached"
**Solution**: 
- Check if processes are actually running: `ps aux | grep -E "(react|node)"`
- Restart with: `npm run restart`
- Check ports with: `lsof -i :3001,3002`

### Issue: API calls failing (ERR_CONNECTION_REFUSED)
**Solution**:
- Verify server is running: `curl http://localhost:3001/api/health`
- Check CORS configuration in server/server.js
- Restart server: `npm run server`

### Issue: React app compiles but page is blank
**Solution**:
- Check browser console for errors
- Clear browser cache (Cmd+Shift+R on Mac)
- Check if client is running on correct port (3002)

### Issue: Changes not reflecting
**Solution**:
- React: Hot reload should work automatically
- Server: Nodemon should restart automatically
- If issues persist: `npm run restart`

## File Structure
```
/
├── client/          # React application
├── server/          # Express API server
├── docs/            # Documentation
├── start-dev.sh     # Development startup script
└── package.json     # Root scripts and dependencies
```

## Environment Variables
```bash
# Server (.env)
PORT=3001
NODE_ENV=development

# Client
PORT=3002 (set via npm script)
```