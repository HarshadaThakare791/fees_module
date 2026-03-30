# School ERP Admin Dashboard - Full-Stack Setup Guide

## 📋 Overview

Complete full-stack implementation of a School ERP Admin Dashboard with:
- **React Frontend** with React Router navigation
- **Express.js Backend** with REST APIs
- **Dynamic data fetching** from backend
- **Complete payment flow** with invoice and payment pages
- **Bulk upload interface** with drag-and-drop

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### 1. Frontend Setup

```bash
# Navigate to project root
cd c:\Users\HP\Desktop\Fee\ Module\Fee_module

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

**Frontend runs on:** `http://localhost:5173`

### 2. Backend Setup

```bash
# Navigate to server folder
cd c:\Users\HP\Desktop\Fee\ Module\Fee_module\server

# Install dependencies (already done)
npm install

# Start backend server
npm start

# OR for watch mode (auto-reload)
npm run dev
```

**Backend runs on:** `http://localhost:5000`

---

## 📂 Project Structure

```
Fee_module/
├── src/
│   ├── pages/
│   │   ├── Dashboard.jsx          ✅ Dynamic dashboard
│   │   ├── Fees.jsx               ✅ All transactions/fees page
│   │   ├── Invoice.jsx            ✅ Invoice details
│   │   ├── Payment.jsx            ✅ Payment processing
│   │   ├── PaymentSuccess.jsx     ✅ Success confirmation
│   │   ├── BulkUpload.jsx
│   │   └── *.css
│   ├── components/
│   │   ├── Transactions/
│   │   │   ├── TransactionsTable.jsx
│   │   │   └── TransactionRow.jsx   ✅ Navigate on View button
│   │   ├── Charts/
│   │   │   ├── MonthlyFeeChart.jsx  ✅ Accepts data prop
│   │   │   └── PaymentMethodChart.jsx ✅ Accepts data prop
│   │   └── ...
│   ├── services/
│   │   └── apiService.js          ✅ API calls (axios)
│   └── App.jsx                    ✅ React Router setup
├── server/
│   ├── server.js                  ✅ Express API endpoints
│   ├── package.json
│   └── node_modules/
└── ...
```

---

## 🛣️ Navigation Flow

### Routes Implemented

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Dashboard | Main dashboard with summary cards |
| `/fees` | Fees | All transactions/payment monitoring |
| `/invoice/:invoiceId` | Invoice | Invoice details page |
| `/payment/:invoiceId` | Payment | Payment method selection |
| `/payment-success` | PaymentSuccess | Success confirmation |
| `/bulk-upload` | BulkUpload | CSV file upload |

### User Flow

```
Dashboard
  ↓
  ├─→ [View All] → /fees
  │     ↓
  │     └─→ [View] → /invoice/:id
  │           ↓
  │           └─→ [Proceed to Payment] → /payment/:id
  │                 ↓
  │                 └─→ [Pay] → /payment-success
  │
  └─→ [View] button on table → /invoice/:id → /payment/:id → /payment-success
```

---

## 📡 API Endpoints

### Available Endpoints

```
GET /api/dashboard
  Returns: { totalCollected, totalPending, totalOverdue, totalRefund, recentTransactions, monthlyData, paymentMethodData }

GET /api/transactions
  Returns: Array of all transactions

GET /api/invoice/:id
  Returns: Single invoice details with fee breakdown

POST /api/payment
  Payload: { invoiceId, amount, method }
  Returns: { success, transactionId, timestamp, ... }

GET /api/pending-fees
  Returns: Array of pending fees

GET /api/health
  Returns: Server status
```

---

## 🔄 Data Flow

### Dashboard Load Flow
1. User opens dashboard
2. `Dashboard.jsx` calls `fetchDashboardData()` via useEffect
3. `apiService.js` makes GET request to `/api/dashboard`
4. Server returns aggregated data from database
5. Component updates state and renders with real data

### Invoice View Flow
1. User clicks "View" button on any transaction
2. `TransactionRow.jsx` navigates using `navigate(`/invoice/${invoiceId}`)`
3. `Invoice.jsx` loads with `useParams()` to get invoiceId
4. Fetches invoice details from `/api/invoice/:id`
5. Displays invoice with fee breakdown

### Payment Flow
1. User on invoice page clicks "Proceed to Payment"
2. Navigates to `/payment/:invoiceId`
3. User selects payment method
4. Clicks "Pay ₹Amount"
5. Calls `POST /api/payment` endpoint
6. Server processes and returns transaction ID
7. Redirects to `/payment-success`
8. Displays payment confirmation with details

---

## 💾 Database Structure

### Sample Data (In-Memory)

#### Invoices Collection
```javascript
{
  id: "INV-2024-001",
  studentName: "Aarav Sharma",
  class: "Class 10-A",
  admissionId: "ADM-2024-1234",
  academicYear: "2024-2025",
  invoiceDate: "2024-03-01",
  dueDate: "2024-03-15",
  status: "Pending",
  totalAmount: 25000,
  paidAmount: 0,
  feeBreakdown: [
    { description: "Admission Fee", amount: 5000 },
    { description: "Tuition Fee", amount: 15000 },
    ...
  ]
}
```

#### Transactions Collection
```javascript
{
  id: 1,
  invoiceId: "INV-2024-003",
  studentName: "Rohan Gupta",
  class: "Class 8-C",
  amount: 28500,
  status: "Paid",
  paymentMethod: "Razorpay",
  transactionId: "TXN-1234567890",
  date: "2024-03-09"
}
```

---

## 🎨 Key Features Implemented

### ✅ Frontend Features
- **React Router Navigation** - Full routing between pages
- **Dynamic Data Fetching** - All data from backend API
- **Loading States** - Spinners during API calls
- **Error Handling** - User-friendly error messages
- **Real-time Data Binding** - Live updates from database
- **Payment Simulation** - Complete payment flow
- **Responsive Design** - Mobile-friendly UI

### ✅ Backend Features
- **RESTful APIs** - Clean API design
- **CORS Enabled** - Frontend-backend communication
- **Error Handling** - Proper error responses
- **Sample Data** - Pre-populated database
- **Mock Payment Processing** - Transaction simulation
- **Data Aggregation** - Dashboard summaries

### ✅ Component Updates
- **Dashboard** - Fetches dynamic data
- **TransactionRow** - Navigation on View button
- **Charts** - Accept data as props
- **All Pages** - Connected to backend

---

## 🧪 Testing the Flow

### 1. Start Both Servers
```bash
# Terminal 1: Backend
cd server && npm start

# Terminal 2: Frontend
npm run dev
```

### 2. Open Browser
```
http://localhost:5173
```

### 3. Test Navigation Flow
1. **Dashboard** - See data from `/api/dashboard`
2. Click **"View All"** → Navigate to `/fees`
3. Click **"View"** on any transaction → Navigate to `/invoice/:id`
4. Click **"Proceed to Payment"** → Navigate to `/payment/:id`
5. Select payment method → Click **"Pay"**
6. See success page with transaction ID

### 4. Verify Dynamic Data
- Numbers on dashboard change based on API data
- Invoice details show correct fee breakdown
- Transaction list filters work
- Payment methods display correctly

---

## 🔧 Configuration

### API Base URL
Located in `src/services/apiService.js`:
```javascript
const API_BASE_URL = 'http://localhost:5000/api'
```

### Backend Port
Located in `server/server.js`:
```javascript
const PORT = 5000
```

### Frontend Port
Vite default: `http://localhost:5173`

---

## 📦 Dependencies

### Frontend
- `react` - UI library
- `react-router-dom` - Navigation
- `axios` - HTTP client
- `recharts` - Charts
- `lucide-react` - Icons

### Backend
- `express` - Web framework
- `cors` - Cross-origin requests

---

## 🐛 Troubleshooting

### Issue: "Cannot GET /api/..."
**Solution:** Make sure backend is running on port 5000

### Issue: CORS Error
**Solution:** Backend has CORS enabled. Check if API URL matches in `apiService.js`

### Issue: Data not updating
**Solution:** 
1. Check backend console for errors
2. Verify API endpoint exists
3. Check network tab in browser DevTools

### Issue: Navigation not working
**Solution:** 
1. Ensure React Router is properly set up in App.jsx
2. Check route paths match navigation links
3. Verify useNavigate hook is imported

---

## 📝 Next Steps / Future Enhancements

1. **Database Integration** - Replace in-memory data with MongoDB/PostgreSQL
2. **Authentication** - Add login/logout functionality
3. **Real Payment Gateway** - Integrate actual payment providers
4. **Receipt Generation** - PDF/email receipts
5. **Admin Dashboard** - Data analytics and reports
6. **Student Portal** - Student-facing features
7. **Email Notifications** - Automated reminders
8. **Refund Processing** - Automated refund workflow

---

## 📞 Support

For issues or questions, check:
1. Browser console for errors
2. Backend console output
3. Network tab in DevTools
4. Verify API endpoints are responding (check `/api/health`)

---

**Last Updated:** March 2026  
**Status:** ✅ Fully Functional
