import React from 'react'

const getStatusClass = (status) => {
  if (status === 'Paid') return 'status-paid'
  if (status === 'Pending') return 'status-pending'
  if (status === 'Overdue') return 'status-overdue'
  return ''
}

const TransactionRow = ({ student, invoice, method, amount, status, date }) => (
  <tr className="transaction-row">
    <td>{student}</td>
    <td>{invoice}</td>
    <td>{method}</td>
    <td>{amount}</td>
    <td><span className={`status-chip ${getStatusClass(status)}`}>{status}</span></td>
    <td>{date}</td>
  </tr>
)

export default TransactionRow
