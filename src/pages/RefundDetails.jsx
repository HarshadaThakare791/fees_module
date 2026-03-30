import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './RefundDetails.css'

function RefundDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  // Mock data - in real app, fetch from API based on id
  const [refund, setRefund] = useState({
    id: id || 'REF-2024-001',
    studentName: 'Aarav Sharma',
    invoiceId: 'INV-2024-015',
    amount: 25000,
    reason: 'Duplicate Payment',
    status: 'Pending',
    requestedDate: '2024-03-08',
    adminNotes: ''
  })

  const handleApprove = () => {
    setRefund(prev => ({ ...prev, status: 'Approved' }))
  }

  const handleReject = () => {
    setRefund(prev => ({ ...prev, status: 'Rejected' }))
  }

  const handleNotesChange = (e) => {
    setRefund(prev => ({ ...prev, adminNotes: e.target.value }))
  }

  const handleClose = () => {
    navigate('/refund-management')
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending':
        return 'orange'
      case 'Approved':
        return 'green'
      case 'Rejected':
        return 'red'
      case 'Processed':
        return 'blue'
      default:
        return 'gray'
    }
  }

  return (
    <div className="refund-details-page">
      <div className="details-container">
        {/* Header */}
        <div className="details-header">
          <button className="back-button" onClick={handleClose}>
            ← Back to Dashboard
          </button>
        </div>

        {/* Details Card */}
        <div className="details-card">
          {/* Title Section */}
          <div className="details-title-section">
            <div>
              <h1 className="details-title">Refund Request Details</h1>
              <p className="request-id-label">{refund.id}</p>
            </div>
          </div>

          {/* Content Sections */}
          <div className="details-content">
            {/* Student Information */}
            <div className="info-section">
              <h3 className="section-title">STUDENT INFORMATION</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Student Name</span>
                  <span className="info-value">{refund.studentName}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Invoice ID</span>
                  <span className="info-value">{refund.invoiceId}</span>
                </div>
              </div>
            </div>

            {/* Refund Information */}
            <div className="info-section">
              <h3 className="section-title">REFUND INFORMATION</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Amount</span>
                  <span className="info-value">₹{refund.amount.toLocaleString()}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Status</span>
                  <span className={`status-badge status-${refund.status.toLowerCase()}`}>
                    {refund.status}
                  </span>
                </div>
                <div className="info-item">
                  <span className="info-label">Reason</span>
                  <span className="info-value">{refund.reason}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Requested Date</span>
                  <span className="info-value">{refund.requestedDate}</span>
                </div>
              </div>
            </div>

            {/* Admin Notes */}
            <div className="info-section">
              <h3 className="section-title">ADMIN NOTES</h3>
              <textarea
                className="notes-textarea"
                placeholder="Add notes about this refund request..."
                value={refund.adminNotes}
                onChange={handleNotesChange}
              ></textarea>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="details-footer">
            <button className="btn btn-secondary" onClick={handleClose}>
              Close
            </button>
            {refund.status === 'Pending' && (
              <>
                <button className="btn btn-danger" onClick={handleReject}>
                  Reject
                </button>
                <button className="btn btn-primary" onClick={handleApprove}>
                  Approve
                </button>
              </>
            )}
            {refund.status === 'Approved' && (
              <button className="btn btn-success" onClick={() => {
                setRefund(prev => ({ ...prev, status: 'Processed' }))
              }}>
                Mark as Processed
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RefundDetails
