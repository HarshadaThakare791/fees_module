// ==================== DASHBOARD DATA ====================
// Static dummy data for dashboard metrics

export const dashboardMetrics = {
  totalCollected: 1245000,
  totalPending: 325000,
  totalOverdue: 85000,
  totalRefund: 45000,
}

export const monthlyData = [
  { month: 'Jan', collected: 95000, pending: 25000 },
  { month: 'Feb', collected: 110000, pending: 30000 },
  { month: 'Mar', collected: 120000, pending: 35000 },
  { month: 'Apr', collected: 105000, pending: 28000 },
  { month: 'May', collected: 135000, pending: 40000 },
  { month: 'Jun', collected: 125000, pending: 38000 },
]

export const paymentMethodData = [
  { name: 'Online', value: 720000 },
  { name: 'Check', value: 280000 },
  { name: 'Cash', value: 195000 },
]

export const pendingFeesData = [
  { id: 1, studentName: 'Arjun Verma', class: '10A', amount: 5000, dueDate: '2024-02-15' },
  { id: 2, studentName: 'Neha Gupta', class: '9B', amount: 3500, dueDate: '2024-02-20' },
  { id: 3, studentName: 'Vikram Singh', class: '11C', amount: 7200, dueDate: '2024-02-10' },
  { id: 4, studentName: 'Priya Singh', class: '10B', amount: 4800, dueDate: '2024-02-25' },
  { id: 5, studentName: 'Raj Kumar', class: '9A', amount: 6500, dueDate: '2024-02-18' },
]

export const recentTransactionsData = [
  { id: 1, studentName: 'Raj Kumar', amount: 15000, date: '2024-01-15', status: 'completed' },
  { id: 2, studentName: 'Priya Singh', amount: 12500, date: '2024-01-14', status: 'completed' },
  { id: 3, studentName: 'Amit Patel', amount: 8500, date: '2024-01-13', status: 'pending' },
  { id: 4, studentName: 'Sneha Gupta', amount: 20000, date: '2024-01-12', status: 'completed' },
  { id: 5, studentName: 'Rahul Singh', amount: 18000, date: '2024-01-11', status: 'completed' },
]
