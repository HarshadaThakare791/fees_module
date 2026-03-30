import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, DollarSign, FileText, CreditCard, Users, CheckCircle, Clock } from 'lucide-react'
import UploadModal from '../components/modals/UploadModal'
import './BulkUpload.css'

const BulkUpload = () => {
  const navigate = useNavigate()
  const [selectedCard, setSelectedCard] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [uploads] = useState([
    { id: 1, type: 'Fee Structure', fileName: 'q1_fees_2024.csv', records: 120, status: 'Success', uploadedBy: 'Admin User', time: '2024-03-13 10:30 AM' },
    { id: 2, type: 'Bulk Invoices', fileName: 'march_invoices.csv', records: 450, status: 'Success', uploadedBy: 'Admin User', time: '2024-03-12 02:15 PM' },
    { id: 3, type: 'Payment Records', fileName: 'payments_feb_2024.csv', records: 328, status: 'Success', uploadedBy: 'Finance Manager', time: '2024-03-10 11:45 AM' },
    { id: 4, type: 'Student Data', fileName: 'new_admissions.csv', records: 45, status: 'Processing', uploadedBy: 'Admin User', time: '2024-03-09 09:20 AM' },
  ])

  const uploadCards = [
    {
      id: 1,
      title: 'Fee Structure',
      description: 'Upload fee categories and amounts for different classes',
      icon: DollarSign,
      iconBg: '#e6f8ed',
      iconColor: '#22c55e',
      features: ['Define fee categories', 'Set class-wise fees', 'Academic year mapping'],
    },
    {
      id: 2,
      title: 'Bulk Invoices',
      description: 'Generate invoices for multiple students at once',
      icon: FileText,
      iconBg: '#dbf4ff',
      iconColor: '#0ea5e9',
      features: ['Auto-generate invoices', 'Custom due dates', 'Batch processing'],
    },
    {
      id: 3,
      title: 'Payment Records',
      description: 'Upload payment transactions in bulk',
      icon: CreditCard,
      iconBg: '#f3e8ff',
      iconColor: '#8b5cf6',
      features: ['Import payment history', 'Reconciliation support', 'Multi-method support'],
    },
    {
      id: 4,
      title: 'Student Data',
      description: 'Import student information and contact details',
      icon: Users,
      iconBg: '#fef3c7',
      iconColor: '#f59e0b',
      features: ['Student profiles', 'Parent information', 'Class assignments'],
    },
  ]

  const getStatusClass = (status) => {
    if (status === 'Success') return 'status-success'
    if (status === 'Processing') return 'status-processing'
    return ''
  }

  const handleBackToDashboard = () => {
    navigate('/')
  }

  const getCardTypeKey = (cardTitle) => {
    const typeMap = {
      'Fee Structure': 'feeStructure',
      'Bulk Invoices': 'invoices',
      'Payment Records': 'payments',
      'Student Data': 'students',
    }
    return typeMap[cardTitle] || 'feeStructure'
  }

  const openModal = (cardTitle) => {
    setSelectedCard(getCardTypeKey(cardTitle))
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedCard(null)
  }

  return (
    <>
      <div className="bulk-upload-page">
      {/* Back to Dashboard */}
      <div className="bulk-upload-header-nav">
        <button className="back-button" onClick={handleBackToDashboard}>
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Page Header */}
      <div className="bulk-upload-page-header">
        <h1 className="bulk-upload-title">Bulk Upload & Data Import</h1>
        <p className="bulk-upload-subtitle">Upload CSV files to import data in bulk and save time</p>
      </div>

      {/* Upload Cards Section */}
      <section className="bulk-upload-cards-section">
        <div className="bulk-upload-cards-grid">
          {uploadCards.map((card) => {
            const IconComponent = card.icon
            return (
              <div key={card.id} className="bulk-upload-card">
                <div className="card-icon-box" style={{ backgroundColor: card.iconBg }}>
                  <IconComponent size={32} color={card.iconColor} />
                </div>
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>
                <ul className="card-features">
                  {card.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <button className="card-button" onClick={() => openModal(card.title)}>
                  Upload CSV
                </button>
              </div>
            )
          })}
        </div>
      </section>

      {/* Recent Uploads Section */}
      <section className="bulk-upload-recent-section">
        <div className="recent-uploads-header">
          <h2 className="recent-uploads-title">Recent Uploads</h2>
          <p className="recent-uploads-subtitle">Track your bulk upload history</p>
        </div>

        <div className="recent-uploads-table-wrap">
          <table className="recent-uploads-table">
            <thead>
              <tr>
                <th>Upload Type</th>
                <th>File Name</th>
                <th>Records Processed</th>
                <th>Status</th>
                <th>Uploaded By</th>
                <th>Upload Time</th>
              </tr>
            </thead>
            <tbody>
              {uploads.map((upload) => (
                <tr key={upload.id} className="upload-row">
                  <td>{upload.type}</td>
                  <td>
                    <div className="file-name-cell">
                      <FileText size={16} className="file-icon" />
                      <span>{upload.fileName}</span>
                    </div>
                  </td>
                  <td>{upload.records}</td>
                  <td>
                    <span className={`status-badge ${getStatusClass(upload.status)}`}>
                      {upload.status === 'Success' ? (
                        <>
                          <CheckCircle size={14} className="status-icon" />
                          {upload.status}
                        </>
                      ) : (
                        <>
                          <Clock size={14} className="status-icon" />
                          {upload.status}
                        </>
                      )}
                    </span>
                  </td>
                  <td>{upload.uploadedBy}</td>
                  <td>{upload.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>

    <UploadModal type={selectedCard} isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}

export default BulkUpload
