import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import './RefundManagement.css'

function RefundManagement() {
  const navigate = useNavigate()
  const [activeCard, setActiveCard] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const [refunds, setRefunds] = useState([
    {
      id: 'REF-2024-001',
      studentName: 'Aarav Sharma',
      invoiceId: 'INV-2024-015',
      amount: 25000,
      reason: 'Duplicate Payment',
      status: 'Pending',
      requestedDate: '2024-03-08'
    },
    {
      id: 'REF-2024-002',
      studentName: 'Priya Kapoor',
      invoiceId: 'INV-2024-018',
      amount: 15000,
      reason: 'Student Withdrawal',
      status: 'Approved',
      requestedDate: '2024-03-07'
    },
    {
      id: 'REF-2024-003',
      studentName: 'Rahul Verma',
      invoiceId: 'INV-2024-020',
      amount: 8000,
      reason: 'Overpayment',
      status: 'Processed',
      requestedDate: '2024-03-06'
    }
  ])

  const stats = {
    all: refunds.length,
    pending: refunds.filter(r => r.status === 'Pending').length,
    approved: refunds.filter(r => r.status === 'Approved').length,
    rejected: refunds.filter(r => r.status === 'Rejected').length,
    processed: refunds.filter(r => r.status === 'Processed').length
  }

  const filteredRefunds = refunds.filter(refund =>
    refund.studentName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleApproveAll = () => {
    setRefunds(refunds.map(r =>
      r.status === 'Pending' ? { ...r, status: 'Approved' } : r
    ))
  }

  const handleApprove = (id) => {
    setRefunds(refunds.map(r =>
      r.id === id ? { ...r, status: 'Approved' } : r
    ))
  }

  const handleReject = (id) => {
    setRefunds(refunds.map(r =>
      r.id === id ? { ...r, status: 'Rejected' } : r
    ))
  }

  return (
    <div className="refund-management">

      {/* BACK BUTTON */}
      <button className="back-btn" onClick={() => navigate('/')}>
        <ArrowLeft size={16} /> Back to Dashboard
      </button>
<br></br>
      {/* HEADER */}
      <div className="refund-header">
        <div>
          <h1>Refund Management</h1>
          <p>Review and process refund requests</p>
        </div>

        <div className="header-buttons">
          <button className="btn btn-secondary">Export Report</button>
          <button className="btn btn-primary" onClick={() => navigate('/refund-request')}>
            New Refund Request
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="stats-cards">
        {Object.keys(stats).map((key) => (
          <div
            key={key}
            className={`stat-card ${activeCard === key ? 'active' : ''}`}
            onClick={() => setActiveCard(key)}
          >
            <div className="stat-label">
              {key === 'all' ? 'All Requests' : key.charAt(0).toUpperCase() + key.slice(1)}
            </div>
            <div className="stat-number">{stats[key]}</div>
          </div>
        ))}
      </div>

      {/* SEARCH */}
      <div className="search-action-bar">
        <input
          type="text"
          placeholder="Search by student name, request ID, or invoice ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button className="approve-all-btn" onClick={handleApproveAll}>
          Approve All Pending
        </button>
      </div>

      {/* TABLE */}
      <div className="table-container">
        <h3>Refund Requests ({filteredRefunds.length})</h3>

        <table>
          <thead>
            <tr>
              <th>REQUEST ID</th>
              <th>STUDENT NAME</th>
              <th>INVOICE ID</th>
              <th>AMOUNT</th>
              <th>REASON</th>
              <th>STATUS</th>
              <th>REQUESTED DATE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            {filteredRefunds.map((r) => (
              <tr key={r.id}>
                <td className="request-id">{r.id}</td>
                <td>{r.studentName}</td>
                <td>{r.invoiceId}</td>
                <td>₹{r.amount.toLocaleString()}</td>
                <td>{r.reason}</td>

                <td>
                  <span className={`badge ${r.status.toLowerCase()}`}>
                    {r.status}
                  </span>
                </td>

                <td>{r.requestedDate}</td>

                <td>
                  <div className="actions">
                    <button
                      className="view"
                      onClick={() => navigate(`/refund-details/${r.id}`)}
                    >
                      👁
                    </button>

                    {r.status === 'Pending' && (
                      <>
                        <button onClick={() => handleApprove(r.id)}>✓</button>
                        <button onClick={() => handleReject(r.id)}>✕</button>
                      </>
                    )}

                    {r.status === 'Approved' && (
                      <button className="process">Process</button>
                    )}
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default RefundManagement