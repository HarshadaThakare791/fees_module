import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './RefundRequest.css'

function RefundRequest() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    invoiceId: '',
    studentName: '',
    amount: '',
    reason: '',
    notes: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // ✅ Validation
    if (!formData.invoiceId || !formData.studentName || !formData.amount || !formData.reason) {
      alert('Please fill in all required fields')
      return
    }

    // ✅ Save data
    sessionStorage.setItem('newRefundData', JSON.stringify(formData))

    // ✅ SUCCESS REDIRECT (MAIN FIX)
    navigate('/refund/success', { replace: true })
  }

  const handleCancel = () => {
    navigate('/refund-management')
  }

  return (
    <div className="refund-request-page">
      <div className="refund-request-container">

        {/* Back Button */}
        <button 
          className="back-button" 
          onClick={() => navigate('/refund-management')}
        >
          ← Back to Dashboard
        </button>

        {/* Form Card */}
        <div className="form-card">
          <h1 className="form-title">Refund Requests</h1>
          <p className="form-subtitle">
            Submit a refund request for payment reversal
          </p>

          {/* ✅ FORM */}
          <form onSubmit={handleSubmit} className="refund-form">

            {/* Invoice ID */}
            <div className="form-group">
              <label className="form-label">Invoice ID *</label>
              <input
                type="text"
                name="invoiceId"
                value={formData.invoiceId}
                onChange={handleChange}
                placeholder="INV-2024-001"
                className="form-input"
              />
            </div>

            {/* Student Name */}
            <div className="form-group">
              <label className="form-label">Student Name *</label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleChange}
                placeholder="Enter student name"
                className="form-input"
              />
            </div>

            {/* Amount */}
            <div className="form-group">
              <label className="form-label">Payment Amount *</label>
              <div className="amount-input-wrapper">
                <span className="currency-prefix">₹</span>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="form-input amount-input"
                  min="0"
                />
              </div>
            </div>

            {/* Reason */}
            <div className="form-group">
              <label className="form-label">Reason for Refund *</label>
              <select
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="form-input"
              >
                <option value="">Select a reason</option>
                <option value="Duplicate Payment">Duplicate Payment</option>
                <option value="Student Withdrawal">Student Withdrawal</option>
                <option value="Overpayment">Overpayment</option>
                <option value="Technical Error">Technical Error</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Notes */}
            <div className="form-group">
              <label className="form-label">Additional Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="form-input"
                rows="4"
              />
            </div>

            {/* Buttons */}
            <div className="form-buttons">
              
              {/* ✅ IMPORTANT: ONLY type="submit" */}
              <button type="submit" className="btn btn-primary">
                Submit Refund Request
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default RefundRequest