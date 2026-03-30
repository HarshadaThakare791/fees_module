import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Download, AlertCircle } from 'lucide-react'
import { getInvoiceById } from '../data/invoiceData'
import './Invoice.css'

const Invoice = () => {
  const { invoiceId } = useParams()
  const navigate = useNavigate()
  const [invoice] = useState(() => getInvoiceById(invoiceId))

  const handleProceedToPayment = () => {
    navigate(`/payment/${invoiceId}`)
  }

  if (!invoice) {
    return (
      <div className="invoice-page">
        <div className="error-container">
          <AlertCircle size={40} className="error-icon" />
          <h2>Invoice Not Found</h2>
          <p style={{ marginBottom: '20px', color: '#666' }}>The invoice {invoiceId} does not exist in our records.</p>
          <button onClick={() => navigate('/fees')} className="btn-back" style={{ padding: '10px 24px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="invoice-page">
      {/* Header */}
      <div className="invoice-header">
        <div>

          <button onClick={() => navigate(-1)} style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#28a745', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '10px' }}>
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <h1>Fee Invoice</h1>
          <p>Invoice ID: {invoice.invoiceId}</p>
        </div>
        <button className="btn-download">
          <Download size={20} />
          Download Invoice
        </button>
      </div>

      {/* Main Content */}
      <div className="invoice-container">
        {/* School Details */}
        <div className="invoice-card">
          <div className="school-header">
            <div className="school-info">
              <div className="school-icon">ST</div>
              <div>
                <h3>Sacred Tree International School</h3>
                <p>Excellence in Education</p>
              </div>
            </div>
            <div className="invoice-info">
              <div className="info-row">
                <span className="label">Invoice Date</span>
                <span className="value">{invoice.invoiceDate}</span>
              </div>
              <div className="info-row">
                <span className="label">Invoice ID</span>
                <span className="value">{invoice.invoiceId}</span>
              </div>
            </div>
          </div>

          {/* Student and Contact Details */}
          <div className="details-grid">
            <div className="detail-section">
              <h4>Student Details</h4>
              <div className="detail-row">
                <span className="label">Student Name</span>
                <span className="value">{invoice.studentName}</span>
              </div>
              <div className="detail-row">
                <span className="label">Class / Section</span>
                <span className="value">{invoice.class}</span>
              </div>
              <div className="detail-row">
                <span className="label">Roll Number</span>
                <span className="value">{invoice.rollNumber}</span>
              </div>
            </div>
            <div className="detail-section">
              <h4>Parent Information</h4>
              <div className="detail-row">
                <span className="label">Parent Name</span>
                <span className="value">{invoice.parentName}</span>
              </div>
              <div className="detail-row">
                <span className="label">Email</span>
                <span className="value">{invoice.email}</span>
              </div>
              <div className="detail-row">
                <span className="label">Phone</span>
                <span className="value">{invoice.phone}</span>
              </div>
            </div>
          </div>

          {/* Fee Breakdown */}
          <div className="fee-breakdown">
            <h4>Fee Breakdown</h4>
            <table className="fee-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th className="amount-col">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.feeBreakdown.map((fee, idx) => (
                  <tr key={idx}>
                    <td>{fee.description}</td>
                    <td className="amount-col">₹{fee.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Total and Status */}
            <div className="total-section">
              <div className="total-amount">
                <span className="label">Total Amount</span>
                <span className="amount">₹{invoice.totalAmount.toLocaleString()}</span>
              </div>
              {invoice.status === 'Paid' && (
                <div className="paid-indicator">
                  <span style={{ backgroundColor: '#d4edda', color: '#155724', padding: '8px 12px', borderRadius: '4px', fontWeight: '600' }}>
                    ✓ Paid on {invoice.paymentDate}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Payment Terms */}
          <div className="payment-terms">
            <h4>Payment Terms & Conditions</h4>
            <ul>
              <li>• Payment must be made by the displayed due date to avoid late fees</li>
              <li>• Late payment will incur a 5% penalty per week after the due date</li>
              <li>• All fees are non-refundable unless stated otherwise</li>
              <li>• Multiple payment methods are available for your convenience</li>
              <li>• For any queries, contact the accounts department</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button onClick={() => navigate(-1)} className="btn-cancel" style={{ padding: '10px 24px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              Cancel
            </button>
            {invoice.status !== 'Paid' && (
              <button onClick={handleProceedToPayment} className="btn-proceed" style={{ padding: '10px 24px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>
                Proceed to Payment
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Invoice
