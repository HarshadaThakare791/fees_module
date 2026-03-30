import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, Download, ArrowLeft } from 'lucide-react'
import './PaymentSuccess.css'

const PaymentSuccess = () => {
  const navigate = useNavigate()
  const [paymentData, setPaymentData] = useState(null)
  const [showAnimation, setShowAnimation] = useState(true)

  useEffect(() => {
    // Get payment data from sessionStorage
    const data = sessionStorage.getItem('paymentData')
    if (data) {
      setPaymentData(JSON.parse(data))
    }
  }, [])

  const handleDownloadReceipt = () => {
    if (paymentData) {
      const receipt = `
PAYMENT RECEIPT
=====================================
Invoice ID: ${paymentData.invoiceId}
Student Name: ${paymentData.studentName}
Amount Paid: ₹${paymentData.amount.toLocaleString()}
Payment Method: ${paymentData.paymentMethod}
Transaction ID: ${paymentData.transactionId}
Date & Time: ${paymentData.timestamp}
=====================================
Payment Status: SUCCESSFUL

Thank you for your payment!
      `.trim()

      const element = document.createElement('a')
      const file = new Blob([receipt], { type: 'text/plain' })
      element.href = URL.createObjectURL(file)
      element.download = `Receipt_${paymentData.invoiceId}.txt`
      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    }
  }

  const handleBackToDashboard = () => {
    sessionStorage.removeItem('paymentData')
    navigate('/')
  }

  return (
    <div className="payment-success-page" style={{ padding: '40px 20px', minHeight: '100vh', backgroundColor: '#f8f9fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="success-container" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="success-card" style={{ backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.1)', padding: '40px', textAlign: 'center' }}>
          {/* Success Icon with Animation */}
          <div style={{
            marginBottom: '30px',
            animation: showAnimation ? 'bounceIn 0.8s ease-out' : 'none',
          }}>
            <div style={{
              width: '100px',
              height: '100px',
              margin: '0 auto',
              backgroundColor: '#d4edda',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <CheckCircle size={80} style={{ color: '#28a745' }} />
            </div>
          </div>

          {/* Success Message */}
          <h1 style={{ margin: '20px 0 10px 0', fontSize: '28px', color: '#333' }}>Payment Successful!</h1>
          <p style={{ margin: '0 0 30px 0', color: '#666', fontSize: '16px' }}>Your payment has been processed successfully</p>

          {/* Payment Details */}
          {paymentData ? (
            <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '30px', textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #dee2e6' }}>
                <span style={{ color: '#666', fontWeight: '600' }}>Invoice ID</span>
                <span style={{ color: '#333', fontWeight: '600' }}>{paymentData.invoiceId}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #dee2e6' }}>
                <span style={{ color: '#666', fontWeight: '600' }}>Student Name</span>
                <span style={{ color: '#333' }}>{paymentData.studentName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #dee2e6' }}>
                <span style={{ color: '#666', fontWeight: '600' }}>Amount Paid</span>
                <span style={{ color: '#28a745', fontWeight: 'bold', fontSize: '16px' }}>₹{paymentData.amount.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #dee2e6' }}>
                <span style={{ color: '#666', fontWeight: '600' }}>Payment Method</span>
                <span style={{ color: '#333' }}>{paymentData.paymentMethod}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #dee2e6' }}>
                <span style={{ color: '#666', fontWeight: '600' }}>Transaction ID</span>
                <span style={{ color: '#28a745', fontFamily: 'monospace', fontSize: '12px' }}>{paymentData.transactionId}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}>
                <span style={{ color: '#666', fontWeight: '600' }}>Date & Time</span>
                <span style={{ color: '#333' }}>{paymentData.timestamp}</span>
              </div>
            </div>
          ) : (
            <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '30px', color: '#999' }}>
              No payment data available
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            <button
              onClick={handleDownloadReceipt}
              style={{
                padding: '12px 24px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <Download size={18} />
              Download Receipt
            </button>
            <button
              onClick={handleBackToDashboard}
              style={{
                padding: '12px 24px',
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <ArrowLeft size={18} />
              Back to Dashboard
            </button>
          </div>

          {/* Additional Info */}
          <div style={{ borderTop: '1px solid #dee2e6', paddingTop: '20px', textAlign: 'left' }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#333' }}>What's Next?</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#666', fontSize: '14px' }}>
              <li style={{ marginBottom: '8px' }}>A confirmation email has been sent to your registered email</li>
              <li style={{ marginBottom: '8px' }}>Download and save your receipt for your records</li>
              <li style={{ marginBottom: '8px' }}>You can view your payment history in the dashboard</li>
              <li>For any queries, contact the accounts department</li>
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  )
}

export default PaymentSuccess
