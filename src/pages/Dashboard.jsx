import React from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { transactionsData } from "../data/transactionsData";

/* 👇 IMPORT YOUR OLD GRAPH COMPONENTS */
import MonthlyFeeChart from "../components/Charts/MonthlyFeeChart";
import PaymentMethodChart from "../components/Charts/PaymentMethodChart";
import { monthlyData, paymentMethodData } from "../data/dashboardData";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleView = (transaction) => {
    if (transaction.status === "Paid") {
      navigate(`/receipt/${transaction.invoiceId}`);
    } else {
      navigate(`/payment/${transaction.invoiceId}`);
    }
  };

  return (
    <div className="dashboard-page">

      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <h1>Fees & Payments Dashboard</h1>
          <p>Fee management overview, collection trends, and pending action items</p>
        </div>

        <div className="dashboard-actions">
          <button onClick={() => navigate("/bulk-upload")} className="btn-outline">
            Bulk Upload
          </button>

          <button onClick={() => navigate("/refund-management")} className="btn-outline">
            Refund Management
          </button>
        </div>
      </div>

      {/* CARDS */}
      <div className="cards-grid">
        <div className="card blue">
          <h4>Total Fees Collected</h4>
          <h2>₹2,50,000</h2>
        </div>

        <div className="card yellow">
          <h4>Pending Payments</h4>
          <h2>₹80,000</h2>
        </div>

        <div className="card red">
          <h4>Overdue Payments</h4>
          <h2>₹30,000</h2>
        </div>

        <div className="card green">
          <h4>Refund Requests</h4>
          <h2>₹12,000</h2>
        </div>
      </div>

      {/* ✅ GRAPHS SECTION (ADDED BACK) */}
      <div className="charts-grid">
        <div className="chart-card">
        
          <MonthlyFeeChart data={monthlyData} />
        </div>

        <div className="chart-card">
          
          <PaymentMethodChart data={paymentMethodData} />
        </div>
      </div>

      {/* TRANSACTIONS */}
      <div className="transactions-section">
        <div className="transactions-header">
          <h3>Recent Transactions</h3>

          <button onClick={() => navigate("/fees")} className="view-all-btn">
            View All
          </button>
        </div>

        <table className="transactions-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Invoice</th>
              <th>Class</th>
              <th>Amount</th>
              <th>Method</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {transactionsData.map((item) => (
              <tr key={item.id}>
                <td>{item.studentName}</td>
                <td className="invoice">{item.invoiceId}</td>
                <td>{item.class}</td>
                <td>₹{item.amount}</td>
                <td>{item.paymentMethod}</td>

                <td>
                  <span className={`status ${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </td>

                <td>{item.date}</td>

                <td>
                  <button
                    onClick={() => handleView(item)}
                    className="action-btn"
                  >
                    {item.status === "Paid" ? "Receipt" : "Pay"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Dashboard;
