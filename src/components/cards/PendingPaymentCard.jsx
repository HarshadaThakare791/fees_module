import React from 'react'
import './PendingPaymentCard.css'

const PendingPaymentCard = ({ amount, description }) => (
  <article className="card pending-payment-card">
    <div className="card-icon">⏳</div>
    <h4>Pending Payments</h4>
    <p className="card-amount">{amount}</p>
    <p className="card-desc">{description}</p>
  </article>
)

export default PendingPaymentCard
