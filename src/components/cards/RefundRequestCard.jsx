import React from 'react'
import './RefundRequestCard.css'

const RefundRequestCard = ({ amount, description }) => (
  <article className="card refund-request-card">
    <div className="card-icon">🔄</div>
    <h4>Refund Requests</h4>
    <p className="card-amount">{amount}</p>
    <p className="card-desc">{description}</p>
  </article>
)

export default RefundRequestCard
