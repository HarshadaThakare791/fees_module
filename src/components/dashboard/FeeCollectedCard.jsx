import React from 'react'

const FeeCollectedCard = ({ amount, change }) => {
  const isPositive = change >= 0
  return (
    <article className="summary-card fee-collected">
      <div className="card-top">
        <span className="card-icon" aria-hidden="true">💰</span>
        <h3>Total Fees Collected</h3>
      </div>
      <p className="card-value">{amount}</p>
      <p className={`card-trend ${isPositive ? 'positive' : 'negative'}`}>
        {isPositive ? '▲' : '▼'} {Math.abs(change)}% from last week
      </p>
    </article>
  )
}

export default FeeCollectedCard
