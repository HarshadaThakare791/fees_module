/**
 * IMPROVED BACKEND SERVER WITH CORS AND ERROR HANDLING
 * 
 * This is an example of the recommended configuration for your Express backend.
 * Apply these improvements to your server/server.js file.
 */

import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 5000

// ==================== MIDDLEWARE ====================

// ✅ CORS Configuration - Define allowed origins explicitly
const ALLOWED_ORIGINS = [
  'http://localhost:5173',      // Vite default port
  'http://localhost:3000',      // Alternative frontend port
  'http://localhost:5174',      // If multiple Vite servers running
  // Add production domains here later
  // 'https://yourdomain.com'
]

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true)
    } else {
      console.warn(`❌ CORS blocked request from origin: ${origin}`)
      callback(new Error('CORS not allowed for this origin'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  maxAge: 3600 // Cache preflight requests for 1 hour
}))

// Parse JSON bodies
app.use(express.json())

// Parse URL encoded bodies
app.use(express.urlencoded({ extended: true }))

// ✅ Custom middleware to log all requests
app.use((req, res, next) => {
  console.log(`\n📨 [${new Date().toLocaleTimeString()}] ${req.method} ${req.path}`)
  console.log(`   Origin: ${req.get('origin')}`)
  console.log(`   Content-Type: ${req.get('content-type')}`)
  next()
})

// ✅ Set standard response headers
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('X-API-Version', '1.0')
  next()
})

// ==================== ROUTES ====================

// ✅ Health Check Endpoint - Used for testing connectivity
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  })
})

// ✅ Dashboard Endpoint
app.get('/api/dashboard', (req, res) => {
  try {
    const dashboardData = {
      totalCollected: 500000,
      totalPending: 250000,
      totalOverdue: 75000,
      totalRefund: 15000,
      monthlyData: [
        { month: 'Jan', collected: 45000, pending: 20000 },
        { month: 'Feb', collected: 52000, pending: 18000 },
        { month: 'Mar', collected: 48000, pending: 22000 },
        // ... more months
      ],
      paymentMethodData: [
        { method: 'UPI', percentage: 45 },
        { method: 'Credit Card', percentage: 30 },
        { method: 'Cheque', percentage: 15 },
        { method: 'Cash', percentage: 10 }
      ]
    }
    
    console.log('✅ Dashboard data sent successfully')
    res.status(200).json(dashboardData)
  } catch (error) {
    console.error('❌ Error in /api/dashboard:', error)
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    })
  }
})

// ✅ Transactions Endpoint
app.get('/api/transactions', (req, res) => {
  try {
    const transactions = [
      // Your transaction data here
    ]
    
    console.log(`✅ Returned ${transactions.length} transactions`)
    res.status(200).json(transactions)
  } catch (error) {
    console.error('❌ Error in /api/transactions:', error)
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    })
  }
})

// ✅ Invoice Details Endpoint
app.get('/api/invoice/:invoiceId', (req, res) => {
  try {
    const { invoiceId } = req.params
    console.log(`📋 Fetching invoice: ${invoiceId}`)
    
    // Find invoice logic here
    const invoice = {
      id: invoiceId,
      // ... invoice data
    }
    
    if (!invoice) {
      return res.status(404).json({
        error: 'Invoice not found',
        invoiceId
      })
    }
    
    res.status(200).json(invoice)
  } catch (error) {
    console.error('❌ Error in /api/invoice/:invoiceId:', error)
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    })
  }
})

// ✅ Payment Endpoint
app.post('/api/payment', (req, res) => {
  try {
    const { invoiceId, amount, method } = req.body
    
    // Validate input
    if (!invoiceId || !amount || !method) {
      return res.status(400).json({
        error: 'Missing required fields: invoiceId, amount, method'
      })
    }
    
    console.log(`💰 Processing payment: Amount=${amount}, Method=${method}, Invoice=${invoiceId}`)
    
    // Payment processing logic here
    const result = {
      success: true,
      transactionId: 'TXN-' + Date.now(),
      amount,
      method,
      status: 'Completed',
      timestamp: new Date().toISOString()
    }
    
    res.status(200).json(result)
  } catch (error) {
    console.error('❌ Error in /api/payment:', error)
    res.status(500).json({
      error: 'Payment processing failed',
      message: error.message
    })
  }
})

// ✅ Pending Fees Endpoint
app.get('/api/pending-fees', (req, res) => {
  try {
    const pendingFees = [
      // Your pending fees data
    ]
    
    console.log(`✅ Returned ${pendingFees.length} pending fees`)
    res.status(200).json(pendingFees)
  } catch (error) {
    console.error('❌ Error in /api/pending-fees:', error)
    res.status(500).json({
      error: 'Internal Server Error',
      message: error.message
    })
  }
})

// ==================== ERROR HANDLING ====================

// 404 Handler - Catch undefined routes
app.use((req, res) => {
  console.warn(`❌ 404 Not Found: ${req.method} ${req.path}`)
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.path,
    method: req.method,
    availableEndpoints: [
      'GET /api/health',
      'GET /api/dashboard',
      'GET /api/transactions',
      'GET /api/invoice/:invoiceId',
      'POST /api/payment',
      'GET /api/pending-fees'
    ]
  })
})

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('❌ Unhandled Error:', err)
  res.status(err.status || 500).json({
    error: 'Server Error',
    message: err.message || 'An unexpected error occurred',
    // Only show stack trace in development
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
})

// ==================== SERVER STARTUP ====================

app.listen(PORT, () => {
  console.log('\n' + '='.repeat(50))
  console.log('✅ Fee Module API Server Started')
  console.log('='.repeat(50))
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📡 CORS enabled for:`)
  ALLOWED_ORIGINS.forEach(origin => {
    console.log(`   - ${origin}`)
  })
  console.log('\n📚 Available endpoints:')
  console.log('   GET  /api/health')
  console.log('   GET  /api/dashboard')
  console.log('   GET  /api/transactions')
  console.log('   GET  /api/invoice/:invoiceId')
  console.log('   POST /api/payment')
  console.log('   GET  /api/pending-fees')
  console.log('\n💡 Tip: Open http://localhost:5173 in browser to see frontend')
  console.log('='.repeat(50) + '\n')
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('⚠️ SIGTERM signal received: closing HTTP server')
  process.exit(0)
})

export default app
