import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Lock, AlertCircle } from 'lucide-react'
import { getInvoiceById, generateTransactionId } from '../data/invoiceData'
import './Payment.css'

const Payment = () => {
  const { invoiceId } = useParams()
  const navigate = useNavigate()

  const [invoice] = useState(() => getInvoiceById(invoiceId))
  const [selectedMethod, setSelectedMethod] = useState('card')
  const [processing, setProcessing] = useState(false)
  const [formError, setFormError] = useState('')

  // Form states for each payment method
  const [cardData, setCardData] = useState({ cardNumber: '', cardHolder: '', expiry: '', cvv: '' })
  const [upiData, setUpiData] = useState({ upiId: '' })
  const [netBankingData, setNetBankingData] = useState({ bankName: '', accountNumber: '' })

  const bankOptions = ['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Punjab National Bank']

  if (!invoice) {
    return (
      <div className="payment-page">
        <div className="error-container" style={{ padding: '40px', textAlign: 'center' }}>
          <AlertCircle size={40} className="error-icon" style={{ marginBottom: '20px', color: '#dc3545' }} />
          <h2>Invoice Not Found</h2>
          <p style={{ marginBottom: '20px', color: '#666' }}>The invoice {invoiceId} does not exist in our records.</p>
          <button onClick={() => navigate('/fees')} style={{ padding: '10px 24px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  // Validation function
  const validateForm = () => {
    setFormError('')

    if (selectedMethod === 'card') {
      if (!cardData.cardNumber.trim()) {
        setFormError('Card number is required')
        return false
      }
      if (cardData.cardNumber.replace(/\s/g, '').length !== 16) {
        setFormError('Card number must be 16 digits')
        return false
      }
      if (!cardData.cardHolder.trim()) {
        setFormError('Card holder name is required')
        return false
      }
      if (!cardData.expiry.match(/^\d{2}\/\d{2}$/)) {
        setFormError('Expiry date must be MM/YY format')
        return false
      }
      if (!cardData.cvv.match(/^\d{3,4}$/)) {
        setFormError('CVV must be 3 or 4 digits')
        return false
      }
    } else if (selectedMethod === 'upi') {
      if (!upiData.upiId.trim()) {
        setFormError('UPI ID is required')
        return false
      }
      if (!upiData.upiId.includes('@')) {
        setFormError('Invalid UPI ID format')
        return false
      }
    } else if (selectedMethod === 'netbanking') {
      if (!netBankingData.bankName) {
        setFormError('Please select a bank')
        return false
      }
      if (!netBankingData.accountNumber.trim()) {
        setFormError('Account number is required')
        return false
      }
      if (!/^\d{10,18}$/.test(netBankingData.accountNumber)) {
        setFormError('Account number must be 10-18 digits')
        return false
      }
    }

    return true
  }

  const handlePayment = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setProcessing(true)

    // Simulate payment processing with 2-second delay
    setTimeout(() => {
      const paymentData = {
        invoiceId: invoice.invoiceId,
        studentName: invoice.studentName,
        amount: invoice.totalAmount,
        paymentMethod: selectedMethod === 'card' ? 'Credit Card' : selectedMethod === 'upi' ? 'UPI' : 'Net Banking',
        transactionId: generateTransactionId(),
        timestamp: new Date().toLocaleString(),
      }

      // Store in sessionStorage
      sessionStorage.setItem('paymentData', JSON.stringify(paymentData))

      setProcessing(false)
      navigate('/payment-success')
    }, 2000)
  }

  // Disable pay button if form is incomplete
  const isPayButtonDisabled = () => {
    if (selectedMethod === 'card') {
      return !cardData.cardNumber || !cardData.cardHolder || !cardData.expiry || !cardData.cvv
    } else if (selectedMethod === 'upi') {
      return !upiData.upiId
    } else if (selectedMethod === 'netbanking') {
      return !netBankingData.bankName || !netBankingData.accountNumber
    }
    return true
  }

  return (
    <div className="payment-page">
      {/* Header */}
      <div className="payment-header">
        <button onClick={() => navigate(-1)} className="btn-back-header">
          <ArrowLeft size={20} />
          Back to Invoice
        </button>
        <h1>Complete Payment</h1>
        <p>Choose your preferred payment method</p>
      </div>

      {/* Main Content */}
      <div className="payment-container">
        <div className="payment-content">
          {/* Payment Summary */}
          <div className="payment-summary" style={{ marginBottom: '30px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px solid #dee2e6' }}>
            <h3 style={{ marginTop: 0 }}>Payment Summary</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #dee2e6' }}>
              <span style={{ color: '#666' }}>Invoice ID</span>
              <span style={{ fontWeight: '600' }}>{invoice.invoiceId}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #dee2e6' }}>
              <span style={{ color: '#666' }}>Student Name</span>
              <span style={{ fontWeight: '600' }}>{invoice.studentName}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #dee2e6' }}>
              <span style={{ color: '#666' }}>Class</span>
              <span style={{ fontWeight: '600' }}>{invoice.class}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 0', backgroundColor: '#e8f4f8', padding: '12px', borderRadius: '4px', marginTop: '10px' }}>
              <span style={{ fontWeight: '600', fontSize: '16px' }}>Total Amount</span>
              <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#28a745' }}>₹{invoice.totalAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* Error Banner */}
          {formError && (
            <div style={{ backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', color: '#721c24', padding: '12px', borderRadius: '4px', marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'center' }}>
              <AlertCircle size={20} />
              <span>{formError}</span>
            </div>
          )}

          {/* Payment Methods */}
          <div className="payment-methods">
            <h3>Select Payment Method</h3>
            <form onSubmit={handlePayment}>
              {/* Payment Method Selection */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '15px', marginBottom: '30px' }}>
                {[
                  { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
                  { id: 'upi', name: 'UPI', icon: '📱' },
                  { id: 'netbanking', name: 'Net Banking', icon: '🏦' },
                ].map((method) => (
                  <label
                    key={method.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '15px',
                      border: selectedMethod === method.id ? '2px solid #28a745' : '2px solid #dee2e6',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      backgroundColor: selectedMethod === method.id ? '#e8f5e9' : '#fff',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <input
                      type="radio"
                      name="payment_method"
                      value={method.id}
                      checked={selectedMethod === method.id}
                      onChange={(e) => {
                        setSelectedMethod(e.target.value)
                        setFormError('')
                      }}
                      style={{ cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '20px' }}>{method.icon}</span>
                    <span style={{ fontWeight: '600' }}>{method.name}</span>
                  </label>
                ))}
              </div>

              {/* Dynamic Payment Forms */}
              <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #dee2e6', marginBottom: '20px' }}>
                {selectedMethod === 'card' && (
                  <div>
                    <h4 style={{ marginTop: 0 }}>Card Details</h4>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        value={cardData.cardNumber}
                        onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                        maxLength="19"
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Card Holder Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={cardData.cardHolder}
                        onChange={(e) => setCardData({ ...cardData, cardHolder: e.target.value })}
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Expiry Date (MM/YY)</label>
                        <input
                          type="text"
                          placeholder="12/25"
                          value={cardData.expiry}
                          onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                          maxLength="5"
                          style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          value={cardData.cvv}
                          onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                          maxLength="4"
                          style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {selectedMethod === 'upi' && (
                  <div>
                    <h4 style={{ marginTop: 0 }}>UPI Details</h4>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>UPI ID</label>
                      <input
                        type="text"
                        placeholder="yourname@upi"
                        value={upiData.upiId}
                        onChange={(e) => setUpiData({ ...upiData, upiId: e.target.value })}
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
                      />
                    </div>
                    <p style={{ color: '#666', fontSize: '14px', marginTop: '10px' }}>Works with Google Pay, PhonePe, Paytm, and other UPI apps.</p>
                  </div>
                )}

                {selectedMethod === 'netbanking' && (
                  <div>
                    <h4 style={{ marginTop: 0 }}>Net Banking Details</h4>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Select Bank</label>
                      <select
                        value={netBankingData.bankName}
                        onChange={(e) => setNetBankingData({ ...netBankingData, bankName: e.target.value })}
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
                      >
                        <option value="">Choose a bank...</option>
                        {bankOptions.map((bank) => (
                          <option key={bank} value={bank}>
                            {bank}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Account Number</label>
                      <input
                        type="text"
                        placeholder="Enter your account number"
                        value={netBankingData.accountNumber}
                        onChange={(e) => setNetBankingData({ ...netBankingData, accountNumber: e.target.value })}
                        style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Security Info */}
              <div style={{ display: 'flex', gap: '15px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px', marginBottom: '20px', alignItems: 'flex-start' }}>
                <Lock size={20} style={{ color: '#28a745', marginTop: '2px' }} />
                <div>
                  <h4 style={{ margin: '0 0 5px 0' }}>Secure Payment</h4>
                  <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                    Your payment information is encrypted and secure. All transactions are processed through certified payment gateways compliant with industry standards.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  style={{ padding: '12px 24px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={processing || isPayButtonDisabled()}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: isPayButtonDisabled() || processing ? '#ccc' : '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: isPayButtonDisabled() || processing ? 'not-allowed' : 'pointer',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  {processing ? (
                    <>
                      <div
                        style={{
                          width: '16px',
                          height: '16px',
                          border: '2px solid #f3f3f3',
                          borderTop: '2px solid #fff',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite',
                        }}
                      />
                      Processing...
                    </>
                  ) : (
                    `Pay ₹${invoice.totalAmount.toLocaleString()}`
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default Payment
