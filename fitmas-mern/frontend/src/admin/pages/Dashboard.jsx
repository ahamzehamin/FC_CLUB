import React, { useState, useEffect } from 'react';
import adminApi from '../services/authService';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    blogs: { total: 0, published: 0, drafts: 0 },
    contents: { total: 0, published: 0, drafts: 0 },
    users: 0,
    views: 0,
    recentBlogs: [],
    recentContents: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await adminApi.get('/admin/dashboard/stats');
      if (response.data.success) {
        setStats(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color }) => (
    <div className={`stat-card ${color}`}>
      <div className="stat-icon">
        <i className={icon}></i>
      </div>
      <div className="stat-content">
        <h3>{value}</h3>
        <p>{title}</p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      {/* Page Header */}
      <div className="page-header">
        <div className="page-title">
          <h1>Dashboard Overview</h1>
          <p>Welcome back! Here's what's happening with your content.</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary">
            <i className="fas fa-plus"></i>
            Quick Add Blog
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <StatCard
          title="Total Blogs"
          value={stats.blogs.total}
          icon="fas fa-blog"
          color="primary"
        />
        <StatCard
          title="Published Blogs"
          value={stats.blogs.published}
          icon="fas fa-check-circle"
          color="success"
        />
        <StatCard
          title="Total Pages"
          value={stats.contents.total}
          icon="fas fa-file-alt"
          color="secondary"
        />
        <StatCard
          title="Published Pages"
          value={stats.contents.published}
          icon="fas fa-globe"
          color="info"
        />
        <StatCard
          title="Draft Blogs"
          value={stats.blogs.drafts}
          icon="fas fa-edit"
          color="warning"
        />
        <StatCard
          title="Total Views"
          value={stats.views}
          icon="fas fa-eye"
          color="dark"
        />
      </div>

      <div className="dashboard-grid">
        {/* Recent Blogs */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Recent Blogs</h3>
            <a href="/admin/blogs" className="btn btn-sm btn-outline-primary">
              View All
            </a>
          </div>
          <div className="card-body">
            {stats.recentBlogs.length > 0 ? (
              <div className="recent-blogs-list">
                {stats.recentBlogs.map((blog) => (
                  <div key={blog._id} className="recent-blog-item">
                    <div className="blog-info">
                      <h4>{blog.title}</h4>
                      <div className="blog-meta">
                        <span className={`status-badge ${blog.status}`}>
                          {blog.status}
                        </span>
                        <span className="blog-date">
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="blog-actions">
                      <button className="btn btn-sm btn-outline-primary">
                        <i className="fas fa-edit"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <i className="fas fa-blog"></i>
                <p>No blogs yet. <a href="/admin/blogs/add">Create your first blog</a></p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Content */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Recent Pages</h3>
            <a href="/admin/content" className="btn btn-sm btn-outline-primary">
              View All
            </a>
          </div>
          <div className="card-body">
            {stats.recentContents.length > 0 ? (
              <div className="recent-blogs-list">
                {stats.recentContents.map((content) => (
                  <div key={content._id} className="recent-blog-item">
                    <div className="blog-info">
                      <h4>{content.title}</h4>
                      <div className="blog-meta">
                        <span className={`status-badge ${content.status}`}>
                          {content.status}
                        </span>
                        <span className="blog-date">
                          {new Date(content.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="blog-actions">
                      <button className="btn btn-sm btn-outline-primary">
                        <i className="fas fa-edit"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <i className="fas fa-file-alt"></i>
                <p>No pages yet. <a href="/admin/content">Create your first page</a></p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Quick Actions</h3>
          </div>
          <div className="card-body">
            <div className="quick-actions">
              <a href="/admin/blogs/add" className="action-card">
                <div className="action-icon">
                  <i className="fas fa-plus"></i>
                </div>
                <div className="action-content">
                  <h4>Add New Blog</h4>
                  <p>Create a new blog post</p>
                </div>
              </a>

              <a href="/admin/blogs" className="action-card">
                <div className="action-icon">
                  <i className="fas fa-list"></i>
                </div>
                <div className="action-content">
                  <h4>Manage Blogs</h4>
                  <p>View and edit existing blogs</p>
                </div>
              </a>

              <a href="/admin/media" className="action-card">
                <div className="action-icon">
                  <i className="fas fa-images"></i>
                </div>
                <div className="action-content">
                  <h4>Media Library</h4>
                  <p>Upload and manage images</p>
                </div>
              </a>

              <a href="/admin/settings" className="action-card">
                <div className="action-icon">
                  <i className="fas fa-cog"></i>
                </div>
                <div className="action-content">
                  <h4>Settings</h4>
                  <p>Configure your preferences</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Recent Activity</h3>
          </div>
          <div className="card-body">
            <div className="activity-feed">
              <div className="activity-item">
                <div className="activity-icon">
                  <i className="fas fa-blog"></i>
                </div>
                <div className="activity-content">
                  <p>New blog post created</p>
                  <small>2 hours ago</small>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-icon">
                  <i className="fas fa-user"></i>
                </div>
                <div className="activity-content">
                  <p>User logged in</p>
                  <small>4 hours ago</small>
                </div>
              </div>

              <div className="activity-item">
                <div className="activity-icon">
                  <i className="fas fa-image"></i>
                </div>
                <div className="activity-content">
                  <p>Image uploaded to media library</p>
                  <small>1 day ago</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
