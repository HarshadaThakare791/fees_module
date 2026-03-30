import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './RefundRequestSuccess.css';

const RefundRequestSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [successData, setSuccessData] = useState({
    requestId: 'RFD-2024-001234',
    invoiceId: 'INV-2024-005678',
    amount: '₹5,000.00',
    status: 'Pending Review',
  });

  // If user navigates directly without form submission, set default data
  useEffect(() => {
    if (location.state?.successData) {
      setSuccessData(location.state.successData);
    }
  }, [location.state]);

  const handleBackToDashboard = () => {
    navigate('/');
  };

  return (
    <div className="refund-success-container">
      <div className="refund-success-card">
        {/* Success Icon */}
        <div className="success-icon-wrapper">
          <div className="success-icon">
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24Z"
                fill="#16A34A"
              />
              <path
                d="M20 28.5L16.5 25M20 28.5L32 16.5"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="success-title">Request Submitted Successfully!</h1>

        {/* Description */}
        <p className="success-description">
          Your refund request has been submitted and will be reviewed by our team.
          You will receive an email notification once your request is processed.
        </p>

        {/* Details Section */}
        <div className="details-section">
          <div className="detail-item">
            <span className="detail-label">Request ID</span>
            <span className="detail-value">{successData.requestId}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Invoice ID</span>
            <span className="detail-value">{successData.invoiceId}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Amount</span>
            <span className="detail-value">{successData.amount}</span>
          </div>

          <div className="detail-item">
            <span className="detail-label">Status</span>
            <span className="status-badge">{successData.status}</span>
          </div>
        </div>

        {/* Button */}
        <button className="back-to-dashboard-btn" onClick={handleBackToDashboard}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default RefundRequestSuccess;
