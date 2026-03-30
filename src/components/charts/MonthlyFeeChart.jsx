import React from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import './Charts.css'

const data = [
  { month: 'Jan', fees: 87000 },
  { month: 'Feb', fees: 93000 },
  { month: 'Mar', fees: 102000 },
  { month: 'Apr', fees: 98000 },
  { month: 'May', fees: 113000 },
  { month: 'Jun', fees: 107000 },
  { month: 'Jul', fees: 118000 },
  { month: 'Aug', fees: 121000 },
  { month: 'Sep', fees: 109000 },
  { month: 'Oct', fees: 124000 },
  { month: 'Nov', fees: 117000 },
  { month: 'Dec', fees: 130000 },
]

const MonthlyFeeChart = () => (
  <section className="chart-card">
    <h3>Monthly Fee Collection</h3>
    <div className="chart-inner">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 16, right: 16, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="month" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
          <Legend />
          <Bar dataKey="fees" name="Collected" fill="#22c55e" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </section>
)

export default MonthlyFeeChart

