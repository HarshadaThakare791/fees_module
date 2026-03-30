import React from 'react'
import './FeeCollectedCard.css'

const FeeCollectedCard = ({ amount, description }) => (
  <article className="card fee-collected-card">
    <div className="card-icon">💰</div>
    <h4>Total Fees Collected</h4>
    <p className="card-amount">{amount}</p>
    <p className="card-desc">{description}</p>
  </article>
)

export default FeeCollectedCard
