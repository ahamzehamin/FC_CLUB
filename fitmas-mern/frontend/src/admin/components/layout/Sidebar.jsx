import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    {
      title: 'Dashboard',
      path: '/admin',
      icon: 'fas fa-tachometer-alt',
      exact: true
    },
    {
      title: 'Blog Management',
      path: '/admin/blogs',
      icon: 'fas fa-blog',
      children: [
        { title: 'All Blogs', path: '/admin/blogs' },
        { title: 'Add New Blog', path: '/admin/blogs/add' },
        { title: 'Categories', path: '/admin/blogs/categories' }
      ]
    },
    {
      title: 'Content Management',
      path: '/admin/content',
      icon: 'fas fa-file-alt',
      children: [
        { title: 'All Pages', path: '/admin/content' },
        { title: 'Add New Page', path: '/admin/content/add' },
        { title: 'Media Library', path: '/admin/media' }
      ]
    },
    {
      title: 'User Management',
      path: '/admin/users',
      icon: 'fas fa-users',
      adminOnly: true
    },
    {
      title: 'Settings',
      path: '/admin/settings',
      icon: 'fas fa-cog'
    }
  ];

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <div className={`admin-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-header">
          <Link to="/admin" className="sidebar-logo">
            <div className="logo-icon">
              <i className="fas fa-dumbbell"></i>
            </div>
            <span className="logo-text">Fitmas Admin</span>
          </Link>
          <button
            className="sidebar-close"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <ul className="nav-menu">
            {menuItems.map((item, index) => (
              <li key={index} className="nav-item">
                {item.children ? (
                  <div className="nav-item-dropdown">
                    <div
                      className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                    >
                      <i className={item.icon}></i>
                      <span>{item.title}</span>
                      <i className="fas fa-chevron-down dropdown-icon"></i>
                    </div>
                    <ul className="dropdown-menu">
                      {item.children.map((child, childIndex) => (
                        <li key={childIndex}>
                          <Link
                            to={child.path}
                            className={`dropdown-link ${isActive(child.path, true) ? 'active' : ''}`}
                            onClick={onClose}
                          >
                            {child.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`nav-link ${isActive(item.path, item.exact) ? 'active' : ''}`}
                    onClick={onClose}
                  >
                    <i className={item.icon}></i>
                    <span>{item.title}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <div className="sidebar-info">
            <small>Fitmas Admin Panel</small>
            <small>v1.0.0</small>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
