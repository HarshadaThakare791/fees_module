import React from 'react'
import { Search, Bell, Upload, FileText, RefreshCw } from 'lucide-react'

const TopNavbar = () => (
  <header className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-200">
    <div className="flex items-center gap-3">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        <input
          type="text"
          placeholder="Search students, invoices..."
          className="pl-9 pr-3 py-2 border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
      </div>
      <select className="border border-gray-200 rounded-lg p-2 bg-white text-gray-700">
        <option>North Campus</option>
        <option>South Campus</option>
        <option>East Campus</option>
        <option>West Campus</option>
      </select>
    </div>

    <div className="flex items-center gap-2">
      <button className="flex items-center gap-1 bg-white text-gray-700 px-3 py-2 rounded-lg border border-gray-200 hover:bg-emerald-50 transition">
        <RefreshCw size={16} /> Refresh
      </button>
      <button className="flex items-center gap-1 bg-white text-gray-700 px-3 py-2 rounded-lg border border-gray-200 hover:bg-emerald-50 transition">
        <Upload size={16} /> Bulk Upload
      </button>
      <button className="flex items-center gap-1 bg-white text-gray-700 px-3 py-2 rounded-lg border border-gray-200 hover:bg-emerald-50 transition">
        <FileText size={16} /> Export Report
      </button>
      <button className="flex items-center gap-1 bg-white text-gray-700 px-3 py-2 rounded-lg border border-gray-200 hover:bg-emerald-50 transition">
        <RefreshCw size={16} /> Refunds
      </button>
      <button className="relative p-2 rounded-full hover:bg-gray-100 transition">
        <Bell size={20} />
        <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-red-500" />
      </button>
      <div className="flex items-center gap-2 border border-gray-200 rounded-full px-2 py-1">
        <div className="h-8 w-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">A</div>
        <span className="text-sm text-gray-700">Admin</span>
      </div>
    </div>
  </header>
)

export default TopNavbar
