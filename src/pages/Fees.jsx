import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { transactionsData } from '../data/transactionsData'
import './Fees.css'

const Fees = () => {
  const navigate = useNavigate()
  const [filteredTransactions, setFilteredTransactions] = useState(transactionsData)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('All')

  const statusOptions = ['All', 'Paid', 'Pending', 'Failed']

  useEffect(() => {
    filterTransactions()
  }, [searchTerm, filterStatus])

  const filterTransactions = () => {
    let filtered = transactionsData

    // Filter by status
    if (filterStatus !== 'All') {
      filtered = filtered.filter((tx) => tx.status === filterStatus)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (tx) =>
          tx.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.invoiceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.class.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredTransactions(filtered)
  }

  const handleView = (invoiceId) => {
    navigate(`/invoice/${invoiceId}`)
  }

  const getStatusColor = (status) => {
    if (status === 'Paid') return '#d4edda'
    if (status === 'Pending') return '#fff3cd'
    if (status === 'Failed') return '#f8d7da'
    return '#fff'
  }

  const getStatusTextColor = (status) => {
    if (status === 'Paid') return '#155724'
    if (status === 'Pending') return '#856404'
    if (status === 'Failed') return '#721c24'
    return '#333'
  }

  return (
    <div className="fees-page" style={{ padding: '20px' }}>
      {/* Header */}
      <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
        <div>
          <h1 style={{ margin: '0 0 5px 0', fontSize: '28px', color: '#333' }}>Payment Monitoring</h1>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>Track and monitor all payment transactions</p>
        </div>
        <button
          onClick={() => navigate('/')}
          style={{ padding: '10px 20px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Search & Filter Section */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#999' }} />
          <input
            type="text"
            placeholder="Search by name or invoice ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '10px 10px 10px 40px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box' }}
          />
        </div>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ padding: '10px 12px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', backgroundColor: '#fff', cursor: 'pointer' }}
        >
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status === 'All' ? 'All Status' : status}
            </option>
          ))}
        </select>
      </div>

      {/* Transactions Table */}
      {filteredTransactions.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
          <div style={{ fontSize: '48px', marginBottom: '15px' }}>📋</div>
          <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>No Transactions Found</h3>
          <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
            {searchTerm || filterStatus !== 'All' ? 'Try adjusting your search filters' : 'No transactions available yet'}
          </p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #dee2e6' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f5f5f5', borderBottom: '2px solid #dee2e6' }}>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', fontSize: '14px' }}>Invoice ID</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', fontSize: '14px' }}>Student Name</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', fontSize: '14px' }}>Class</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', fontSize: '14px' }}>Amount</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', fontSize: '14px' }}>Payment Method</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', fontSize: '14px' }}>Status</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', fontSize: '14px' }}>Date</th>
                <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', fontSize: '14px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr key={tx.id} style={{ borderBottom: '1px solid #eee', transition: 'background-color 0.2s ease' }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8f9fa')} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#fff')}>
                  <td style={{ padding: '12px', fontWeight: '600', color: '#28a745' }}>{tx.invoiceId}</td>
                  <td style={{ padding: '12px', color: '#333' }}>{tx.studentName}</td>
                  <td style={{ padding: '12px', color: '#333' }}>{tx.class}</td>
                  <td style={{ padding: '12px', fontWeight: '600', color: '#333' }}>₹{tx.amount.toLocaleString()}</td>
                  <td style={{ padding: '12px', color: '#666' }}>{tx.paymentMethod}</td>
                  <td style={{ padding: '12px' }}>
                    <span
                      style={{
                        padding: '6px 12px',
                        borderRadius: '4px',
                        fontSize: '12px',
                        fontWeight: '600',
                        backgroundColor: getStatusColor(tx.status),
                        color: getStatusTextColor(tx.status),
                      }}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px', color: '#666' }}>{tx.date}</td>
                  <td style={{ padding: '12px' }}>
                    <button
                      onClick={() => handleView(tx.invoiceId)}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        fontWeight: '600',
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Summary Footer */}
          <div style={{ display: 'flex', gap: '30px', padding: '20px', borderTop: '1px solid #dee2e6', backgroundColor: '#f8f9fa' }}>
            <div>
              <span style={{ color: '#666', fontSize: '14px' }}>Total Transactions: </span>
              <span style={{ fontWeight: '600', fontSize: '16px', color: '#333' }}>{filteredTransactions.length}</span>
            </div>
            <div>
              <span style={{ color: '#666', fontSize: '14px' }}>Total Amount: </span>
              <span style={{ fontWeight: '600', fontSize: '16px', color: '#28a745' }}>₹{filteredTransactions.reduce((sum, tx) => sum + tx.amount, 0).toLocaleString()}</span>
            </div>
            <div>
              <span style={{ color: '#666', fontSize: '14px' }}>Paid Transactions: </span>
              <span style={{ fontWeight: '600', fontSize: '16px', color: '#155724' }}>{filteredTransactions.filter((tx) => tx.status === 'Paid').length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Fees

