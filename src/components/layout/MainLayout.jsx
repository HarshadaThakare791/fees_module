import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../Navbar/Navbar'
import './MainLayout.css'

const MainLayout = ({ children }) => (
  <div className="main-layout">
    <Sidebar />
    <div className="main-layout-content">
      <Navbar />
      <main className="main-layout-body">{children}</main>
    </div>
  </div>
)

export default MainLayout
