# Quick Start: Network Error Fix Testing

## 🚀 Quick Setup (5 minutes)

### 1. Ensure Backend Server is Running
```powershell
# Open a new terminal/PowerShell window
cd server
npm install  # If not already done
npm start
# You should see: ✅ Server running on http://localhost:5000
```

### 2. Ensure Frontend is Running
```powershell
# In another terminal
npm run dev
# You should see: ✅ Local: http://localhost:5173/
```

### 3. Frontend will now automatically use the `.env` file
The `.env` file already created contains:
```env
VITE_API_URL=http://localhost:5000
VITE_API_TIMEOUT=10000
```

---

## 🧪 Testing the Fix

### Test 1: Check Browser Console Logs
1. Open http://localhost:5173 in browser
2. Press `F12` to open DevTools
3. Click **Console** tab
4. Reload the page (`Ctrl+R`)
5. You should see logs like:
```
🔌 API Configuration:
   Base URL: http://localhost:5000/api
   Timeout: 10000 ms

📤 GET http://localhost:5000/api/dashboard
✅ Response received (145ms): 200 OK
✅ Dashboard data loaded successfully
```

### Test 2: Check Network Tab (for CORS issues)
1. Click **Network** tab in DevTools
2. Reload page
3. Look for:
   - `dashboard` request → Should be **green (200 OK)**
   - `pending-fees` request → Should be **green (200 OK)**
4. Click each request to see:
   - **Headers**: Correct URL, Content-Type
   - **Response**: JSON data
   - **Status**: Should be 200

### Test 3: Quick Connection Test
In browser console (F12), run:
```javascript
import { testConnection } from './src/services/apiService.js'
await testConnection()
```
Expected output:
```
🧪 Testing API connection...
   Backend URL: http://localhost:5000/api
🏥 Running health check...
✅ Server is healthy
✅ Connection successful!
```

### Test 4: Fetch Dashboard Data Manually
In browser console:
```javascript
import { fetchDashboardData } from './src/services/apiService.js'
const result = await fetchDashboardData()
console.log(result)
// Should show: {success: true, data: {...dashboard data...}}
```

---

## ✅ What to Look For (Success Indicators)

| Check | Expected | Status |
|-------|----------|--------|
| Backend starts without errors | `✅ Server running on http://localhost:5000` | ✓ |
| Frontend loads | Dashboard displays with data | ✓ |
| Console logs | 📤, ✅ emoji logs visible | ✓ |
| Network tab | All requests are 200 OK (green) | ✓ |
| Dashboard cards | Show fee data (collected, pending, overdue, refund) | ✓ |
| Charts | Monthly and payment method charts render | ✓ |

---

## ❌ Troubleshooting If Still Getting Errors

### Error: "Network Error - Backend server not responding"

**Step 1:** Check if backend is running
```powershell
# In PowerShell
curl http://localhost:5000/api/health

# Expected response:
# {"status":"OK","timestamp":"2024-03-18T...","uptime":123.45}
```

**Step 2:** If curl fails, start the backend
```powershell
cd server
npm install
npm start
```

**Step 3:** Restart frontend dev server
```powershell
# Press Ctrl+C in the frontend terminal
npm run dev
```

---

### Error: "CORS policy: No 'Access-Control-Allow-Origin'"

**Cause:** Backend doesn't have CORS configured

**Fix:** Update `server/server.js` with CORS middleware

1. Install CORS package:
```powershell
cd server
npm install cors
```

2. Add to top of `server.js`:
```javascript
import cors from 'cors'

// After const app = express()
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}))
```

3. Restart backend

---

### Error: "[404] Not Found"

**Cause:** Backend endpoint doesn't exist

**Check:** Verify backend has these endpoints:
- `GET /api/health`
- `GET /api/dashboard`
- `GET /api/transactions`
- `GET /api/pending-fees`
- `GET /api/invoice/:invoiceId`
- `POST /api/payment`

See `SERVER_IMPROVEMENTS.md` for example endpoints.

---

### Error: "Request Timeout"

**Cause:** API taking longer than configured timeout (10 seconds)

**Fix:** Increase timeout in `.env`:
```env
VITE_API_TIMEOUT=20000
```

Then restart frontend dev server.

---

## 🔍 Detailed Debugging Guide

For comprehensive debugging steps, see: **`API_DEBUGGING_GUIDE.md`**

Key sections:
- Step-by-step checklist
- DevTools Network tab walkthrough
- Common errors and solutions
- Backend CORS configuration
- Frontend and backend startup commands

---

## 📊 Architecture Overview

```
Browser (http://localhost:5173)
    ↓ (Axios requests)
App.jsx → Dashboard.jsx → apiService.js
    ↓ (With logging & error handling)
Backend (http://localhost:5000/api)
    ↓ (CORS enabled)
API Responses (JSON data)
```

---

## 💾 File Summary

| File | Purpose | Status |
|------|---------|--------|
| `.env` | Environment variables | ✅ Created |
| `.env.example` | Configuration template | ✅ Created |
| `src/services/apiService.js` | Enhanced API client | ✅ Updated |
| `src/pages/Dashboard.jsx` | Better error UI | ✅ Updated |
| `API_DEBUGGING_GUIDE.md` | Comprehensive guide | ✅ Created |
| `SERVER_IMPROVEMENTS.md` | Backend example | ✅ Created |
| `QUICK_START_TESTING.md` | This file | ✅ Created |

---

## 🎯 Next Steps

1. ✅ Ensure `.env` exists with API URL
2. ✅ Start backend: `cd server && npm start`
3. ✅ Start frontend: `npm run dev`
4. ✅ Check console for 📤✅ emoji logs
5. ✅ Verify dashboard displays data
6. ✅ If error, follow troubleshooting above
7. ✅ Reference `API_DEBUGGING_GUIDE.md` for detailed debugging

---

## 📞 Support

**Quick Diagnostics:**
```javascript
// Paste in browser console
import { testConnection } from './src/services/apiService.js'
await testConnection()
```

**Check Environment:**
```javascript
// Paste in browser console
console.log('API URL:', import.meta.env.VITE_API_URL)
console.log('Timeout:', import.meta.env.VITE_API_TIMEOUT)
```

**View Full Error Details:**
```
Open DevTools → Console tab → Look for ❌ API Error Details section
```
