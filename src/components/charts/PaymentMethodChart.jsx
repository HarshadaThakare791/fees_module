import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import './Charts.css'

const data = [
  { name: 'Card', value: 42 },
  { name: 'Net Banking', value: 28 },
  { name: 'UPI', value: 22 },
  { name: 'Cash', value: 8 },
]

const colors = ['#22c55e', '#10b981', '#0ea5e9', '#f59e0b']

const PaymentMethodChart = () => (
  <section className="chart-card">
    <h3>Payment Method Distribution</h3>
    <div className="chart-inner">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </section>
)

export default PaymentMethodChart
