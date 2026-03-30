import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  BookOpen,
  Home,
  GraduationCap,
  UserCheck,
  ClipboardList,
  DollarSign,
  Upload,
  RefreshCw,
  PenTool,
  Clock,
  Users,
  Library,
  Truck,
  Settings,
  ChevronDown,
  BarChart3,
  FileText,
} from 'lucide-react'
import './Sidebar.css'

const mainMenuItems = [
  { label: 'Main Campus', icon: Home, section: 'main', path: '/main-campus' },
  { label: 'Dashboard', icon: Home, section: 'main', path: '/dashboard' },
  { label: 'Students', icon: GraduationCap, section: 'main', path: '/students' },
  { label: 'Admissions', icon: UserCheck, section: 'main', path: '/admissions' },
  { label: 'Attendance', icon: ClipboardList, section: 'main', path: '/attendance' },
  {
    label: 'Fees Management',icon: Upload, path: '/' ,
    icon: DollarSign,
    section: 'main',
    subItems: [
      { label: 'Bulk Upload', icon: Upload, path: '/bulk-upload' },
      { label: 'Refund Management', icon: RefreshCw, path: '/refund-management' },
    ],
  },
  { label: 'Exams', icon: PenTool, section: 'main', path: '/exams' },
  { label: 'Timetable', icon: Clock, section: 'main', path: '/timetable' },
  { label: 'Staff', icon: Users, section: 'main', path: '/staff' },
  { label: 'Library', icon: Library, section: 'main', path: '/library' },
  { label: 'Transport', icon: Truck, section: 'main', path: '/transport' },
  { label: 'Stationery', icon: FileText, section: 'main', path: '/stationery' },
]

const reportsMenuItems = [
  { label: 'Performance', icon: BarChart3, section: 'reports', path: '/performance' },
  { label: 'Fee Reports', icon: FileText, section: 'reports', path: '/fees' },
  { label: 'Custom Reports', icon: BarChart3, section: 'reports', path: '/custom-reports' },
]

const settingsMenuItem = [
  { label: 'Settings', icon: Settings, section: 'settings', path: '/settings' },
]

const Sidebar = () => {
  const location = useLocation()
  const [expandedItem, setExpandedItem] = useState('Fees Management')

  const isItemActive = (item) => {
    return item.path === location.pathname
  }

  const isSubItemActive = (subItems) => {
    return subItems && subItems.some((subItem) => subItem.path === location.pathname)
  }

  const renderMenuSection = (items, title = null) => {
    return (
      <>
        {title && <div className="sidebar-section-title">{title}</div>}
        {items.map((item) => {
          const IconComponent = item.icon
          const isActive = isItemActive(item)
          const isExpanded = expandedItem === item.label
          const hasActiveSubItem = isSubItemActive(item.subItems)

          return (
            <div key={item.label} className="sidebar-menu-item">
              {item.path ? (
                <Link to={item.path} className={`sidebar-nav-item ${isActive ? 'active' : ''}`}>
                  <div className="sidebar-item-content">
                    {IconComponent && <IconComponent size={20} className="sidebar-icon" />}
                    <span className="sidebar-label">{item.label}</span>
                  </div>
                  {item.subItems && (
                    <ChevronDown
                      size={18}
                      className={`expand-arrow ${isExpanded ? 'expanded' : ''}`}
                    />
                  )}
                </Link>
              ) : (
                <button
                  type="button"
                  className={`sidebar-nav-item ${isActive || hasActiveSubItem ? 'active' : ''}`}
                  onClick={() =>
                    setExpandedItem(expandedItem === item.label ? null : item.label)
                  }
                >
                  <div className="sidebar-item-content">
                    {IconComponent && <IconComponent size={20} className="sidebar-icon" />}
                    <span className="sidebar-label">{item.label}</span>
                  </div>
                  {item.subItems && (
                    <ChevronDown
                      size={18}
                      className={`expand-arrow ${isExpanded ? 'expanded' : ''}`}
                    />
                  )}
                </button>
              )}

              {/* Submenu Items */}
              {item.subItems && isExpanded && (
                <ul className="sidebar-subnav">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.label} className="sidebar-subnav-item">
                      <Link
                        to={subItem.path}
                        className={`subnav-button ${
                          isItemActive(subItem) ? 'active' : ''
                        }`}
                      >
                        {subItem.icon && <subItem.icon size={16} className="subnav-icon" />}
                        <span>{subItem.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )
        })}
      </>
    )
  }

  return (
    <aside className="sidebar">
      {/* Logo Section */}
      <div className="sidebar-brand">
        <div className="brand-logo">
          <BookOpen size={24} color="#ffffff" strokeWidth={2.5} />
        </div>
        <div className="brand-text">
          <h2>Sacred Tree</h2>
          <p>International School</p>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="sidebar-nav">
        {/* Main Menu Section */}
        {renderMenuSection(mainMenuItems)}

        {/* Reports & Analytics Section */}
        <div className="sidebar-section-divider" />
        {renderMenuSection(reportsMenuItems, 'REPORTS & ANALYTICS')}

        {/* Settings Section */}
        <div className="sidebar-section-divider" />
        {renderMenuSection(settingsMenuItem)}
      </nav>

      {/* Bottom Section - Current Role */}
      <div className="sidebar-bottom">
        <div className="sidebar-role-card">
          <p className="role-label">Current Role</p>
          <p className="role-value">Admin</p>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
