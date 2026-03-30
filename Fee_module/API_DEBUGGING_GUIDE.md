# Network Error Debugging Guide

## ✅ What Was Fixed

### 1. **Environment Variables** 
- Created `.env` file to use `VITE_API_URL` instead of hardcoded URL
- `apiService.js` now reads from environment variables
- Easy to change for different environments (dev, staging, production)

### 2. **Enhanced Error Logging**
- Added request/response interceptors to log all API calls
- Logs show: request URL, response status, duration, and full error details
- Error messages now display `error.response` (status, headers, data) instead of just `error.message`

### 3. **Better Dashboard Error UI**
- Shows detailed error message
- Provides troubleshooting steps
- Includes debugging instructions

---

## 🔧 Backend CORS Configuration (Express.js)

If you encounter CORS errors, make sure your `server/server.js` includes:

```javascript
import express from 'express'
import cors from 'cors'  // npm install cors

const app = express()
const PORT = 5000

// ✅ CORS Configuration - Allow frontend requests
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],  // Your frontend URLs
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())

// Add Content-Type header to responses
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json')
  next()
})

// ==================== API ENDPOINTS ====================

// Health check endpoint - useful for testing connectivity
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() })
})

app.get('/api/dashboard', (req, res) => {
  // Your dashboard data logic
  res.json({
    totalCollected: 500000,
    totalPending: 250000,
    totalOverdue: 75000,
    totalRefund: 15000,
    monthlyData: [...],
    paymentMethodData: [...]
  })
})

app.get('/api/transactions', (req, res) => {
  res.json(transactions)
})

// ... other endpoints

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`)
  console.log(`📡 CORS enabled for http://localhost:5173`)
})
```

**To install CORS middleware:**
```bash
cd server
npm install cors
```

---

## 🧪 Step-by-Step Debugging Checklist

### Step 1: Verify Backend is Running
```powershell
# In terminal, navigate to server folder
cd server
npm install  # If not done
npm start    # or node server.js

# You should see:
# ✅ Server running on http://localhost:5000
```

### Step 2: Test Backend Connection
Open browser console and run:
```javascript
// Copy and paste in browser console (F12)
import { testConnection } from './src/services/apiService.js'
await testConnection()

// ✅ If successful: You should see "Connection successful!"
// ❌ If fails: Check backend is running and CORS is configured
```

### Step 3: Check Environment Variables
Verify `.env` file has correct URL:
```bash
# .env file should contain:
VITE_API_URL=http://localhost:5000
VITE_API_TIMEOUT=10000
```

Restart development server to load new `.env`:
```powershell
# Press Ctrl+C to stop current dev server
# Then start fresh
npm run dev
```

### Step 4: Check Browser DevTools Network Tab

**Open DevTools (F12) → Network Tab**

1. **Reload the page** (`Ctrl+R`)
2. Look for requests starting with:
   - `http://localhost:5000/api/dashboard`
   - `http://localhost:5000/api/pending-fees`

3. **Check request details:**
   - Headers: Should see correct URL, Authorization header if needed
   - Response: Should show 200 status code and data

4. **Common Issues:**
   - **Status 0 (Network error)**: Backend not running
   - **Status 404**: Wrong endpoint path  
   - **Status 403/CORS error**: Backend CORS not configured properly
   - **Timeout**: Backend is slow or unreachable

### Step 5: Check Browser Console Logs

With the improved `apiService.js`, you'll see detailed logs:

```
🔌 API Configuration:
   Base URL: http://localhost:5000/api
   Timeout: 10000 ms

📤 GET http://localhost:5000/api/dashboard
✅ Response received (145ms): 200 OK

📊 Dashboard data loaded successfully
```

**If you see errors:**
```
❌ API Error Details:
   No response received from server
   This usually means:
     - Backend server is not running
     - Server is on wrong port
     - CORS policy is blocking the request
```

---

## 🔍 Common Errors and Solutions

### Error 1: "Network Error - Backend server not responding"
**Cause:** Backend (http://localhost:5000) is not running

**Fix:**
```powershell
cd server
npm start
# Should show: ✅ Server running on http://localhost:5000
```

### Error 2: "CORS policy: No 'Access-Control-Allow-Origin' header"
**Cause:** Backend CORS is not properly configured

**Fix:** Update `server/server.js`:
```javascript
import cors from 'cors'  // Add this line
app.use(cors())  // Add this line before routes
```

### Error 3: "[404] Not Found - dashboard"
**Cause:** Backend endpoint doesn't exist or path is wrong

**Fix:** Check backend has this route:
```javascript
app.get('/api/dashboard', (req, res) => {
  res.json({ /* data */ })
})
```

### Error 4: "Request Timeout"
**Cause:** Backend is too slow (taking >10000ms)

**Fix:** Increase timeout in `.env`:
```
VITE_API_TIMEOUT=20000
```

---

## 📱 Testing with Frontend

### Test 1: Manual Health Check (in browser console)
```javascript
import { testConnection } from './src/services/apiService.js'
await testConnection()
// When successful:
// 🏥 Running health check...
// ✅ Connection successful!
```

### Test 2: Fetch Specific Data (in browser console)
```javascript
import { fetchDashboardData } from './src/services/apiService.js'
const result = await fetchDashboardData()
console.log(result)
// Check if success: true or false
```

### Test 3: Use curl/PowerShell to test backend directly
```powershell
# Test if backend is running
curl http://localhost:5000/api/health

# Test dashboard endpoint
curl http://localhost:5000/api/dashboard

# Expected response:
# {"status": "OK", ...}
```

---

## 🚀 Environment Configuration

### Development Setup
`.env` file:
```
VITE_API_URL=http://localhost:5000
VITE_API_TIMEOUT=10000
```

### Production Setup  
`.env.production` (create separate file):
```
VITE_API_URL=https://api.your-domain.com
VITE_API_TIMEOUT=15000
```

Build for production:
```bash
npm run build
# Uses .env file for build time and respects environment-specific URLs
```

---

## 📊 API Service Architecture

```
Frontend (http://localhost:5173)
       ↓ (axios requests with interceptors)
  apiService.js (improved)
       ├── Request Interceptor (logs, adds auth headers)
       ├── Response Interceptor (logs success/error, formats errors)
       └── Helper functions (formatErrorMessage, testConnection)
       ↓
Backend API (http://localhost:5000)
       ├── CORS enabled
       ├── /api/dashboard
       ├── /api/transactions
       └── ... other endpoints
```

---

## ✨ Key Improvements Made

| Issue | Before | After |
|-------|--------|-------|
| **API URL** | Hardcoded in code | Environment variable (`VITE_API_URL`) |
| **Error Logging** | `error.message` only | Full `error.response` with status, headers, data |
| **Request Tracking** | No visibility | Request/response interceptors with emoji indicators |
| **Response Time** | Unknown | Logged response duration |
| **CORS Debugging** | Unclear errors | Specific error messages suggesting CORS configuration |
| **Timeout Handling** | Generic | Specific timeout error with configured duration |
| **Authentication** | N/A | Ready for JWT token support (stored in localStorage) |
| **Connection Testing** | Manual curl needed | `testConnection()` function available |

---

## 📞 Quick Reference Commands

```powershell
# Start backend
cd server && npm start

# Start frontend (in another terminal)
npm run dev

# Test backend health
curl http://localhost:5000/api/health

# Check frontend is running
curl http://localhost:5173

# Rebuild frontend if .env changes
npm run dev  # Restart dev server

# Check environment variables are loaded
# In browser console: console.log(import.meta.env)
```

---

## 🎯 Next Steps

1. ✅ Install CORS in backend: `npm install cors` (in server folder)
2. ✅ Update `server.js` with CORS configuration from above
3. ✅ Create/update `.env` file with `VITE_API_URL`
4. ✅ Restart Vite dev server
5. ✅ Restart Express backend
6. ✅ Open browser console and check for API logs
7. ✅ Test using DevTools Network tab
8. ✅ Use `testConnection()` function if still having issues
