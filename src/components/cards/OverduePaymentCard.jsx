import React from 'react'
import './OverduePaymentCard.css'

const OverduePaymentCard = ({ amount, description }) => (
  <article className="card overdue-payment-card">
    <div className="card-icon">⚠️</div>
    <h4>Overdue Payments</h4>
    <p className="card-amount">{amount}</p>
    <p className="card-desc">{description}</p>
  </article>
)

export default OverduePaymentCard
