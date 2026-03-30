import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Transactions.css'

const getStatusClass = (status) => {
  if (status === 'Paid') return 'status-paid'
  if (status === 'Pending') return 'status-pending'
  if (status === 'Overdue') return 'status-overdue'
  if (status === 'Processing') return 'status-processing'
  return ''
}

const TransactionRow = ({ student, invoice, method, amount, status, date, invoiceId }) => {
  const navigate = useNavigate()

  const handleView = () => {
    navigate(`/invoice/${invoiceId || invoice}`)
  }

  return (
    <tr className="transaction-row">
      <td>{student}</td>
      <td>{invoice}</td>
      <td>{method}</td>
      <td>{amount}</td>
      <td>
        <span className={`status-chip ${getStatusClass(status)}`}>
          {status}
        </span>
      </td>
      <td>{date}</td>
      <td>
        <button className="btn-view" type="button" onClick={handleView}>
          View
        </button>
      </td>
    </tr>
  )
}

export default TransactionRow
